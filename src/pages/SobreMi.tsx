import React from 'react';
import { Link } from 'react-router-dom';
// Icons available if needed

export const SobreMi: React.FC = () => {
  return (
    <div className="page-container">
      <div className="section-wrapper">
        {/* Bio Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3.5rem', alignItems: 'center', marginBottom: '4rem' }}>
          {/* Portrait Frame */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '1.5rem' }}>
            <div style={{ width: '100%', height: '480px', overflow: 'hidden', background: '#f5f2eb' }}>
              <img
                src="/portfolio-hero.png"
                alt="Ilustrísima Maestra Portrait"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Bio Text */}
          <div>
            <span className="section-subtitle">CONOCE A LA ARTISTA</span>
            <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>
              SOBRE MÍ <span style={{ color: '#C5A059' }}>✦</span>
            </h1>

            <div className="star-ornament" style={{ margin: '1rem 0 1.5rem 0' }}>
              <span className="star-symbol">✦</span>
            </div>

            <p style={{ fontSize: '13px', color: '#5c5247', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              Hola, soy <strong>Ilustrísima Maestra</strong>, ilustradora de autor y artista conceptual especializada en la creación de universos poéticos, fantasía oscura y narrativa editorial de alto refinamiento estético.
            </p>

            <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8, marginBottom: '2rem' }}>
              Mi obra combina la delicadeza del dibujo clásico en tinta y acuarela con el poder expresivo de las herramientas digitales contemporáneas. Cada ilustración es un viaje donde la simbología mística y el detalle botánico convergen.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <Link to="/portfolio" className="btn-gold-primary">
                <span>EXPLORAR PORTFOLIO</span>
              </Link>
              <Link to="/contacto" className="btn-gold-outline">
                <span>CONTACTO DIRECTO</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '3rem' }}>
          <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            Principios del Estudio <span style={{ color: '#C5A059' }}>✦</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div>
              <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>FILOSOFÍA 01</span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', marginBottom: '0.5rem' }}>
                Narrativa Simbólica
              </h4>
              <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6 }}>
                Buscamos que cada elemento visual contenga un significado profundo para el espectador.
              </p>
            </div>

            <div>
              <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>FILOSOFÍA 02</span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', marginBottom: '0.5rem' }}>
                Excelencia Técnica
              </h4>
              <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6 }}>
                Control exhaustivo del color, la línea y la luz en cada lienzo digital e impreso.
              </p>
            </div>

            <div>
              <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>FILOSOFÍA 03</span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', marginBottom: '0.5rem' }}>
                Edición de Colección
              </h4>
              <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6 }}>
                Producción en papeles de calidad de museo con certificados de autenticidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
