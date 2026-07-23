import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Globe, Share2, ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 192;
const FRAME_PATH = (n: number) => `/def/frame_${String(n).padStart(4, '0')}.png`;

function preloadFrames(): HTMLImageElement[] {
  const imgs: HTMLImageElement[] = [];
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = FRAME_PATH(i);
    imgs.push(img);
  }
  return imgs;
}

export const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img || !img.complete) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = window.scrollY;
    const maxScroll = container.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    }
  }, [drawFrame]);

  useEffect(() => {
    framesRef.current = preloadFrames();
    framesRef.current[0].onload = () => drawFrame(0);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 1920;
      canvas.height = 1080;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, handleScroll]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: `${TOTAL_FRAMES * 3}px`, backgroundColor: '#000' }}
    >
      {/* STICKY VIEWPORT */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* LAYER 1: Background image */}
        <div className="home-bg-full" />

        {/* LAYER 2: Frame canvas — multiply blends white away */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 3,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        />

        {/* LAYER 3: Top vignette */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '140px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />

        {/* Navigation */}
        <nav
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100,
            padding: '1.75rem 2.5rem', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', pointerEvents: 'none', boxSizing: 'border-box',
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <Link to="/">
              <div style={{ border: '1px solid rgba(197,160,89,0.6)', width: '52px', height: '52px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.35rem', letterSpacing: '0.05em', color: '#F3D89D', fontWeight: 700, lineHeight: 1, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>IM</span>
                <span style={{ fontSize: '7px', color: '#C5A059', marginTop: '2px' }}>✦</span>
              </div>
            </Link>
          </div>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '1.75rem', textAlign: 'center', pointerEvents: 'auto' }}>
            <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.05rem', letterSpacing: '0.45em', color: '#F3D89D', textTransform: 'uppercase', margin: 0, fontWeight: 700, textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 0 20px rgba(197,160,89,0.3)' }}>
              Ilustrísima Maestra
            </h1>
            <div style={{ fontSize: '9px', color: '#C5A059', marginTop: '3px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>✦</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', pointerEvents: 'auto' }}>
            <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ffffff', margin: 0, padding: 0, fontWeight: 600, textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
              <li><Link to="/sobre-mi">Sobre Mí</Link></li>
              <li><Link to="/proceso-de-trabajo">Proceso</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
            <Link to="/contacto" style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(197,160,89,0.6)', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F3D89D', boxShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              <User size={15} />
            </Link>
          </div>
        </nav>

        {/* Split Content */}
        <main style={{ position: 'absolute', inset: 0, display: 'flex', zIndex: 10 }}>
          <div className="divider-line" />

          {/* LEFT: PORTFOLIO */}
          <section style={{ position: 'relative', width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 4rem', cursor: 'pointer' }}>
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '420px' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.35em', color: '#3e352b', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600, textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>Entra en mi</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.75rem', letterSpacing: '0.12em', color: '#1a1510', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 500, textShadow: '0 1px 3px rgba(255,255,255,0.4)' }}>Portfolio</h2>
              <div className="star-ornament"><span className="star-symbol">✦</span></div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.25em', color: '#3a3025', textTransform: 'uppercase', lineHeight: 2, marginBottom: '2.5rem', fontWeight: 600 }}>
                Explora mi trabajo<br />y proyectos realizados
              </p>
              <Link to="/portfolio" className="btn-home-entry">
                <span>ENTRAR</span>
                <span style={{ fontSize: '13px', color: '#9A7B42' }}>→</span>
              </Link>
            </div>
          </section>

          {/* RIGHT: TIENDA */}
          <section style={{ position: 'relative', width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 4rem', cursor: 'pointer' }}>
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '420px' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.35em', color: '#F3D89D', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600, textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>Descubre mi</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.75rem', letterSpacing: '0.12em', color: '#ffffff', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 500, textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>Tienda</h2>
              <div className="star-ornament"><span className="star-symbol">✦</span></div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.25em', color: '#e0c896', textTransform: 'uppercase', lineHeight: 2, marginBottom: '2.5rem', fontWeight: 600, textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
                Productos ilustrados,<br />hechos con amor
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
            position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 100,
            padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', pointerEvents: 'none', boxSizing: 'border-box',
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', gap: '1.5rem', pointerEvents: 'auto', color: '#F3D89D' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Globe size={18} /></a>
            <a href="mailto:contacto@ilustrisimamaestra.com" aria-label="Email"><Mail size={18} /></a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest"><Share2 size={18} /></a>
          </div>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '1.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '8px', color: '#C5A059', marginBottom: '0.35rem', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>✦</div>
            <p style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#F3D89D', textTransform: 'uppercase', margin: 0, fontWeight: 500, textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
              EL ARTE ES EL PUENTE<br />ENTRE MUNDOS
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', pointerEvents: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span className="vertical-rl" style={{ fontSize: '8px', letterSpacing: '0.35em', color: '#F3D89D', textTransform: 'uppercase', marginBottom: '0.5rem', transform: 'rotate(180deg)', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                ✦ REDEEM ✦
              </span>
              <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(197,160,89,0.4)' }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(197,160,89,0.4)', borderRadius: '4px', padding: '0.35rem 0.65rem', fontSize: '10px', letterSpacing: '0.25em', color: '#F3D89D', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 500, backdropFilter: 'blur(4px)' }}>
              ES
              <ChevronDown size={12} style={{ marginLeft: '0.25rem', color: '#F3D89D' }} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
