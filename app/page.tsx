"use client"; 
import React, { useState } from 'react';
import { MessageCircle, Award, Hammer, Sparkles } from 'lucide-react';

export default function LandingStrafalaria() {
  const [numero, setNumero] = useState("23");
  const [material, setMaterial] = useState("Oro 14k");

  const colorDije = material === "Oro 14k" ? "text-yellow-500" : "text-gray-300";
  const sombraDije = material === "Oro 14k" 
    ? "drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" 
    : "drop-shadow-[0_0_15px_rgba(209,213,219,0.5)]";

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      {/* HERO & SIMULADOR */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 text-center">
        <div className="relative z-10 mb-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent italic">
            STRAFALARIA
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">Joyería de alto impacto para campeones.</p>
        </div>

        <div className="relative z-10 w-full max-w-md bg-zinc-900/90 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Diseña tu dije</h2>
          
          <div className="aspect-square bg-black rounded-2xl mb-6 flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden">
             <div className={`text-9xl font-bold transition-all duration-500 ${colorDije} ${sombraDije}`}>
                {numero || "00"}
             </div>
             <span className="absolute bottom-4 text-xs tracking-widest uppercase opacity-50">{material}</span>
          </div>
          
          <div className="space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-gray-500 font-bold">Número</label>
                <input 
                  type="text" 
                  maxLength={2}
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="bg-black border border-zinc-700 rounded-lg p-3 text-center text-xl focus:border-yellow-500 outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-gray-500 font-bold">Material</label>
                <select 
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="bg-black border border-zinc-700 rounded-lg p-3 text-sm focus:border-yellow-500 outline-none transition appearance-none"
                >
                  <option value="Oro 14k">Oro 14k</option>
                  <option value="Plata">Plata .925</option>
                </select>
              </div>
            </div>

            <a 
              href={`https://wa.me/5215500000000?text=Hola! Quiero cotizar mi dije personalizado numero ${numero} en ${material}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition mt-4"
            >
              <MessageCircle size={20} /> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-24 px-6 bg-zinc-950 text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <Hammer className="text-yellow-500 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4">Artesanía Real</h3>
            <p className="text-gray-400 text-sm">Procesos auténticos de joyería profesional.</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="text-yellow-500 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4">Materiales Premium</h3>
            <p className="text-gray-400 text-sm">Oro sólido de 14k y Plata ley .925.</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="text-yellow-500 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4">Diseño Digital</h3>
            <p className="text-gray-400 text-sm">Visualización técnica de alta fidelidad.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-gray-500 text-sm">
          © 2026 Strafalaria Joyería. Creado por Aaron Cabrera | Motion Designer & Joyero.
        </p>
      </footer>
    </div>
  );
}