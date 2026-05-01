"use client";

import { useState } from 'react';

export default function Home() {
  // Estados para capturar la elección del usuario
  const [numero, setNumero] = useState("");
  const [metal, setMetal] = useState("oro"); // Valor inicial 'oro'
  const [imagenResultado, setImagenResultado] = useState("/favicon.ico"); // Imagen por defecto
  const [error, setError] = useState(false);

  const simularDiseño = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validamos que el número esté entre 0 y 99
    const numInt = parseInt(numero);
    if (isNaN(numInt) || numInt < 0 || numInt > 99) {
      setError(true);
      return;
    }

    setError(false);
    // Construimos la ruta: /oro-24.png o /plata-24.png
    // Recuerda que estos archivos DEBEN estar en la carpeta 'public'
    const rutaImagen = `/${metal}-${numero}.png`;
    setImagenResultado(rutaImagen);
  };

  return (
    <main style={{
      backgroundImage: "url('/fondo.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: '40px',
        borderRadius: '15px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ marginBottom: '20px' }}>Simulador de Dijes</h1>
        
        <form onSubmit={simularDiseño}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Número (0-99):</label>
            <input 
              type="number" 
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Ej. 24"
              style={{ padding: '10px', borderRadius: '5px', width: '80%', color: 'black' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Selecciona Metal:</label>
            <select 
              value={metal} 
              onChange={(e) => setMetal(e.target.value)}
              style={{ padding: '10px', borderRadius: '5px', width: '85%', color: 'black' }}
            >
              <option value="oro">Oro 14k</option>
              <option value="plata">Plata .925</option>
            </select>
          </div>

          <button 
            type="submit"
            style={{
              padding: '12px 25px',
              backgroundColor: '#d4af37',
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Ver mi diseño
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>Ingresa un número válido del 0 al 99</p>}

        <div style={{ marginTop: '30px' }}>
          <p>Resultado:</p>
          <img 
            src={imagenResultado} 
            alt="Tu dije personalizado" 
            style={{ 
              maxWidth: '100%', 
              height: 'auto', 
              borderRadius: '10px',
              border: '2px solid #d4af37' 
            }} 
            // Si la imagen no existe, muestra un error en consola
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=Imagen+No+Encontrada'; }}
          />
        </div>
      </div>
    </main>
  );
}