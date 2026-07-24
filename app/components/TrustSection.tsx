import { ShieldCheck, Sparkles, Trophy, Star } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="px-6 py-12 md:py-16 bg-black select-none">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-white/60 uppercase tracking-[0.25em] text-xs">
            confianza / impacto / resultados
          </p>
          <h2 className="mt-4 font-antonio uppercase tracking-[0.08em] leading-[0.9] text-[40px] md:text-[56px] text-white">
            HECHA A MEDIDA
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            <span className="text-[#D4AF37] font-medium"> Confianza que se gana en la cancha y fuera de ella.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 w-full min-h-[350px] lg:min-h-full relative rounded-2xl overflow-hidden bg-zinc-900">
            <img src="/trust/jugador.png" alt="Strafalaria Premium Asset" className="w-full h-full object-cover object-center absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
            <div className="border border-white/10 bg-white/5 p-5 text-center flex flex-col items-center justify-center rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-2" strokeWidth={1.5} />
              <div className="text-3xl md:text-4xl font-bold text-white font-antonio tracking-wide">300+</div>
              <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/60">piezas entregadas</div>
            </div>
            <div className="border border-white/10 bg-white/5 p-5 text-center flex flex-col items-center justify-center rounded-xl">
              <Sparkles className="w-5 h-5 text-[#D4AF37] mb-2" strokeWidth={1.5} />
              <div className="text-3xl md:text-4xl font-bold text-white font-antonio tracking-wide">100+</div>
              <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/60">diseños personalizados</div>
            </div>
            <div className="border border-white/10 bg-white/5 p-5 text-center flex flex-col items-center justify-center rounded-xl">
              <Trophy className="w-5 h-5 text-[#D4AF37] mb-2" strokeWidth={1.5} />
              <div className="text-3xl md:text-4xl font-bold text-white font-antonio tracking-wide">98%</div>
              <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/60">recomiendan Strafalaria</div>
            </div>
            <div className="border border-white/10 bg-white/5 p-5 text-center flex flex-col items-center justify-center rounded-xl">
              <div className="flex gap-0.5 mb-2">
                {[...Array(4)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />)}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white font-antonio tracking-wide">4.9/5</div>
              <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/60">satisfacción</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}