"use client";

import { useState } from "react";

/* =========================
   PRODUCT CARD
========================= */
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
      precio: "",
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
      ? `Hola Strafalaria, estoy interesado en comprar el Modelo ${prod.nombre}, me puedes cotizar?`
      : `Hola Strafalaria, estoy interesado en comprar el Modelo ${prod.nombre}, en material ${materialActivo.titulo}. ¿Cuál es el tiempo de entrega y la forma de pago?`;

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

/* =========================
   SIMULADOR
========================= */
function Simulador() {

  const [numero, setNumero] = useState("");
  const [materialSeleccionado, setMaterialSeleccionado] =
    useState("PLATA");

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

  const materialActivo =
    materiales.find(
      (m) => m.key === materialSeleccionado
    ) || materiales[1];

  const imagenPath =
    numero.trim() === ""
      ? "/disenos/TU-NUMERO.png"
      : materialSeleccionado === "PLATA"
        ? `/disenos/${numero}-silver.png`
        : `/disenos/${numero}-gold.png`;

  const mensajeWhatsApp =
    materialActivo.key === "ORO"
      ? `Hola Strafalaria, quiero cotizar mi dije personalizado.`
      : `Hola Strafalaria, estoy interesado en comprar el dije con el número "${numero || "SIN ESPECIFICAR"}".`;

  return (
    <div
      className="
        w-full
        max-w-md
        mx-auto
        bg-black/40
        backdrop-blur-xl
        rounded-3xl
        p-7
        border
        border-white/10
      "
    >

      <h2
        className="
          text-center
          text-white
          text-[26px]
          uppercase
          font-bold
          mb-4
        "
      >
        PERSONALIZA TU DIJE
      </h2>

      <input
        type="text"
        value={numero}
        placeholder="ESCRIBE TU NÚMERO"
        onChange={(e) =>
          setNumero(e.target.value.slice(0, 3))
        }
        className="
          font-antonio
          px-4
          py-3
          bg-black/70
          text-white
          border-2
          border-[#00E676]
          rounded-2xl
          text-center
          text-xl
          md:text-2xl
          font-extrabold
          placeholder:text-[12px]
          md:placeholder:text-[14px]
        "
      />

      {/* PREVIEW */}
      <div
        className="
          mt-4
          bg-black/20
          p-4
          rounded-2xl
          flex
          justify-center
        "
      >

        <img
          src={imagenPath}
          className="w-[260px]"
        />

      </div>

      {/* MATERIALS */}
      <div className="flex flex-col gap-2 mt-4">

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
              text-center
              transition

              ${
                materialSeleccionado === material.key
                  ? "border-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-white/10 bg-white/[0.02]"
              }
            `}
          >

            <div
              className="
                text-white
                uppercase
                text-sm
                font-semibold
              "
            >
              {material.titulo}
            </div>

            <div
              className="
                flex
                items-end
                justify-center
                gap-2
                mt-1
              "
            >

              <span
                className="
                  text-[9px]
                  uppercase
                  text-white/40
                "
              >
                DESDE
              </span>

              <span
                className="
                  text-[24px]
                  font-extrabold
                  text-white
                "
              >
                {material.precio}
              </span>

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
        className="
          mt-4
          block
          text-center
          py-4
          rounded-2xl
          text-black
          font-bold
          text-xs
          uppercase
          bg-gradient-to-r
          from-[#00E5FF]
          to-[#00E676]
        "
      >
        COTIZA EL TUYO
      </a>

    </div>
  );
}

/* =========================
   HOME
========================= */
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
    <main className="bg-black text-white">

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
          backgroundImage:
            "url('/disenos/fondo-hero.jpg')",
        }}
      >

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center">

          <img
            src="/disenos/logo-strafalaria-white.svg"
            className="w-40 mx-auto mb-6"
          />

          <h1
            className="
              text-[44px]
              md:text-[80px]
              uppercase
              font-bold
              leading-tight
            "
          >
            CONVIERTE TU NÚMERO EN JOYA
          </h1>

          <div className="mt-10">
            <Simulador />
          </div>

        </div>

      </section>

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

            {/* GLOW */}
            <div
              className="
                absolute
                inset-0
                bg-white/10
              "
            />

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
                Crea tu pieza con tu número,
                equipo, colores y estilo
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

              <ProductCard
                key={p.id}
                prod={p}
              />

            ))}

          </div>

        </div>

      </section>

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
            />

            <div className="flex gap-5">

              <a
                href="https://www.instagram.com/strafalaria.mx/"
                target="_blank"
              >
                <img
                  src="/icons/instagram.svg"
                  className="w-8 h-8"
                />
              </a>

              <a
                href="https://www.facebook.com/Strafalaria.mx/"
                target="_blank"
              >
                <img
                  src="/icons/facebook.svg"
                  className="w-8 h-8"
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
          Diseño,Strafalaria México © 2026, Todos los derechos reservados.
        </p>

      </footer>

    </main>
  );
}