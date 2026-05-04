"use client";

import { useState } from "react";

// --- COMPONENTE SIMULADOR ---
function Simulador() {
  const [numero, setNumero] = useState("29");
  const imagenPath = `/disenos/${numero}.png`;

  return (
    <div id="seccion-simulador" className="w-full max-w-md bg-black/40 backdrop-blur-xl rounded-2xl p-8 flex flex-col gap-6 border border-white/10 shadow-2xl mx-auto relative z-10">
      <div className="text-center">
        <h2 className="font-antonio text-xl font-bold uppercase tracking-widest text-white">Personaliza tu dije</h2>
        <p className="font-inter text-white/40 text-[10px] uppercase tracking-widest mt-1">Escribe tu número y visualiza el diseño</p>
      </div>

      <input
        type="text"
        value={numero}
        onChange={(e) => setNumero(e.target.value.slice(0, 3))}
        className="font-antonio px-4 py-4 bg-black/60 text-white border border-white/10 rounded-lg text-center text-3xl font-bold outline-none focus:border-[#00E676] transition-colors"
      />

      <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex justify-center min-h-[350px] items-center relative overflow-hidden">
        <img
          src={imagenPath}
          alt="Dije personalizado Strafalaria"
          className="w-[300px] h-auto object-contain z-10 transition-transform duration-500 hover:scale-105"
          onError={(e) => { e.currentTarget.src = "/disenos/default.png"; }}
        />
      </div>

      <a
        href={`https://wa.me/5215510141024?text=${encodeURIComponent(`Hola Strafalaria, quiero cotizar mi dije con el número: ${numero}`)}`}
        target="_blank"
        className="font-antonio bg-gradient-to-r from-[#00E5FF] to-[#00E676] py-4 rounded-xl text-center font-black text-black uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,230,118,0.4)]"
      >
        Cotizar este diseño
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-black text-white font-inter selection:bg-[#00E676] selection:text-black">
      
      {/* SECCIÓN HERO */}
      <section 
        className="relative pt-16 pb-10 md:py-28 text-center px-6 bg-cover bg-center bg-no-repeat min-h-[90vh] flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/disenos/fondo-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl w-full">
          <img src="/disenos/logo-strafalaria-white.svg" alt="Strafalaria" className="mx-auto mb-8 w-40 md:w-56" />
          
          <p className="font-inter text-gray-300 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6 opacity-80 px-4">
            Convierte el número de tu jersey en un dije personalizado de oro o plata.
          </p>

          <h1 className="font-antonio text-4xl md:text-[80px] font-bold mb-10 leading-[1.1] md:leading-[0.85] uppercase tracking-tighter text-white max-w-[280px] md:max-w-none mx-auto">
            CONVIERTE <br className="md:hidden" /> 
            TU NÚMERO <br className="md:hidden" /> 
            EN JOYA
          </h1>
          
          <Simulador />
        </div>
      </section>

      {/* SECCIÓN GALERÍA */}
      <section className="bg-black py-12 md:py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-antonio text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tighter italic text-white">
            CREAMOS MUCHO MÁS
          </h2>
          <p className="font-inter text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-12 max-w-2xl mx-auto">
            Contáctanos y diseñaremos juntos una joya que llevarás siempre contigo, te representará y más que un simple logo, será parte de tú identidad.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: 1, nombre: "TEAM", tags: ["14K", "P.925", "Zirconias"] },
              { id: 2, nombre: "BLOOD", tags: ["14K", "P.925", "Esmalte"] },
              { id: 3, nombre: "IDENT", tags: ["14K", "P.925", "Esmalte"] },
              { id: 4, nombre: "WINNER", tags: ["14K", "Zirconias", "Esmalte"] },
              { id: 5, nombre: "LUX", tags: ["14K", "P.925", "Zirconias"] },
            ].map((prod) => (
              <div key={prod.id} className="bg-neutral-900/40 border border-white/5 rounded-lg flex flex-col group overflow-hidden">
                <div className="aspect-square relative p-4 pb-2 bg-black/10">
                  <img src={`/disenos/prod-${prod.id}.png`} alt={prod.nombre} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-4 pt-2 text-center flex flex-col flex-grow">
                  <h3 className="font-antonio text-2xl font-bold uppercase italic tracking-widest mb-1 leading-none">
                    {prod.nombre}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-1 mb-4 mt-2">
                    {prod.tags.map((tag) => (
                      <span key={tag} className="text-[7px] font-bold border border-white/20 px-2 py-0.5 rounded-full text-white/60 uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <a 
                      href={`https://wa.me/5215510141024?text=${encodeURIComponent(`Hola Strafalaria, me interesa cotizar el modelo: ${prod.nombre}`)}`}
                      target="_blank"
                      className="block w-full py-3.5 bg-gradient-to-r from-[#00E5FF] to-[#00E676] text-black font-black uppercase text-[10px] tracking-widest rounded-sm hover:brightness-110 transition-all italic text-center"
                    >
                      COTIZA EL TUYO
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 md:py-24 px-6 border-t border-white/10 text-center">
        <h2 className="font-antonio text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter text-white leading-none">
          DISEÑA Y DESCARGA EL TUYO AHORA
        </h2>
        
        <a
          href="#seccion-simulador"
          className="font-antonio bg-[#f3a473] text-black px-14 py-4 rounded-xl font-bold text-3xl uppercase tracking-tighter hover:bg-[#ffb68c] transition-all inline-block mb-8 shadow-lg"
        >
          COMIENZA YA
        </a>

        <p className="font-inter text-gray-400 text-[11px] md:text-xs uppercase tracking-widest mb-16 max-w-md mx-auto leading-relaxed px-4">
          Descarga y envía tu diseño, obtendrás <br/> 
          <span className="text-[#00E676] font-extrabold text-sm">10% de descuento</span> en tu primera compra.
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/5 items-center">
          <div className="flex flex-col items-center md:items-start gap-6">
            <img src="/disenos/logo-strafalaria-white.svg" alt="Strafalaria" className="h-10 opacity-60" />
            <div className="flex gap-4 items-center">
              <span className="font-inter text-[10px] text-gray-500 uppercase tracking-widest">Síguenos:</span>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors">
                    <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="font-inter text-[9px] text-gray-500 uppercase tracking-widest text-center md:text-right leading-relaxed">
              Subscríbete a nuestro newsletter para recibir promociones y descuentos.
            </p>
            
            <form 
              action="https://formspree.io/f/xjglwvoa" 
              method="POST"
              className="flex w-full max-w-sm border border-white/10 rounded-sm overflow-hidden"
            >
              <input 
                type="email" 
                name="email"
                required
                className="bg-white/10 flex-grow px-4 py-3 text-[10px] outline-none font-inter uppercase tracking-widest text-white placeholder-gray-600" 
                placeholder="EMAIL" 
              />
              <button 
                type="submit"
                className="bg-[#f3a473] text-black font-bold uppercase text-[10px] px-6 py-3 tracking-widest hover:bg-[#ffb68c] transition-colors"
              >
                REGÍSTRATE
              </button>
            </form>
          </div>
        </div>

        <p className="mt-16 font-inter text-[8px] text-gray-600 tracking-[0.6em] uppercase font-bold italic">
          @ 2026 Strafalaria Design. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}