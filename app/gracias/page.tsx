import React from 'react';
import Link from 'next/link';

export default function GraciasPage() {
  // CONFIGURACIÓN DE TU WHATSAPP
  // IMPORTANTE: Coloca tu número completo sin "+" ni espacios. Ej: "525512345678"
  const whatsappNumber = "525549614585"; 
  
  const whatsappMessage = encodeURIComponent(
    "¡Hola Strafalaria! Acabo de apartar mi dije personalizado en el simulador. Quiero coordinar los detalles de la entrega."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col justify-center items-center px-4 py-12 selection:bg-amber-500/30 selection:text-amber-200">
      <div className="max-w-md w-full text-center space-y-8 bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
        
        {/* Ícono de Éxito Premium */}
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-gradient-to-tr from-amber-600 to-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <svg 
              className="h-8 w-8 text-black" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Encabezado */}
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-wide uppercase font-serif">
            Apartado Confirmado
          </h1>
          <p className="text-sm text-zinc-400 font-light">
            Tu diseño personalizado ya está en la fila del taller.
          </p>
        </div>

        <hr className="border-zinc-800/80 my-2" />

        {/* Resumen Financiero y de Proceso */}
        <div className="space-y-4 text-left bg-black/30 p-5 rounded-xl border border-zinc-900">
          <h2 className="text-xs uppercase tracking-widest text-amber-500 font-medium">
            Resumen de tu orden
          </h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Anticipo recibido:</span>
              <span className="font-mono text-zinc-200">$300.00 MXN</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-zinc-800/50 pt-2 mt-2">
              <span className="text-zinc-300 font-medium">Saldo restante:</span>
              <span className="text-lg font-mono text-amber-400 font-semibold">Liquida contra entrega</span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 font-light leading-relaxed pt-2 border-t border-zinc-800/50">
            * El anticipo de $300 MXN cubre el inicio de la producción de tu pieza personalizada. El monto restante se acordará y liquidará en el momento de la entrega física.
          </p>
        </div>

        {/* Botón de Acción Principal (WhatsApp) */}
        <div className="space-y-4 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg tracking-wide uppercase text-xs cursor-pointer select-none"
          >
            {/* Ícono de WhatsApp */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.966 0c3.178.001 6.165 1.24 8.413 3.494 2.25 2.253 3.487 5.244 3.484 8.423-.003 6.551-5.339 11.899-11.907 11.899-2.001-.001-3.96-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.473 1.451 5.38 1.452 5.519 0 10.008-4.486 10.01-10.003.002-2.673-1.04-5.184-2.936-7.082C17.15 1.623 14.645.58 11.97.58 6.448.58 1.96 5.066 1.957 10.584c-.001 1.916.499 3.787 1.449 5.391L2.32 21.27l5.328-1.397z" />
            </svg>
            Coordinar Entrega por WhatsApp
          </a>

          <Link 
            href="/"
            className="block text-xs text-zinc-500 hover:text-zinc-300 transition-colors tracking-wide underline underline-offset-4 cursor-pointer"
          >
            Volver al inicio
          </Link>
        </div>

      </div>
    </div>
  );
}
