"use client";

import { useState } from "react";
import Image from "next/image";

export default function Simulador() {
  // Número del dije
  const [numero, setNumero] = useState("29");

  // Material seleccionado
  const [material, setMaterial] = useState("Oro");

  // Cambio del input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 3);
    setNumero(val);
  };

  // Materiales disponibles
  const materiales = ["Oro", "Plata", "Baño de oro"];

  // Link dinámico de WhatsApp
  const whatsappLink = `https://wa.me/5215510141024?text=${encodeURIComponent(
    `Hola, quiero cotizar el dije #${numero} en ${material}.`
  )}`;

  return (
    <div className="w-full max-w-md mx-auto bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl">
      
      {/* Encabezado */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">
          Personaliza tu dije
        </p>

        <p className="text-[10px] text-gray-500 italic">
          Escribe tu número y selecciona el material
        </p>
      </div>

      {/* Input número */}
      <div className="mb-6">
        <input
          type="number"
          value={numero}
          onChange={handleChange}
          className="w-full bg-black border border-white/20 rounded-md py-3 text-center text-2xl font-bold text-white focus:outline-none focus:border-white transition-colors"
          placeholder="00"
        />
      </div>

      {/* Etiquetas materiales */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-3">
          Material
        </p>

        <div className="flex gap-2 flex-wrap">
          {materiales.map((item) => (
            <button
              key={item}
              onClick={() => setMaterial(item)}
              className={`px-4 py-2 rounded-full border text-xs uppercase tracking-wider transition-all duration-200
              
              ${
                material === item
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                  : "bg-transparent text-white border-white/20 hover:border-white/50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="relative aspect-square w-full mb-8 bg-[#111] rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
        
        {numero ? (
          <Image
            src={`/disenos/${numero}.png`}
            alt={`Dije personalizado número ${numero}`}
            fill
            className="object-contain p-4 transition-opacity duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/disenos/default.png";
            }}
          />
        ) : (
          <div className="text-gray-600 text-sm italic">
            Ingresa un número
          </div>
        )}
      </div>

      {/* CTA */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-[#00E676] hover:bg-[#00c864] text-black font-black py-4 rounded-md uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_rgba(0,230,118,0.3)]"
      >
        Cotizar en {material}
      </a>
    </div>
  );
}