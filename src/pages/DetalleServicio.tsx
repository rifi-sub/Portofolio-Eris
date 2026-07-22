import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, DollarSign, Send, ArrowRight, FileText } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';
import { mockServices, mockProjects } from '../data/mockData';

export const DetalleServicio: React.FC = () => {
  const { servicioSlug } = useParams<{ servicioSlug: string }>();
  const service = mockServices.find((s) => s.slug === servicioSlug) || mockServices[0];

  // Find projects associated with this service
  const relatedProjects = mockProjects.filter((p) => p.serviceIds.includes(service.id));

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
      <Breadcrumb
        items={[
          { label: 'Portfolio', url: '/portfolio' },
          { label: service.title },
        ]}
      />

      {/* Hero Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '4rem',
        }}
      >
        <div>
          <Badge variant="terracotta" style={{ marginBottom: '1rem' }}>
            Detalle del Servicio
          </Badge>
          <h1 style={{ marginBottom: '1rem' }}>{service.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {service.tagline}
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            {service.description}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '2rem',
              padding: '1.25rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-dark)',
              marginBottom: '2rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <DollarSign size={16} color="var(--accent-terracotta)" />
                <span>Inversión</span>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--accent-terracotta)' }}>
                Desde {service.priceFrom} {service.currency || '€'}
              </div>
            </div>

            {service.estimatedDelivery && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <Clock size={16} color="var(--accent-amber)" />
                  <span>Plazo estimado</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {service.estimatedDelivery}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to={`/portfolio/presupuesto?service=${service.id}`}>
              <Button variant="primary" size="lg" rightIcon={<Send size={18} />}>
                Solicitar este Servicio
              </Button>
            </Link>
            <Link to="/proceso-de-trabajo">
              <Button variant="outline" size="lg" leftIcon={<FileText size={18} />}>
                Ver Proceso Creativo
              </Button>
            </Link>
          </div>
        </div>

        {/* Cover Graphic */}
        <div style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden', border: '1px solid var(--border-dark)', boxShadow: 'var(--shadow-lg)' }}>
          <img src={service.coverImage} alt={service.title} style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Deliverables Grid */}
      <section style={{ marginBottom: '5rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>¿Qué incluye este servicio?</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {service.deliverables.map((deliverable, idx) => (
            <Card key={idx}>
              <CardBody style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <CheckCircle2 size={24} color="var(--accent-terracotta)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Entregable #{idx + 1}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{deliverable}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Related Projects Showcase */}
      {relatedProjects.length > 0 && (
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <Badge variant="amber" style={{ marginBottom: '0.5rem' }}>Casos de Estudio</Badge>
              <h2>Proyectos Realizados en este Servicio</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {relatedProjects.map((proj) => (
              <Card key={proj.id} interactive>
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={proj.coverImage} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <CardBody>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>{proj.title}</h3>
                  {proj.subtitle && <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{proj.subtitle}</p>}
                  <Link to={`/portfolio/${service.slug}/${proj.slug}`}>
                    <Button variant="outline" size="sm" fullWidth rightIcon={<ArrowRight size={14} />}>
                      Ver Ficha de Proyecto
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Service FAQs if available */}
      {service.faq && service.faq.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Preguntas Frecuentes sobre este Servicio</h2>
          <Accordion
            items={service.faq.map((item, idx) => ({
              id: `faq-${idx}`,
              title: item.question,
              content: item.answer,
            }))}
          />
        </section>
      )}
    </div>
  );
};
