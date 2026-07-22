import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, BookOpen, Send, Palette } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody } from '../components/ui/Card';

export const SobreMi: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
      <Breadcrumb items={[{ label: 'Sobre Mí' }]} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '5rem',
        }}
      >
        <div>
          <Badge variant="terracotta" icon={<Sparkles size={14} />} style={{ marginBottom: '1rem' }}>
            Sobre el Ilustrador
          </Badge>
          <h1 style={{ marginBottom: '1.25rem' }}>Arte que cuenta historias profundas y memorables.</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Hola, soy un ilustrador y artista visual especializado en narrativa editorial, diseño de personajes y portadas de libros de género fantástico, histórico y contemporáneo.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Con más de 8 años de trayectoria en el sector, mi trabajo fusiona técnicas tradicionales como el óleo y la tinta china con flujos de trabajo digitales de vanguardia en Procreate y Photoshop.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/portfolio/presupuesto">
              <Button variant="primary" rightIcon={<Send size={18} />}>
                Trabajemos juntos
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline">Ver Portfolio</Button>
            </Link>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            style={{
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              border: '1px solid var(--border-dark)',
              boxShadow: 'var(--shadow-lg), var(--shadow-accent-glow)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
              alt="Ilustrador en el estudio"
              style={{ width: '100%', height: '480px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Studio Philosophy */}
      <section style={{ marginBottom: '5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Valores & Filosofía Creativa</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          <Card glass style={{ padding: '1.5rem' }}>
            <CardBody>
              <Palette size={32} color="var(--accent-terracotta)" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Narrativa Visual Única</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Cada pieza no es solo una imagen bonita; es una ventana cargada de simbolismo que amplifica la emoción de la historia redactada.
              </p>
            </CardBody>
          </Card>

          <Card glass style={{ padding: '1.5rem' }}>
            <CardBody>
              <BookOpen size={32} color="var(--accent-amber)" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Respeto Editorial</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Conocimiento riguroso de los estándares de imprenta, perfiles de color CMYK, márgenes de sangrado y maquetación de cubiertas.
              </p>
            </CardBody>
          </Card>

          <Card glass style={{ padding: '1.5rem' }}>
            <CardBody>
              <Award size={32} color="var(--accent-emerald)" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Compromiso Profesional</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Comunicación constante, fases transparentes de bocetado y cumplimiento estricto de las fechas límite acordadas.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
};
