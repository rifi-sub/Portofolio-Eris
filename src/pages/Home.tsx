import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Globe, Share2, ChevronDown } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', height: '100vh', overflow: 'hidden', backgroundColor: '#000', color: '#fff' }}>
      {/* Full-width continuous background image */}
      <div className="home-bg-full" />

      {/* Top subtle vignette overlay for high contrast and legibility */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 60%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* BEGIN: Top Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          padding: '1.75rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Left Logo (IM + Star) */}
        <div style={{ pointerEvents: 'auto' }}>
          <Link to="/">
            <div
              style={{
                border: '1px solid rgba(197, 160, 89, 0.6)',
                width: '52px',
                height: '52px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.35rem', letterSpacing: '0.05em', color: '#F3D89D', fontWeight: 700, lineHeight: 1, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                IM
              </span>
              <span style={{ fontSize: '7px', color: '#C5A059', marginTop: '2px' }}>✦</span>
            </div>
          </Link>
        </div>

        {/* Center Brand Title - High Legibility */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '1.75rem', textAlign: 'center', pointerEvents: 'auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '1.05rem',
              letterSpacing: '0.45em',
              color: '#F3D89D',
              textTransform: 'uppercase',
              margin: 0,
              fontWeight: 700,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 0 20px rgba(197, 160, 89, 0.3)',
            }}
          >
            Ilustrísima Maestra
          </h1>
          <div style={{ fontSize: '9px', color: '#C5A059', marginTop: '3px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>✦</div>
        </div>

        {/* Top Right Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', pointerEvents: 'auto' }}>
          <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ffffff', margin: 0, padding: 0, fontWeight: 600, textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
            <li>
              <Link to="/sobre-mi" style={{ transition: 'color 0.3s' }} className="hover-gold-text">
                Sobre Mí
              </Link>
            </li>
            <li>
              <Link to="/proceso-de-trabajo" style={{ transition: 'color 0.3s' }} className="hover-gold-text">
                Proceso
              </Link>
            </li>
            <li>
              <Link to="/contacto" style={{ transition: 'color 0.3s' }} className="hover-gold-text">
                Contacto
              </Link>
            </li>
          </ul>

          {/* User Icon Circle */}
          <Link
            to="/contacto"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: '1px solid rgba(197, 160, 89, 0.6)',
              background: 'rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F3D89D',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
            }}
          >
            <User size={15} />
          </Link>
        </div>
      </nav>
      {/* END: Navigation Bar */}

      {/* BEGIN: Split Main Content */}
      <main style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', overflow: 'hidden', zIndex: 10 }}>
        {/* Central Divider Line */}
        <div className="divider-line" />

        {/* Central Astrolabe Spinning Orbits Overlay */}
        <div className="central-artifact flex flex-col items-center z-10">
          <div style={{ position: 'relative', width: '360px', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              className="animate-spin-slow"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" fill="none" r="46" stroke="#C5A059" strokeWidth="0.25" />
              <circle cx="50" cy="50" fill="none" r="39" stroke="#C5A059" strokeDasharray="1 2" strokeWidth="0.15" />
              <circle cx="50" cy="50" fill="none" r="28" stroke="#C5A059" strokeWidth="0.15" />
            </svg>
          </div>
        </div>

        {/* LEFT SECTION: PORTFOLIO */}
        <section
          style={{
            position: 'relative',
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 4rem',
            cursor: 'pointer',
          }}
        >
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '420px' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.35em',
                color: '#3e352b',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                fontWeight: 600,
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.6)',
              }}
            >
              Entra en mi
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.75rem',
                letterSpacing: '0.12em',
                color: '#1a1510',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
                fontWeight: 500,
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.4)',
              }}
            >
              Portfolio
            </h2>

            {/* Star Ornament */}
            <div className="star-ornament">
              <span className="star-symbol">✦</span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.25em',
                color: '#3a3025',
                textTransform: 'uppercase',
                lineHeight: 2,
                marginBottom: '2rem',
                fontWeight: 600,
              }}
            >
              Explora mi trabajo<br />y proyectos realizados
            </p>

            <Link to="/portfolio" className="btn-portfolio">
              <span>Entrar</span>
              <span style={{ fontSize: '12px' }}>→</span>
            </Link>
          </div>
        </section>

        {/* RIGHT SECTION: TIENDA */}
        <section
          style={{
            position: 'relative',
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 4rem',
            cursor: 'pointer',
          }}
        >
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '420px' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.35em',
                color: '#F3D89D',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                fontWeight: 600,
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.9)',
              }}
            >
              Descubre mi
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.75rem',
                letterSpacing: '0.12em',
                color: '#ffffff',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
                fontWeight: 500,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
              }}
            >
              Tienda
            </h2>

            {/* Star Ornament */}
            <div className="star-ornament">
              <span className="star-symbol">✦</span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.25em',
                color: '#e0c896',
                textTransform: 'uppercase',
                lineHeight: 2,
                marginBottom: '2rem',
                fontWeight: 600,
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.9)',
              }}
            >
              Productos ilustrados,<br />hechos con amor
            </p>

            <Link to="/tienda" className="btn-tienda">
              <span>Entrar</span>
              <span style={{ fontSize: '12px' }}>→</span>
            </Link>
          </div>
        </section>
      </main>
      {/* END: Split Main Content */}

      {/* BEGIN: Footer Elements */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          padding: '2rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          pointerEvents: 'none',
          boxSizing: 'border-box',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 100%)',
        }}
      >
        {/* Bottom Left Social Icons */}
        <div style={{ display: 'flex', gap: '1.5rem', pointerEvents: 'auto', color: '#F3D89D' }}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Globe size={18} />
          </a>
          <a href="mailto:contacto@ilustrisimamaestra.com" aria-label="Email">
            <Mail size={18} />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
            <Share2 size={18} />
          </a>
        </div>

        {/* Center Philosophy & Star Arc */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '8px', color: '#C5A059', marginBottom: '0.35rem', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>✦</div>
          <p style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#F3D89D', textTransform: 'uppercase', margin: 0, fontWeight: 600, textShadow: '0 1px 6px rgba(0, 0, 0, 0.9)' }}>
            EL ARTE ES EL PUENTE<br />ENTRE MUNDOS
          </p>
        </div>

        {/* Bottom Right Language & Redeem Vertical Text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span className="vertical-rl" style={{ fontSize: '8px', letterSpacing: '0.35em', color: '#F3D89D', textTransform: 'uppercase', marginBottom: '0.5rem', transform: 'rotate(180deg)', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
              ✦ REDEEM ✦
            </span>
            <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '4px', padding: '0.35rem 0.65rem', fontSize: '10px', letterSpacing: '0.25em', color: '#F3D89D', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
            ES
            <ChevronDown size={12} style={{ marginLeft: '0.25rem', color: '#F3D89D' }} />
          </button>
        </div>
      </footer>
      {/* END: Footer Elements */}
    </div>
  );
};
