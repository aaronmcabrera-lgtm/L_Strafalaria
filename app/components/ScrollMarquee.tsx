function ScrollMarquee() {
  const mensajes = [
    "ó APARTA TU NÚMERO CON TAN SOLO $300 PESOS",
    "PAGA A MESES SIN  INTERESES"
  ];

  return (
    <div className="w-full bg-[#00E676] overflow-hidden py-3">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repetimos la secuencia para que la animación sea fluida */}
        {[...mensajes, ...mensajes, ...mensajes].map((texto, i) => (
          <span key={i} className="mx-8 font-black uppercase text-black text-sm tracking-widest">
            {texto}
            {/* Solo agregamos la leyenda de abajo si es el mensaje de apartado */}
            {texto.includes("$300") && (
              <span className="block text-[8px] font-normal opacity-70 mt-[-2px]">
                APLICA SOLO EN DIJES DEL SIMULADOR
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}