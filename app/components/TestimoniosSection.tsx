'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonios = [
  { id: 1, name: "MATEO V.", sport: "FOOTBALL", num: "#87", quote: "Mi cadena es única, como mi historia.", img: "/ochentaysiete.png", avatar: "/avatar1.png" },
  { id: 2, name: "ANDREA M.", sport: "FLAG FOOTBALL", num: "#10", quote: "Personalizar mi número con el color de mi equipo la hizo perfecta.", img: "/five.png", avatar: "/avatar2.png" },
  { id: 3, name: "SATURN BOY.", sport: "TRAP ARTIST", num: "#33", quote: "Calidad premium y un brillo que se nota en cualquier lugar.", img: "/satboy.png", avatar: "/avatar3.png" },
  { id: 4, name: "MARCO T.", sport: "FOOTBALL", num: "#07", quote: "El acabado es impecable, superó mis expectativas.", img: "/Mmex.png", avatar: "/avatar4.png" },
  { id: 5, name: "LUCÍA G.", sport: "FLAG FOOTBALL", num: "#22", quote: "La atención al detalle es impresionante.", img: "/veintydos.png", avatar: "/avatar5.png" },
  { id: 6, name: "FERNANDO S.", sport: "BÁSQUET", num: "#21", quote: "Diseño minimalista con fuerza visual única.", img: "/rav.png", avatar: "/avatar6.png" },
];

export const TestimoniosSection = () => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(testimonios.length / itemsPerPage);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setPage((prev) => (prev + newDirection + totalPages) % totalPages);
  };

  return (
    <section className="bg-black py-20 px-6 text-white w-full overflow-hidden">
      <h2 className="font-antonio text-center text-[42px] md:text-[58px] uppercase tracking-[0.20em] font-black text-white mb-16">
        Lo que dice nuestra comunidad
      </h2>
      
      <div className="relative flex items-center justify-center max-w-6xl mx-auto">
        <button onClick={() => paginate(-1)} className="absolute -left-4 md:-left-12 p-2 border border-neutral-700 rounded-full hover:bg-neutral-800 transition-colors z-10">
          <ChevronLeft />
        </button>
        
        <div className="w-full overflow-hidden relative h-[450px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 })
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonios.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((t) => (
                <div key={t.id} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div><h3 className="font-bold">{t.name}</h3><p className="text-xs text-neutral-400">{t.num} | {t.sport}</p></div>
                  </div>
                  <p className="text-sm text-neutral-300 mb-6 italic flex-grow">"{t.quote}"</p>
                  <img src={t.img} alt="Producto" className="h-48 w-full object-cover rounded-lg" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={() => paginate(1)} className="absolute -right-4 md:-right-12 p-2 border border-neutral-700 rounded-full hover:bg-neutral-800 transition-colors z-10">
          <ChevronRight />
        </button>
      </div>
      
      <div className="flex justify-center gap-3 mt-8">
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
            className={`w-2 h-2 rounded-full ${page === i ? 'bg-yellow-500 w-6' : 'bg-neutral-700'}`} />
        ))}
      </div>
    </section>
  );
};