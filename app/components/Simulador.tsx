"use client"; // Siempre debe ser la primera línea

import { useState } from "react";

// Definimos el componente directamente
export default function Simulador() {
  // Aquí puedes agregar tu lógica de estado
  const [valor, setValor] = useState(0);

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold">Simulador</h2>
      <p>Contenido del simulador aquí.</p>
      {/* Ejemplo de uso de estado */}
      <button 
        onClick={() => setValor(valor + 1)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Contador: {valor}
      </button>
    </div>
  );
}
