"use client";

import { useState, useRef } from "react";
import { Stage, Layer, Text, Image } from "react-konva";
import useImage from "use-image";

function Pendant({ text, metal }: { text: string; metal: string }) {
  const [img] = useImage(
    metal === "gold" ? "/gold.png" : "/silver.png"
  );

  return (
    <>
      {img && (
        <Image image={img} x={50} y={50} width={300} height={300} />
      )}

      {/* sombra */}
      <Text
        text={text}
        x={50}
        y={178}
        width={300}
        align="center"
        fontSize={90}
        fill="black"
        opacity={0.5}
        fontStyle="bold"
      />

      {/* brillo */}
      <Text
        text={text}
        x={50}
        y={168}
        width={300}
        align="center"
        fontSize={90}
        fill="white"
        opacity={0.15}
        fontStyle="bold"
      />
    </>
  );
}

export default function Home() {
  const [text, setText] = useState("23");
  const [metal, setMetal] = useState("gold");
  const stageRef = useRef<any>(null);

  return (
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="py-20 text-center px-6 bg-gradient-to-b from-black to-neutral-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Convierte tu número en un dije
        </h1>

        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Diseña tu pieza personalizada en segundos y cotiza directo por WhatsApp.
        </p>

        <a
          href="#simulador"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Diseñar ahora
        </a>
      </section>

      {/* SIMULADOR */}
      <section id="simulador" className="py-20 px-6 flex justify-center">
        <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur rounded-2xl p-6 flex flex-col gap-6 border border-neutral-800 shadow-2xl">

          <div className="text-center">
            <h2 className="text-xl font-bold">Diseña tu dije</h2>
            <p className="text-xs text-white/50">Vista previa en tiempo real</p>
          </div>

          {/* Canvas */}
          <div className="bg-black rounded-xl flex justify-center p-4 shadow-inner">
            <Stage width={320} height={320} ref={stageRef}>
              <Layer>
                <Pendant text={text} metal={metal} />
              </Layer>
            </Stage>
          </div>

          {/* Inputs */}
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tu número"
              className="flex-1 px-3 py-2 rounded bg-black border border-white/10 text-white outline-none"
            />

            <select
              value={metal}
              onChange={(e) => setMetal(e.target.value)}
              className="px-3 py-2 rounded bg-black border border-white/10 text-white"
            >
              <option value="gold">Oro</option>
              <option value="silver">Plata</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-3">

            <button
              onClick={() => {
                const uri = stageRef.current.toDataURL();
                const link = document.createElement("a");
                link.download = "mi-dije.png";
                link.href = uri;
                link.click();
              }}
              className="bg-white text-black py-2 rounded font-semibold hover:opacity-90 transition"
            >
              Descargar diseño
            </button>

            <a
              href={`https://wa.me/5215510141024?text=${encodeURIComponent(
                `Hola, quiero cotizar este dije con el número "${text}" en ${metal}`
              )}`}
              target="_blank"
              className="bg-green-500 py-2 rounded text-center font-semibold hover:bg-green-600 transition"
            >
              Cotizar por WhatsApp
            </a>

          </div>

        </div>
      </section>

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