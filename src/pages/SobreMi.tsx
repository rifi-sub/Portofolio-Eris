import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioApi, getMediaUrl, type ContentSection } from '../services/portfolioApi';

export const SobreMi: React.FC = () => {
  const [sectionData, setSectionData] = useState<Partial<ContentSection>>({});

  useEffect(() => {
    portfolioApi.getContentSection('sobre_mi_bio', {
      title: 'ILUSTRAR ES CONTAR LO INVISIBLE',
      subtitle: 'SOBRE MÍ',
      content: 'Soy ilustradora y narradora visual. Transformo ideas, emociones y mundos en imágenes que permanecen.\n\nMi trabajo nace de la observación, la sensibilidad y el amor por los detalles. Me inspiran la naturaleza, el simbolismo, las historias y todo lo que habita entre la realidad y la fantasía.',
      images: JSON.stringify(['/portfolio-hero.png'])
    }).then(setSectionData);
  }, []);

  const imageList = sectionData.images ? JSON.parse(sectionData.images) : ['/portfolio-hero.png'];
  const displayImage = imageList[0] || '/portfolio-hero.png';
  const imgUrl = getMediaUrl(displayImage);

  const formacion = [
    { ano: '2017', titulo: 'Grado en Bellas Artes', centro: 'Universidad de Sevilla' },
    { ano: '2019', titulo: 'Máster en Ilustración y Concept Art', centro: 'ECV, Valencia' },
    { ano: '2021', titulo: 'Curso de Grabado y Técnicas de Impresión', centro: 'Taller de Arte La Gráfica, Madrid' }
  ];

  const softwares = [
    { code: 'Ps', name: 'Adobe Photoshop', category: 'Pintura & Edición' },
    { code: 'Cp', name: 'Clip Studio Paint', category: 'Entintado & Cómic' },
    { code: 'Pr', name: 'Procreate', category: 'Ilustración Digital' },
    { code: 'Ai', name: 'Adobe Illustrator', category: 'Arte Vectorial' },
    { code: 'Id', name: 'Adobe InDesign', category: 'Maquetación Editorial' }
  ];

  const experiencia = [
    {
      periodo: '2018 — Actualidad',
      puesto: 'Ilustradora Freelance',
      descripcion: 'Proyectos editoriales, concept art, portadas, ilustración publicitaria y encargos personalizados.'
    },
    {
      periodo: '2021 — 2023',
      puesto: 'Ilustradora y Diseñadora',
      descripcion: 'Estudio Gráfico Nórdico. Desarrollo de campañas visuales y diseño de material editorial.'
    },
    {
      periodo: '2019 — 2021',
      puesto: 'Concept Artist Junior',
      descripcion: 'Legendary Games. Diseño de personajes, escenarios y props para videojuegos.'
    }
  ];

  const colaboraciones = [
    { nombre: 'Planeta', desc: 'Editorial Planeta' },
    { nombre: 'Norma Editorial', desc: 'Norma Editorial' },
    { nombre: 'Minotauro', desc: 'Ediciones Minotauro' },
    { nombre: 'Disney Libros', desc: 'Disney Libros' },
    { nombre: 'Legendary', desc: 'Legendary Games' }
  ];

  return (
    <div className="page-container">
      <div className="section-wrapper">
        {/* Main Hero & Bio */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          {/* Retrato del Autor */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <div style={{ width: '100%', height: '520px', overflow: 'hidden', background: '#f5f2eb' }}>
              <img
                src={imgUrl}
                alt="Ilustrísima Maestra Portrait"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Texto Biográfico */}
          <div>
            <span className="section-subtitle">{sectionData.subtitle || 'SOBRE MÍ'}</span>
            <h1 className="page-title" style={{ fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              ILUSTRAR ES CONTAR LO INVISIBLE <span style={{ color: '#C5A059' }}>✦</span>
            </h1>

            <div className="star-ornament" style={{ margin: '1rem 0 1.5rem 0' }}>
              <span className="star-symbol">✦</span>
            </div>

            <p style={{ fontSize: '13px', color: '#5c5247', lineHeight: 1.9, marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
              {sectionData.content || 'Soy ilustradora y narradora visual...'}
            </p>

            <p style={{ fontFamily: 'var(--font-cinzel, serif)', fontSize: '1.25rem', color: '#C5A059', fontStyle: 'italic', marginBottom: '2rem' }}>
              Ilustrísima Maestra
            </p>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <Link to="/portfolio" className="btn-gold-primary">
                <span>EXPLORAR OBRAS</span>
              </Link>
              <Link to="/contacto" className="btn-gold-outline">
                <span>HABLAR CON LA ARTISTA</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Column Grid: Formación / Softwares / Experiencia */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {/* Formación */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '12px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>FORMACIÓN</span>
              <span>✦</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {formacion.map((item, idx) => (
                <div key={idx} style={{ borderBottom: idx < formacion.length - 1 ? '1px dashed rgba(197,160,89,0.2)' : 'none', paddingBottom: idx < formacion.length - 1 ? '1rem' : 0 }}>
                  <span style={{ fontSize: '10px', color: '#C5A059', fontWeight: 600 }}>{item.ano}</span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: '#1a1510', margin: '0.25rem 0' }}>{item.titulo}</h4>
                  <p style={{ fontSize: '11px', color: '#7a6f64', margin: 0 }}>{item.centro}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Softwares */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '12px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>SOFTWARES QUE UTILIZO</span>
              <span>✦</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {softwares.map((sw, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.6rem 0.85rem', background: '#faf8f5', border: '1px solid rgba(197,160,89,0.15)' }}>
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: '12px', color: '#C5A059', minWidth: '24px' }}>{sw.code}</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a1510' }}>{sw.name}</div>
                    <div style={{ fontSize: '9px', color: '#7a6f64' }}>{sw.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experiencia Profesional */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '12px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>EXPERIENCIA PROFESIONAL</span>
              <span>✦</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {experiencia.map((exp, idx) => (
                <div key={idx} style={{ borderBottom: idx < experiencia.length - 1 ? '1px dashed rgba(197,160,89,0.2)' : 'none', paddingBottom: idx < experiencia.length - 1 ? '1rem' : 0 }}>
                  <span style={{ fontSize: '10px', color: '#C5A059', fontWeight: 600 }}>{exp.periodo}</span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: '#1a1510', margin: '0.25rem 0' }}>{exp.puesto}</h4>
                  <p style={{ fontSize: '11px', color: '#7a6f64', lineHeight: 1.5, margin: 0 }}>{exp.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Obras Destacadas Strip */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span className="section-subtitle">GALERÍA</span>
              <h2 className="section-title" style={{ margin: 0 }}>OBRAS DESTACADAS <span style={{ color: '#C5A059' }}>✦</span></h2>
            </div>
            <Link to="/portfolio" className="link-gold" style={{ fontSize: '11px' }}>
              VER PORTFOLIO COMPLETO →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {['/portfolio-hero.png', '/srv-environment.png', '/srv-editorial.png', '/srv-concept.png'].map((img, i) => (
              <div key={i} style={{ height: '260px', overflow: 'hidden', background: '#f5f2eb', border: '1px solid rgba(197,160,89,0.3)' }}>
                <img src={getMediaUrl(img)} alt={`Obra ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Colaboraciones / Marcas */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '3rem 2rem', textAlign: 'center' }}>
          <span className="section-subtitle">CONFIANZA & EDITORIALES</span>
          <h3 className="section-title" style={{ marginBottom: '2.5rem' }}>
            COLABORACIONES <span style={{ color: '#C5A059' }}>✦</span>
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
            {colaboraciones.map((colab, idx) => (
              <div key={idx} style={{ padding: '0.85rem 1.75rem', border: '1px solid rgba(197,160,89,0.2)', backgroundColor: '#faf8f5' }}>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', color: '#1a1510' }}>
                  {colab.nombre.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
