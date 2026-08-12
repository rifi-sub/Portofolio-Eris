import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Sparkles, Feather } from 'lucide-react';

export const ListadoServicios: React.FC = () => {

  return (
    <div style={{ backgroundColor: '#fcfaf7', color: '#2c251e', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* BEGIN: Hero Section */}
      <section
        style={{
          position: 'relative',
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '3rem 3rem 4rem 3rem',
          display: 'grid',
          gridTemplateColumns: '80px 1fr 1.1fr 60px',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Far Left Index & Vertical Dots */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: '#C5A059', fontSize: '11px' }}>
          <span style={{ fontWeight: 600 }}>01</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C5A059' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.4)' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.4)' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.4)' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.4)' }} />
          </div>
        </div>

        {/* Hero Left Content */}
        <div>
          <span style={{ fontSize: '10px', letterSpacing: '0.35em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
            BIENVENIDO A MI PORTFOLIO
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '3.75rem',
              lineHeight: 1.1,
              letterSpacing: '0.08em',
              color: '#1a1510',
              textTransform: 'uppercase',
              marginBottom: '1.75rem',
              fontWeight: 400,
            }}
          >
            ILUSTRÍSIMA<br />
            MAESTRA <span style={{ fontSize: '2rem', color: '#C5A059', verticalAlign: 'super' }}>✦</span>
          </h1>

          <p style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#5c5247', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '380px' }}>
            Ilustración y arte conceptual<br />
            para proyectos que buscan<br />
            contar historias inolvidables.
          </p>

          <Link
            to="/sobre-mi"
            style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#C5A059',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>VER SOBRE MÍ</span>
            <span>→</span>
          </Link>
        </div>

        {/* Hero Right Artwork Image */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <img
            src="/portfolio-hero.png"
            alt="Ilustrísima Maestra Portrait"
            style={{
              maxHeight: '480px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* Far Right Vertical Japanese Text */}
        <div
          className="vertical-rl"
          style={{
            fontSize: '10px',
            letterSpacing: '0.4em',
            color: '#9c8e7e',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            height: '100%',
          }}
        >
          <span>✦</span>
          <span>芸術は記憶に残る物語を描く</span>
          <span>✦</span>
        </div>
      </section>
      {/* END: Hero Section */}

      {/* BEGIN: Feature Pillars Footer Section */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 3rem 4rem 3rem' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            borderRadius: '4px',
            padding: '2rem 3rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1.2fr',
            gap: '2.5rem',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Pillar 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Feather size={32} color="#C5A059" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '0.25em', color: '#1a1510', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                ARTE CON PROPÓSITO
              </h4>
              <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.5, margin: 0 }}>
                Cada proyecto es una historia que merece ser contada.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '1px solid rgba(197, 160, 89, 0.25)', paddingLeft: '2rem' }}>
            <Eye size={32} color="#C5A059" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '0.25em', color: '#1a1510', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                ATENCIÓN AL DETALLE
              </h4>
              <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.5, margin: 0 }}>
                Cuidado máximo en cada trazo, color y composición.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '1px solid rgba(197, 160, 89, 0.25)', paddingLeft: '2rem' }}>
            <Sparkles size={32} color="#C5A059" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '0.25em', color: '#1a1510', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                COLABORACIÓN CREATIVA
              </h4>
              <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.5, margin: 0 }}>
                Trabajo contigo para dar vida a tu visión.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* END: Feature Pillars Footer Section */}
    </div>
  );
};
