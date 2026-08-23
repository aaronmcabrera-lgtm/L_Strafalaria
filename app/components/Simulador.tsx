"use client";

import { useState, useEffect } from "react";

export const Simulador = () => {
  // FUERZA DE HIDRATACIÓN
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const [numero, setNumero] = useState("29");
  const [material, setMaterial] = useState("Baño de oro");

  if (!isMounted) return null; // Espera a que el navegador esté listo

  const infoMateriales: Record<string, { precio: string; precioNumerico: number }> = {
    Plata: { precio: "$1200", precioNumerico: 1200 },
    "Baño de oro": { precio: "$1,600", precioNumerico: 1600 },
    Oro: { precio: "Cotizar", precioNumerico: 0 },
  };

  const getLink = (tipoCompra: 'apartado' | 'completo') => {
    const links: Record<string, Record<string, string>> = {
      Plata: {
        completo: "https://mpago.la/26u6huo",
        apartado: "https://mpago.la/1RdGaU9"
      },
      "Baño de oro": {
        completo: "https://mpago.la/2nSRmFH",
        apartado: "https://mpago.la/2jscpgU"
      }
    };
    return links[material]?.[tipoCompra] || "#";
  };

  return (
    <div className="w-full max-w-md mx-auto bg-neutral-900/40 p-6 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
      <h2 className="text-center text-white/50 text-[10px] uppercase tracking-[0.25em] mb-6 font-bold">
        Configura tu pieza Strafalaria
      </h2>

      <input
        type="text"
        value={numero}
        onChange={(e) => setNumero(e.target.value.replace(/\D/g, "").slice(0, 3))}
        className="w-full bg-black border border-white/10 rounded-xl py-4 text-center text-4xl font-black text-white mb-6 focus:border-[#D4AF37] outline-none transition-all placeholder:text-white/10"
        placeholder="00"
      />

      <div className="flex flex-col gap-2 mb-8">
        {Object.entries(infoMateriales).map(([nombre, data]) => (
          <button
            key={nombre}
            onClick={() => setMaterial(nombre)}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
              material === nombre ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/5 bg-white/5 hover:bg-white/10"
            }`}
          >
            <span className={`font-bold uppercase text-sm ${material === nombre ? "text-[#D4AF37]" : "text-white"}`}>
              {nombre}
            </span>
            <span className={`font-black text-lg ${material === nombre ? "text-white" : "text-white/40"}`}>
              {data.precio}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {material === "Oro" ? (
          <a 
            href={`https://wa.me/5215510141024?text=${encodeURIComponent(`Hola, quiero cotizar el dije #${numero} en ${material}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-neutral-200 transition-all"
          >
            Cotizar por WhatsApp
          </a>
        ) : (
          <>
            <a 
              href={getLink('completo')}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#00E676] text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg hover:scale-[1.02] transition-all"
            >
              Comprar con 12 MSI
            </a>
            <a 
              href={getLink('apartado')}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border border-white/20 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all"
            >
              Apartar con $300
            </a>
          </>
        )}
      </div>
    </div>
  );
};