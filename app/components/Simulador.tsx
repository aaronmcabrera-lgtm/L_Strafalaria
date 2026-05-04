"use client";

import { useState } from "react";
import Image from "next/image";

export default function Simulador() {
  // Estado para capturar el número del dije
  const [numero, setNumero] = useState("29");

  // Función para manejar el cambio en el input (limitado a 2 o 3 caracteres)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 3); // Ajusta a 3 si manejas números altos
    setNumero(val);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl">
      {/* Etiqueta de instrucción */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Personaliza tu dije</p>
        <p className="text-[10px] text-gray-500 italic">Escribe tu número y visualiza el diseño</p>
      </div>

      {/* Input de Número */}
      <div className="mb-8">
        <input
          type="number"
          value={numero}
          onChange={handleChange}
          className="w-full bg-black border border-white/20 rounded-md py-3 text-center text-2xl font-bold text-white focus:outline-none focus:border-white transition-colors"
          placeholder="00"
        />
      </div>

      {/* Área de Previsualización de la Joya */}
      <div className="relative aspect-square w-full mb-8 bg-[#111] rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
        {/* Aquí la lógica dinámica para cargar la imagen según el número */}
        {numero ? (
          <Image
            src={`/disenos/${numero}.png`} // Busca la imagen que subiste (ej: 29.png)
            alt={`Dije personalizado número ${numero}`}
            fill
            className="object-contain p-4 transition-opacity duration-300"
            onError={(e) => {
              // Imagen por defecto si el número no existe aún en tu carpeta
              const target = e.target as HTMLImageElement;
              target.src = "/disenos/default.png"; 
            }}
          />
        ) : (
          <div className="text-gray-600 text-sm italic">Ingresa un número</div>
        )}
      </div>

      {/* Botón de Acción Principal */}
      <button 
        onClick={() => console.log(`Cotizando número: ${numero}`)}
        className="w-full bg-[#00E676] hover:bg-[#00c864] text-black font-black py-4 rounded-md uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_rgba(0,230,118,0.3)]"
      >
        Cotizar este diseño
      </button>
    </div>
  );
}