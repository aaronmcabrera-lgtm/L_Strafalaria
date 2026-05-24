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
    plata: string;
    bano: string;
  };
}) {

  const materiales = [
    {
      key: "BAÑO ORO",
      titulo: "BAÑO DE ORO",
      precio: prod.bano,
      boton: "COMPRAR AHORA",

      // SOLO ROSTER
      destacado: prod.nombre === "ROSTER",
    },
    {
      key: "PLATA",
      titulo: "PLATA",
      precio: prod.plata,
      boton: "COMPRAR AHORA",

      // TODOS EXCEPTO ELITE Y ROSTER
      destacado:
        prod.nombre !== "ELITE" &&
        prod.nombre !== "ROSTER",
    },
    {
      key: "ORO",
      titulo: "ORO DE 14KTS",
      precio: "COTIZAR",
      boton: "COTIZAR",

      // SOLO ELITE
      destacado: prod.nombre === "ELITE",
    },
  ];

  // =========================
  // DEFAULT MATERIAL
  // =========================
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

  // =========================
  // MENSAJE WHATSAPP
  // =========================
  const mensajeWhatsApp =
    materialActivo.key === "ORO"
      ? `Hola Strafalaria, quiero cotizar el modelo ${prod.nombre} en ORO DE 14KTS.

Vengo desde la landing de Strafalaria.`
      : `Hola, estoy interesado en la compra del modelo ${prod.nombre}.

Material: ${materialActivo.titulo}

¿Cuál es la forma de pago?`;

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

      {/* IMAGEN */}
      <div className="aspect-square relative p-4 pb-2 bg-black/20">

        <img
          src={`/disenos/prod-${prod.id}.png`}
          alt={prod.nombre}
          className="
            w-full
            h-full
            object-contain
            transition-transform
            duration-700
            hover:scale-105
          "
        />

      </div>

      {/* CONTENIDO */}
      <div className="px-4 pb-4 pt-2 flex flex-col flex-grow">

        {/* TITULO */}
        <h3
          className="
            font-antonio
            text-[24px]
            uppercase
            italic
            tracking-[0.20em]
            text-center
            mb-4
            text-white
          "
        >
          {prod.nombre}
        </h3>

        {/* MATERIALES */}
        <div className="flex flex-col gap-2.5">

          {materiales.map((material) => (

            <button
              key={material.key}
              onClick={() =>
                setMaterialSeleccionado(material.key)
              }
              className={`
                relative
                rounded-xl
                border
                px-3
                py-3
                transition-all
                duration-300
                text-center

                ${
                  materialSeleccionado === material.key
                    ? material.key === "ORO"
                      ? "border-[#D4AF37] bg-[#D4AF37]/10"
                      : "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_18px_rgba(212,175,55,0.12)]"
                    : "border-white/10 bg-white/[0.02]"
                }
              `}
            >

              {/* BADGE */}
              {material.destacado && (
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

              {/* TITULO */}
              <div
                className={`
                  font-antonio
                  uppercase
                  tracking-[0.16em]
                  text-[12px]
                  leading-none

                  ${
                    materialSeleccionado === material.key
                      ? "text-[#D4AF37]"
                      : "text-white"
                  }
                `}
              >
                {material.titulo}
              </div>

              {/* DESDE */}
              {material.key !== "ORO" && (
                <div className="text-[7px] uppercase tracking-[0.30em] text-white/35 mt-1.5">
                  Desde
                </div>
              )}

              {/* PRECIO */}
              <div
                className={`
                  font-antonio
                  mt-1
                  leading-none

                  ${
                    material.key === "ORO"
                      ? "text-[24px]"
                      : "text-[22px]"
                  }

                  ${
                    materialSeleccionado === material.key
                      ? "text-[#D4AF37]"
                      : "text-white"
                  }
                `}
              >
                {material.precio}
              </div>

            </button>

          ))}

        </div>

        {/* CTA */}
        <div className="mt-4">

          <a
            href={`https://wa.me/5215549614585?text=${encodeURIComponent(
              mensajeWhatsApp
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block
              w-full
              text-center
              font-antonio
              uppercase
              tracking-[0.20em]
              py-3.5
              rounded-xl
              text-black
              text-[10px]
              font-black
              transition-all
              duration-300
              bg-gradient-to-r
              from-[#00E5FF]
              to-[#00E676]
              hover:brightness-110
              shadow-[0_0_20px_rgba(0,230,118,0.25)]
            "
          >
            {materialActivo.boton}
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

  const materiales = [
    {
      key: "BAÑO ORO",
      titulo: "BAÑO DE ORO",
      precio: "$1,200",
      boton: "COMPRAR AHORA",
    },
    {
      key: "PLATA",
      titulo: "PLATA",
      precio: "$990",
      boton: "COMPRAR AHORA",
      destacado: true,
    },
    {
      key: "ORO",
      titulo: "ORO 14KTS",
      precio: "$7,700",
      boton: "COTIZAR",
    },
  ];

  const [materialSeleccionado, setMaterialSeleccionado] =
    useState("PLATA");

  const materialActivo =
    materiales.find(
      (m) => m.key === materialSeleccionado
    ) || materiales[1];

  // =========================
  // IMAGEN
  // =========================
  const imagenPath =
    numero.trim() === ""
      ? "/disenos/TU-NUMERO.png"
      : materialSeleccionado === "PLATA"
        ? `/disenos/${numero}-silver.png`
        : `/disenos/${numero}-gold.png`;

  // =========================
  // MENSAJE
  // =========================
  const mensajeWhatsApp =
    materialActivo.key === "ORO"
      ? `Hola Strafalaria, quiero cotizar mi dije personalizado.

Número: ${numero || "SIN ESPECIFICAR"}
Material: ORO 14KTS

Vengo desde la landing de Strafalaria.`
      : `Hola, estoy interesado en la compra del dije con el número "${numero || "SIN ESPECIFICAR"}".

Material: ${materialActivo.titulo}

¿Cuál es la forma de pago?`;

  return (
    <div
      className="
        w-full
        max-w-md
        bg-black/40
        backdrop-blur-xl
        rounded-3xl
        p-7
        flex
        flex-col
        gap-5
        border
        border-white/10
        shadow-2xl
        mx-auto
      "
    >

      {/* TITULO */}
      <div className="text-center">

        <h2 className="font-antonio text-[30px] uppercase tracking-[0.16em] text-white leading-none">
          PERSONALIZA TU DIJE
        </h2>

        <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] mt-3">
          Escribe tu número y selecciona el material
        </p>

      </div>

      {/* INPUT */}
      <input
        type="text"
        value={numero}
        placeholder="ESCRIBE AQUÍ TU NÚMERO"
        onChange={(e) =>
          setNumero(e.target.value.slice(0, 3))
        }
        className="
          font-antonio
          px-4
          py-4
          bg-black/70
          text-white
          border-2
          border-[#00E676]
          rounded-2xl
          text-center
          text-2xl
          font-bold
          outline-none
          focus:border-[#00E5FF]
          transition-all
          placeholder:text-white/50
          placeholder:text-[13px]
          md:placeholder:text-[18px]
          tracking-[0.08em]
        "
      />

      {/* PREVIEW */}
      <div
        className="
          bg-black/20
          p-4
          rounded-2xl
          border
          border-white/5
          flex
          justify-center
          min-h-[340px]
          items-center
          overflow-hidden
        "
      >

        <img
          src={imagenPath}
          alt="Dije"
          className="
            w-[290px]
            h-auto
            object-contain
            transition-transform
            duration-500
            hover:scale-105
          "
          onError={(e) => {
            e.currentTarget.src = "/disenos/default.png";
          }}
        />

      </div>

      {/* MATERIALES */}
      <div className="flex flex-col gap-2.5">

        {materiales.map((material) => (

          <button
            key={material.key}
            onClick={() =>
              setMaterialSeleccionado(material.key)
            }
            className={`
              relative
              rounded-xl
              border
              px-4
              py-4
              transition-all
              duration-300
              text-center

              ${
                materialSeleccionado === material.key
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.12)]"
                  : "border-white/10 bg-white/[0.02]"
              }
            `}
          >

            {/* BADGE */}
            {material.destacado && (
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

            {/* TITULO */}
            <div
              className={`
                font-antonio
                uppercase
                tracking-[0.16em]
                text-[15px]
                leading-none

                ${
                  materialSeleccionado === material.key
                    ? "text-[#D4AF37]"
                    : "text-white"
                }
              `}
            >
              {material.titulo}
            </div>

            {/* DESDE */}
            {material.key !== "ORO" && (
              <div className="text-[8px] uppercase tracking-[0.30em] text-white/35 mt-1.5">
                Desde
              </div>
            )}

            {/* PRECIO */}
            <div
              className={`
                font-antonio
                leading-none
                mt-1

                ${
                  material.key === "ORO"
                    ? "text-[30px]"
                    : "text-[28px]"
                }

                ${
                  materialSeleccionado === material.key
                    ? "text-[#D4AF37]"
                    : "text-white"
                }
              `}
            >
              {material.precio}
            </div>

          </button>

        ))}

      </div>

      {/* NOTA */}
      <div className="text-center">
        <p className="text-[9px] text-white/40 leading-relaxed">
          El costo de nuestro dije en oro de 14kts puede variar de acuerdo al número que se cotiza.
          <br />
          No incluye cadena.
        </p>
      </div>

      {/* CTA */}
      <a
        href={`https://wa.me/5215549614585?text=${encodeURIComponent(
          mensajeWhatsApp
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          block
          w-full
          text-center
          font-antonio
          uppercase
          tracking-[0.22em]
          py-4
          rounded-2xl
          text-black
          text-[11px]
          font-black
          transition-all
          duration-300
          bg-gradient-to-r
          from-[#00E5FF]
          to-[#00E676]
          hover:brightness-110
          shadow-[0_0_20px_rgba(0,230,118,0.25)]
        "
      >
        {materialActivo.boton}
      </a>

    </div>
  );
}

// =========================
// HOME
// =========================
export default function Home() {

  const productos = [
    {
      id: 1,
      nombre: "CREW",
      plata: "$2,400",
      bano: "$2,700",
    },
    {
      id: 2,
      nombre: "ICONIC",
      plata: "$2,400",
      bano: "$2,700",
    },
    {
      id: 3,
      nombre: "HONOR",
      plata: "$2,400",
      bano: "$2,700",
    },
    {
      id: 4,
      nombre: "ROSTER",
      plata: "$2,400",
      bano: "$2,700",
    },
    {
      id: 5,
      nombre: "ELITE",
      plata: "$2,800",
      bano: "$3,200",
    },
  ];

  return (
    <main className="bg-black text-white font-inter">

      {/* HERO */}
      <section
        className="
          relative
          pt-16
          pb-12
          md:py-28
          px-6
          bg-cover
          bg-center
          min-h-[90vh]
          flex
          flex-col
          justify-center
          items-center
        "
        style={{
          backgroundImage:
            "url('/disenos/fondo-hero.jpg')",
        }}
      >

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl w-full text-center">

          <img
            src="/disenos/logo-strafalaria-white.svg"
            alt="Strafalaria"
            className="mx-auto mb-8 w-40 md:w-56"
          />

          <p className="text-gray-300 text-[11px] uppercase tracking-[0.3em] mb-6 opacity-80 px-4">
            Convierte el número de tu jersey en un dije personalizado de oro o plata.
          </p>

          <h1
            className="
              font-antonio
              text-[42px]
              md:text-[84px]
              font-bold
              leading-[1]
              uppercase
              tracking-tight
              mb-10
            "
          >
            CONVIERTE TU
            <br />
            NÚMERO EN JOYA
          </h1>

          <Simulador />

        </div>

      </section>

      {/* PRODUCTOS */}
      <section className="bg-black py-14 md:py-24 px-6 border-t border-white/5">

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="font-antonio text-4xl md:text-6xl uppercase italic tracking-[0.18em] mb-4">
            MÁS QUE JOYAS
          </h2>

          <p className="text-white/45 text-[10px] uppercase tracking-[0.22em] max-w-2xl mx-auto leading-relaxed mb-12">
            Creamos piezas que representan identidad, legacy y pertenencia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">

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