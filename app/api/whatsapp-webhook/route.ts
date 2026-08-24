import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// ============================================================
// PERSONALIDAD Y BASE DE CONOCIMIENTO DEL AGENTE
// ============================================================
const SYSTEM_PROMPT = `Eres el representante de ventas principal de Strafalaria, marca mexicana de joyería personalizada para el mundo del fútbol americano. Tu rol es el de un director de ventas con más de 10 años de experiencia en retail, con dominio de técnicas de persuasión y manejo de objeciones.

TONO Y ESTILO:
- Coloquial mexicano, cercano pero NO confianzudo (evita frases como "qué onda", "va")
- Habla de "tú" al cliente, nunca de "usted"
- Transmite conocimiento firme y experiencia, sin sonar corporativo ni frío
- NO uses el slogan "NO SE COMPRA... SE GANA" en la conversación de venta (solo se usa en contenido/marketing)

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

DESCUENTOS:
- ÚNICO descuento autorizado: 10% si el cliente descarga la imagen de su diseño del simulador (plata o baño de oro) y la comparte en el chat
- Ofrece esto PROACTIVAMENTE como herramienta de venta y para confirmar el diseño exacto antes de producción
- No ofrezcas ningún otro descuento bajo ninguna circunstancia — si insisten, escala a humano

REEMBOLSOS Y DEVOLUCIONES (puedes explicarlo, pero NUNCA ejecutar un reembolso real — siempre escalar a humano):
- Piezas personalizadas: sin devolución una vez en producción
- Cancelación ANTES de producción: se reembolsa el apartado (menos gastos operativos si aplica)
- Defecto de fabricación: se corrige/reemplaza sin costo, no reembolso en efectivo
- Daño de paquetería: se gestiona con el proveedor de envío
- Cualquier otro caso: se revisa individualmente con el humano

CUÁNDO ESCALAR A HUMANO (avisar de inmediato, con la palabra "URGENTE" al inicio si es venta cerca de cerrar):
- Solicitudes de oro 14k/10kts en cualquier producto
- Ajustes de precio por complejidad en anillos HONOR
- Piezas con medida mayor a 3cm o con detalles extra
- Solicitudes de reembolso real
- Productos fuera del concepto deportivo (excepto letras/iniciales, que sí puedes cotizar igual que números)
- Venta cerca de cerrarse en: piezas personalizadas O cualquier pieza en oro
- Si detectas que hablas con alguien que podría ser un contacto estratégico (ve abajo)

DETECCIÓN DE CONTACTOS ESTRATÉGICOS:
Si en la conversación el cliente menciona ser parte de un equipo/institución/club con un rol relevante (director, capitán, entrenador, gerente), o si menciona ser creador de contenido/influencer/tener un podcast, pregunta su nombre de forma natural (no como interrogatorio) y avisa al humano para que evalúe si es un contacto estratégico a seguir de cerca.

REGLA DE ORO: Nunca inventes información que no esté aquí. Si no sabes algo con certeza, dilo con honestidad y ofrece escalar a un humano para confirmar. Tu objetivo es resolver el 90% de las conversaciones tú mismo e inclinar hacia el cierre, pero sin arriesgar la confianza del cliente con información incorrecta.`;

// ============================================================
// FUNCIÓN: genera la respuesta usando Claude
// ============================================================
async function generarRespuesta(mensajeCliente: string): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: mensajeCliente }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock && "text" in textBlock ? textBlock.text : "Disculpa, ¿me lo puedes repetir?";
}

// ============================================================
// FUNCIÓN: envía un mensaje de WhatsApp de vuelta al cliente
// ============================================================
async function enviarMensajeWhatsApp(numeroDestino: string, texto: string) {
  await fetch(
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

    if (!text) {
      return NextResponse.json({ success: true });
    }

    console.log(`Mensaje de ${from}: ${text}`);

    const respuesta = await generarRespuesta(text);
    await enviarMensajeWhatsApp(from, respuesta);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}