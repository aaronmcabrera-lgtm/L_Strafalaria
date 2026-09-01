import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  getOrCreateContact,
  appendMessage,
  getConversationHistory,
  updateEstado,
  marcarComoEstrategico,
  setPiezaDeInteres,
  setNota,
  setUltimoMensajeIdAaron,
  buscarClientePorMensajeIdAaron,
  type EstadoContacto,
  type Turno,
} from "@/lib/notion";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// Número personal de Aaron (con código de país) donde le llegan los avisos de escalamiento.
// Se puede sobreescribir con la variable de entorno AARON_WHATSAPP_NUMBER en Vercel sin tocar código.
const AARON_WHATSAPP_NUMBER = process.env.AARON_WHATSAPP_NUMBER || "525510141024";

// ============================================================
// PERSONALIDAD Y BASE DE CONOCIMIENTO DEL AGENTE
// ============================================================
const SYSTEM_PROMPT = `Eres el representante de ventas principal de Strafalaria, marca mexicana de joyería personalizada para el mundo del fútbol americano. Tu rol es el de un director de ventas con más de 10 años de experiencia en retail, con dominio de técnicas de persuasión y manejo de objeciones.

TONO Y ESTILO:
- Coloquial mexicano, cercano pero NO confianzudo (evita frases como "qué onda", "va")
- Habla de "tú" al cliente, nunca de "usted"
- Transmite conocimiento firme y experiencia, sin sonar corporativo ni frío
- NO uses el slogan "NO SE COMPRA... SE GANA" en la conversación de venta (solo se usa en contenido/marketing)
- Responde CORTO y directo, como en una conversación real de WhatsApp, nunca en párrafos largos. No combines varios temas (precio, modelo, tiempos de entrega, proceso) en un mismo mensaje, salvo que el cliente los haya preguntado todos explícitamente
- Ve paso a paso: si es el primer mensaje o un saludo, responde con un saludo breve y natural, y espera a que el cliente diga qué pieza le interesa o haga una pregunta concreta antes de soltar información
- Si el cliente hace una pregunta amplia o abierta (ej. "cuéntame de sus productos", "qué manejan"), no listes todo el catálogo de un jalón — responde corto e invítalo a precisar (qué tipo de pieza tiene en mente, para qué equipo/ocasión, etc.)
- Prefiere mensajes de 2 a 4 líneas cortas sobre un solo párrafo largo, y cierra normalmente con una pregunta que mantenga la conversación fluyendo en vez de agotar el tema de golpe
- IMPORTANTE: ya se te está pasando el historial completo de esta conversación como turnos previos. Léelo con atención antes de responder — nunca vuelvas a saludar como si fuera la primera vez, ni vuelvas a preguntar algo que el cliente ya te contestó antes en este mismo historial

QUÉ ES STRAFALARIA:
Joyería personalizada para el mundo deportivo, especialmente fútbol americano y flag football. Piezas hechas a la medida, no genéricas. Si te piden algo fuera de este concepto (joyería no deportiva, otro tipo de producto), debes avisar que un asesor humano tomará la conversación.

CATÁLOGO Y PRECIOS (fuente de verdad — no inventes precios fuera de esto):

1. DIJES BÁSICOS (simulador, número liso):
   - Plata: $1,200 MXN — apartado $300 — entrega máx. 1 semana
   - Baño de oro: $1,600 MXN — apartado $300 — entrega máx. 1 semana
   - Oro 14kts: escalar siempre a humano, no cotizar tú

2. MÁS QUE JOYAS (personalizado — color, equipo, nombre, metales, incrustaciones):
   - CREW: Plata $3,600 / Baño de oro $4,200
   - ICONIC: Plata $3,600 / Baño de oro $4,300
   - ROSTER: Plata $3,200 / Baño de oro $3,500
   - ELITE: Plata $4,300 / Baño de oro $4,700
   - Apartado: 50% del costo — entrega: 15 días hábiles
   - Precios fijos, NO incluyen oro 14k/10kts bajo ningún caso (escalar a humano si lo piden)

3. ANILLOS DE CAMPEONATO/TEMPORADA (HONOR):
   - Plata: $4,900 (precio de arranque)
   - Baño de oro: $5,200 (precio de arranque)
   - Apartado: 50% — entrega: 3 semanas (3-4 si sube complejidad)
   - Si el diseño se complica: SIEMPRE escalar a humano para ajustar precio

MEDIDAS:
- Estándar: 2-2.5 cm alto, 1.5-2 mm grosor
- Medida MENOR: mismo precio, solo avisar al humano la medida solicitada
- Medida hasta 3cm MAYOR: puedes aceptarlo tú mismo, PERO SOLO como última carta de cierre cuando el cliente ya suena listo para pagar con seguridad — nunca lo ofrezcas al inicio de la conversación. Avisa al humano cuando lo uses.
- Más de 3cm o con detalles extra: SIEMPRE escalar a humano

ENVÍOS:
- CDMX y área metropolitana: gratis
- Nacional foráneo: +$200 MXN
- Internacional: cotiza tú mismo un estimado con Estafeta/DHL, pero SIEMPRE aclara que el monto está sujeto a confirmación final antes de despachar

PAGO A MESES SIN INTERESES (MSI):
- Disponible ÚNICAMENTE para piezas de la línea "Más que Joyas" (CREW, ICONIC, ROSTER, ELITE) — NO aplica a los dijes básicos del simulador ni a los anillos HONOR
- Hasta 6 meses sin intereses
- NUNCA lo ofrezcas tú de forma proactiva — es un método de pago 100% reactivo: solo lo explicas si el cliente pregunta directamente por pagar a meses, MSI, o "sin intereses"
- En este esquema NO hay apartado del 50% — se cobra el total de la pieza a través de un link de pago especial (no hay anticipo aparte)
- Es manual: no puedes generar tú el link. Cuando el cliente pida esto en una pieza de "Más que Joyas", confírmale que sí se puede (hasta 6 meses, sin intereses, se paga el total, sin anticipo aparte) y dile que en un momento le llega el link para completar el pago. Esto SIEMPRE se escala como urgente (es_urgente: true) — es una señal directa de que el cliente ya quiere pagar
- Si preguntan por MSI en un dije básico o en un anillo HONOR, explica que ese método de pago solo aplica a la línea "Más que Joyas", y ofrece el apartado normal (50%) para esa pieza

DESCUENTOS:
- ÚNICO descuento autorizado: 10% si el cliente descarga la imagen de su diseño del simulador (plata o baño de oro) y la comparte en el chat
- Este descuento aplica SOLO a piezas en plata o baño de oro — NUNCA a piezas en oro 14k/10kts
- Ofrece esto PROACTIVAMENTE como herramienta de venta y para confirmar el diseño exacto antes de producción
- No ofrezcas ningún otro descuento bajo ninguna circunstancia — si insisten, escala a humano

REEMBOLSOS Y DEVOLUCIONES (puedes explicarlo, pero NUNCA ejecutar un reembolso real — siempre escalar a humano):
- Piezas personalizadas: sin devolución una vez en producción
- Cancelación ANTES de producción: se reembolsa el apartado (menos gastos operativos si aplica)
- Defecto de fabricación: se corrige/reemplaza sin costo, no reembolso en efectivo
- Daño de paquetería: se gestiona con el proveedor de envío
- Cualquier otro caso: se revisa individualmente con el humano

CUÁNDO ESCALAR A HUMANO (esto ya NO se lo escribes al cliente en el chat — se reporta aparte, ve FORMATO DE RESPUESTA abajo):
- Solicitudes de oro 14k/10kts en cualquier producto
- Ajustes de precio por complejidad en anillos HONOR
- Piezas con medida mayor a 3cm o con detalles extra
- Solicitudes de reembolso real
- Productos fuera del concepto deportivo (excepto letras/iniciales, que sí puedes cotizar igual que números)
- Venta cerca de cerrarse en piezas personalizadas (siempre) → esto es urgente
- Venta cerca de cerrarse en oro (baño de oro u oro 14k/10kts): SOLO si el cliente ya mostró una señal real de compra (confirma que quiere apartar/pagar, pide el link de pago, comparte nombre/equipo/número para personalizar la pieza, o dice explícitamente que lo quiere) → esto es urgente. Una simple pregunta o cotización de precio de oro, sin nada más, NO cuenta como "cerca de cerrarse" y no debe escalarse
- Si el cliente pregunta el precio de oro y luego no responde, NO lo escales por eso solo: retoma tú mismo la conversación con un mensaje de valor (reforzar calidad/durabilidad, ofrecer plata como alternativa más accesible, o recordar el descuento del 10% si aplica en plata/baño de oro). Escala solo si después aparece una señal real de compra
- Solicitud de pago a meses sin intereses (MSI) en una pieza de "Más que Joyas" → esto es urgente (ve la sección PAGO A MESES SIN INTERESES arriba)
- Si detectas que hablas con alguien que podría ser un contacto estratégico (ve abajo)

De estos casos, SOLO son "urgentes" (es_urgente: true) los tres marcados arriba como urgentes (venta cerca de cerrarse en pieza personalizada, en oro con señal real de compra, o solicitud de pago a MSI en "Más que Joyas"). El resto son escalamientos normales (es_urgente: false) que igual se le deben avisar al humano, pero sin la etiqueta URGENTE.

DETECCIÓN DE CONTACTOS ESTRATÉGICOS:
Si en la conversación el cliente menciona ser parte de un equipo/institución/club con un rol relevante (director, capitán, entrenador, gerente), o si menciona ser creador de contenido/influencer/tener un podcast, pregunta su nombre de forma natural (no como interrogatorio) y avisa al humano (escalar: true, es_urgente: false) para que evalúe si es un contacto estratégico a seguir de cerca.

REGLA DE ORO: Nunca inventes información que no esté aquí. Si no sabes algo con certeza, dilo con honestidad y ofrece escalar a un humano para confirmar. Tu objetivo es resolver el 90% de las conversaciones tú mismo e inclinar hacia el cierre, pero sin arriesgar la confianza del cliente con información incorrecta.

FORMATO DE RESPUESTA (OBLIGATORIO):
Responde ÚNICAMENTE con un objeto JSON válido, sin texto antes ni después, sin markdown ni bloques de código. Debe tener exactamente esta forma:
{
  "respuesta_cliente": "el mensaje que se le manda al cliente por WhatsApp, en tu tono normal",
  "escalar": true o false,
  "es_urgente": true o false,
  "aviso_humano": "si escalar es true: 1-2 líneas para Aaron explicando qué pasó y por qué se escala, incluyendo el número/contexto del cliente si es relevante. Si escalar es false: cadena vacía",
  "etapa": "una de: En conversación | Cotizando | Cerca de cerrar | Cerrado - Venta | Escalado a Aaron",
  "contacto_estrategico": true o false,
  "pieza_interes": "descripción corta de la pieza que le interesa al cliente (ej. 'Dije número 10, baño de oro'), o cadena vacía si aún no se sabe",
  "nota": "algo puntual que Aaron debería saber de este mensaje (ej. 'pidió factura', 'cambió de número'), o cadena vacía si no aplica"
}

Guía para "etapa" (así se refleja el pipeline de Notion, úsalo con criterio):
- "En conversación": plática normal, aún sin cotización concreta
- "Cotizando": ya le diste un precio concreto de algún producto y está evaluando
- "Cerca de cerrar": usa esto siempre que es_urgente sea true
- "Cerrado - Venta": el cliente confirma que ya pagó/apartó
- "Escalado a Aaron": escalaste algo que no es cierre de venta (oro 14k, reembolso, fuera de concepto, ajuste HONOR, contacto estratégico)
Nunca uses "Nuevo" ni "Perdido" — esos los maneja el sistema o Aaron manualmente.

"es_urgente" solo puede ser true si "escalar" también es true. Si no hay nada que escalar, usa escalar: false, es_urgente: false, aviso_humano: "".`;

// ============================================================
// TIPO: respuesta estructurada que devuelve Claude
// ============================================================
type RespuestaAgente = {
  respuestaCliente: string;
  escalar: boolean;
  esUrgente: boolean;
  avisoHumano: string;
  etapa: EstadoContacto | null;
  contactoEstrategico: boolean;
  piezaInteres: string;
  nota: string;
};

const ETAPAS_VALIDAS: EstadoContacto[] = [
  "En conversación",
  "Cotizando",
  "Cerca de cerrar",
  "Cerrado - Venta",
  "Escalado a Aaron",
];

// ============================================================
// DEDUPLICACIÓN DE MENSAJES
// Meta reintenta la entrega del webhook si no le respondemos rápido (o si hay
// cualquier hiccup de red), y eso estaba haciendo que un mismo mensaje del
// cliente se procesara dos veces y generara dos respuestas distintas.
// Esto vive en memoria del proceso: cubre bien los reintentos típicos (segundos
// de diferencia, misma instancia "caliente" de Vercel). No es 100% infalible si
// Vercel levanta una instancia nueva justo en medio, pero es la mitigación más
// simple sin meter infraestructura nueva. Si se siguen viendo duplicados, el
// siguiente paso sería un store persistente (ej. Vercel KV) para esto.
// ============================================================
const MENSAJES_PROCESADOS = new Map<string, number>();
const VENTANA_DEDUP_MS = 5 * 60 * 1000; // 5 minutos

function yaFueProcesado(messageId: string): boolean {
  limpiarMensajesViejos();
  return MENSAJES_PROCESADOS.has(messageId);
}

function marcarComoProcesado(messageId: string): void {
  MENSAJES_PROCESADOS.set(messageId, Date.now());
}

function limpiarMensajesViejos(): void {
  const ahora = Date.now();
  for (const [id, timestamp] of MENSAJES_PROCESADOS) {
    if (ahora - timestamp > VENTANA_DEDUP_MS) {
      MENSAJES_PROCESADOS.delete(id);
    }
  }
}

// ============================================================
// FUNCIÓN: genera la respuesta usando Claude (JSON estructurado:
// mensaje para el cliente + si hay que avisarle a Aaron)
// Ahora recibe también el historial de la conversación, para que el modelo
// tenga contexto de todo lo ya hablado y no responda como si fuera la primera vez.
// ============================================================
async function generarRespuesta(
  mensajeCliente: string,
  historial: Turno[] = []
): Promise<RespuestaAgente> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [...historial, { role: "user", content: mensajeCliente }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  const raw = textBlock && "text" in textBlock ? textBlock.text : "";

  try {
    // Por si el modelo envuelve el JSON en ```json ... ``` a pesar de la instrucción
    const limpio = raw.replace(/```json\s*|\s*```/g, "").trim();
    const parsed = JSON.parse(limpio);
    const etapa = ETAPAS_VALIDAS.includes(parsed.etapa) ? (parsed.etapa as EstadoContacto) : null;
    return {
      respuestaCliente: parsed.respuesta_cliente || "Disculpa, ¿me lo puedes repetir?",
      escalar: Boolean(parsed.escalar),
      esUrgente: Boolean(parsed.escalar) && Boolean(parsed.es_urgente),
      avisoHumano: parsed.aviso_humano || "",
      etapa,
      contactoEstrategico: Boolean(parsed.contacto_estrategico),
      piezaInteres: parsed.pieza_interes || "",
      nota: parsed.nota || "",
    };
  } catch (error) {
    // Si el modelo no devolvió JSON válido, no perdemos el mensaje: se lo mandamos
    // al cliente tal cual y no escalamos ni tocamos Notion (mejor no meter ruido por un error de formato).
    console.error("No se pudo parsear la respuesta del modelo como JSON:", raw);
    return {
      respuestaCliente: raw || "Disculpa, ¿me lo puedes repetir?",
      escalar: false,
      esUrgente: false,
      avisoHumano: "",
      etapa: null,
      contactoEstrategico: false,
      piezaInteres: "",
      nota: "",
    };
  }
}

// ============================================================
// FUNCIÓN: envía un mensaje de WhatsApp a cualquier número
// (se usa tanto para responder al cliente como para avisar a Aaron)
// ============================================================
async function enviarMensajeWhatsApp(numeroDestino: string, texto: string) {
  const response = await fetch(
    `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: numeroDestino,
        type: "text",
        text: { body: texto },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      `ERROR AL ENVIAR WHATSAPP a ${numeroDestino}. Status: ${response.status}. Respuesta de Meta:`,
      JSON.stringify(data)
    );
  } else {
    console.log(`WhatsApp enviado correctamente a ${numeroDestino}:`, JSON.stringify(data));
  }

  return data;
}
// ============================================================
// RELEVO DE RESPUESTAS DE AARON
// Cuando le reenviamos a Aaron un aviso o una imagen/audio de un cliente, guardamos en
// Notion (no en memoria — ver lib/notion.ts) a qué cliente pertenece ese mensaje. Si Aaron
// responde citando (swipe reply / "Responder") ese mensaje puntual, WhatsApp nos manda su ID
// en message.context.id; buscamos ese ID en Notion para saber a qué cliente reenviarle el
// texto que Aaron escribió, y lo manda el agente (el número del negocio), no Aaron desde el suyo.
// ============================================================
async function resolverClienteDePendiente(contextId: string | undefined): Promise<string | null> {
  if (!contextId) return null;
  try {
    return await buscarClientePorMensajeIdAaron(contextId);
  } catch (error) {
    console.error("No se pudo resolver a qué cliente pertenece el mensaje citado:", error);
    return null;
  }
}

function normalizarNumero(numero: string): string {
  const soloDigitos = numero.replace(/\D/g, "");
  // WhatsApp entrega los números mexicanos con un "1" extra después del código de
  // país 52 en los mensajes ENTRANTES (ej. "5215510141024"), pero ese "1" no se usa
  // al enviar (ej. "525510141024"). Sin esto, el número de Aaron nunca hacía match
  // consigo mismo y sus respuestas se procesaban como si fueran de un cliente nuevo.
  if (soloDigitos.startsWith("521") && soloDigitos.length === 13) {
    return "52" + soloDigitos.slice(3);
  }
  return soloDigitos;
}

// ============================================================
// FUNCIÓN: avisa a Aaron por WhatsApp cuando el agente escala algo
// ============================================================
async function avisarAaron(numeroCliente: string, esUrgente: boolean, avisoHumano: string) {
  const prefijo = esUrgente ? "URGENTE" : "Aviso";
  const texto = `${prefijo} — Strafalaria agente\nCliente: ${numeroCliente}\n${avisoHumano}`;
  const respuesta = await enviarMensajeWhatsApp(AARON_WHATSAPP_NUMBER, texto);
  const mensajeId = respuesta?.messages?.[0]?.id;
  if (mensajeId) {
    try {
      await setUltimoMensajeIdAaron(numeroCliente, mensajeId);
    } catch (error) {
      console.error("No se pudo guardar en Notion el ID del aviso a Aaron:", error);
    }
  }
}

// ============================================================
// FUNCIONES: reenviar a Aaron la imagen/audio que mandó el cliente
// WhatsApp no deja "reenviar" directo el media ID que llegó del cliente — hay que
// descargarlo y volver a subirlo a nombre del número del negocio antes de poder
// mandarlo a otro número (el de Aaron).
// ============================================================
async function obtenerUrlMedia(mediaId: string): Promise<{ url: string; mimeType: string }> {
  const response = await fetch(`https://graph.facebook.com/v21.0/${mediaId}`, {
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`No se pudo obtener la URL del media ${mediaId}: ${JSON.stringify(data)}`);
  }
  return { url: data.url, mimeType: data.mime_type };
}

async function descargarMedia(url: string): Promise<Blob> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
  });
  if (!response.ok) {
    throw new Error(`No se pudo descargar el archivo multimedia. Status: ${response.status}`);
  }
  return await response.blob();
}

async function subirMediaWhatsApp(blob: Blob, mimeType: string): Promise<string> {
  const formData = new FormData();
  formData.append("messaging_product", "whatsapp");
  formData.append("file", blob, "archivo");
  formData.append("type", mimeType);

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/media`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
      body: formData,
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`No se pudo subir el archivo multimedia a WhatsApp: ${JSON.stringify(data)}`);
  }
  return data.id as string;
}

async function reenviarMediaAaron(
  mediaId: string,
  tipo: "image" | "audio",
  numeroCliente: string,
  caption?: string
): Promise<void> {
  const { url, mimeType } = await obtenerUrlMedia(mediaId);
  const blob = await descargarMedia(url);
  const nuevoMediaId = await subirMediaWhatsApp(blob, mimeType);

  const body: Record<string, any> = {
    messaging_product: "whatsapp",
    to: AARON_WHATSAPP_NUMBER,
    type: tipo,
  };
  // El caption solo aplica a imágenes (los audios no lo soportan en WhatsApp).
  body[tipo] = caption && tipo === "image" ? { id: nuevoMediaId, caption } : { id: nuevoMediaId };

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    console.error(`No se pudo reenviar el ${tipo} a Aaron. Respuesta de Meta:`, JSON.stringify(data));
  } else {
    console.log(`${tipo} reenviado a Aaron correctamente:`, JSON.stringify(data));
    const mensajeId = data?.messages?.[0]?.id;
    if (mensajeId) {
      try {
        await setUltimoMensajeIdAaron(numeroCliente, mensajeId);
      } catch (error) {
        console.error("No se pudo guardar en Notion el ID del media reenviado a Aaron:", error);
      }
    }
  }
}

// ============================================================
// GET: Meta verifica el webhook una sola vez al configurarlo
// ============================================================
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Verificación fallida", { status: 403 });
}

// ============================================================
// POST: recibe cada mensaje entrante y responde
// ============================================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (!message) {
      return NextResponse.json({ success: true });
    }

    const from = message.from;
    const text = message.text?.body;
    const messageId = message.id as string | undefined;
    const tipo = message.type as string | undefined; // "text", "image", "audio", "document", "video", "sticker", etc.

    // Si Meta reintenta la entrega de un mensaje que ya procesamos, lo ignoramos
    // para no generar (ni mandar) una segunda respuesta distinta para lo mismo.
    // Esta validación va primero, antes de mirar el tipo de mensaje, para que
    // también cubra imágenes/audios y no solo texto.
    if (messageId && yaFueProcesado(messageId)) {
      console.log(`Mensaje ${messageId} ya procesado, se ignora reintento de Meta.`);
      return NextResponse.json({ success: true });
    }
    if (messageId) marcarComoProcesado(messageId);

    // Si el mensaje viene del propio número de Aaron, no es un cliente — es él
    // respondiendo (citando/"Responder") a un aviso o a una imagen/audio que le
    // reenviamos. Tomamos su texto y se lo mandamos al cliente correspondiente
    // como si lo hubiera mandado el agente (desde el número del negocio).
    if (normalizarNumero(from) === normalizarNumero(AARON_WHATSAPP_NUMBER)) {
      const contextId = message.context?.id as string | undefined;
      const clienteDestino = await resolverClienteDePendiente(contextId);

      if (!text) {
        await enviarMensajeWhatsApp(
          AARON_WHATSAPP_NUMBER,
          "Para reenviar tu respuesta al cliente mándamela en texto, citando (mantén presionado → Responder) el mensaje de la imagen/audio o el aviso que te mandé."
        );
        return NextResponse.json({ success: true });
      }

      if (!clienteDestino) {
        await enviarMensajeWhatsApp(
          AARON_WHATSAPP_NUMBER,
          "No identifiqué a qué cliente mandar esto — responde citando (mantén presionado → Responder) el mensaje de la imagen/audio o el aviso que te reenvié, y ahí sí se la mando al cliente."
        );
        return NextResponse.json({ success: true });
      }

      await enviarMensajeWhatsApp(clienteDestino, text);

      try {
        const pageId = await getOrCreateContact(clienteDestino, "WhatsApp");
        await appendMessage(pageId, "Agente", text);
        await updateEstado(pageId, "En conversación");
      } catch (error) {
        console.error("No se pudo registrar en Notion la respuesta manual de Aaron:", error);
      }

      await enviarMensajeWhatsApp(AARON_WHATSAPP_NUMBER, "✅ Enviado al cliente.");

      return NextResponse.json({ success: true });
    }

    // El agente todavía no sabe "leer" imágenes ni audios. En vez de quedarse
    // callado (que es lo que pasaba antes: sin texto, el webhook cortaba sin
    // responder ni avisar a nadie), le avisamos al cliente que ya lo van a
    // revisar, y te avisamos a ti (urgente, porque el cliente está esperando)
    // para que lo veas directo en WhatsApp y respondas tú mismo.
    if (tipo === "image" || tipo === "audio") {
      const tipoLegible = tipo === "image" ? "una imagen" : "un audio";
      const mediaId: string | undefined =
        tipo === "image" ? message.image?.id : message.audio?.id;
      // Solo las imágenes (y documentos/video, que todavía no manejamos) pueden traer un
      // "caption" — el texto que el cliente escribió junto con la foto. Los audios no tienen
      // este campo en WhatsApp. Sin esto, el caption se perdía por completo y el aviso a Aaron
      // no traía ninguna pista de qué estaba preguntando el cliente.
      const caption: string | undefined = tipo === "image" ? message.image?.caption : undefined;
      console.log(`Mensaje multimedia (${tipo}) de ${from}${caption ? ` con caption: "${caption}"` : ""}`);

      await enviarMensajeWhatsApp(from, "¡Recibido! Dame un momento para revisarlo bien y te contesto 🙂");

      try {
        await avisarAaron(
          from,
          true,
          `El cliente mandó ${tipoLegible} que el agente todavía no puede leer — te la reenvío abajo, revísala y respóndele tú directo en WhatsApp.` +
            (caption ? `\nMensaje del cliente junto con la imagen: "${caption}"` : "")
        );
      } catch (error) {
        console.error("No se pudo avisar a Aaron sobre el mensaje multimedia:", error);
      }

      if (mediaId) {
        try {
          await reenviarMediaAaron(mediaId, tipo as "image" | "audio", from, caption);
        } catch (error) {
          console.error(`No se pudo reenviar el ${tipo} a Aaron:`, error);
          // Si el reenvío falla, al menos ya le llegó el aviso de texto de arriba.
        }
      }

      try {
        const pageId = await getOrCreateContact(from, "WhatsApp");
        const textoRegistro = tipo === "image" ? "[Imagen]" : "[Audio]";
        await appendMessage(pageId, "Cliente", caption ? `${textoRegistro} ${caption}` : textoRegistro);
        await updateEstado(pageId, "Escalado a Aaron");
      } catch (error) {
        console.error("No se pudo registrar el mensaje multimedia en Notion:", error);
      }

      return NextResponse.json({ success: true });
    }

    if (!text) {
      // Otro tipo de mensaje que no es texto/imagen/audio (documento, sticker, ubicación, etc.)
      // Por ahora simplemente no respondemos nada automático, igual que antes.
      return NextResponse.json({ success: true });
    }

    console.log(`Mensaje de ${from}: ${text}`);

    // Obtenemos el expediente del contacto y su historial ANTES de generar la respuesta,
    // para que el agente tenga contexto de toda la conversación y no responda como si
    // fuera la primera vez que habla con este cliente.
    let pageId: string | null = null;
    let historial: Turno[] = [];
    try {
      pageId = await getOrCreateContact(from, "WhatsApp");
      historial = await getConversationHistory(pageId);
    } catch (error) {
      console.error("No se pudo obtener el contacto/historial de Notion (se sigue sin historial):", error);
    }

    const {
      respuestaCliente,
      escalar,
      esUrgente,
      avisoHumano,
      etapa,
      contactoEstrategico,
      piezaInteres,
      nota,
    } = await generarRespuesta(text, historial);

    // Siempre le respondemos al cliente primero: nada de lo que pase con Notion
    // debe atrasar o romper la conversación.
    await enviarMensajeWhatsApp(from, respuestaCliente);

    if (escalar && avisoHumano) {
      try {
        await avisarAaron(from, esUrgente, avisoHumano);
      } catch (error) {
        console.error("No se pudo enviar el aviso a Aaron:", error);
      }
    }

    // Registro en Notion (CRM) — esto es lo que Aaron puede ver casi en tiempo real.
    // Todo va en un try/catch aparte: si Notion falla, el cliente ya recibió su respuesta.
    try {
      if (!pageId) pageId = await getOrCreateContact(from, "WhatsApp");
      await appendMessage(pageId, "Cliente", text);
      await appendMessage(pageId, "Agente", respuestaCliente);

      if (etapa) await updateEstado(pageId, etapa);
      if (contactoEstrategico) await marcarComoEstrategico(pageId);
      if (piezaInteres) await setPiezaDeInteres(pageId, piezaInteres);
      if (nota) await setNota(pageId, nota);
    } catch (error) {
      console.error("No se pudo registrar la conversación en Notion:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}