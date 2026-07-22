import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export const Contacto: React.FC = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="page-container">
      <div className="section-wrapper">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem auto' }}>
          <span className="section-subtitle">CANAL DIRECTO</span>
          <h1 className="page-title">
            CONTACTO & ESTUDIO <span style={{ color: '#C5A059' }}>✦</span>
          </h1>

          <div className="star-ornament" style={{ justifyContent: 'center', margin: '1rem 0' }}>
            <span className="star-symbol">✦</span>
          </div>

          <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8 }}>
            ¿Tienes una propuesta editorial, encargo particular o consulta sobre la tienda? Estaré encantada de leerte.
          </p>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3.5rem', alignItems: 'start' }}>
          {/* Info Side */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1510', marginBottom: '1.5rem' }}>
              Informaciones del Estudio <span style={{ color: '#C5A059' }}>✦</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <Mail size={20} color="#C5A059" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#8c8073', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>EMAIL DE CONTACTO</span>
                  <a href="mailto:contacto@ilustrisimamaestra.com" style={{ fontSize: '13px', color: '#1a1510', fontWeight: 600 }}>
                    contacto@ilustrisimamaestra.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <Clock size={20} color="#C5A059" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#8c8073', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>HORARIO DE ATENCIÓN</span>
                  <span style={{ fontSize: '12px', color: '#5c5247' }}>Lunes a Viernes: 09:00 - 18:00 (CET)</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <MapPin size={20} color="#C5A059" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#8c8073', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>UBICACIÓN DEL ESTUDIO</span>
                  <span style={{ fontSize: '12px', color: '#5c5247' }}>Madrid / España (Envíos Internacionales)</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '1.5rem' }}>
              <span className="badge-gold">
                ✦ DISPONIBILIDAD: ABIERTO A ENCARGOS 2026
              </span>
            </div>
          </div>

          {/* Form Side */}
          {enviado ? (
            <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.5)', padding: '3.5rem', textAlign: 'center' }}>
              <CheckCircle2 size={36} color="#C5A059" style={{ margin: '0 auto 1rem auto' }} />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', marginBottom: '1rem' }}>
                ¡Mensaje Enviado con Éxito! <span style={{ color: '#C5A059' }}>✦</span>
              </h2>
              <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8, marginBottom: '2rem' }}>
                Gracias por ponerte en contacto. Responderé a tu mensaje en el menor tiempo posible.
              </p>
              <button onClick={() => setEnviado(false)} className="btn-gold-primary">
                ENVIAR OTRO MENSAJE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1510', marginBottom: '1.5rem' }}>
                Formulario de Consulta <span style={{ color: '#C5A059' }}>✦</span>
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#5c5247', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Nombre</span>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid rgba(197, 160, 89, 0.35)', fontSize: '11px', background: '#faf8f5', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#5c5247', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Email</span>
                <input
                  type="email"
                  required
                  placeholder="tuemail@ejemplo.com"
                  style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid rgba(197, 160, 89, 0.35)', fontSize: '11px', background: '#faf8f5', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#5c5247', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Mensaje</span>
                <textarea
                  required
                  rows={5}
                  placeholder="Escribe aquí tu consulta o propuesta..."
                  style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid rgba(197, 160, 89, 0.35)', fontSize: '11px', background: '#faf8f5', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn-gold-primary" style={{ width: '100%' }}>
                <Send size={15} />
                <span>ENVIAR MENSAJE</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
