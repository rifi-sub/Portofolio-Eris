import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Cpu, Award, Quote, Send } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody } from '../components/ui/Card';
import { mockServices, mockProjects } from '../data/mockData';

export const FichaProyecto: React.FC = () => {
  const { servicioSlug, proyectoSlug } = useParams<{ servicioSlug: string; proyectoSlug: string }>();

  const currentService = mockServices.find((s) => s.slug === servicioSlug) || mockServices[0];
  const project = mockProjects.find((p) => p.slug === proyectoSlug) || mockProjects[0];

  // Associated services list
  const associatedServices = mockServices.filter((s) => project.serviceIds.includes(s.id));

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
      {/* Strict Breadcrumb Pattern: Inicio > Portfolio > Servicio > Proyecto */}
      <Breadcrumb
        items={[
          { label: 'Portfolio', url: '/portfolio' },
          { label: currentService.title, url: `/portfolio/${currentService.slug}` },
          { label: project.title },
        ]}
      />

      {/* Project Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="dark">{tag}</Badge>
          ))}
        </div>
        <h1 style={{ marginBottom: '0.5rem' }}>{project.title}</h1>
        {project.subtitle && (
          <p style={{ fontSize: '1.25rem', color: 'var(--accent-terracotta)', fontWeight: 500 }}>
            {project.subtitle}
          </p>
        )}
      </div>

      {/* Optional Metadata Grid - Conditionally Rendered */}
      {(project.client || project.year || project.software || project.role) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-dark)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem 2rem',
            marginBottom: '3rem',
          }}
        >
          {project.client && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <User size={15} color="var(--accent-terracotta)" />
                <span>Cliente</span>
              </div>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{project.client}</div>
            </div>
          )}

          {project.year && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <Calendar size={15} color="var(--accent-amber)" />
                <span>Año</span>
              </div>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{project.year}</div>
            </div>
          )}

          {project.role && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <Award size={15} color="var(--accent-rose)" />
                <span>Rol del Artista</span>
              </div>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{project.role}</div>
            </div>
          )}

          {project.software && project.software.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <Cpu size={15} color="var(--accent-emerald)" />
                <span>Herramientas</span>
              </div>
              <div style={{ fontWeight: 500, marginTop: '0.2rem', fontSize: '0.9rem' }}>
                {project.software.join(', ')}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Cover Image */}
      <div
        style={{
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          border: '1px solid var(--border-dark)',
          marginBottom: '3.5rem',
          maxHeight: '600px',
        }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Project Narrative Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        <div>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>El Desafío & Concepto</h2>
          {project.description && (
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {project.description}
            </p>
          )}
          {project.conceptText && (
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              {project.conceptText}
            </p>
          )}
        </div>

        {project.resultSummary && (
          <div>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Resultados & Impacto</h2>
            <Card style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
              <CardBody>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                  {project.resultSummary}
                </p>
              </CardBody>
            </Card>
          </div>
        )}
      </div>

      {/* Optional Gallery Grid - Conditionally Rendered */}
      {project.gallery && project.gallery.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Galería del Proyecto</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {project.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-dark)',
                  height: '280px',
                }}
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} detalle ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Optional Testimonial - Conditionally Rendered */}
      {project.testimonial && (
        <section style={{ marginBottom: '4rem' }}>
          <Card glass style={{ padding: '2rem', borderLeft: '4px solid var(--accent-terracotta)' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--accent-terracotta)' }}>
              <Quote size={32} />
            </div>
            <p style={{ fontSize: '1.15rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              "{project.testimonial.text}"
            </p>
            <div>
              <div style={{ fontWeight: 700 }}>{project.testimonial.author}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {project.testimonial.role} {project.testimonial.company ? `— ${project.testimonial.company}` : ''}
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Many-to-Many Associated Services */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          border: '1px solid var(--border-dark)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Servicios asociados a este encargo</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {associatedServices.map((s) => (
              <Link key={s.id} to={`/portfolio/${s.slug}`}>
                <Badge variant="terracotta" style={{ cursor: 'pointer' }}>{s.title}</Badge>
              </Link>
            ))}
          </div>
        </div>

        <Link to={`/portfolio/presupuesto?service=${currentService.id}`}>
          <Button variant="primary" rightIcon={<Send size={16} />}>
            Solicitar encargo similar
          </Button>
        </Link>
      </section>
    </div>
  );
};
