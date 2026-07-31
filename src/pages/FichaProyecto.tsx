import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioApi } from '../services/portfolioApi';
import type { Project, Service } from '../types';
import { ExternalLink } from 'lucide-react';

export const FichaProyecto: React.FC = () => {
  const { proyectoSlug } = useParams<{ servicioSlug: string; proyectoSlug: string }>();
  const [proyecto, setProyecto] = useState<Project | null>(null);
  const [servicio, setServicio] = useState<Service | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!proyectoSlug) return;
      const p = await portfolioApi.getProjectBySlug(proyectoSlug);
      if (p) {
        setProyecto(p);
        const services = await portfolioApi.getServices();
        const s = services.find((srv) => p.serviceIds?.includes(srv.id)) || services[0];
        setServicio(s || null);
      }
    }
    loadData();
  }, [proyectoSlug]);

  if (!proyecto || !servicio) {
    return <div className="page-container"><div style={{ padding: '4rem', textAlign: 'center', color: '#5c5247' }}>Cargando obra...</div></div>;
  }

  const procesoPasos = [
    { num: '01', titulo: 'BOCETO', desc: 'Exploración de la composición, la pose y el equilibrio visual.', img: '/proc-boceto.png' },
    { num: '02', titulo: 'VALOR Y ATMÓSFERA', desc: 'Definición de luces, sombras y profundidad.', img: '/proc-valor.png' },
    { num: '03', titulo: 'DETALLES', desc: 'Desarrollo de elementos decorativos y texturas.', img: '/srv-editorial.png' },
    { num: '04', titulo: 'COLOR', desc: 'Pruebas de paleta para encontrar la armonía final.', img: '/srv-character.png' },
    { num: '05', titulo: 'REFINADO', desc: 'Ajustes finales y preparación para impresión.', img: '/portfolio-hero.png' },
  ];

  const detallesCrops = [
    { label: 'Detalle de Kimono & Bordados', img: '/portfolio-hero.png' },
    { label: 'Rostro & Tocado Floral', img: '/srv-editorial.png' },
    { label: 'Texturas de Papel & Ramas Doradas', img: '/srv-character.png' },
    { label: 'Pagoda & Fondo de Niebla', img: '/srv-environment.png' },
    { label: 'Aureola Solar en Pan de Oro', img: '/srv-concept.png' },
  ];

  return (
    <div className="page-container">
      {/* BEGIN: Breadcrumb Bar */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '1.5rem 3rem 0 3rem' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#8c8073', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#8c8073' }}>Inicio</Link>
          <span>›</span>
          <Link to="/portfolio" style={{ color: '#8c8073' }}>Portfolio</Link>
          <span>›</span>
          <Link to={`/portfolio/${servicio.slug}`} style={{ color: '#8c8073' }}>{servicio.title}</Link>
          <span>›</span>
          <span style={{ color: '#C5A059', fontWeight: 600 }}>{proyecto.title}</span>
        </div>
      </div>
      {/* END: Breadcrumb Bar */}

      {/* SECTION 01: Hero Section */}
      <section
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '2.5rem 3rem 4rem 3rem',
          display: 'grid',
          gridTemplateColumns: '70px 1.1fr 1fr 50px',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        {/* Left Vertical Indexing */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: '#C5A059', fontSize: '11px' }}>
          <span style={{ fontWeight: 600 }}>01</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '0.5rem 0' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C5A059' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.4)' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.4)' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.4)' }} />
          </div>
          <span style={{ color: '#8c8073', fontSize: '10px' }}>06</span>
        </div>

        {/* Hero Left Content */}
        <div>
          <span className="section-subtitle">{servicio.title.toUpperCase()}</span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '3.75rem',
              lineHeight: 1.1,
              letterSpacing: '0.08em',
              color: '#1a1510',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              fontWeight: 400,
            }}
          >
            {proyecto.title} <span style={{ fontSize: '2rem', color: '#C5A059', verticalAlign: 'super' }}>✦</span>
          </h1>

          <p style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#5c5247', lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '440px' }}>
            {proyecto.subtitle || proyecto.description}
          </p>

          {/* Metadata Table */}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.85rem 1.5rem', fontSize: '11px', color: '#5c5247', marginBottom: '2.5rem', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '1.5rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>CLIENTE</span>
            <span style={{ color: '#1a1510', fontWeight: 500 }}>{proyecto.client || 'Editorial Planeta'}</span>

            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>AÑO</span>
            <span style={{ color: '#1a1510', fontWeight: 500 }}>{proyecto.year || '2023'}</span>

            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>FORMATO</span>
            <span style={{ color: '#1a1510', fontWeight: 500 }}>Portada completa</span>

            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>TÉCNICA</span>
            <span style={{ color: '#1a1510', fontWeight: 500 }}>Ilustración digital</span>

            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>SOFTWARE</span>
            <span style={{ color: '#1a1510', fontWeight: 500 }}>Photoshop</span>

            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>SERVICIOS</span>
            <span style={{ color: '#1a1510', fontWeight: 500 }}>{servicio.title}, Concept art, Diseño de personajes</span>

            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>ENLACE</span>
            <a href="https://planeta.es" target="_blank" rel="noreferrer" style={{ color: '#C5A059', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>Ver en editorial Planeta</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Previous / Next Project Navigation */}
          <div style={{ display: 'flex', gap: '2.5rem', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, color: '#C5A059' }}>
            <Link to="/portfolio" style={{ color: '#C5A059' }}>
              ‹ PROYECTO ANTERIOR
            </Link>
            <Link to="/portfolio" style={{ color: '#C5A059' }}>
              SIGUIENTE PROYECTO ›
            </Link>
          </div>
        </div>

        {/* Hero Right Main Artwork */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <img
            src={proyecto.coverImage}
            alt={proyecto.title}
            style={{
              maxHeight: '520px',
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
          <span>EL ARTE ES EL PUENTE ENTRE MUNDOS</span>
          <span>✦</span>
        </div>
      </section>
      {/* END: Section 01 */}

      {/* SECTION 02: Concepto */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 3rem 4rem 3rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '2.5rem' }}>
          <span style={{ fontSize: '9px', color: '#C5A059', letterSpacing: '0.2em', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
            02
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', marginBottom: '2rem', fontWeight: 400 }}>
            CONCEPTO <span style={{ color: '#C5A059' }}>✦</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
            {/* Narrative text */}
            <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.8, margin: 0 }}>
              {proyecto.conceptText || 'La protagonista de la historia lleva en su memoria un jardín que solo puede ver ella. La niebla representa lo que ha perdido, mientras que las flores doradas representan los recuerdos que aún la sostienen. Buscamos una atmósfera melancólica, delicada y etérea.'}
            </p>

            {/* Col 1 */}
            <div>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                OBJETIVO
              </span>
              <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.6, margin: 0 }}>
                Crear una portada que transmitiera nostalgia, belleza y misterio.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                INSPIRACIÓN
              </span>
              <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.6, margin: 0 }}>
                Pintura tradicional asiática, grabados, naturaleza, arquitectura antigua y arte decorativo.
              </p>
            </div>

            {/* Col 3 */}
            <div>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                PALABRAS CLAVE
              </span>
              <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.6, margin: 0 }}>
                Niebla, memoria, belleza, fragilidad, renacer, silencio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: Proceso */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 3rem 4rem 3rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '2.5rem' }}>
          <span style={{ fontSize: '9px', color: '#C5A059', letterSpacing: '0.2em', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
            03
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', marginBottom: '2.5rem', fontWeight: 400 }}>
            PROCESO <span style={{ color: '#C5A059' }}>✦</span>
          </h2>

          {/* 5 Process Steps Horizontal Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }}>
            {procesoPasos.map((paso) => (
              <div key={paso.num} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '180px', overflow: 'hidden', background: '#f5f2eb', marginBottom: '1rem', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                  <img
                    src={paso.img}
                    alt={paso.titulo}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '9px', color: '#C5A059', fontWeight: 600 }}>{paso.num}</span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: '#1a1510', margin: 0, fontWeight: 500 }}>
                    {paso.titulo}
                  </h4>
                </div>

                <p style={{ fontSize: '9px', color: '#6b6052', lineHeight: 1.5, margin: 0 }}>
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04: Ilustración Final */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 3rem 4rem 3rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '2.5rem' }}>
          <span style={{ fontSize: '9px', color: '#C5A059', letterSpacing: '0.2em', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
            04
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', marginBottom: '2rem', fontWeight: 400 }}>
            ILUSTRACIÓN FINAL <span style={{ color: '#C5A059' }}>✦</span>
          </h2>

          {/* Panoramic High-Res Artwork Banner */}
          <div style={{ width: '100%', height: '400px', overflow: 'hidden', background: '#f5f2eb', borderRadius: '4px', border: '1px solid rgba(197, 160, 89, 0.3)' }}>
            <img
              src={proyecto.coverImage}
              alt={`${proyecto.title} Ilustración Final`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 05: Detalles */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 3rem 4rem 3rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '2.5rem' }}>
          <span style={{ fontSize: '9px', color: '#C5A059', letterSpacing: '0.2em', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
            05
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', marginBottom: '2rem', fontWeight: 400 }}>
            DETALLES <span style={{ color: '#C5A059' }}>✦</span>
          </h2>

          {/* 5 Close-Up Detail Crops Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }}>
            {detallesCrops.map((det, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '180px', overflow: 'hidden', background: '#f5f2eb', border: '1px solid rgba(197, 160, 89, 0.25)' }}>
                  <img
                    src={det.img}
                    alt={det.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.2 + idx * 0.1})` }}
                  />
                </div>
                <span style={{ fontSize: '9px', color: '#6b6052', marginTop: '0.5rem', textAlign: 'center', lineHeight: 1.4 }}>
                  {det.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06: Producción */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 3rem 4rem 3rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.2fr', gap: '2.5rem', alignItems: 'center' }}>
          {/* Col 1 */}
          <div>
            <span style={{ fontSize: '9px', color: '#C5A059', letterSpacing: '0.2em', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>06</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#1a1510', marginBottom: '1rem', fontWeight: 400 }}>
              PRODUCCIÓN <span style={{ color: '#C5A059' }}>✦</span>
            </h3>

            <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#C5A059', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
              ARCHIVOS ENTREGADOS
            </span>
            <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.6, margin: 0 }}>
              Portada completa<br />Archivos en alta resolución<br />Versiones para web y redes
            </p>
          </div>

          {/* Col 2 */}
          <div style={{ borderLeft: '1px solid rgba(197, 160, 89, 0.25)', paddingLeft: '1.75rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#C5A059', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
              FORMATOS
            </span>
            <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.6, margin: 0 }}>
              Impresión: 300 dpi CMYK<br />Digital: RGB<br />Formatos: TIFF, PSD, JPG, PNG
            </p>
          </div>

          {/* Col 3 */}
          <div style={{ borderLeft: '1px solid rgba(197, 160, 89, 0.25)', paddingLeft: '1.75rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#C5A059', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
              USOS
            </span>
            <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.6, margin: 0 }}>
              Portada impresa<br />Portada digital<br />Promoción y redes sociales
            </p>
          </div>

          {/* Col 4: Right Callout Card */}
          <div style={{ background: '#faf8f5', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '1.75rem', borderRadius: '4px' }}>
            <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '0.2em', color: '#1a1510', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              ¿TIENES UN PROYECTO EN MENTE?
            </h4>
            <Link to="/portfolio/presupuesto" className="link-gold" style={{ fontSize: '10px' }}>
              <span>SOLICITAR PRESUPUESTO</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
      {/* END: Section 06 */}
    </div>
  );
};
