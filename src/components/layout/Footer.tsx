import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Globe, Share2 } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const location = useLocation();

  // Home page has its own fixed overlay footer
  if (location.pathname === '/') return null;

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Brand & Columns Grid */}
        <div className="site-footer__grid">
          {/* Brand Column */}
          <div className="site-footer__brand">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  border: '1px solid rgba(197, 160, 89, 0.5)',
                  padding: '0.4rem 0.65rem',
                  textAlign: 'center',
                  background: '#ffffff',
                }}
              >
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.25rem', letterSpacing: '0.05em', color: '#2c251e', fontWeight: 600, lineHeight: 1 }}>
                  IM
                </span>
                <div style={{ fontSize: '7px', color: '#C5A059', marginTop: '2px' }}>✦</div>
              </div>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.95rem', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>
                ILUSTRÍSIMA MAESTRA
              </span>
            </Link>

            <p style={{ maxWidth: '320px', fontSize: '0.85rem', color: '#5c5247', lineHeight: 1.7, margin: 0 }}>
              Estudio de ilustración de autor, narrativa visual, arte conceptual y tienda de obras originales.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C5A059',
                  transition: 'all 0.25s ease',
                  background: '#ffffff',
                }}
              >
                <Globe size={15} />
              </a>
              <a
                href="mailto:contacto@ilustrisimamaestra.com"
                aria-label="Email"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C5A059',
                  transition: 'all 0.25s ease',
                  background: '#ffffff',
                }}
              >
                <Mail size={15} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C5A059',
                  transition: 'all 0.25s ease',
                  background: '#ffffff',
                }}
              >
                <Share2 size={15} />
              </a>
            </div>
          </div>

          {/* Column 1: Portfolio */}
          <div>
            <h4 className="site-footer__title">Portfolio</h4>
            <ul className="site-footer__links">
              <li><Link to="/portfolio" className="site-footer__link">Áreas de Especialización</Link></li>
              <li><Link to="/portfolio/presupuesto" className="site-footer__link">Solicitar Presupuesto</Link></li>
              <li><Link to="/proceso-de-trabajo" className="site-footer__link">Proceso Creativo</Link></li>
              <li><Link to="/contrato" className="site-footer__link">Condiciones del Encargo</Link></li>
            </ul>
          </div>

          {/* Column 2: Tienda */}
          <div>
            <h4 className="site-footer__title">Tienda & Obra</h4>
            <ul className="site-footer__links">
              <li><Link to="/tienda" className="site-footer__link">Láminas Fine Art</Link></li>
              <li><Link to="/tienda" className="site-footer__link">Publicaciones Ilustradas</Link></li>
              <li><Link to="/tienda" className="site-footer__link">Recursos Digitales</Link></li>
              <li><Link to="/faq" className="site-footer__link">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Column 3: Estudio */}
          <div>
            <h4 className="site-footer__title">Estudio</h4>
            <ul className="site-footer__links">
              <li><Link to="/sobre-mi" className="site-footer__link">Sobre Mí</Link></li>
              <li><Link to="/contacto" className="site-footer__link">Contacto Directo</Link></li>
              <li><Link to="/faq" className="site-footer__link">Envíos & Ayuda</Link></li>
            </ul>
          </div>
        </div>

        {/* Philosophy Callout Quote */}
        <div className="site-footer__philosophy">
          <div style={{ fontSize: '9px', color: '#C5A059', marginBottom: '0.35rem' }}>✦</div>
          <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.75rem', letterSpacing: '0.4em', color: '#C5A059', textTransform: 'uppercase', margin: 0, fontWeight: 600 }}>
            EL ARTE ES EL PUENTE ENTRE MUNDOS
          </p>
        </div>

        {/* Bottom Copyright & Terms */}
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Ilustrísima Maestra. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/contrato" style={{ color: '#8c8073' }}>Condiciones Legales</Link>
            <Link to="/faq" style={{ color: '#8c8073' }}>Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
