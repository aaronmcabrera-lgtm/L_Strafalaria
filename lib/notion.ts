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