import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

// 1. Inicializamos el cliente de Mercado Pago con tu token del .env.local
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "" 
});

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Leemos los datos dinámicos que manda tu simulador (número, material, etc.)
    const body = await request.json();
    const { numero, material } = body;

    const preference = new Preference(client);
    
    // 2. Generamos la preferencia con el precio fijo del apartado
    const response = await preference.create({
      body: {
        items: [
          {
            id: `apartado-${numero}-${material}`.toLowerCase().replace(/ /g, "-"),
            // El título le aclarará al cliente que está pagando solo el anticipo
            title: `Apartado Dije #${numero} (${material}) - Strafalaria`, 
            quantity: 1,
            unit_price: 300, // <-- CAMBIO AQUÍ: Ahora Mercado Pago solo cobrará los $300 del anticipo
            currency_id: "MXN",
          }
        ],
        payer: {
          email: "test_user_123456@testuser.com", 
        },
        back_urls: {
          success: "http://localhost:3000/gracias", 
          failure: "http://localhost:3000/error",
          pending: "http://localhost:3000/pendiente"
        },
      }
    });

    return NextResponse.json({ 
      id: response.id, 
      initPoint: response.init_point 
    });

  } catch (error: any) {
    console.error("Error al crear la preferencia en MP:", error);
    return NextResponse.json(
      { error: "Error interno al procesar el pago", detalles: error.message }, 
      { status: 500 }
    );
  }
}