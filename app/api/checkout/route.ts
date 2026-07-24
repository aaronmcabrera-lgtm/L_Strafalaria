import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const { numero, material, precio, esApartado } = await request.json();
    const preference = new Preference(client);

    const result = await preference.create({ 
      body: {
        items: [{
          id: esApartado ? `apartado-${numero}` : `compra-${numero}`,
          title: esApartado ? `Apartado Dije #${numero}` : `Dije #${numero} (${material})`,
          quantity: 1,
          unit_price: Number(precio),
          currency_id: "MXN",
        }],
        // Habilitamos cuotas (hasta 12). 
        // Mercado Pago mostrará las opciones disponibles según los convenios de tu cuenta.
        payment_methods: {
          installments: 12
        },
        auto_return: "approved",
        back_urls: {
          success: "https://strafalaria.mx",
          failure: "https://strafalaria.mx",
          pending: "https://strafalaria.mx"
        }
      } 
    });

    return NextResponse.json({ success: true, initPoint: result.init_point });
  } catch (error: any) {
    console.error("ERROR MP:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}