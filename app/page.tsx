
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
      boton: "COMPRAR AHORA",
      destacado: prod.nombre === "ROSTER",
    },
    {
      key: "PLATA",
      titulo: "PLATA",
      precio: prod.plata,
      boton: "COMPRAR AHORA",
      destacado: prod.nombre !== "ELITE" && prod.nombre !== "ROSTER",
    },
    {
      key: "ORO",
      titulo: "ORO DE 14KTS",
      precio: "COTIZAR",
      boton: "COTIZAR",
      destacado: prod.nombre === "ELITE",
    },
  ];

  const [materialSeleccionado, setMaterialSeleccionado] = useState(
    prod.nombre === "ELITE"
      ? "ORO"
      : prod.nombre === "ROSTER"
      ? "BAÑO ORO"
      : "PLATA"
  );

  const materialActivo =
    materiales.find((m) => m.key === materialSeleccionado) ||
    materiales[1];

  const mensajeWhatsApp =
    materialActivo.key === "ORO"
      ? `Hola Strafalaria, quiero cotizar el modelo ${prod.nombre} en ORO DE 14KTS.

Vengo desde la landing de Strafalaria.`
      : `Hola, estoy interesado en el modelo ${prod.nombre}.

Material: ${materialActivo.titulo}`;

  return (
    <div className="bg-neutral-900/40 border border-white/5 rounded-3xl flex flex-col overflow-hidden backdrop-blur-xl">

      {/* IMAGE */}
      <div className="aspect-square p-4 bg-black/20">
        <img
          src={`/disenos/prod-${prod.id}.png`}
          alt={prod.nombre}
          className="w-full h-full object-contain hover:scale-105 transition"
        />
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4 pt-2 flex flex-col gap-4">

        <h3 className="font-antonio text-[22px] uppercase text-center text-white tracking-[0.2em]">
          {prod.nombre}
        </h3>

        {/* MATERIALS */}
        <div className="flex flex-col gap-2">

          {materiales.map((m) => (
            <button
              key={m.key}
              onClick={() => setMaterialSeleccionado(m.key)}
              className={`rounded-xl border px-3 py-3 text-center transition ${
                materialSeleccionado === m.key
                  ? "border-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="text-[12px] uppercase text-white">
                {m.titulo}
              </div>

              <div className="text-white mt-1">{m.precio}</div>
            </button>
          ))}

        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/5215549614585?text=${encodeURIComponent(
            mensajeWhatsApp
          )}`}
          target="_blank"
          className="block text-center py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00E676] text-black font-bold text-xs uppercase"
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
  const [materialSeleccionado, setMaterialSeleccionado] = useState("PLATA");

  const materiales = [
    { key: "BAÑO ORO", titulo: "BAÑO DE ORO", precio: "$1,200", boton: "COMPRAR" },
    { key: "PLATA", titulo: "PLATA", precio: "$990", boton: "COMPRAR" },
    { key: "ORO", titulo: "ORO 14KTS", precio: "$7,700", boton: "COTIZAR" },
  ];

  const materialActivo =
    materiales.find((m) => m.key === materialSeleccionado) || materiales[1];

  const imagenPath =
    numero.trim() === ""
      ? "/disenos/TU-NUMERO.png"
      : materialSeleccionado === "PLATA"
      ? `/disenos/${numero}-silver.png`
      : `/disenos/${numero}-gold.png`;

  return (
    <div className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl rounded-3xl p-7 border border-white/10">

      <h2 className="text-center text-white text-[26px] uppercase font-bold mb-4">
        PERSONALIZA TU DIJE
      </h2>

      <input
        value={numero}
        onChange={(e) => setNumero(e.target.value.slice(0, 3))}
        placeholder="ESCRIBE AQUÍ TU NÚMERO"
        className="w-full px-4 py-4 text-center text-2xl bg-black/70 border border-[#00E676] rounded-2xl text-white"
      />

      <div className="mt-4 bg-black/20 p-4 rounded-2xl flex justify-center">
        <img
          src={imagenPath}
          alt="preview"
          className="w-[260px]"
          onError={(e) => (e.currentTarget.src = "/disenos/default.png")}
        />
      </div>

    </div>
  );
}

/* =========================
   HOME
========================= */
export default function Home() {
  const productos = [
    { id: 1, nombre: "CREW", plata: "$2,400", bano: "$2,700" },
    { id: 2, nombre: "ICONIC", plata: "$2,400", bano: "$2,700" },
    { id: 3, nombre: "HONOR", plata: "$2,400", bano: "$2,700" },
    { id: 4, nombre: "ROSTER", plata: "$2,400", bano: "$2,700" },
    { id: 5, nombre: "ELITE", plata: "$2,800", bano: "$3,200" },
  ];

  return (
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/disenos/fondo-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center">

          <img
            src="/disenos/logo-strafalaria-white.svg"
            className="w-40 mx-auto mb-6"
          />

          <h1 className="text-[44px] md:text-[80px] uppercase font-bold leading-tight">
            CONVIERTE TU NÚMERO EN JOYA
          </h1>

          <div className="mt-10">
            <Simulador />
          </div>

        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-4xl uppercase italic mb-10">
            MÁS QUE JOYAS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
            {productos.map((p) => (
              <ProductCard key={p.id} prod={p} />
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER FINAL */}
      <footer className="border-t border-white/5 py-14 px-6 bg-black">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">

          {/* LEFT */}
          <div className="flex flex-col items-center md:items-start gap-6">

            <img
              src="/disenos/logo-strafalaria-white.svg"
              className="w-32 opacity-90"
            />

            <div className="flex gap-5">

              {/* IG */}
              <a href="https://instagram.com" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M7 2C4 2 2 4 2 7v10c0 3 2 5 5 5h10c3 0 5-2 5-5V7c0-3-2-5-5-5H7zm10 2a3 3 0 110 6 3 3 0 010-6zM12 7a5 5 0 110 10 5 5 0 010-10z"/>
                </svg>
              </a>

              {/* FB */}
              <a href="https://facebook.com" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M22 12a10 10 0 10-12 9v-7h-2v-2h2V9c0-2 1-3 3-3h2v2h-2c-1 0-1 0-1 1v2h3l-1 2h-2v7a10 10 0 009-9z"/>
                </svg>
              </a>

            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right gap-4">

            <p className="text-white/60 text-[11px] uppercase tracking-[0.18em] max-w-md">
              Regístrate a nuestro newsletter y recibirás antes que nadie nuestras promociones y lanzamientos
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
                alert(email);
                e.currentTarget.reset();
              }}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="email"
                required
                placeholder="Tu correo"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              />

              <button className="px-5 py-3 bg-gradient-to-r from-[#00E5FF] to-[#00E676] text-black rounded-xl">
                Unirme
              </button>
            </form>

          </div>

        </div>

        <p className="text-center text-white/35 text-[10px] mt-10">
          Strafalaria © 2026
        </p>

      </footer>

    </main>
  );
}
