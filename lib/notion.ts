import { Client } from "@notionhq/client";

// ============================================================
// Cliente de Notion y helpers para la base "Contactos Agente de Ventas"
// (STRAFALARIA → Comercial → CRM)
// ============================================================
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// OJO: desde la versión 2025-09-03 de la API de Notion, las bases de datos ya no se
// consultan directo por su database_id — hay que usar el "data source" que vive adentro
// de la base (para bases de una sola fuente, que es este caso, es un id fijo aparte).
const DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID as string;

export type EstadoContacto =
  | "Nuevo"
  | "En conversación"
  | "Cotizando"
  | "Cerca de cerrar"
  | "Cerrado - Venta"
  | "Escalado a Aaron"
  | "Perdido";

export type Canal = "WhatsApp" | "Facebook" | "Instagram";

// Un turno de conversación, en el formato que espera la API de mensajes de Claude.
export type Turno = { role: "user" | "assistant"; content: string };

// Busca un contacto existente por teléfono; si no existe, lo crea con Estado "Nuevo".
// Devuelve el ID de la página de Notion (el "expediente" de ese cliente).
export async function getOrCreateContact(telefono: string, canal: Canal): Promise<string> {
  const busqueda = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      property: "Teléfono",
      phone_number: { equals: telefono },
    },
  });

  if (busqueda.results.length > 0) {
    return busqueda.results[0].id;
  }

  const nuevaPagina = await notion.pages.create({
    parent: { type: "data_source_id", data_source_id: DATA_SOURCE_ID },
    properties: {
      Nombre: { title: [{ text: { content: telefono } }] },
      "Teléfono": { phone_number: telefono },
      Canal: { select: { name: canal } },
      Estado: { select: { name: "Nuevo" } },
    },
  });

  return nuevaPagina.id;
}

// Agrega una línea al historial de chat (cuerpo de la página) y actualiza "Último Mensaje".
// Esto es lo que Aaron ve casi en tiempo real si tiene la página abierta en Notion.
export async function appendMessage(
  pageId: string,
  autor: "Cliente" | "Agente",
  texto: string
): Promise<void> {
  const hora = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
    dateStyle: "short",
    timeStyle: "short",
  });

  await notion.blocks.children.append({
    block_id: pageId,
    children: [
      {
        paragraph: {
          rich_text: [
            { text: { content: `[${hora}] ${autor}: ` }, annotations: { bold: true } },
            { text: { content: texto } },
          ],
        },
      },
    ],
  });

  await notion.pages.update({
    page_id: pageId,
    properties: {
      "Último Mensaje": { date: { start: new Date().toISOString() } },
    },
  });
}

// Reconstruye el historial de la conversación a partir de los bloques de texto que ya
// guardamos en la página del contacto (ver appendMessage arriba). Esto es lo que le da
// memoria al agente: sin esto, cada mensaje nuevo se le manda a Claude aislado, como si
// la conversación empezara de cero cada vez (por eso se veían saludos e info repetida).
//
// Nota de rendimiento: por ahora lee TODOS los bloques de la página y se queda con los
// últimos `maxTurnos`. Para el volumen actual de conversaciones está bien; si más adelante
// las conversaciones se vuelven muy largas y esto empieza a sentirse lento, vale la pena
// mover el historial a un store dedicado (ej. Vercel KV) en vez de leerlo de Notion cada vez.
export async function getConversationHistory(
  pageId: string,
  maxTurnos: number = 20
): Promise<Turno[]> {
  const turnos: Turno[] = [];
  let cursor: string | undefined;

  do {
    const respuesta = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of respuesta.results as any[]) {
      if (block.type !== "paragraph") continue;
      const richText = block.paragraph?.rich_text as any[] | undefined;
      if (!richText || richText.length === 0) continue;

      const etiqueta: string = richText[0]?.plain_text ?? "";
      const texto = richText
        .slice(1)
        .map((rt) => rt.plain_text ?? "")
        .join("")
        .trim();

      if (!texto) continue;

      if (etiqueta.includes("Cliente:")) {
        turnos.push({ role: "user", content: texto });
      } else if (etiqueta.includes("Agente:")) {
        turnos.push({ role: "assistant", content: texto });
      }
    }

    cursor = respuesta.has_more ? respuesta.next_cursor ?? undefined : undefined;
  } while (cursor);

  // Solo los últimos N turnos, para no inflar de más el prompt en conversaciones largas.
  return turnos.slice(-maxTurnos);
}

// ============================================================
// RELEVO DE RESPUESTAS DE AARON
// Cuando le reenviamos a Aaron un aviso o una imagen/audio de un cliente, guardamos el ID
// de ESE mensaje de WhatsApp en la propiedad "Último Mensaje ID Aaron" de la página de ese
// mismo cliente. Si luego Aaron responde citando ese mensaje puntual, buscamos en Notion qué
// página tiene ese ID guardado, y ahí sacamos el teléfono al que hay que reenviar su respuesta.
//
// Esto vive en Notion (no en memoria del proceso) a propósito: Vercel puede levantar una
// instancia nueva del servidor entre que se manda el aviso y que Aaron contesta, y un mapa en
// memoria se pierde en ese caso. Notion persiste sin importar cuántas instancias haya.
//
// Requiere que la base "Contactos Agente de Ventas" tenga una propiedad de texto llamada
// exactamente "Último Mensaje ID Aaron" (tipo Texto).
// ============================================================
export async function setUltimoMensajeIdAaron(telefono: string, mensajeId: string): Promise<void> {
  const pageId = await getOrCreateContact(telefono, "WhatsApp");
  await notion.pages.update({
    page_id: pageId,
    properties: {
      "Último Mensaje ID Aaron": { rich_text: [{ text: { content: mensajeId } }] },
    },
  });
}

export async function buscarClientePorMensajeIdAaron(mensajeId: string): Promise<string | null> {
  const busqueda = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      property: "Último Mensaje ID Aaron",
      rich_text: { equals: mensajeId },
    },
  });

  if (busqueda.results.length === 0) return null;

  const pagina = busqueda.results[0] as any;
  const telefono = pagina.properties?.["Teléfono"]?.phone_number as string | undefined;
  return telefono ?? null;
}

export async function updateEstado(pageId: string, estado: EstadoContacto): Promise<void> {
  await notion.pages.update({
    page_id: pageId,
    properties: { Estado: { select: { name: estado } } },
  });
}

export async function marcarComoEstrategico(pageId: string): Promise<void> {
  await notion.pages.update({
    page_id: pageId,
    properties: { "Contacto Estratégico": { checkbox: true } },
  });
}

export async function setPiezaDeInteres(pageId: string, pieza: string): Promise<void> {
  await notion.pages.update({
    page_id: pageId,
    properties: { "Pieza de Interés": { rich_text: [{ text: { content: pieza } }] } },
  });
}

export async function setNota(pageId: string, nota: string): Promise<void> {
  await notion.pages.update({
    page_id: pageId,
    properties: { Notas: { rich_text: [{ text: { content: nota } }] } },
  });
}