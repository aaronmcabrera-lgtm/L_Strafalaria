"use client";

import { useState } from "react";
import Script from "next/script";

// =========================
// PRODUCT CARD
// =========================
function ProductCard({
  prod,
}: {
  prod: {
    id: number;
    nombre: string;
  };
}) {

  const materiales = ["ORO", "PLATA", "BAÑO ORO"];

  const [materialSeleccionado, setMaterialSeleccionado] =
    useState("ORO");

  return (
    <div className="bg-neutral-900/40 border border-white/5 rounded-lg flex flex-col group overflow-hidden">

      {/* IMAGEN */}
      <div className="aspect-square relative p-4 pb-2 bg-black/10">

        <img
          src={`/disonos/prod-${prod.id}.png`}
          alt={prod.nombre}
          className="
            w-full
            h-full
            object-contain
            group-hover:scale-110
            transition-transform
            duration-700
          "
        />

      </div>

      {/* CONTENIDO */}
      <div className="p-4 pt-2 text-center flex flex-col flex-grow">

        {/* TITULO */}
        <h3
          className="
            font-antonio
            text-2xl
            font-bold
            uppercase
            italic
            tracking-widest
            mb-1
            leading-none
          "
        >
          {prod.nombre}
        </h3>

        {/* SELECTOR MATERIAL */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 mt-3">

          {materiales.map((material) => (

            <button
              key={material}
              onClick={() => setMaterialSeleccionado(material)}
              className={`
                text-[8px]
                font-bold
                border
                px-3
                py-1
                rounded-full
                uppercase
                tracking-wider
                transition-all
                duration-200

                ${
                  materialSeleccionado === material
                    ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10"
                    : "border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }
              `}
            >
              {material}
            </button>

          ))}

        </div>

        {/* BOTON */}
        <div className="mt-auto">

          <a
            href={`https://wa.me/5215549614585?text=${encodeURIComponent(
`Hola, quiero cotizar este diseño.

Modelo: ${prod.nombre}
Material: ${materialSeleccionado}

Vengo desde la landing de Strafalaria.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block
              w-full
              py-3.5
              bg-gradient-to-r
              from-[#00E5FF]
              to-[#00E676]
              text-black
              font-black
              uppercase
              text-[10px]
              tracking-widest
              rounded-sm
              hover:brightness-110
              transition-all
              italic
              text-center
            "
          >
            COTIZA EL TUYO
          </a>

        </div>

      </div>

    </div>
  );
}

// =========================
// SIMULADOR
// =========================
function Simulador() {

  const [numero, setNumero] = useState("");

  const [materialSeleccionado, setMaterialSeleccionado] =
    useState("ORO");

  const materiales = ["ORO", "PLATA", "BAÑO ORO"];

  // =========================
  // LOGICA DE IMAGEN SEGUN MATERIAL
  // =========================
  const imagenPath =
    numero.trim() === ""
      ? "/disenos/TU-NUMERO.png"
      : materialSeleccionado === "PLATA"
        ? `/disenos/${numero}-silver.png`
        : `/disenos/${numero}-gold.png`;

  return (
    <div
      id="seccion-simulador"
      className="
        w-full
        max-w-md
        bg-black/40
        backdrop-blur-xl
        rounded-2xl
        p-8
        flex
        flex-col
        gap-6
        border
        border-white/10
        shadow-2xl
        mx-auto
        relative
        z-10
      "
    >

      {/* HEADER */}
      <div className="text-center">

        <h2 className="font-antonio text-[29px] md:text-[34px] font-bold uppercase tracking-widest text-white leading-none">
          Personaliza tu dije
        </h2>

        <p className="font-inter text-white/40 text-[10px] uppercase tracking-[0.2em] mt-3 leading-relaxed">
          Selecciona el material, escribe tu número y visualiza el diseño
        </p>

      </div>

      {/* SELECTOR MATERIAL */}
      <div className="flex flex-wrap justify-center gap-2 -mt-2">

        {materiales.map((material) => (

          <button
            key={material}
            onClick={() => setMaterialSeleccionado(material)}
            className={`
              text-[10px]
              font-bold
              border
              px-4
              py-2
              rounded-full
              uppercase
              tracking-wider
              transition-all
              duration-200

              ${
                materialSeleccionado === material
                  ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }
            `}
          >
            {material}
          </button>

        ))}

      </div>

      {/* INPUT */}
      <input
        type="text"
        value={numero}
        placeholder="ESCRIBE AQUÍ TU NÚMERO"
        onChange={(e) => setNumero(e.target.value.slice(0, 3))}
        className="
          font-antonio
          px-4
          py-4
          bg-black/70
          text-white
          border-2
          border-[#00E676]
          rounded-xl
          text-center
          text-xl
          md:text-2xl
          font-bold
          outline-none
          focus:border-[#00E5FF]
          focus:shadow-[0_0_20px_rgba(0,229,255,0.35)]
          transition-all
          duration-300
          placeholder:text-white/55
          placeholder:tracking-[0.25em]
          placeholder:text-sm
          shadow-[0_0_15px_rgba(0,230,118,0.15)]
        "
      />

      {/* PREVIEW */}
      <div
        className="
          bg-black/20
          p-4
          rounded-xl
          border
          border-white/5
          flex
          justify-center
          min-h-[350px]
          items-center
          relative
          overflow-hidden
        "
      >

        <img
          src={imagenPath}
          alt="Dije personalizado Strafalaria"
          className="
            w-[300px]
            h-auto
            object-contain
            z-10
            transition-transform
            duration-500
            hover:scale-105
          "
          onError={(e) => {
            e.currentTarget.src = "/disenos/default.png";
          }}
        />

      </div>

      {/* BOTON */}
      <a
        href={`https://wa.me/5215549614585?text=${encodeURIComponent(
`Hola Strafalaria, quiero cotizar mi dije personalizado.

Número: ${numero || "SIN ESPECIFICAR"}
Material: ${materialSeleccionado}

Vengo desde la landing de Strafalaria.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          font-antonio
          bg-gradient-to-r
          from-[#00E5FF]
          to-[#00E676]
          py-4
          rounded-xl
          text-center
          font-black
          text-black
          uppercase
          tracking-widest
          text-sm
          hover:brightness-110
          transition-all
          shadow-[0_0_25px_rgba(0,230,118,0.4)]
        "
      >
        Cotizar este diseño
      </a>

    </div>
  );
}

// =========================
// HOME
// =========================
export default function Home() {

  const productos = [
    { id: 1, nombre: "CREW" },
    { id: 2, nombre: "ICONIC" },
    { id: 3, nombre: "HONOR" },
    { id: 4, nombre: "ROSTER" },
    { id: 5, nombre: "ELITE" },
  ];

  return (
    <main className="bg-black text-white font-inter selection:bg-[#00E676] selection:text-black">
      
      {/* Píxel de Meta Oficial para Strafalaria */}
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '504498228318924');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* HERO */}
      <section
        className="
          relative
          pt-16
          pb-10
          md:py-28
          text-center
          px-6
          bg-cover
          bg-center
          bg-no-repeat
          min-h-[90vh]
          flex
          flex-col
          justify-center
          items-center
        "
        style={{ backgroundImage: "url('/disonos/fondo-hero.jpg')" }}
      >

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl w-full">

          <img
            src="/disonos/logo-strafalaria-white.svg"
            alt="Strafalaria"
            className="mx-auto mb-8 w-40 md:w-56"
          />

          {/* SUBTITULO */}
          <p className="font-inter text-gray-300 text-[11px] md:text-sm uppercase tracking-[0.3em] mb-6 opacity-80 px-4">
            Convierte el número de tu jersey en un dije personalizado de oro o plata.
          </p>

          {/* TITULO */}
          <h1
            className="
              font-antonio
              text-[39px]
              md:text-[80px]
              font-bold
              mb-10
              leading-[1.05]
              md:leading-[0.85]
              uppercase
              tracking-tighter
              text-white
              max-w-[320px]
              md:max-w-none
              mx-auto
            "
          >
            CONVIERTE <br className="md:hidden" />
            TU NÚMERO <br className="md:hidden" />
            EN JOYA
          </h1>

          <Simulador />

        </div>

      </section>

      {/* GALERIA */}
      <section className="bg-black py-12 md:py-24 px-6 border-t border-white/5">

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="font-antonio text-4xl md:text-6xl font-bold mb-4 uppercase tracking-[0.18em] italic text-white">
            MÁS QUE JOYAS
          </h2>

          <p className="font-inter text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-12 max-w-2xl mx-auto leading-relaxed">
            Creamos piezas que representan identidad, legado y pertenencia.
            Más que joyas: símbolos creados para permanecer contigo para siempre
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            {productos.map((prod) => (

              <ProductCard
                key={prod.id}
                prod={prod}
              />

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}