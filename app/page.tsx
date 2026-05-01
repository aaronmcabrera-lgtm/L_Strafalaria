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
        <Image image={img} x={-10} y={-20} width={350} height={350} />
      )}

      {/* sombra */}
      <Text
        text={text}
        x={20}
        y={120}
        width={300}
        align="center"
        fontSize={120}
        fontFamily="Jersey M54"
        fill="black"
        opacity={0.5}
        fontStyle="bold"
      />

      {/* brillo */}
      <Text
        text={text}
        x={22}
        y={120}
        width={300}
        align="center"
        fontSize={120}
        fontFamily="Jersey M54"
        fill="white"
        opacity={0.25}
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
  <main 
  style={{ 
    backgroundImage: "url('/fondo.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }} 
  className="min-h-screen flex items-center justify-center px-4"
>

      <div className="w-full max-w-md bg-green/40 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] p-6 flex flex-col gap-6 border border-white/10">

        <div className="text-center">
          <h1 className="text-2xl font-bold">Diseña tu dije</h1>
          <p className="text-xs opacity-60">
            Personalizado en oro o plata
          </p>
        </div>

        <div className="bg-gradient-to-b from-neutral-900 to-black rounded-2xl flex justify-center p-4 border border-white/5">
          <Stage width={320} height={320} ref={stageRef}>
            <Layer>
              <Pendant text={text} metal={metal} />
            </Layer>
          </Stage>
        </div>

        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-black border border-white/10 text-white outline-none"
          />

          <select
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
            className="px-4 py-2 rounded-lg bg-black border border-white/10 text-white"
          >
            <option value="gold">Oro</option>
            <option value="silver">Plata</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">

          <button
            onClick={() => {
              const uri = stageRef.current.toDataURL();
              const link = document.createElement("a");
              link.download = "mi-dije.png";
              link.href = uri;
              link.click();
            }}
            className="bg-white text-amber-500 py-2.5 rounded-lg font-semibold"
          >
            Descargar diseño
          </button>

          <a
            href={`https://wa.me/5215510141024?text=${encodeURIComponent(
              `Hola, quiero este dije con el texto "${text}" en ${metal}`
            )}`}
            target="_blank"
            className="bg-green-500 py-2.5 rounded-lg text-center font-bold"
          >
            Cotizar por WhatsApp
          </a>

        </div>

      </div>

    </main>
  );
}