"use client";

import { useState } from "react";

function Simulador() {
  const [numero, setNumero] = useState("23");

  const imagenPath = `/disenos/${numero}.png`;

  return (
    <section
      id="simulador"
      className="py-24 px-6 flex justify-center"
    >
      <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur rounded-2xl p-6 flex flex-col gap-6 border border-neutral-800 shadow-2xl">

        <div className="text-center">
          <h2 className="text-xl font-bold">Personaliza tu dije</h2>
          <p className="text-white/50 text-sm">
            Escribe tu número y visualiza el diseño
          </p>
        </div>

        {/* INPUT */}
        <input
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Ej: 44"
          className="px-4 py-3 bg-black text-white border border-white/20 rounded text-center text-lg outline-none"
        />

        {/* IMAGEN */}
        <div className="bg-black p-4 rounded-xl border border-white/10 flex justify-center">
          <img
            src={imagenPath}
            alt="diseño"
            className="w-[280px] h-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
          />
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/5215510141024?text=${encodeURIComponent(
            `Hola, quiero este dije con el número ${numero}`
          )}`}
          target="_blank"
          className="bg-green-500 py-3 rounded-xl text-center font-semibold text-lg hover:bg-green-600 transition"
        >
          Cotizar este diseño
        </a>

      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="py-24 text-center px-6 bg-gradient-to-b from-black to-neutral-900">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Tu número, hecho joya
        </h1>

        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Diseña tu dije personalizado y recíbelo en oro o plata.
        </p>

        <a
          href="#simulador"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Diseñar ahora
        </a>
      </section>

      {/* SIMULADOR */}
      <Simulador />

      {/* CTA FINAL */}
      <section className="py-20 text-center px-6 bg-neutral-900">
        <h2 className="text-2xl font-bold mb-4">
          Diseña el tuyo ahora
        </h2>

        <a
          href="#simulador"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
        >
          Empezar
        </a>
      </section>

    </main>
  );
}