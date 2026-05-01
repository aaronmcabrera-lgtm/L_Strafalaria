import Simulador from "../components/Simulador";"use client";

import { useState } from "react";

export default function Simulador() {
  const [numero, setNumero] = useState("23");

  const imagenPath = `/disenos/${numero}.png`;

  return (
    <div className="flex flex-col items-center gap-6">

      <h2 className="text-xl font-semibold">
        Escribe tu número
      </h2>

      {/* INPUT */}
      <input
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Ej: 44"
        className="px-4 py-2 bg-black text-white border border-white/20 rounded text-center"
      />

      {/* IMAGEN */}
      <div className="bg-black p-4 rounded-xl border border-white/10">
        <img
          src={imagenPath}
          alt="diseño"
          className="w-[300px] h-auto object-contain"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
        />
      </div>

      {/* BOTÓN WHATSAPP */}
      <a
        href={`https://wa.me/5215510141024?text=${encodeURIComponent(
          `Hola, quiero este dije con el número ${numero}`
        )}`}
        target="_blank"
        className="bg-green-500 px-6 py-3 rounded font-semibold hover:bg-green-600 transition"
      >
        Cotizar este diseño
      </a>

    </div>
  );
}