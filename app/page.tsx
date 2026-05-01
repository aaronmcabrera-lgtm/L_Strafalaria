"use client";

import { useState } from 'react';

export default function Home() {
  const [numero, setNumero] = useState("");
  const [metal, setMetal] = useState("oro");
  const [imagenResultado, setImagenResultado] = useState("/favicon.ico");
  const [error, setError] = useState(false);
  const [mostrandoEjemplo, setMostrandoEjemplo] = useState(true);

  const simularDiseño = (e: React.FormEvent) => {
    e.preventDefault();
    const numInt = parseInt(numero);
    
    if (isNaN(numInt) || numInt < 0 || numInt > 99) {
      setError(true);
      return;
    }

    setError(false);
    setMostrandoEjemplo(false);
    setImagenResultado(`/${metal}-${numero}.png`);
  };

  const handleDownload = () => {
    if (!imagenResultado || mostrandoEjemplo) return;
    const link = document.createElement('a');
    link.href = imagenResultado;
    link.download = `dije-${metal}-${numero}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const enviarWhatsApp = () => {
    const mensaje = mostrandoEjemplo 
      ? "Hola! Me interesa personalizar un dije. ¿Me podrían dar más información?"
      : `Hola! Me interesa una cotización para un dije de ${metal} con el número ${numero}. Vi el diseño en su simulador.`;
    
    const url = `https://wa.me/5215510141024?text=${encodeURIComponent(mensaje)}`; 
    window.open(url, '_blank');
  };

  const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '350px',
    border: 'none',
    textAlign: 'center' as const,
    fontFamily: "'Lato', sans-serif",
    color: '#333333',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 auto'
  };

  const selectStyle = {
    ...inputStyle,
    color: 'black',
    appearance: 'none' as const,
    cursor: 'pointer',
    backgroundColor: 'white'
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
      fontFamily: "'Lato', sans-serif"
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');
        select option {
          color: black;
          font-weight: bold;
        }
      `}</style>

      <div style={{
        backgroundColor: 'rgba(0,0,0,0.85)',
        padding: '40px 30px',
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: '500px', // Ligeramente más ancho para el título grande
        width: '100%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Título actualizado: 30% más grande y Bold extremo */}
        <h1 style={{ 
          color: '#d4af37', 
          marginBottom: '15px', 
          fontWeight: 900, 
          fontSize: '3rem', // Aumentado un 30% respecto al anterior
          lineHeight: '1.1',
          textTransform: 'uppercase'
        }}>
          Simulador Strafalaria
        </h1>
        
        <p style={{ marginBottom: '25px', fontSize: '26px', letterSpacing: '1px' }}>
          Visualiza tu pieza en Oro o Plata
        </p>
        
        <form onSubmit={simularDiseño} style={{ marginBottom: '25px', width: '100%' }}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="number" 
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Ingresa tu número (0-99)"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '20px', width: '100%' }}>
            <select 
              value={metal} 
              onChange={(e) => setMetal(e.target.value)}
              style={selectStyle}
            >
              <option value="oro">Oro 14k</option>
              <option value="plata">Plata .925</option>
            </select>
          </div>

          <button 
            type="submit"
            style={{
              padding: '14px 30px',
              backgroundColor: '#d4af37',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '350px',
              fontFamily: "'Lato', sans-serif",
              fontSize: '18px'
            }}
          >
            SIMULAR DISEÑO
          </button>
        </form>

        {error && <p style={{ color: '#ff4444', marginBottom: '10px' }}>Ingresa un número entre 0 y 99</p>}

        <div style={{ 
          marginTop: '20px', 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <p style={{ marginBottom: '10px', fontSize: '12px', color: '#aaa', letterSpacing: '1px' }}>
            {mostrandoEjemplo ? "MUESTRA DE EJEMPLO" : "TU DISEÑO PERSONALIZADO"}
          </p>
          <img 
            src={imagenResultado} 
            alt="Visualización" 
            style={{ 
              maxWidth: '240px', 
              width: '100%',
              borderRadius: '15px', 
              border: '2px solid #d4af37', 
              marginBottom: '25px',
              backgroundColor: '#111',
              display: 'block',
              margin: '0 auto'
            }}
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=Cargando+Diseño...'; }}
          />
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', width: '100%' }}>
            <button 
              onClick={handleDownload}
              disabled={mostrandoEjemplo}
              style={{ 
                padding: '10px 15px', 
                backgroundColor: mostrandoEjemplo ? '#222' : '#444', 
                color: mostrandoEjemplo ? '#666' : 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: mostrandoEjemplo ? 'default' : 'pointer',
                fontFamily: "'Lato', sans-serif"
              }}
            >
              Descargar PNG
            </button>
            
            <button 
              onClick={enviarWhatsApp}
              style={{ 
                padding: '10px 15px', 
                backgroundColor: '#25D366', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer', 
                fontWeight: 'bold', 
                fontFamily: "'Lato', sans-serif"
              }}
            >
              Cotizar WhatsApp
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}