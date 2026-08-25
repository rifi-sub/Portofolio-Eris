import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Clock, ArrowRight, HelpCircle } from 'lucide-react';
import { portfolioApi, getMediaUrl } from '../services/portfolioApi';
import { BackButton } from '../components/ui/BackButton';
import type { Service, FAQItem } from '../types';

export const Servicios: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([portfolioApi.getServices(), portfolioApi.getFAQs()]).then(([srvs, faqData]) => {
      setServices(srvs);
      setFaqs(faqData.filter((f) => f.category === 'portfolio' || f.category === 'contracts' || f.category === 'process'));
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#faf8f5', color: '#2c251e', minHeight: '100vh', padding: '2.5rem 2rem 5rem 2rem', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>

        {/* Header & Back Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <BackButton />
          <span style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>
            SERVICIOS Y ENCARGOS ✦ ILUSTRÍSIMA MAESTRA
          </span>
        </div>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.35em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            CONTRATACIÓN DE TRABAJOS
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '3.25rem',
              lineHeight: 1.15,
              letterSpacing: '0.06em',
              color: '#1a1510',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 400,
            }}
          >
            Servicios Creativos <span style={{ color: '#C5A059' }}>✦</span>
          </h1>

          <div style={{ fontSize: '12px', color: '#C5A059', marginBottom: '1rem' }}>✦ — — — ✦</div>

          <p style={{ fontSize: '12px', letterSpacing: '0.12em', color: '#5c5247', lineHeight: 1.8, margin: '0 auto 2rem auto' }}>
            Soluciones visuales personalizadas para editoriales, empresas, autores independientes y coleccionistas privados. Encuentra el servicio que necesitas para dar vida a tu proyecto.
          </p>

          <Link
            to="/servicios/presupuesto"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#C5A059',
              color: '#090807',
              padding: '0.75rem 1.75rem',
              borderRadius: '4px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(197, 160, 89, 0.25)',
            }}
          >
            <Sparkles size={16} />
            <span>SOLICITAR PRESUPUESTO PERSONALIZADO</span>
          </Link>
        </div>

        {/* Services List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#8c8073' }}>Cargando servicios...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
            {services.map((srv) => (
              <div
                key={srv.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(197, 160, 89, 0.35)',
                  borderRadius: '6px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease',
                }}
                className="card-hover-gold"
              >
                {/* Header Tag & Price */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.2em',
                      color: '#C5A059',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      border: '1px solid rgba(197, 160, 89, 0.4)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '3px',
                    }}
                  >
                    {srv.category}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1510', fontFamily: 'var(--font-cinzel)' }}>
                    {srv.priceFrom ? `Desde ${srv.priceFrom}€` : 'Consultar'}
                  </span>
                </div>

                {/* Cover Image */}
                <div style={{ width: '100%', height: '180px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem', background: '#f5f2eb' }}>
                  <img
                    src={getMediaUrl(srv.coverImage)}
                    alt={srv.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Title & Tagline */}
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#1a1510', margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                  {srv.title}
                </h2>
                <p style={{ fontSize: '11px', color: '#8c8073', fontStyle: 'italic', marginBottom: '1rem' }}>
                  "{srv.tagline}"
                </p>

                <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.7, marginBottom: '1.5rem', flex: 1 }}>
                  {srv.description}
                </p>

                {/* Deliverables List */}
                {srv.deliverables && srv.deliverables.length > 0 && (
                  <div style={{ borderTop: '1px dashed rgba(197, 160, 89, 0.3)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                      ✦ INCLUYE EN EL ENTREGABLE:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {srv.deliverables.slice(0, 4).map((deliv, idx) => (
                        <li key={idx} style={{ fontSize: '10px', color: '#6b6052', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <CheckCircle2 size={13} color="#C5A059" style={{ flexShrink: 0, marginTop: '1px' }} />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Delivery Time */}
                {srv.estimatedDelivery && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '10px', color: '#8c8073', marginBottom: '1.5rem' }}>
                    <Clock size={14} color="#C5A059" />
                    <span>Plazo estimado: <strong>{srv.estimatedDelivery}</strong></span>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <Link
                    to={`/servicios/${srv.slug}`}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      border: '1px solid rgba(197, 160, 89, 0.5)',
                      color: '#C5A059',
                      textAlign: 'center',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      textDecoration: 'none',
                      borderRadius: '4px',
                    }}
                  >
                    MÁS DETALLES
                  </Link>

                  <Link
                    to="/servicios/presupuesto"
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      backgroundColor: '#C5A059',
                      color: '#090807',
                      textAlign: 'center',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      textDecoration: 'none',
                      borderRadius: '4px',
                    }}
                  >
                    CONTRATAR
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Process Banner */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', borderRadius: '6px', padding: '3rem', marginBottom: '5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            METODOLOGÍA DE TRABAJO
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1a1510', marginBottom: '1.5rem', fontWeight: 400 }}>
            ¿Cómo funciona el proceso de contratación? <span style={{ color: '#C5A059' }}>✦</span>
          </h2>
          <p style={{ fontSize: '12px', color: '#5c5247', maxWidth: '650px', margin: '0 auto 2rem auto', lineHeight: 1.8 }}>
            Desde la primera idea hasta la entrega de los archivos finales listos para imprenta o entorno digital. Transparencia, comunicación constante y garantías contractuales en cada fase.
          </p>
          <Link
            to="/proceso-de-trabajo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#C5A059',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 600,
              textDecoration: 'none',
              borderBottom: '1px solid #C5A059',
              paddingBottom: '0.25rem',
            }}
          >
            <span>VER PASO A PASO DEL PROCESO</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Specific Service FAQs (Contenido Secundario) */}
        {faqs.length > 0 && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <HelpCircle size={24} color="#C5A059" style={{ marginBottom: '0.5rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1510', margin: 0 }}>
                Preguntas Frecuentes sobre la Contratación <span style={{ color: '#C5A059' }}>✦</span>
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(197, 160, 89, 0.25)',
                    borderRadius: '6px',
                    padding: '1.5rem',
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', margin: '0 0 0.5rem 0' }}>
                    {faq.question}
                  </h4>
                  <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.7, margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
