'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonios = [
  { id: 1, name: "MATEO V.", sport: "FOOTBALL", num: "#87", quote: "Mi cadena es única, como mi historia. El nivel de detalle es increíble.", img: "/ochentaysiete.png", avatar: "/avatar1.png" },
  { id: 2, name: "ANDREA M.", sport: "FLAG FOOTBALL", num: "#10", quote: "Personalizar mi número con el color de mi equipo la hizo perfecta.", img: "/five.png", avatar: "/avatar2.png" },
  { id: 3, name: "SATURN BOY.", sport: "TRAP ARTIST", num: "#33", quote: "Calidad premium y un brillo que se nota en cualquier lugar.", img: "/satboy.png", avatar: "/avatar3.png" },
  { id: 4, name: "MARCO T.", sport: "FOOTBALL", num: "#07", quote: "El acabado es impecable, superó mis expectativas de diseño.", img: "/Mmex.png", avatar: "/avatar4.png" },
  { id: 5, name: "LUCÍA G.", sport: "FLAG FOOTBALL", num: "#22", quote: "La atención al detalle en la pieza final es impresionante. Totalmente recomendada.", img: "/veintydos.png", avatar: "/avatar5.png" },
  { id: 6, name: "FERNANDO S.", sport: "BÁSQUET", num: "#21", quote: "Diseño minimalista con una fuerza visual única. Estoy muy satisfecho.", img: "/rav.png", avatar: "/avatar6.png" },
];

export const TestimoniosSection = () => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setPage((prev) => (newDirection === 1 ? (prev === 0 ? 1 : 0) : (prev === 1 ? 0 : 1)));
  };

  return (
    <section className="bg-black py-20 px-6 text-white w-full overflow-hidden">
      <h2 className="font-antonio text-center text-[42px] md:text-[58px] uppercase tracking-[0.20em] font-black text-white mb-16">
        Lo que dicen nuestra comunidad
      </h2>
      
      <div className="relative flex items-center justify-center max-w-6xl mx-auto">
        <button 
          onClick={() => paginate(-1)} 
          className="absolute -left-4 md:-left-12 p-2 border border-neutral-700 rounded-full hover:bg-neutral-800 transition-colors z-10"
        >
          <ChevronLeft />
        </button>
        
        <div className="w-full overflow-hidden relative h-[450px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir: number) => ({ x: dir < 0 ? 1000 : -1000, opacity: 0 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonios.slice(page * 3, (page + 1) * 3).map((t) => (
                <div key={t.id} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 flex flex-col h-full hover:border-neutral-600 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className="w-12 h-12 rounded-full object-cover border border-neutral-700"
                    />
                    <div>
                      <h3 className="font-bold">{t.name}</h3>
                      <p className="text-xs text-neutral-400">{t.num} | {t.sport}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm text-neutral-300 mb-6 italic flex-grow">"{t.quote}"</p>
                  
                  <div className="h-48 w-full rounded-lg overflow-hidden border border-neutral-700 relative">
                    <img 
                      src={t.img} 
                      alt={`Producto de ${t.name}`} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          onClick={() => paginate(1)} 
          className="absolute -right-4 md:-right-12 p-2 border border-neutral-700 rounded-full hover:bg-neutral-800 transition-colors z-10"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {[0, 1].map((i) => (
          <button 
            key={i} 
            onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${page === i ? 'bg-yellow-500 w-6' : 'bg-neutral-700'}`} 
          />
        ))}
      </div>
    </section>
  );
};