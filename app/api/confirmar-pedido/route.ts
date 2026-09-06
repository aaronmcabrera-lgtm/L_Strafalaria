// Pega este archivo en: app/api/confirmar-pedido/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN!;
const NOTION_API_KEY = process.env.NOTION_API_KEY!;
// ID de la data source de tu base PROYECTOS en Notion (Comercial → PROYECTOS)
const NOTION_PROYECTOS_DATA_SOURCE_ID =
  process.env.NOTION_PROYECTOS_DATA_SOURCE_ID ||
  "3ae0e4ed-75ca-8091-a7ed-000be89b87e8";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN!;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;
const AARON_WHATSAPP_NUMBER = process.env.AARON_WHATSAPP_NUMBER || "5215510141024";

const notion = new Client({ auth: NOTION_API_KEY });

async function enviarWhatsAppAaron(mensaje: string) {
  await fetch(
    `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: AARON_WHATSAPP_NUMBER,
        type: "text",
        text: { body: mensaje },
      }),
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const { paymentId, nombre, telefono, direccion, nota } = await req.json();

    if (!nombre || !telefono || !direccion) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Consultamos el pago real en Mercado Pago para obtener monto y producto,
    // en vez de confiar en datos que vengan del navegador del cliente
    let monto = 0;
    let descripcion = "Pedido landing";

    if (paymentId) {
      try {
        const mpRes = await fetch(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          { headers: { Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}` } }
        );
        const pago = await mpRes.json();
        monto = pago.transaction_amount || 0;
        descripcion = pago.description || descripcion;
      } catch (e) {
        console.error("No se pudo consultar el pago en Mercado Pago:", e);
      }
    }

    // Creamos la fila en tu base PROYECTOS de Notion
    await notion.pages.create({
      parent: { data_source_id: NOTION_PROYECTOS_DATA_SOURCE_ID } as any,
      properties: {
        Nombre: {
          title: [{ text: { content: `${nombre} — ${descripcion}` } }],
        },
        Cliente: { rich_text: [{ text: { content: nombre } }] },
        Telefono: { phone_number: telefono },
        Observaciones: {
          rich_text: [
            {
              text: {
                content: `Dirección: ${direccion}${nota ? `\nNota del cliente: ${nota}` : ""}\nID de pago Mercado Pago: ${paymentId || "sin ID"}`,
              },
            },
          ],
        },
        "Precio Venta": { number: monto },
        "Pago recibido": { checkbox: true },
        Canal: { select: { name: "Landing" } },
      },
    });

    // Aviso inmediato a Aaron por WhatsApp
    await enviarWhatsAppAaron(
      `🛒 NUEVO PEDIDO DESDE LA LANDING\n` +
        `Cliente: ${nombre}\n` +
        `Teléfono: ${telefono}\n` +
        `Monto: $${monto} MXN\n` +
        `Producto: ${descripcion}\n` +
        `Dirección: ${direccion}` +
        (nota ? `\nNota: ${nota}` : "")
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en confirmar-pedido:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}