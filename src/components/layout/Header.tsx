import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass } from 'lucide-react';
import './Header.css';

export const Header: React.FC = () => {
  const location = useLocation();

  // On Home page, Home.tsx renders its own standalone overlay navbar
  if (location.pathname === '/') return null;

  const isActive = (path: string) => {
    if (path === '/portfolio' && (location.pathname === '/portfolio' || location.pathname.startsWith('/portfolio/'))) return true;
    if (path === '/tienda' && (location.pathname === '/tienda' || location.pathname.startsWith('/tienda/'))) return true;
    return location.pathname === path;
  };

  const navLinks = [
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Tienda', path: '/tienda' },
    { label: 'Sobre Mí', path: '/sobre-mi' },
    { label: 'Proceso', path: '/proceso-de-trabajo' },
    { label: 'Contacto', path: '/contacto' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header
      style={{
        borderBottom: '1px solid rgba(197, 160, 89, 0.25)',
        padding: '1.25rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#faf8f5',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Logo + Subtags */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
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
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '8px', letterSpacing: '0.2em', color: '#8c8073', textTransform: 'uppercase', lineHeight: 1.4 }}>
          <span>ILUSTRACIÓN</span>
          <span>CONCEPTO</span>
          <span>NARRATIVA VISUAL</span>
        </div>
      </div>

      {/* Center Nav Links */}
      <nav style={{ display: 'flex', gap: '2.5rem', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: isActive(link.path) ? '#C5A059' : '#4a4035',
              borderBottom: isActive(link.path) ? '2px solid #C5A059' : '2px solid transparent',
              paddingBottom: '0.25rem',
              transition: 'all 0.25s ease',
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right Extras */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#5c5247', textTransform: 'uppercase', cursor: 'pointer' }}>
          ES ▾
        </span>
        <Link to="/contacto">
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid rgba(197, 160, 89, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C5A059',
              cursor: 'pointer',
              background: '#ffffff',
            }}
          >
            <Compass size={16} />
          </div>
        </Link>
      </div>
    </header>
  );
};
