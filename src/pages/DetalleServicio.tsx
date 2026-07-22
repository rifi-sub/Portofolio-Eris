import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockServices } from '../data/mockData';
import type { Service } from '../types';

export const DetalleServicio: React.FC = () => {
  const { servicioSlug } = useParams<{ servicioSlug: string }>();
  const servicio: Service = mockServices.find((s: Service) => s.slug === servicioSlug) || mockServices[0];

  // Specific service custom content mapping
  const serviceCustomContent: Record<string, {
    heroImage: string;
    idealPara: string;
    entrega: string;
    proyectos: Array<{
      titulo: string;
      subtitulo: string;
      meta: string;
      imagen: string;
    }>;
  }> = {
    'ilustracion-editorial': {
      heroImage: '/srv-editorial.png',
      idealPara: 'Editoriales, autores, revistas, medios de comunicación y proyectos culturales.',
      entrega: 'Archivo digital en alta resolución listo para impresión y web.',
      proyectos: [
        { titulo: 'La flor y la niebla', subtitulo: 'Portada de novela', meta: 'Editorial Planeta • 2023', imagen: '/srv-editorial.png' },
        { titulo: 'Crónicas del destino', subtitulo: 'Ilustración interior', meta: 'Editorial Hidra • 2022', imagen: '/srv-environment.png' },
        { titulo: 'El jardín de los susurros', subtitulo: 'Revista Culturama', meta: 'Edición 45 • 2023', imagen: '/srv-concept.png' },
        { titulo: 'Ecos de invierno', subtitulo: 'Ilustración editorial', meta: 'Revista Animon • 2024', imagen: '/portfolio-hero.png' },
      ],
    },
    'branding-personaje': {
      heroImage: '/srv-character.png',
      idealPara: 'Estudios de videojuegos, animación, literatura fantástica y marcas personales.',
      entrega: 'Hojas de modelo (model sheets), giras de personaje y arte promocional.',
      proyectos: [
        { titulo: 'Kaito: El Guardián Solitario', subtitulo: 'Diseño de Personaje Principal', meta: 'Studio Yakuza • 2024', imagen: '/srv-character.png' },
        { titulo: 'La Sombra de Aethel', subtitulo: 'Hojas de Expresiones & Vestuario', meta: 'Editorial Fantasía • 2023', imagen: '/portfolio-hero.png' },
        { titulo: 'Nébula & Los Alquimistas', subtitulo: 'Diseño de Grupo', meta: 'Indie Game Studio • 2023', imagen: '/srv-concept.png' },
        { titulo: 'El Caballero de la Luna', subtitulo: 'Arte Conceptual', meta: 'Comics Co • 2024', imagen: '/srv-editorial.png' },
      ],
    },
    'arte-digital-concepto': {
      heroImage: '/srv-environment.png',
      idealPara: 'Cine, videojuegos, producción de escenarios virtuales y literatura de mundos.',
      entrega: 'Environment key art, matte paintings y estudios de atmósfera.',
      proyectos: [
        { titulo: 'El Templo Olvidado', subtitulo: 'Concept Art de Escenario', meta: 'Anima Film Studio • 2024', imagen: '/srv-environment.png' },
        { titulo: 'Ciudad de las Luces de Oro', subtitulo: 'Worldbuilding Visual', meta: 'Games Inc • 2023', imagen: '/srv-concept.png' },
        { titulo: 'Montañas de la Niebla', subtitulo: 'Matte Painting', meta: 'Culturama • 2023', imagen: '/srv-editorial.png' },
        { titulo: 'El Portal Arcano', subtitulo: 'Key Art Promocional', meta: 'Metaverse Art • 2024', imagen: '/srv-props.png' },
      ],
    },
    'encargo-personalizado': {
      heroImage: '/srv-props.png',
      idealPara: 'Coleccionistas privados, regalos de lujo, licencias exclusivas e ilustración de props.',
      entrega: 'Arte final original impreso en Fine Art + Licencia digital.',
      proyectos: [
        { titulo: 'El Caliz del Destino', subtitulo: 'Diseño de Objeto Mágico', meta: 'Colección Privada • 2024', imagen: '/srv-props.png' },
        { titulo: 'Frasco de la Luna Llena', subtitulo: 'Ilustración de Prop', meta: 'Grimorio Editores • 2023', imagen: '/srv-concept.png' },
        { titulo: 'El Reloj del Tiempo Perdido', subtitulo: 'Objeto de Colección', meta: 'Private Client • 2023', imagen: '/portfolio-hero.png' },
        { titulo: 'Espejo de Plata Arcano', subtitulo: 'Concept Art de Objeto', meta: 'Fantasy Studio • 2024', imagen: '/srv-environment.png' },
      ],
    },
  };

  const currentDetails = serviceCustomContent[servicio.slug] || serviceCustomContent['ilustracion-editorial'];

  const pasosProceso = [
    { num: '01', titulo: 'Cuéntame tu idea', desc: 'Formulario e información del proyecto.' },
    { num: '02', titulo: 'Propuesta y presupuesto', desc: 'Te envío una propuesta personalizada.' },
    { num: '03', titulo: 'Bocetos iniciales', desc: 'Exploramos la composición y el enfoque.' },
    { num: '04', titulo: 'Desarrollo y color', desc: 'Trabajamos juntos en cada detalle.' },
    { num: '05', titulo: 'Revisión final', desc: 'Ajustamos y perfeccionamos la ilustración.' },
    { num: '06', titulo: 'Entrega', desc: 'Recibes tu ilustración en los formatos acordados.' },
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
          <span style={{ color: '#8c8073' }}>Servicios</span>
          <span>›</span>
          <span style={{ color: '#C5A059', fontWeight: 600 }}>{servicio.title}</span>
        </div>
      </div>
      {/* END: Breadcrumb Bar */}

      {/* BEGIN: Service Hero Section */}
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
          <span className="section-subtitle">SERVICIO</span>
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
            {servicio.title} <span style={{ fontSize: '2rem', color: '#C5A059', verticalAlign: 'super' }}>✦</span>
          </h1>

          <p style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#5c5247', lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '440px' }}>
            {servicio.description}
          </p>

          {/* Feature Badges (Ideal para & Entrega) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem', maxWidth: '460px' }}>
            <div>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                IDEAL PARA
              </span>
              <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.6, margin: 0 }}>
                {currentDetails.idealPara}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                ENTREGA
              </span>
              <p style={{ fontSize: '10px', color: '#6b6052', lineHeight: 1.6, margin: 0 }}>
                {currentDetails.entrega}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <Link
              to="/portfolio/presupuesto"
              style={{
                background: '#2c251e',
                color: '#ffffff',
                border: '1px solid #C5A059',
                padding: '0.85rem 2.5rem',
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
              }}
            >
              <span>SOLICITAR PRESUPUESTO</span>
              <span>→</span>
            </Link>

            <a
              href="#trabajos-realizados"
              style={{
                fontSize: '10px',
                letterSpacing: '0.25em',
                color: '#C5A059',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>VER PROYECTOS RELACIONADOS</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Hero Right Artwork Image */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <img
            src={currentDetails.heroImage}
            alt={servicio.title}
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
          <span>物語を描き、記憶に残る世界を創る</span>
          <span>✦</span>
        </div>
      </section>
      {/* END: Service Hero Section */}

      {/* BEGIN: Middle Section (Cómo Trabajo + Qué Incluye) */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 3rem 4rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' }}>
          {/* Box 1: CÓMO TRABAJO */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '2.5rem' }}>
            <span style={{ fontSize: '9px', color: '#C5A059', letterSpacing: '0.2em', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
              02
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', marginBottom: '2.5rem', fontWeight: 400 }}>
              CÓMO TRABAJO <span style={{ color: '#C5A059' }}>✦</span>
            </h3>

            {/* Horizontal Timeline (6 Steps) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', position: 'relative', marginBottom: '2.5rem' }}>
              {/* Timeline Connector Line */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', height: '1px', background: 'rgba(197, 160, 89, 0.4)', zIndex: 1 }} />

              {pasosProceso.map((p) => (
                <div key={p.num} style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  {/* Step Circle */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '1px solid #C5A059',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      fontSize: '10px',
                      fontFamily: 'var(--font-cinzel)',
                      color: '#C5A059',
                      fontWeight: 600,
                    }}
                  >
                    {p.num}
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: '#1a1510', marginBottom: '0.35rem', lineHeight: 1.2, fontWeight: 500 }}>
                    {p.titulo}
                  </h4>
                  <p style={{ fontSize: '9px', color: '#6b6052', lineHeight: 1.5, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/proceso-de-trabajo" className="link-gold">
              <span>VER EL PROCESO COMPLETO</span>
              <span>→</span>
            </Link>
          </div>

          {/* Box 2: QUÉ INCLUYE */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '9px', color: '#C5A059', letterSpacing: '0.2em', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
              03
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', marginBottom: '1.75rem', fontWeight: 400 }}>
              QUÉ INCLUYE <span style={{ color: '#C5A059' }}>✦</span>
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ fontSize: '11px', color: '#5c5247', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#C5A059', fontWeight: 700 }}>+</span> Ilustración original y exclusiva
              </li>
              <li style={{ fontSize: '11px', color: '#5c5247', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#C5A059', fontWeight: 700 }}>+</span> Revisiones según el paquete contratado
              </li>
              <li style={{ fontSize: '11px', color: '#5c5247', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#C5A059', fontWeight: 700 }}>+</span> Archivo en alta resolución (300-600 dpi)
              </li>
              <li style={{ fontSize: '11px', color: '#5c5247', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#C5A059', fontWeight: 700 }}>+</span> Formatos para impresión y web
              </li>
              <li style={{ fontSize: '11px', color: '#5c5247', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#C5A059', fontWeight: 700 }}>+</span> Asesoramiento creativo
              </li>
              <li style={{ fontSize: '11px', color: '#5c5247', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#C5A059', fontWeight: 700 }}>+</span> Derechos de uso según el contrato
              </li>
            </ul>

            {/* Bottom Quote Box */}
            <div style={{ background: '#faf8f5', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '1.25rem', marginTop: 'auto', borderRadius: '4px' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: '#2c251e', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
                "Cada ilustración es una historia que espera ser contada."
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* END: Middle Section */}

      {/* BEGIN: Bottom Section (TRABAJOS REALIZADOS) */}
      <section id="trabajos-realizados" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 3rem 4rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '9px', color: '#C5A059', letterSpacing: '0.2em', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
              04
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', letterSpacing: '0.05em', color: '#1a1510', fontWeight: 400 }}>
              TRABAJOS REALIZADOS <span style={{ color: '#C5A059' }}>✦</span>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/portfolio" className="link-gold">
              <span>VER TODOS LOS PROYECTOS</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {currentDetails.proyectos.map((proy, idx) => (
            <div key={idx} className="card-hover-gold" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', height: '220px', overflow: 'hidden', background: '#f5f2eb', marginBottom: '1rem' }}>
                <img
                  src={proy.imagen}
                  alt={proy.titulo}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', marginBottom: '0.25rem', fontWeight: 500 }}>
                {proy.titulo}
              </h3>
              <span style={{ fontSize: '10px', color: '#C5A059', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                {proy.subtitulo}
              </span>
              <span style={{ fontSize: '9px', color: '#8c8073', textTransform: 'uppercase', marginTop: 'auto' }}>
                {proy.meta}
              </span>
            </div>
          ))}
        </div>
      </section>
      {/* END: Bottom Section */}
    </div>
  );
};
