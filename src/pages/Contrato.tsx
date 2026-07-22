import React from 'react';

export const Contrato: React.FC = () => {
  return (
    <div className="page-container">
      <div className="section-wrapper" style={{ maxWidth: '920px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle">TÉRMINOS & CONDICIONES</span>
          <h1 className="page-title">
            MARCO LEGAL & LICENCIAS <span style={{ color: '#C5A059' }}>✦</span>
          </h1>

          <div className="star-ornament" style={{ justifyContent: 'center', margin: '1rem 0' }}>
            <span className="star-symbol">✦</span>
          </div>

          <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8 }}>
            Condiciones generales aplicables a los encargos de ilustración comercial, derechos de propiedad intelectual y producción.
          </p>
        </div>

        {/* Content Box */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 1 */}
          <div>
            <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>CLÁUSULA 01</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#1a1510', marginBottom: '0.75rem' }}>
              Propiedad Intelectual & Derechos de Autor
            </h3>
            <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8 }}>
              Salvo acuerdo en contrario por escrito, Ilustrísima Maestra conserva los derechos morales de autor sobre todas las obras, ilustraciones y bocetos creados durante el encargo. El cliente adquiere la licencia de uso comercial para el ámbito, soporte y duración estipulados en el contrato específico del proyecto.
            </p>
          </div>

          {/* Section 2 */}
          <div style={{ borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '2rem' }}>
            <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>CLÁUSULA 02</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#1a1510', marginBottom: '0.75rem' }}>
              Condiciones de Pago & Calendario de Entregas
            </h3>
            <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8 }}>
              Todos los proyectos requieren un pago inicial del 50% en concepto de señal para reservar la fecha en el calendario de producción. El 50% restante se abonará tras la aprobación final del boceto y previo a la entrega de los archivos finales a alta resolución.
            </p>
          </div>

          {/* Section 3 */}
          <div style={{ borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '2rem' }}>
            <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>CLÁUSULA 03</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#1a1510', marginBottom: '0.75rem' }}>
              Política de Revisiones & Cambios
            </h3>
            <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8 }}>
              Cada proyecto incluye 2 rondas de revisiones gratuitas en la fase de bocetado preliminar. Cualquier modificación estructural posterior o cambio sustancial en la paleta de color una vez aprobada la fase inicial se presupuestará adicionalmente por horas de trabajo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
