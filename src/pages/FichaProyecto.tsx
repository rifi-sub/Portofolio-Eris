import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProjects, mockServices } from '../data/mockData';
import type { Project, Service } from '../types';

export const FichaProyecto: React.FC = () => {
  const { proyectoSlug } = useParams<{ servicioSlug: string; proyectoSlug: string }>();
  const proyecto: Project = mockProjects.find((p: Project) => p.slug === proyectoSlug) || mockProjects[0];
  const servicio: Service = mockServices.find((s: Service) => proyecto.serviceIds.includes(s.id)) || mockServices[0];

  return (
    <div className="page-container">
      <div className="section-wrapper">
        {/* Back Link */}
        <Link to={`/portfolio/${servicio.slug}`} className="link-gold" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
          <span>← VOLVER A {servicio.title}</span>
        </Link>

        {/* Project Header */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '3rem', marginBottom: '3rem' }}>
          <span className="section-subtitle">CASE STUDY DE ILUSTRACIÓN</span>
          <h1 className="page-title" style={{ fontSize: '3.25rem', marginBottom: '1.5rem' }}>
            {proyecto.title} <span style={{ color: '#C5A059' }}>✦</span>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', borderTop: '1px solid rgba(197, 160, 89, 0.2)', paddingTop: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#8c8073', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>CLIENTE</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1a1510' }}>{proyecto.client || 'Particular'}</span>
            </div>
            <div>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#8c8073', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>AÑO</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1a1510' }}>{proyecto.year || '2026'}</span>
            </div>
            <div>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#8c8073', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>DISCIPLINA</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1a1510' }}>{servicio.title}</span>
            </div>
          </div>
        </div>

        {/* Main Artwork Showcase Image */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ width: '100%', height: '520px', overflow: 'hidden', background: '#f5f2eb' }}>
            <img
              src={proyecto.coverImage}
              alt={proyecto.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Story & Concept */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <h3 className="section-title" style={{ fontSize: '1.75rem' }}>
              Concepto & Desarrollo Visual <span style={{ color: '#C5A059' }}>✦</span>
            </h3>
            <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {proyecto.description || proyecto.conceptText}
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '1.75rem' }}>
            <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', marginBottom: '1rem' }}>
              ¿TIENES UN PROYECTO SIMILAR?
            </h4>
            <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Podemos dar forma a tu visión con el mismo nivel de detalle narrativo y refinamiento técnico.
            </p>
            <Link to="/portfolio/presupuesto" className="btn-gold-primary" style={{ width: '100%' }}>
              <span>SOLICITAR ENCARGO</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
