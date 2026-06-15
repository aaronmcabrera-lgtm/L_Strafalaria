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
    { tipo: "texto", base: "APARTA TU NÚMERO CON ", destacado: "TAN SOLO $300 PESOS" },
    { tipo: "separador", valor: "○" },
  ];

  const contenidoDuplicado = Array(8).fill(bloques).flat();

  return (
    /* Reducimos py-0 y min-h-[36px] para exprimir al máximo el grosor de la cinta sin tocar la tipografía */
    <div className="w-full bg-[#92D5D6] border-y border-black/10 py-0 overflow-hidden relative select-none z-20 block min-h-[36px] flex items-center">
      
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
        className="flex whitespace-nowrap will-change-transform items-center gap-12 marquee-fallback"
        style={{
          transform: `translateX(-${scrollOffset}px)`,
        }}
      >
        {contenidoDuplicado.map((item, idx) => {
          if (item.tipo === "separador") {
            return (
              <span
                key={idx}
                className="text-black/40 text-[18px] md:text-[22px] font-light shrink-0"
                style={{ fontFamily: "sans-serif" }}
              >
                {item.valor}
              </span>
            );
          }

          return (
            /* El tamaño de la fuente se conserva intacto en [15px] y [17px] */
            <span
              key={idx}
              className="text-[15px] md:text-[17px] tracking-[0.25em] uppercase font-normal shrink-0 text-black"
              style={{ fontFamily: "sans-serif" }}
            >
              {item.base}
              <span className="font-black tracking-[0.22em]">
                {item.destacado}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}