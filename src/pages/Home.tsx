import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Globe, Share2, ChevronDown } from 'lucide-react';
import { portfolioApi, getMediaUrl } from '../services/portfolioApi';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Content state loaded from Admin panel (home_hero)
  const [portfolioCover, setPortfolioCover] = useState<string>('');
  const [storeCover, setStoreCover] = useState<string>('');
  const [portfolioTag, setPortfolioTag] = useState<string>('Entra en mi');
  const [portfolioTitle, setPortfolioTitle] = useState<string>('Portfolio');
  const [portfolioDesc, setPortfolioDesc] = useState<string>('Explora mi trabajo\ny proyectos realizados');
  const [storeTag, setStoreTag] = useState<string>('Descubre mi');
  const [storeTitle, setStoreTitle] = useState<string>('Tienda');
  const [storeDesc, setStoreDesc] = useState<string>('Productos ilustrados,\nhechos con amor');
  const [studioTitle, setStudioTitle] = useState<string>('Ilustrísima Maestra');
  const [footerQuote, setFooterQuote] = useState<string>('EL ARTE ES EL PUENTE\nENTRE MUNDOS');

  // Interactive focus state between the two entrance sides
  const [hoveredSide, setHoveredSide] = useState<'none' | 'portfolio' | 'store'>('none');

  useEffect(() => {
    let isMounted = true;
    portfolioApi.getContentSection('home_hero').then((data) => {
      if (!isMounted || !data) return;

      let meta: any = {};
      if (data.metadata) {
        try {
          meta = typeof data.metadata === 'string' ? JSON.parse(data.metadata) : data.metadata;
        } catch (e) {
          // ignore parsing error
        }
      }

      let imgs: string[] = [];
      if (data.images) {
        try {
          imgs = typeof data.images === 'string' ? JSON.parse(data.images) : data.images;
        } catch (e) {
          // ignore parsing error
        }
      }

      const pCover = meta.portfolioCover || (Array.isArray(imgs) ? imgs[0] : '') || '';
      const sCover = meta.storeCover || (Array.isArray(imgs) ? imgs[1] : '') || '';

      setPortfolioCover(pCover);
      setStoreCover(sCover);

      if (meta.portfolioTag) setPortfolioTag(meta.portfolioTag);
      if (meta.portfolioTitle) setPortfolioTitle(meta.portfolioTitle);
      if (meta.portfolioDesc) setPortfolioDesc(meta.portfolioDesc);

      if (meta.storeTag) setStoreTag(meta.storeTag);
      if (meta.storeTitle) setStoreTitle(meta.storeTitle);
      if (meta.storeDesc) setStoreDesc(meta.storeDesc);

      if (data.title) setStudioTitle(data.title);
      if (data.subtitle) setFooterQuote(data.subtitle);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#0a0908',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

        {/* Top subtle vignette */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '140px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            zIndex: 30,
            pointerEvents: 'none'
          }}
        />

        {/* Navigation */}
        <nav
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            padding: '1.75rem 2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <Link to="/">
              <div
                style={{
                  border: '1px solid rgba(197,160,89,0.6)',
                  width: '52px',
                  height: '52px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '1.35rem',
                    letterSpacing: '0.05em',
                    color: '#F3D89D',
                    fontWeight: 700,
                    lineHeight: 1,
                    textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                  }}
                >
                  IM
                </span>
                <span style={{ fontSize: '7px', color: '#C5A059', marginTop: '2px' }}>✦</span>
              </div>
            </Link>
          </div>

          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '1.75rem',
              textAlign: 'center',
              pointerEvents: 'auto'
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '1.05rem',
                letterSpacing: '0.45em',
                color: '#F3D89D',
                textTransform: 'uppercase',
                margin: 0,
                fontWeight: 700,
                textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 0 20px rgba(197,160,89,0.3)'
              }}
            >
              {studioTitle}
            </h1>
            <div style={{ fontSize: '9px', color: '#C5A059', marginTop: '3px' }}>✦</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', pointerEvents: 'auto' }}>
            <ul
              style={{
                display: 'flex',
                gap: '2rem',
                listStyle: 'none',
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: 0,
                padding: 0,
                fontWeight: 600,
                textShadow: '0 1px 6px rgba(0,0,0,0.9)'
              }}
            >
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li><Link to="/tienda">Tienda</Link></li>
              <li><Link to="/sobre-mi">Sobre Mí</Link></li>
              <li><Link to="/proceso-de-trabajo">Proceso</Link></li>
            </ul>
            <Link
              to="/sobre-mi#contacto"
              title="Contacto"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '1px solid rgba(197,160,89,0.6)',
                background: 'rgba(0,0,0,0.35)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F3D89D',
                boxShadow: '0 2px 8px rgba(0,0,0,0.6)'
              }}
            >
              <User size={15} />
            </Link>
          </div>
        </nav>

        {/* Split Content: Two Entrances */}
        <main style={{ position: 'absolute', inset: 0, display: 'flex', zIndex: 10 }}>
          {/* Central Gold Divider */}
          <div className="divider-line" />

          {/* LEFT: PORTFOLIO ENTRANCE */}
          <section
            onMouseEnter={() => setHoveredSide('portfolio')}
            onMouseLeave={() => setHoveredSide('none')}
            onClick={(e) => {
              // Only navigate if the click was directly on the section or background, not already navigating via button link
              if ((e.target as HTMLElement).tagName !== 'A' && !(e.target as HTMLElement).closest('a')) {
                navigate('/portfolio');
              }
            }}
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
              overflow: 'hidden'
            }}
          >
            {/* Background Layer: Real colors of the artwork with elegant dark overlay */}
            {portfolioCover ? (
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
                <img
                  src={getMediaUrl(portfolioCover)}
                  alt="Portada Portfolio"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
                    transform: hoveredSide === 'portfolio' ? 'scale(1.03)' : 'scale(1)',
                    filter: hoveredSide === 'store' ? 'brightness(0.85) contrast(0.98)' : 'brightness(1) contrast(1)'
                  }}
                />
                {/* 1. Base subtle dark veil: preserves authentic illustration colors without bleaching */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(12, 10, 8, 0.38) 0%, rgba(8, 7, 6, 0.22) 50%, rgba(8, 7, 6, 0.42) 100%)',
                    pointerEvents: 'none'
                  }}
                />
                {/* 2. Reinforced center vignette: deeper darkening behind the text block while keeping outer edges vivid */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6, 5, 4, 0.72) 0%, rgba(6, 5, 4, 0.46) 45%, rgba(6, 5, 4, 0.08) 80%, transparent 100%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at 50% 45%, #181512 0%, #0f0d0b 55%, #080706 100%)',
                  zIndex: 1,
                  transition: 'filter 0.5s ease',
                  filter: hoveredSide === 'store' ? 'brightness(0.85)' : 'brightness(1)'
                }}
              >
                {/* Elegant subtle gallery architectural frame */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '28px',
                    border: '1px solid rgba(197,160,89,0.22)',
                    pointerEvents: 'none'
                  }}
                />
                {/* Soft ambient light center */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(197,160,89,0.06) 0%, transparent 65%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            )}

            {/* Content Foreground */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                maxWidth: '420px',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredSide === 'portfolio' ? 'translateY(-3px)' : 'translateY(0)'
              }}
            >
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
                  textShadow: '0 1px 8px rgba(0,0,0,0.95)'
                }}
              >
                {portfolioTag}
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
                  textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 0 24px rgba(0,0,0,0.8)'
                }}
              >
                {portfolioTitle}
              </h2>
              <div className="star-ornament"><span className="star-symbol" style={{ color: '#C5A059' }}>✦</span></div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  color: '#e0c896',
                  textTransform: 'uppercase',
                  lineHeight: 2,
                  marginBottom: '2.5rem',
                  fontWeight: 600,
                  textShadow: '0 1px 8px rgba(0,0,0,0.95)',
                  whiteSpace: 'pre-line'
                }}
              >
                {portfolioDesc}
              </p>
              <Link to="/portfolio" className="btn-home-entry-dark">
                <span>ENTRAR</span>
                <span style={{ fontSize: '13px', color: '#D4AF65' }}>→</span>
              </Link>
            </div>
          </section>

          {/* RIGHT: TIENDA ENTRANCE */}
          <section
            onMouseEnter={() => setHoveredSide('store')}
            onMouseLeave={() => setHoveredSide('none')}
            onClick={(e) => {
              if ((e.target as HTMLElement).tagName !== 'A' && !(e.target as HTMLElement).closest('a')) {
                navigate('/tienda');
              }
            }}
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
              overflow: 'hidden'
            }}
          >
            {/* Background Layer: Custom cover if uploaded or Luxury Atelier Dark Neutral */}
            {storeCover ? (
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
                <img
                  src={getMediaUrl(storeCover)}
                  alt="Portada Tienda"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
                    transform: hoveredSide === 'store' ? 'scale(1.03)' : 'scale(1)',
                    filter: hoveredSide === 'portfolio' ? 'brightness(0.85) contrast(0.98)' : 'brightness(1) contrast(1)'
                  }}
                />
                {/* 1. Base subtle dark veil: keeps illustration clearly visible without excessive darkness */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(14, 12, 10, 0.32) 0%, rgba(10, 8, 7, 0.20) 50%, rgba(8, 6, 5, 0.38) 100%)',
                    pointerEvents: 'none'
                  }}
                />
                {/* 2. Reinforced center vignette: optimal contrast behind text while edges remain bright */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(8, 7, 6, 0.68) 0%, rgba(8, 7, 6, 0.42) 45%, rgba(8, 7, 6, 0.08) 80%, transparent 100%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at 50% 45%, #191613 0%, #100E0C 55%, #080706 100%)',
                  zIndex: 1,
                  transition: 'filter 0.5s ease',
                  filter: hoveredSide === 'portfolio' ? 'brightness(0.85)' : 'brightness(1)'
                }}
              >
                {/* Elegant subtle atelier architectural frame */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '28px',
                    border: '1px solid rgba(197,160,89,0.22)',
                    pointerEvents: 'none'
                  }}
                />
                {/* Warm amber / gold ambient light glow */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(197,160,89,0.08) 0%, transparent 65%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            )}

            {/* Content Foreground */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                maxWidth: '420px',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredSide === 'store' ? 'translateY(-3px)' : 'translateY(0)'
              }}
            >
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
                  textShadow: '0 1px 8px rgba(0,0,0,0.95)'
                }}
              >
                {storeTag}
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
                  textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 0 24px rgba(0,0,0,0.8)'
                }}
              >
                {storeTitle}
              </h2>
              <div className="star-ornament"><span className="star-symbol" style={{ color: '#C5A059' }}>✦</span></div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  color: '#e0c896',
                  textTransform: 'uppercase',
                  lineHeight: 2,
                  marginBottom: '2.5rem',
                  fontWeight: 600,
                  textShadow: '0 1px 8px rgba(0,0,0,0.95)',
                  whiteSpace: 'pre-line'
                }}
              >
                {storeDesc}
              </p>
              <Link to="/tienda" className="btn-home-entry-dark">
                <span>ENTRAR</span>
                <span style={{ fontSize: '13px', color: '#D4AF65' }}>→</span>
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer
          style={{
            position: 'absolute',
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
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)'
          }}
        >
          <div style={{ display: 'flex', gap: '1.5rem', pointerEvents: 'auto', color: '#F3D89D' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Globe size={18} /></a>
            <a href="mailto:contacto@ilustrisimamaestra.com" aria-label="Email"><Mail size={18} /></a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest"><Share2 size={18} /></a>
          </div>

          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '1.75rem',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '8px', color: '#C5A059', marginBottom: '0.35rem' }}>✦</div>
            <p
              style={{
                fontSize: '9px',
                letterSpacing: '0.45em',
                color: '#F3D89D',
                textTransform: 'uppercase',
                margin: 0,
                fontWeight: 500,
                textShadow: '0 1px 6px rgba(0,0,0,0.9)',
                whiteSpace: 'pre-line'
              }}
            >
              {footerQuote}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', pointerEvents: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span
                className="vertical-rl"
                style={{
                  fontSize: '8px',
                  letterSpacing: '0.35em',
                  color: '#F3D89D',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  transform: 'rotate(180deg)'
                }}
              >
                ✦ REDEEM ✦
              </span>
              <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(197,160,89,0.4)' }} />
            </div>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(197,160,89,0.4)',
                borderRadius: '4px',
                padding: '0.35rem 0.65rem',
                fontSize: '10px',
                letterSpacing: '0.25em',
                color: '#F3D89D',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 500,
                backdropFilter: 'blur(4px)'
              }}
            >
              ES<ChevronDown size={12} style={{ marginLeft: '0.25rem' }} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
