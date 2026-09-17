// Pega este archivo en: app/components/NuevosProductosCarousel.tsx
// (misma carpeta donde ya están TrustSection.tsx y TestimoniosSection.tsx)

"use client";

import { useState, useEffect, useRef } from "react";

const productos = [
  {
    nombre: "Dije Balón",
    descripcion: "Tu número grabado en una pieza de plata Ley .925",
    imagen: "/productos/balon.png",
  },
  {
    nombre: "Gold Helmet",
    descripcion: "Hazlo en plata Ley .925, baño de oro y esmalte con el color de tu equipo",
    imagen: "/productos/casco.png",
  },
  {
    nombre: "Signet Ring",
    descripcion: "Agrega a tu anillo el número que te da identidad",
    imagen: "/productos/anillo.png",
  },
  {
    nombre: "Número Personalizado",
    descripcion: "Personaliza tu número hecho en plata Ley .925 o bañado en oro",
    imagen: "/productos/numero.png",
  },
];

const INTERVALO_MS = 4000;

export default function NuevosProductosCarousel({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reiniciarTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i === productos.length - 1 ? 0 : i + 1));
    }, INTERVALO_MS);
  };

  useEffect(() => {
    reiniciarTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const anterior = () => {
    setIndex((i) => (i === 0 ? productos.length - 1 : i - 1));
    reiniciarTimer();
  };
  const siguiente = () => {
    setIndex((i) => (i === productos.length - 1 ? 0 : i + 1));
    reiniciarTimer();
  };
  const irA = (i: number) => {
    setIndex(i);
    reiniciarTimer();
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-8">
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-md overflow-hidden">
        {/* Ventana visible: recorta la tira a un solo cuadro */}
        <div className="overflow-hidden">
          {/* Tira: todas las tarjetas una junto a otra, se desliza con transform */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              width: `${productos.length * 100}%`,
              transform: `translateX(-${index * (100 / productos.length)}%)`,
            }}
          >
            {productos.map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{ width: `${100 / productos.length}%` }}
              >
                {/* Contenedor con truco de padding-bottom: anima SOLO la altura,
                    el ancho nunca se toca. object-cover recorta sin deformar. */}
                <div
                  className="relative w-full overflow-hidden transition-[padding-bottom] duration-500 ease-out"
                  style={{ paddingBottom: compact ? "28%" : "100%" }}
                >
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div
                  className="text-center overflow-hidden transition-all duration-500 ease-out bg-black/70"
                  style={{
                    maxHeight: compact ? 0 : 80,
                    opacity: compact ? 0 : 1,
                    paddingTop: compact ? 0 : 16,
                    paddingBottom: compact ? 0 : 16,
                  }}
                >
                  <h3 className="text-white uppercase font-black tracking-[0.1em] text-lg">
                    {p.nombre}
                  </h3>
                  <p className="text-white/50 text-xs mt-1">{p.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={anterior}
          aria-label="Anterior"
          className="absolute left-2 top-[38%] -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-lg"
        >
          ‹
        </button>
        <button
          onClick={siguiente}
          aria-label="Siguiente"
          className="absolute right-2 top-[38%] -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-lg"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {productos.map((_, i) => (
          <button
            key={i}
            onClick={() => irA(i)}
            aria-label={`Ver producto ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-[#D4AF37]" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
