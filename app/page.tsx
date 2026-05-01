"use client";

import { useState } from 'react';

export default function Home() {
  const [numero, setNumero] = useState("");
  const [metal, setMetal] = useState("oro");
  const [imagenResultado, setImagenResultado] = useState("");
  const [error, setError] = useState(false);

  const simularDiseño = (e: React.FormEvent) => {
    e.preventDefault();
    const numInt = parseInt(numero);
    
    if (isNaN(numInt) || numInt < 0 || numInt > 99) {
      setError(true);
      setImagenResultado("");
      return;
    }

    setError(false);
    // Ruta dinámica basada en tus archivos en la carpeta public
    setImagenResultado(`/${metal}-${numero}.png`);
  };

  const handleDownload = () => {
    if (!imagenResultado) return;
    const link = document.createElement('a');
    link.href = imagenResultado;
    link.download = `dije-${metal}-${numero}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const enviarWhatsApp = () => {
    const mensaje = `Hola! Me interesa una cotización para un dije de ${metal} con el número ${numero}. Vi el diseño en su simulador.`;
    const url = `https://wa.me/5215510141024?text=${encodeURIComponent(mensaje)}`; // Reemplaza X con tu número
    window.open(url, '_blank');
  };

  return (
    <main style={{
      backgroundImage: "url('/fondo.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
        backgroundColor: 'rgba(0,0,0,0.85)',
        padding: '30px',
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ color: '#d4af37', marginBottom: '10px' }}>Strafalaria Simulator</h1>
        <p style={{ marginBottom: '20px', fontSize: '14px' }}>Visualiza tu pieza en Oro o Plata</p>
        
        <form onSubmit={simularDiseño} style={{ marginBottom: '25px' }}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="number" 
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Ingresa tu número (0-99)"
              style={{ padding: '12px', borderRadius: '8px', width: '90%', border: 'none', textAlign: 'center' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <select 
              value={metal} 
              onChange={(e) => setMetal(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', width: '96%', cursor: 'pointer' }}
            >
              <option value="oro">Oro 14k</option>
              <option value="plata">Plata .925</option>
            </select>
          </div>

          <button 
            type="submit"
            style={{
              padding: '12px 30px',
              backgroundColor: '#d4af37',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            SIMULAR DISEÑO
          </button>
        </form>

        {error && <p style={{ color: '#ff4444' }}>Por favor ingresa un número entre 0 y 99</p>}

        {imagenResultado && (
          <div style={{ marginTop: '20px', animation: 'fadeIn 0.5s' }}>
            <img 
              src={imagenResultado} 
              alt="Tu dije" 
              style={{ maxWidth: '100%', borderRadius: '15px', border: '2px solid #d4af37', marginBottom: '20px' }}
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=Diseño+No+Disponible'; }}
            />
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={handleDownload}
                style={{ padding: '10px 15px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Descargar PNG
              </button>
              
              <button 
                onClick={enviarWhatsApp}
                style={{ padding: '10px 15px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cotizar WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}