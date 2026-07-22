import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Compass as CompassIcon, Layers, CheckCircle } from 'lucide-react';

export const ProcesoDeTrabajo: React.FC = () => {
  const pasos = [
    {
      num: '01',
      titulo: 'BRIEFING & INVESTIGACIÓN',
      icono: Lightbulb,
      desc: 'Analizamos las necesidades narrativas, referencias estéticas, universo conceptual y objetivos finales del encargo.',
      entregables: 'Documento Briefing + Moodboard de referencias iniciales',
    },
    {
      num: '02',
      titulo: 'BOCETADO & COMPOSICIÓN',
      icono: CompassIcon,
      desc: 'Desarrollo de varios bocetos de composición rápida (thumbnails) y esquemas tonales para definir el encuadre perfecto.',
      entregables: '3 Propuestas de composición + Paleta cromática preliminar',
    },
    {
      num: '03',
      titulo: 'ILUSTRACIÓN & REFINAMIENTO',
      icono: Layers,
      desc: 'Ejecución detallada del trazo, volumen, texturas de pincel y pintura de luz con revisiones intermedias coordinadas.',
      entregables: 'Arte en proceso a resolución completa para feedback',
    },
    {
      num: '04',
      titulo: 'FINALIZACIÓN & ARTE FINAL',
      icono: CheckCircle,
      desc: 'Optimización de color para producción de imprenta (CMYK Fine Art) o pantallas (RGB 4K/8K) con entrega de licencias.',
      entregables: 'Archivos máster organizados + Certificado de Autenticidad',
    },
  ];

  return (
    <div className="page-container">
      <div className="section-wrapper">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem auto' }}>
          <span className="section-subtitle">METODOLOGÍA CREATIVA</span>
          <h1 className="page-title">
            PROCESO DE TRABAJO <span style={{ color: '#C5A059' }}>✦</span>
          </h1>

          <div className="star-ornament" style={{ justifyContent: 'center', margin: '1rem 0' }}>
            <span className="star-symbol">✦</span>
          </div>

          <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8 }}>
            Un flujo de trabajo riguroso, colaborativo y transparente estructurado en 4 fases para garantizar resultados de la máxima calidad artística.
          </p>
        </div>

        {/* Steps Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {pasos.map((paso) => {
            const Icono = paso.icono;
            return (
              <div key={paso.num} className="card-hover-gold" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#C5A059', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.75rem', fontWeight: 600 }}>{paso.num}</span>
                  <Icono size={24} />
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#1a1510', marginBottom: '1rem', fontWeight: 500 }}>
                  {paso.titulo}
                </h3>

                <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.7, marginBottom: '1.5rem', flex: 1 }}>
                  {paso.desc}
                </p>

                <div style={{ borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#C5A059', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>
                    ENTREGABLES:
                  </span>
                  <span style={{ fontSize: '10px', color: '#1a1510', fontWeight: 500 }}>{paso.entregables}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '3rem', textAlign: 'center' }}>
          <h3 className="section-title" style={{ fontSize: '2rem' }}>
            ¿Listo para iniciar tu encargo? <span style={{ color: '#C5A059' }}>✦</span>
          </h3>
          <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8, maxWidth: '540px', margin: '0 auto 2rem auto' }}>
            Reserva tu fecha de inicio en el calendario de producción de Ilustrísima Maestra.
          </p>
          <Link to="/portfolio/presupuesto" className="btn-gold-primary">
            <span>INICIAR PROYECTO</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
