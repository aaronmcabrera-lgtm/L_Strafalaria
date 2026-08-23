"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import TrustSection from "./components/TrustSection";
import { TestimoniosSection } from "./components/TestimoniosSection";

function ScrollMarquee({ mt = "mt-0" }) {
  const mensajes = [
    { parte1: "Ó APARTA TU NÚMERO ", parte2: "CON TAN SOLO ", parte3: "$300 PESOS", tieneLeyenda: true, esItalica: false },
    { parte1: "PAGA A ", parte2: "MESES SIN INTERESES", parte3: "", tieneLeyenda: false, esItalica: true }
  ];

  return (
    <div className={`w-full bg-[#A1E9E6] overflow-hidden py-2 ${mt}`}>
      <div className="flex whitespace-nowrap animate-marquee">
        {[...mensajes, ...mensajes, ...mensajes].map((item, i) => (
          <span key={i} className={`mx-10 uppercase text-black text-[15px] tracking-wide flex flex-col items-center justify-center shrink-0 ${item.esItalica ? 'italic' : ''}`}>
            <span className="flex gap-1.5">
              <span className="font-light">{item.parte1}</span>
              <span className={item.esItalica ? "font-black" : "font-light"}>{item.parte2}</span>
              <span className="font-black">{item.parte3}</span>
            </span>
            
            {item.tieneLeyenda && (
              <span className="font-bold opacity-80 text-[10px] uppercase mt-0.5">
                APLICA SÓLO EN DIJES DEL SIMULADOR
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   PRODUCT CARD Component
   ========================================================================== */
function ProductCard({
  prod,
}: {
  prod: {
    id: number;
    nombre: string;
    plata: string;
    bano: string;
  };
}) {
  const materiales = [
    {
      key: "BAÑO ORO",
      titulo: "BAÑO DE ORO",
      precio: prod.bano,
      boton: "COTIZA EL TUYO",
      destacado: prod.nombre === "ROSTER",
    },
    {
      key: "PLATA",
      titulo: "PLATA",
      precio: prod.plata,
      boton: "COTIZA EL TUYO",
      destacado:
        prod.nombre !== "ELITE" &&
        prod.nombre !== "ROSTER",
    },
    {
      key: "ORO",
      titulo: "ORO 14KTS",
      precio: "COTIZAR",
      boton: "COTIZA EL TUYO",
      destacado: prod.nombre === "ELITE",
    },
  ];

  const [materialSeleccionado, setMaterialSeleccionado] = useState(
    prod.nombre === "ELITE"
      ? "ORO"
      : prod.nombre === "ROSTER"
        ? "BAÑO ORO"
        : "PLATA"
  );

  const materialActivo =
    materiales.find((m) => m.key === materialSeleccionado) || materiales[1];

  const mensajeWhatsApp =
    materialActivo.key === "ORO"
      ? `Hola Strafalaria, estoy interesado en comprar el Modelo ${prod.nombre} en ORO 14KTS, ¿me puedes dar una cotización personalizada?`
      : `Hola Strafalaria, estoy interesado en comprar el Modelo ${prod.nombre} en material ${materialActivo.titulo}. ¿Cuál es el tiempo de entrega y la forma de pago?`;

  return (
    <div className="bg-neutral-900/40 border border-white/5 rounded-3xl flex flex-col overflow-hidden backdrop-blur-xl">
      <div className="aspect-square p-4 bg-black/20 relative">
        <div
          className="absolute top-4 left-4 z-10 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff003c] via-[#ff00b8] to-[#ff0090] text-white text-[8px] uppercase tracking-[0.18em] font-black italic shadow-[0_0_18px_rgba(255,0,120,0.55)]"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          PERSONALIZABLE
        </div>
        <img
          src={`/disenos/prod-${prod.id}.png`}
          alt={prod.nombre}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="px-4 pb-4 pt-2 flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <h3 className="font-antonio text-[30px] md:text-[34px] uppercase text-center tracking-[0.25em] text-white font-black">
            {prod.nombre}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55 text-center">
            Tu número • Tu equipo • Tu estilo
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {materiales.map((m) => (
            <button
              key={m.key}
              onClick={() => setMaterialSeleccionado(m.key)}
              className={`relative rounded-xl border px-3 h-[82px] flex flex-col justify-center items-center text-center transition ${
                materialSeleccionado === m.key
                  ? "border-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {m.destacado && (
                <div className="absolute -top-2 right-2 bg-[#D4AF37] text-black text-[7px] px-2 py-[3px] rounded-full uppercase tracking-[0.18em] font-black">
                  MÁS VENDIDO
                </div>
              )}
              <div className={`font-antonio uppercase leading-none ${
                  m.key === "ORO" ? "text-[17px] tracking-[0.10em]" : "text-[14px] tracking-[0.12em]"
                } ${materialSeleccionado === m.key ? "text-[#D4AF37]" : "text-white"}`}>
                {m.titulo}
              </div>
              {m.key !== "ORO" && (
                <div className="text-[6px] uppercase tracking-[0.24em] text-white/35 mt-1 leading-none">
                  Desde
                </div>
              )}
              <div className={`font-antonio mt-1 leading-none font-black text-[22px] min-h-[22px] flex items-center ${
                  materialSeleccionado === m.key ? "text-[#D4AF37]" : "text-white"
                }`}>
                {m.precio}
              </div>
            </button>
          ))}
        </div>
        <a
          href={`https://wa.me/5215549614585?text=${encodeURIComponent(mensajeWhatsApp)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined" && (window as any).fbq) {
              (window as any).fbq("track", "Lead", {
                product_name: prod.nombre,
                material: materialActivo.titulo,
              });
            }
          }}
          className="block text-center py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00E676] text-black font-bold text-xs uppercase"
        >
          {materialActivo.boton}
        </a>
      </div>
    </div>
  );
}

/* ==========================================================================
   SIMULADOR Component
   ========================================================================== */
function Simulador() {
  const [remountKey, setRemountKey] = useState(0);

  useEffect(() => {
    const handlePageshow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setRemountKey((prev) => prev + 1);
      }
    };

    window.addEventListener('pageshow', handlePageshow);
    return () => window.removeEventListener('pageshow', handlePageshow);
  }, []);

  return <SimuladorInterno key={remountKey} />;
}

function SimuladorInterno() {
  const [numero, setNumero] = useState("0");
  const [materialSeleccionado, setMaterialSeleccionado] = useState("BAÑO ORO");
  const [cargando, setCargando] = useState(false);

  const materiales = [
    { key: "PLATA", titulo: "PLATA", precio: "$1200", sublabel: "DESDE" },
    { key: "BAÑO ORO", titulo: "BAÑO DE ORO", precio: "$1,600", sublabel: "DESDE" },
    { key: "ORO", titulo: "ORO 14KTS", precio: "$8,700", sublabel: "DESDE" },
  ];

  const imagenPath = materialSeleccionado === "PLATA" 
    ? `/disenos/${numero || "0"}-silver.png` 
    : `/disenos/${numero || "0"}-gold.png`;

  const handleAction = async (esApartado: boolean) => {
    setCargando(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero: numero || "0",
          material: materialSeleccionado,
          precio: esApartado ? 300 : (materialSeleccionado === "PLATA" ? 1200 : 1600),
          esApartado 
        }),
      });
      const data = await response.json();
      if (data.initPoint) {
        window.location.assign(data.initPoint);
      } else { 
        alert("Error de pago"); 
        setCargando(false); 
      }
    } catch (e) { 
      alert("Error en la conexión"); 
      setCargando(false); 
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hola, quiero cotizar el dije #${numero || "0"} en ORO 14KTS.`;
    window.open(`https://wa.me/5215549614585?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
      <h2 className="text-center text-white text-[20px] uppercase font-bold mb-4">SIMULADOR STRAFALARIA</h2>
      
      <input
        type="text"
        value={numero}
        onChange={(e) => setNumero(e.target.value.replace(/\D/g, "").slice(0, 3))}
        className="w-full px-4 py-3 bg-black/70 text-white border border-[#00E676]/60 rounded-xl text-center text-3xl font-black mb-4 placeholder:text-white/40"
        placeholder="0"
      />

      <div className="flex justify-center mb-6 min-h-[224px]">
        <img src={imagenPath} alt="Dije" className="h-56 object-contain" />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        {materiales.map((m) => (
          <button
            key={m.key}
            onClick={() => setMaterialSeleccionado(m.key)}
            className={`flex items-center justify-between rounded-xl border p-3 transition ${
              materialSeleccionado === m.key 
                ? "border-[#D4AF37] bg-[#D4AF37]/5" 
                : "border-white/10 bg-white/[0.01]"
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="text-[13px] font-black text-white uppercase tracking-[0.15em]">{m.titulo}</span>
              <span className="text-[9px] text-white/50 uppercase tracking-widest">{m.sublabel}</span>
            </div>
            <span className="text-[18px] font-black text-white tracking-tight">{m.precio}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {materialSeleccionado === "ORO" ? (
          <button 
            onClick={handleWhatsApp} 
            className="w-full bg-white text-black py-3 rounded-full font-black uppercase text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5 scale-[1.8] object-contain" />
            </div>
            COTIZAR POR WHATSAPP
          </button>
        ) : (
          <>
            <button onClick={() => handleAction(false)} disabled={cargando} className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00E676] text-black py-3 rounded-full font-black uppercase text-sm hover:opacity-90 transition-all disabled:opacity-50">
              {cargando ? "PROCESANDO..." : "PAGA A MSI"}
            </button>
            <button onClick={() => handleAction(true)} disabled={cargando} className="w-full border border-white/20 text-white py-3 rounded-full font-bold uppercase text-sm hover:bg-white/5 transition-all disabled:opacity-50">
              {cargando ? "PROCESANDO..." : "Ó APARTA CON $300"}
            </button>
          </>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/80 font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            Compra Segura SSL
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Protección de Datos
          </span>
        </div>

        {/* Iconos de pagos con tamaño aumentado */}
        <div className="flex items-center justify-center gap-5 pt-1">
          <img src="/icons/visa.svg" className="h-9 w-auto opacity-90 hover:opacity-100 transition-opacity" alt="Visa" />
          <img src="/icons/mastercard.svg" className="h-9 w-auto opacity-90 hover:opacity-100 transition-opacity" alt="Mastercard" />
          <img src="/icons/mercado-pago.svg" className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity" alt="Mercado Pago" />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   HOME PAGE (Main Interface Component)
   ========================================================================== */
export default function Home() {
  useEffect(() => {
    if (window.location.search.length > 0) {
      window.history.replaceState({}, document.title, window.location.origin);
    }
  }, []);

  const productos = [
    { id: 1, nombre: "CREW", plata: "$3,600", bano: "$4,200" },
    { id: 2, nombre: "ICONIC", plata: "$3,600", bano: "$4,300" },
    { id: 3, nombre: "HONOR", plata: "$4,900", bano: "$5,200" },
    { id: 4, nombre: "ROSTER", plata: "$3,200", bano: "$3,500" },
    { id: 5, nombre: "ELITE", plata: "$4,300", bano: "$4,700" },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-8DLPVZSJCL" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-8DLPVZSJCL');`}
      </Script>
      <Script src="https://sdk.mercadopago.com/js/v2" strategy="lazyOnload" />
      
      <ScrollMarquee />

      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 bg-cover bg-center" style={{ backgroundImage: "url('/disenos/fondo-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center w-full max-w-4xl">
          <img src="/disenos/logo-strafalaria-white.svg" className="w-40 mx-auto mt-8 mb-6" alt="Strafalaria Logo" />
          <h1 className="text-[44px] md:text-[80px] uppercase font-bold leading-tight mb-8">CONVIERTE TU NÚMERO EN JOYA</h1>
          <Simulador />
        </div>
      </section>

      <div className="mt-10">
        <ScrollMarquee />
      </div>

      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-antonio text-[42px] md:text-[58px] uppercase tracking-[0.20em] font-black text-white mb-6">MÁS QUE JOYAS</h2>
          <div className="relative mb-12 mx-auto max-w-4xl overflow-hidden rounded-[22px] bg-gradient-to-r from-[#ff003c] via-[#ff00b8] to-[#ff0090] px-6 py-5 shadow-[0_0_45px_rgba(255,0,140,0.45)]">
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative z-10">
              <div className="text-white uppercase text-[22px] md:text-[34px] leading-none tracking-[0.04em] font-black italic" style={{ fontFamily: "Anton, sans-serif" }}>DISEÑOS 100% PERSONALIZABLES</div>
              <p className="mt-1 text-white text-[12px] md:text-[18px] font-bold italic opacity-95">Crea tu pieza con tu número, equipo, colores y estilo</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
            {productos.map((p) => (<ProductCard key={p.id} prod={p} />))}
          </div>
        </div>
      </section>

      <TrustSection />
      <TestimoniosSection />
      
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-neutral-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 mx-auto md:mx-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Transacciones 100% Protegidas</h4>
              <p className="text-xs text-white/60">Pagos cifrados y seguros respaldados por instituciones de primer nivel.</p>
            </div>
          </div>

          {/* Iconos de pagos con tamaño aumentado */}
          <div className="flex items-center justify-center gap-6 shrink-0">
            <img src="/icons/visa.svg" className="h-11 w-auto opacity-90 hover:opacity-100 transition-opacity" alt="Visa" />
            <img src="/icons/mastercard.svg" className="h-11 w-auto opacity-90 hover:opacity-100 transition-opacity" alt="Mastercard" />
            <img src="/icons/mercado-pago.svg" className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity" alt="Mercado Pago" />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-14 px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-6">
            <img src="/disenos/logo-strafalaria-white.svg" className="w-32 opacity-90" alt="Strafalaria Logo Footer" />
            <div className="flex gap-5">
              <a href="https://www.instagram.com/strafalaria.mx/" target="_blank" rel="noopener noreferrer"><img src="/icons/instagram.svg" className="w-8 h-8" alt="Instagram Icon" /></a>
              <a href="https://www.facebook.com/Strafalaria.mx/" target="_blank" rel="noopener noreferrer"><img src="/icons/facebook.svg" className="w-8 h-8" alt="Facebook Icon" /></a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end gap-4">
            <p className="text-white/60 text-[11px] uppercase tracking-[0.18em] text-center md:text-right max-w-md">Regístrate a nuestro newsletter y recibirás antes que nadie nuestras promociones y lanzamientos</p>
            <form action="https://formspree.io/f/xjglwvoa" method="POST" className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input name="email" type="email" placeholder="Tu correo electrónico" className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" />
              <button type="submit" className="px-5 py-3 bg-gradient-to-r from-[#00E5FF] to-[#00E676] text-black rounded-xl font-bold uppercase text-xs">Unirme</button>
            </form>
          </div>
        </div>
        <p className="text-center text-white/35 text-[10px] mt-10">Diseño, Strafalaria México © 2026, Todos los derechos reservados.</p>
      </footer>
      
      <a href={`https://wa.me/5215549614585?text=${encodeURIComponent("¡Hola Strafalaria! Estoy navegando en su landing y me gustaría recibir más información o cotizar una joya personalizada.")}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] w-[72px] h-[72px] rounded-full shadow-lg shadow-green-900/40 hover:shadow-xl hover:shadow-green-900/60 transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden" aria-label="Contactar por WhatsApp">
        <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-[72px] h-[72px] object-contain invert brightness-0 scale-[1.43] select-none pointer-events-none" />
      </a>
    </main>
  );
}