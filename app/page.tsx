"use client";

import { useState } from "react";
import Script from "next/script";
import TrustSection from "./components/TrustSection";
import TestimoniosSection from "./components/TestimoniosSection";
import ScrollMarquee from "./components/ScrollMarquee";

/* ==========================================================================
   PRODUCT CARD Component
   ========================================================================== */
function ProductCard({
  prod,
}: {
  prod: {
    id: number;
    nombre: string;
    plata: string;
    bano: string;
  };
}) {
  const materiales = [
    {
      key: "BAÑO ORO",
      titulo: "BAÑO DE ORO",
      precio: prod.bano,
      boton: "COTIZA EL TUYO",
      destacado: prod.nombre === "ROSTER",
    },
    {
      key: "PLATA",
      titulo: "PLATA",
      precio: prod.plata,
      boton: "COTIZA EL TUYO",
      destacado:
        prod.nombre !== "ELITE" &&
        prod.nombre !== "ROSTER",
    },
    {
      key: "ORO",
      titulo: "ORO 14KTS",
      precio: "COTIZAR",
      boton: "COTIZA EL TUYO",
      destacado: prod.nombre === "ELITE",
    },
  ];

  const [materialSeleccionado, setMaterialSeleccionado] =
    useState(
      prod.nombre === "ELITE"
        ? "ORO"
        : prod.nombre === "ROSTER"
          ? "BAÑO ORO"
          : "PLATA"
    );

  const materialActivo =
    materiales.find(
      (m) => m.key === materialSeleccionado
    ) || materiales[1];

  const mensajeWhatsApp =
    materialActivo.key === "ORO"
      ? `Hola Strafalaria, estoy interesado en comprar el Modelo ${prod.nombre} en ORO 14KTS, ¿me puedes dar una cotización personalizada?`
      : `Hola Strafalaria, estoy interesado en comprar el Modelo ${prod.nombre} en material ${materialActivo.titulo}. ¿Cuál es el tiempo de entrega y la forma de pago?`;

  return (
    <div
      className="
        bg-neutral-900/40
        border
        border-white/5
        rounded-3xl
        flex
        flex-col
        overflow-hidden
        backdrop-blur-xl
      "
    >
      {/* IMAGE */}
      <div className="aspect-square p-4 bg-black/20 relative">
        {/* PERSONALIZABLE BADGE */}
        <div
          className="
            absolute
            top-4
            left-4
            z-10
            px-4
            py-1
            rounded-full
            bg-gradient-to-r
            from-[#ff003c]
            via-[#ff00b8]
            to-[#ff0090]
            text-white
            text-[8px]
            uppercase
            tracking-[0.18em]
            font-black
            italic
            shadow-[0_0_18px_rgba(255,0,120,0.55)]
          "
          style={{
            fontFamily: "Anton, sans-serif",
          }}
        >
          PERSONALIZABLE
        </div>

        <img
          src={`/disenos/prod-${prod.id}.png`}
          alt={prod.nombre}
          className="w-full h-full object-contain"
        />
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4 pt-2 flex flex-col gap-4">
        {/* PRODUCT NAME */}
        <div className="flex flex-col items-center">
          <h3
            className="
              font-antonio
              text-[30px]
              md:text-[34px]
              uppercase
              text-center
              tracking-[0.25em]
              text-white
              font-black
            "
          >
            {prod.nombre}
          </h3>

          {/* CUSTOM TEXT */}
          <p
            className="
              mt-1
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-white/55
              text-center
            "
          >
            Tu número • Tu equipo • Tu estilo
          </p>
        </div>

        {/* MATERIALS */}
        <div className="flex flex-col gap-2">
          {materiales.map((m) => (
            <button
              key={m.key}
              onClick={() =>
                setMaterialSeleccionado(m.key)
              }
              className={`
                relative
                rounded-xl
                border
                px-3
                h-[82px]
                flex
                flex-col
                justify-center
                items-center
                text-center
                transition
                ${
                  materialSeleccionado === m.key
                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                    : "border-white/10 bg-white/[0.02]"
                }
              `}
            >
              {/* BADGE */}
              {m.destacado && (
                <div
                  className="
                    absolute
                    -top-2
                    right-2
                    bg-[#D4AF37]
                    text-black
                    text-[7px]
                    px-2
                    py-[3px]
                    rounded-full
                    uppercase
                    tracking-[0.18em]
                    font-black
                  "
                >
                  MÁS VENDIDO
                </div>
              )}

              {/* TITLE */}
              <div
                className={`
                  font-antonio
                  uppercase
                  leading-none
                  ${
                    m.key === "ORO"
                      ? "text-[17px] tracking-[0.10em]"
                      : "text-[14px] tracking-[0.12em]"
                  }
                  ${
                    materialSeleccionado === m.key
                      ? "text-[#D4AF37]"
                      : "text-white"
                  }
                `}
              >
                {m.titulo}
              </div>

              {/* DESDE */}
              {m.key !== "ORO" && (
                <div
                  className="
                    text-[6px]
                    uppercase
                    tracking-[0.24em]
                    text-white/35
                    mt-1
                    leading-none
                  "
                >
                  Desde
                </div>
              )}

              {/* PRICE */}
              <div
                className={`
                  font-antonio
                  mt-1
                  leading-none
                  font-black
                  text-[22px]
                  min-h-[22px]
                  flex
                  items-center
                  ${
                    materialSeleccionado === m.key
                      ? "text-[#D4AF37]"
                      : "text-white"
                  }
                `}
              >
                {m.precio}
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/5215549614585?text=${encodeURIComponent(
            mensajeWhatsApp
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (
              typeof window !== "undefined" &&
              (window as any).fbq
            ) {
              (window as any).fbq("track", "Lead", {
                product_name: prod.nombre,
                material: materialActivo.titulo,
              });
            }
          }}
          className="
            block
            text-center
            py-3
            rounded-xl
            bg-gradient-to-r
            from-[#00E5FF]
            to-[#00E676]
            text-black
            font-bold
            text-xs
            uppercase
          "
        >
          {materialActivo.boton}
        </a>
      </div>
    </div>
  );
}

/* ==========================================================================
   SIMULADOR Component
   ========================================================================== */
function Simulador() {
  const [numero, setNumero] = useState("");
  const [materialSeleccionado, setMaterialSeleccionado] = useState("BAÑO ORO");
  const [cargandoPago, setCargandoPago] = useState(false);

  const materiales = [
    {
      key: "BAÑO ORO",
      titulo: "BAÑO DE ORO",
      precio: "$1,200",
      precioNumerico: 1200,
      sublabel: "DESDE",
      tipo: "pago_directo",
    },
    {
      key: "PLATA",
      titulo: "PLATA",
      precio: "$990",
      precioNumerico: 990,
      sublabel: "DESDE",
      tipo: "pago_directo",
    },
    {
      key: "ORO",
      titulo: "Oro 14kts",
      precio: "$7,700",
      precioNumerico: 7700,
      sublabel: "DESDE",
      tipo: "whatsapp",
    },
  ];

  const numeroLimpio = numero.trim().replace(/^0+/, "");
  const numeroVisual = numeroLimpio === "" ? "18" : numeroLimpio;

  const imagenPath =
    materialSeleccionado === "PLATA"
      ? `/disenos/${numeroVisual}-silver.png`
      : `/disenos/${numeroVisual}-gold.png`;

  const handleActionClick = async (material: typeof materiales[0]) => {
    setMaterialSeleccionado(material.key);
    if (material.tipo === "whatsapp") {
      if (
        typeof window !== "undefined" &&
        (window as any).fbq
      ) {
        (window as any).fbq("track", "Lead", {
          numero: numeroVisual,
          material: "ORO 14KTS",
        });
      }

      const mensaje = `Hola Strafalaria, quiero cotizar un dije personalizado con el número "${numeroVisual}" en ORO 14KTS.`;

      window.open(
        `https://wa.me/5215549614585?text=${encodeURIComponent(mensaje)}`,
        "_blank"
      );

      return;
    }
    setCargandoPago(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero: numeroVisual,
          material: material.titulo,
          precio: material.precioNumerico,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();

      if (data.initPoint) {
        window.location.assign(data.initPoint);
      } else {
        alert("No se pudo obtener el enlace de pago de Mercado Pago.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al conectar con la pasarela.");
    } finally {
      setCargandoPago(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
      <h2 className="text-center text-white text-[20px] tracking-wide uppercase font-bold mb-4">
        Simulador Strafalaria
      </h2>

      {/* INPUT */}
      <input
        type="text"
        value={numero}
        placeholder="ESCRIBE AQUÍ TU NÚMERO"
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "");
          setNumero(val.slice(0, 3));
        }}
        className="font-antonio w-full px-4 py-3 bg-black/70 text-white border border-[#00E676]/60 rounded-xl text-center text-lg font-extrabold placeholder:text-[11px] placeholder:text-white/40 placeholder:tracking-widest"
      />

      {/* PREVIEW CONTAINER */}
      <div className="mt-4 bg-black/20 p-2 rounded-2xl flex justify-center items-center min-h-[160px]">
        <img
          src={imagenPath}
          className="w-[140px] h-auto object-contain"
          alt={`Dije número ${numeroVisual}`}
        />
      </div>

      {/* LISTA DE MATERIALES */}
      <div className="flex flex-col gap-3 mt-4">
        {materiales.map((material) => {
          const isSelected = materialSeleccionado === material.key;
          return (
            <div
              key={material.key}
              onClick={() => setMaterialSeleccionado(material.key)}
              className={`flex items-center justify-between rounded-xl border p-3 transition cursor-pointer ${
                isSelected
                  ? "border-[#D4AF37] bg-[#D4AF37]/5"
                  : "border-white/10 bg-white/[0.01]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => setMaterialSeleccionado(material.key)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                      isSelected ? "border-[#D4AF37]" : "border-white/30"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    )}
                  </div>
                </div>

                <div
                  className={`w-9 h-9 rounded-full shadow-inner ${
                    material.key === "PLATA"
                      ? "bg-gradient-to-tr from-zinc-400 to-zinc-100"
                      : "bg-gradient-to-tr from-amber-600 to-amber-300"
                  }`}
                />

                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    {material.titulo}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[9px] text-white/30 font-mono">
                      {material.sublabel}
                    </span>
                    <span className="text-[18px] font-extrabold text-white leading-tight">
                      {material.precio}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-l border-white/10 pl-4 min-w-[95px] text-center">
                {material.tipo === "pago_directo" ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(material);
                    }}
                    disabled={cargandoPago}
                    className={`text-[10px] font-black uppercase tracking-wider transition ${
                      material.key === "PLATA"
                        ? "text-white/25 hover:text-white/50"
                        : "text-white hover:text-[#D4AF37]"
                    }`}
                  >
                    {cargandoPago && isSelected ? "Procesando..." : "APARTAR CON $300"}
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(material);
                    }}
                    className="flex flex-col items-center justify-center mx-auto"
                  >
                    <img 
                      src="/icons/whatsapp.svg" 
                      alt="WhatsApp" 
                      className="w-11 h-11 aspect-square hover:scale-120 transition object-contain"
                    />
                    <span className="text-[11px] text-white/50 uppercase mt-0.5 tracking-tighter">
                      cotiza el tuyo
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[9px] text-white/60 text-center uppercase tracking-widest mt-4">
        TODOS NUESTROS DIJES EN BAÑO DE ORO Y PLATA INCLUYEN UNA CADENA DE 50CM. Y TIENEN ENVÍO GRÁTIS EN EL AREA METROPOLITANA
      </p>

      {/* SECCIÓN MERCADO PAGO PREMIUM CORREGIDA */}
      <div className="mt-5 flex flex-col items-center gap-2">
        <div className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00E676] rounded-full py-1 px-6 flex items-center justify-center gap-3 shadow-[0_4px_15px_rgba(0,229,255,0.05)]">
          <span className="text-[14px] text-black font-extrabold uppercase tracking-[0.05em]">
            PAGAR CON MERCADO PAGO
          </span>
        </div>
        
        <div className="text-[12px] text-white/50 tracking-widest uppercase flex items-center gap-1 mt-4">
          🛡️ Seguridad y Confianza
        </div>
        
        <div className="flex items-center justify-center gap-4 transition mt-1">
          <img src="/icons/visa.svg" alt="Visa" className="h-11 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <img src="/icons/mastercard.svg" alt="Mastercard" className="h-11 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <img src="/icons/mercado-pago.svg" alt="mercado-pago" className="h-11 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   HOME PAGE (Main Interface Component)
   ========================================================================== */
export default function Home() {
  const productos = [
    { id: 1, nombre: "CREW", plata: "$2,900", bano: "$3,200" },
    { id: 2, nombre: "ICONIC", plata: "$2,400", bano: "$2,700" },
    { id: 3, nombre: "HONOR", plata: "$3,600", bano: "$3,800" },
    { id: 4, font: "ROSTER", nombre: "ROSTER", plata: "$2,400", bano: "$2,700" },
    { id: 5, nombre: "ELITE", plata: "$3,200", bano: "$3,900" },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* 1. CARGA LA LIBRERÍA DE GOOGLE ANALYTICS */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8DLPVZSJCL"
        strategy="afterInteractive"
      />
      
      {/* 2. INICIALIZA GOOGLE ANALYTICS */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8DLPVZSJCL');
        `}
      </Script>

      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="lazyOnload"
      />

      {/* BANNER HORIZONTAL DINÁMICO EN LA PARTE MAS ALTA */}
      <ScrollMarquee />

      {/* HERO */}
      <section
        className="
          relative
          min-h-[90vh]
          flex
          flex-col
          items-center
          justify-center
          px-6
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: "url('/disenos/fondo-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center w-full max-w-4xl">
          {/* SE AGREGÓ mt-8 AQUÍ ABAJO PARA DARLE ESPACIO RESPECTO AL BANNER SUPERIOR */}
          <img
            src="/disenos/logo-strafalaria-white.svg"
            className="w-40 mx-auto mt-8 mb-6"
            alt="Strafalaria Logo"
          />

          <h1
            className="
              text-[44px]
              md:text-[80px]
              uppercase
              font-bold
              leading-tight
              mb-8
            "
          >
            CONVIERTE TU NÚMERO EN JOYA
          </h1>

          <div>
            <Simulador />
          </div>
        </div>
      </section>

      {/* BANNER INTERMEDIO */}
      <ScrollMarquee />

      {/* PRODUCTS */}
      <section
        className="
          py-16
          px-6
          border-t
          border-white/5
        "
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="
              font-antonio
              text-[42px]
              md:text-[58px]
              uppercase
              tracking-[0.20em]
              font-black
              text-white
              mb-6
            "
          >
            MÁS QUE JOYAS
          </h2>

          {/* CUSTOM BANNER */}
          <div
            className="
              relative
              mb-12
              mx-auto
              max-w-4xl
              overflow-hidden
              rounded-[22px]
              bg-gradient-to-r
              from-[#ff003c]
              via-[#ff00b8]
              to-[#ff0090]
              px-6
              py-5
              shadow-[0_0_45px_rgba(255,0,140,0.45)]
            "
          >
            <div className="absolute inset-0 bg-white/10" />

            <div className="relative z-10">
              <div
                className="
                  text-white
                  uppercase
                  text-[22px]
                  md:text-[34px]
                  leading-none
                  tracking-[0.04em]
                  font-black
                  italic
                "
                style={{
                  fontFamily: "Anton, sans-serif",
                }}
              >
                DISEÑOS 100% PERSONALIZABLES
              </div>

              <p
                className="
                  mt-1
                  text-white
                  text-[12px]
                  md:text-[18px]
                  font-bold
                  italic
                  opacity-95
                "
              >
                Crea tu pieza con tu número, equipo, colores y estilo
              </p>
            </div>
          </div>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-5
              gap-5
            "
          >
            {productos.map((p) => (
              <ProductCard key={p.id} prod={p} />
            ))}
          </div>
        </div>
      </section>
      
      <TrustSection />
      <TestimoniosSection />

      {/* FORMAS DE PAGO */}
      <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
        {/* VISA */}
        <div
          className="
            rounded-2xl
            bg-white/[0.02]
            backdrop-blur-xl
            h-[120px]
            flex items-center justify-center
          "
        >
          <img
            src="/icons/visa.svg"
            alt="Visa"
            className="h-10 w-auto"
          />
        </div>

        {/* MASTERCARD */}
        <div
          className="
            rounded-2xl
            bg-white/[0.02]
            backdrop-blur-xl
            h-[120px]
            flex items-center justify-center
          "
        >
          <img
            src="/icons/mastercard.svg"
            alt="Mastercard"
            className="h-12 w-auto"
          />
        </div>

        {/* MERCADO PAGO */}
        <div
          className="
            rounded-2xl
            bg-white/[0.02]
            backdrop-blur-xl
            h-[120px]
            flex items-center justify-center
          "
        >
          <img
            src="/icons/mercado-pago.svg"
            alt="Mercado Pago"
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* FOOTER */}
      <footer
        className="
          border-t
          border-white/5
          py-14
          px-6
          bg-black
        "
      >
        <div
          className="
            max-w-6xl
            mx-auto
            flex
            flex-col
            md:flex-row
            justify-between
            gap-12
          "
        >
          {/* LEFT */}
          <div
            className="
              flex
              flex-col
              items-center
              md:items-start
              gap-6
            "
          >
            <img
              src="/disenos/logo-strafalaria-white.svg"
              className="w-32 opacity-90"
              alt="Strafalaria Logo Footer"
            />

            <div className="flex gap-5">
              <a
                href="https://www.instagram.com/strafalaria.mx/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/instagram.svg"
                  className="w-8 h-8"
                  alt="Instagram Icon"
                />
              </a>

              <a
                href="https://www.facebook.com/Strafalaria.mx/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/facebook.svg"
                  className="w-8 h-8"
                  alt="Facebook Icon"
                />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              w-full
              md:w-1/2
              flex
              flex-col
              items-center
              md:items-end
              gap-4
            "
          >
            <p
              className="
                text-white/60
                text-[11px]
                uppercase
                tracking-[0.18em]
                text-center
                md:text-right
                max-w-md
              "
            >
              Regístrate a nuestro newsletter y recibirás antes que nadie nuestras promociones y lanzamientos
            </p>

            <form
              action="https://formspree.io/f/xjglwvoa"
              method="POST"
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                w-full
                max-w-md
              "
            >
              <input
                name="email"
                type="email"
                placeholder="Tu correo electrónico"
                className="
                  flex-1
                  px-4
                  py-3
                  bg-white/5
                  border
                  border-white/10
                  rounded-xl
                  text-white
                "
              />

              <button
                type="submit"
                className="
                  px-5
                  py-3
                  bg-gradient-to-r
                  from-[#00E5FF]
                  to-[#00E676]
                  text-black
                  rounded-xl
                  font-bold
                  uppercase
                  text-xs
                "
              >
                Unirme
              </button>
            </form>
          </div>
        </div>

        <p
          className="
            text-center
            text-white/35
            text-[10px]
            mt-10
          "
        >
          Diseño, Strafalaria México © 2026, Todos los derechos reservados.
        </p>
      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a
        href={`https://wa.me/5215549614585?text=${encodeURIComponent(
          "¡Hola Strafalaria! Estoy navegando en su landing y me gustaría recibir más información o cotizar una joya personalizada."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] w-[72px] h-[72px] rounded-full shadow-lg shadow-green-900/40 hover:shadow-xl hover:shadow-green-900/60 transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden"
        aria-label="Contactar por WhatsApp"
      >
        <img 
          src="/icons/whatsapp.svg" 
          alt="WhatsApp" 
          className="w-[72px] h-[72px] object-contain invert brightness-0 scale-[1.43] select-none pointer-events-none" 
        />
      </a>
    </main>
  );
}