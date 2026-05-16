"use client";

import { useState } from "react";

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
          src={`/disenos/prod-${prod.id}.png`}
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
            href={`https://wa.me/5215510141024?text=${encodeURIComponent(
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
          bg-black/60
          text-white
          border
          border-white/10
          rounded-lg
          text-center
          text-xl
          md:text-2xl
          font-bold
          outline-none
          focus:border-[#00E676]
          transition-colors
          placeholder:text-white/25
          placeholder:tracking-widest
          placeholder:text-sm
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
    { id: 1, nombre: "TEAM" },
    { id: 2, nombre: "BLOOD" },
    { id: 3, nombre: "IDENT" },
    { id: 4, nombre: "WINNER" },
    { id: 5, nombre: "LUX" },
  ];

  return (
    <main className="bg-black text-white font-inter selection:bg-[#00E676] selection:text-black">

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
        style={{ backgroundImage: "url('/disenos/fondo-hero.jpg')" }}
      >

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl w-full">

          <img
            src="/disenos/logo-strafalaria-white.svg"
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

          <h2 className="font-antonio text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tighter italic text-white">
            CREAMOS MUCHO MÁS
          </h2>

          <p className="font-inter text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-12 max-w-2xl mx-auto">
            Contáctanos y diseñaremos juntos una joya que llevarás siempre contigo,
            te representará y más que un simple logo, será parte de tú identidad.
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

      {/* FOOTER */}
      <footer className="bg-black py-12 md:py-24 px-6 border-t border-white/10 text-center">

        <h2 className="font-antonio text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter text-white leading-none">
          DISEÑA Y DESCARGA EL TUYO AHORA
        </h2>

        <a
          href="#seccion-simulador"
          className="
            font-antonio
            bg-[#f3a473]
            text-black
            px-14
            py-4
            rounded-xl
            font-bold
            text-3xl
            uppercase
            tracking-tighter
            hover:bg-[#ffb68c]
            transition-all
            inline-block
            mb-8
            shadow-lg
          "
        >
          COMIENZA YA
        </a>

        <p className="font-inter text-gray-400 text-[11px] md:text-xs uppercase tracking-widest mb-16 max-w-md mx-auto leading-relaxed px-4">
          Descarga y envía tu diseño, obtendrás <br />
          <span className="text-[#00E676] font-extrabold text-sm">
            10% de descuento
          </span>{" "}
          en tu primera compra.
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/5 items-center">

          <div className="flex flex-col items-center md:items-start gap-6">

            <img
              src="/disenos/logo-strafalaria-white.svg"
              alt="Strafalaria"
              className="h-10 opacity-60"
            />

          </div>

          <div className="flex flex-col items-center md:items-end gap-4">

            <p className="font-inter text-[9px] text-gray-500 uppercase tracking-widest text-center md:text-right leading-relaxed">
              Subscríbete a nuestro newsletter para recibir promociones y descuentos.
            </p>

            <form
              action="https://formspree.io/f/xjglwvoa"
              method="POST"
              className="flex w-full max-w-sm border border-white/10 rounded-sm overflow-hidden"
            >

              <input
                type="email"
                name="email"
                required
                className="
                  bg-white/10
                  flex-grow
                  px-4
                  py-3
                  text-[10px]
                  outline-none
                  font-inter
                  uppercase
                  tracking-widest
                  text-white
                  placeholder-gray-600
                "
                placeholder="EMAIL"
              />

              <button
                type="submit"
                className="
                  bg-[#f3a473]
                  text-black
                  font-bold
                  uppercase
                  text-[10px]
                  px-6
                  py-3
                  tracking-widest
                  hover:bg-[#ffb68c]
                  transition-colors
                "
              >
                REGÍSTRATE
              </button>

            </form>

          </div>

        </div>

        <p className="mt-16 font-inter text-[8px] text-gray-600 tracking-[0.6em] uppercase font-bold italic">
          @ 2026 Strafalaria Design. All Rights Reserved.
        </p>

      </footer>

    </main>
  );
}