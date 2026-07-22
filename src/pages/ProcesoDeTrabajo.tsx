import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Clock, FileText, Send, Layers } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody } from '../components/ui/Card';
import { mockWorkflowSteps } from '../data/mockData';

export const ProcesoDeTrabajo: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
      <Breadcrumb items={[{ label: 'Proceso de Trabajo' }]} />

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <Badge variant="terracotta" icon={<Sparkles size={14} />} style={{ marginBottom: '0.75rem' }}>
          Metodología del Estudio
        </Badge>
        <h1 style={{ marginBottom: '1rem' }}>Cómo Cobran Vida Tus Ilustraciones</h1>
        <p style={{ fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
          Un proceso transparente, colaborativo y estructurado en 4 etapas claras para garantizar que el resultado final supere tus expectativas.
        </p>
      </div>

      {/* Timeline steps */}
      <div style={{ maxWidth: '900px', margin: '0 auto 5rem auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {mockWorkflowSteps.map((step) => (
          <Card key={step.stepNumber} glass style={{ position: 'relative', overflow: 'visible' }}>
            <CardBody style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent-terracotta) 0%, var(--accent-amber) 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                    }}
                  >
                    0{step.stepNumber}
                  </div>
                  <h3 style={{ fontSize: '1.4rem' }}>{step.title}</h3>
                </div>

                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.75rem',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-dark)',
                    fontSize: '0.85rem',
                    color: 'var(--accent-amber)',
                  }}
                >
                  <Clock size={15} />
                  <span>Duración estimada: <strong>{step.duration}</strong></span>
                </div>
              </div>

              {/* Deliverable Callout Box */}
              <div
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  borderLeft: '4px solid var(--accent-terracotta)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--accent-terracotta)" />
                  <span>Entregable de esta fase</span>
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {step.deliverablesSummary}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Process Guarantees */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-2xl)',
          padding: '3rem 2rem',
          border: '1px solid var(--border-dark)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem',
        }}
      >
        <div>
          <Layers size={32} color="var(--accent-terracotta)" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Revisiones Incluidas</h4>
          <p style={{ fontSize: '0.9rem' }}>
            Cada contrato incluye 2 rondas de revisiones estructurales en boceto y 2 rondas de ajustes de color para asegurar tu total satisfacción.
          </p>
        </div>

        <div>
          <FileText size={32} color="var(--accent-amber)" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Licencia & Propiedad</h4>
          <p style={{ fontSize: '0.9rem' }}>
            Firmamos un contrato de cesión de derechos de explotación comercial con especificaciones transparentes desde el día uno.
          </p>
        </div>

        <div>
          <Send size={32} color="var(--accent-emerald)" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Entrega puntual</h4>
          <p style={{ fontSize: '0.9rem' }}>
            Trabajamos con calendarios estrictos y entregas parciales para cumplir siempre los plazos de imprenta o lanzamiento.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>¿Listo para empezar tu encargo?</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/portfolio/presupuesto">
            <Button variant="primary" size="lg" rightIcon={<Send size={18} />}>
              Solicitar Presupuesto
            </Button>
          </Link>
          <Link to="/contrato">
            <Button variant="outline" size="lg">
              Consultar Términos del Contrato
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
