"use client";

import { useEffect, useState } from "react";

export default function ScrollMarquee() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollOffset(window.scrollY * 0.18);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bloques = [
    { 
      tipo: "texto", 
      base: "APARTA TU NÚMERO CON ", 
      destacado: "TAN SOLO $300 PESOS",
      subtexto: "APLICA SOLO EN DIJES DEL SIMULADOR" 
    },
    { tipo: "separador", valor: "○" },
  ];

  const contenidoDuplicado = Array(8).fill(bloques).flat();

  return (
    <div className="w-full bg-[#92D5D6] border-y border-black/10 py-1 overflow-hidden relative select-none z-20 block min-h-[42px] flex items-center">
      
      <style jsx>{`
        @keyframes marqueeContinuous {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .marquee-fallback {
          animation: marqueeContinuous 20s linear infinite;
        }
      `}</style>

      {/* Contenedor de la marquesina */}
      <div 
        className="flex whitespace-nowrap will-change-transform items-center gap-12 marquee-fallback h-full"
        style={{
          transform: `translateX(-${scrollOffset}px)`,
        }}
      >
        {contenidoDuplicado.map((item, idx) => {
          if (item.tipo === "separador") {
            return (
              <span
                key={idx}
                className="text-black/40 text-[20px] md:text-[24px] font-light shrink-0 flex items-center justify-center leading-none"
                style={{ fontFamily: "sans-serif" }}
              >
                {item.valor}
              </span>
            );
          }

          return (
            <div key={idx} className="flex flex-col items-center justify-center shrink-0 text-black text-center justify-items-center">
              {/* Frase Principal Grande (Interletrado cerrado intacto) */}
              <span
                className="text-[15px] md:text-[17px] tracking-normal uppercase font-normal leading-none"
                style={{ fontFamily: "sans-serif" }}
              >
                {item.base}
                <span className="font-black">
                  {item.destacado}
                </span>
              </span>

              {/* Frase Secundaria Pequeña - tracking-[0.3em] separa el interletrado elegantemente */}
              <span 
                className="text-[9px] md:text-[10px] tracking-[0.3em] font-bold opacity-85 uppercase mt-0 leading-none"
                style={{ fontFamily: "sans-serif" }}
              >
                {item.subtexto}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}