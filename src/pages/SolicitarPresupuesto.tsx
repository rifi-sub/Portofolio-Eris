import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockServices } from '../data/mockData';
import type { Service } from '../types';
import { Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { ReferenceUploader, type ReferenceFile } from '../components/ui/ReferenceUploader';

export const SolicitarPresupuesto: React.FC = () => {
  const [servicioSel, setServicioSel] = useState(mockServices[0].id);
  const [enviado, setEnviado] = useState(false);
  const [referenceFiles, setReferenceFiles] = useState<ReferenceFile[]>([]);
  const [generatedToken, setGeneratedToken] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `enc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setGeneratedToken(token);
    setEnviado(true);
  };

  return (
    <div className="page-container">
      <div className="section-wrapper" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-subtitle">ENCARGOS & COLABORACIONES</span>
          <h1 className="page-title" style={{ fontSize: '3.25rem' }}>
            SOLICITAR PRESUPUESTO <span style={{ color: '#C5A059' }}>✦</span>
          </h1>

          <div className="star-ornament" style={{ justifyContent: 'center', margin: '1rem 0' }}>
            <span className="star-symbol">✦</span>
          </div>

          <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Rellena el formulario y adjunta tus archivos de referencia para recibir una propuesta técnica y económica detallada.
          </p>
        </div>

        {enviado ? (
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.5)', padding: '3.5rem', textAlign: 'center', borderRadius: '8px' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.15)', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle2 size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1a1510', marginBottom: '1rem' }}>
              ¡Solicitud Recibida con Éxito! <span style={{ color: '#C5A059' }}>✦</span>
            </h2>
            <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
              Gracias por tu interés. Hemos generado un **Enlace Mágico Privado** para que puedas realizar el seguimiento de tu encargo en todo momento sin necesidad de registrarte.
            </p>

            {referenceFiles.length > 0 && (
              <div style={{ fontSize: '10px', color: '#8c8073', marginBottom: '1.5rem' }}>
                ✦ Archivos de referencia recibidos: <strong>{referenceFiles.length} archivo(s)</strong>
              </div>
            )}

            <div style={{ marginBottom: '2rem' }}>
              <Link
                to={`/cliente/encargo?token=${generatedToken}`}
                className="btn-gold-primary"
                style={{ padding: '0.85rem 2rem', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <ExternalLink size={16} />
                <span>ACCEDER A MI ÁREA PRIVADA DE ENCARGO</span>
              </Link>
            </div>

            <button onClick={() => setEnviado(false)} className="btn-gold-outline" style={{ fontSize: '10px' }}>
              ENVIAR OTRA SOLICITUD
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '3rem', borderRadius: '8px' }}>
            {/* Step 1: Select Service */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
                1. SELECCIONA EL ÁREA DE SERVICIO
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {mockServices.map((srv: Service) => (
                  <div
                    key={srv.id}
                    onClick={() => setServicioSel(srv.id)}
                    style={{
                      border: servicioSel === srv.id ? '1px solid #C5A059' : '1px solid rgba(197, 160, 89, 0.25)',
                      background: servicioSel === srv.id ? 'rgba(197, 160, 89, 0.08)' : '#ffffff',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      borderRadius: '4px',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#C5A059', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>{srv.id} ✦</span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: '#1a1510', margin: 0, fontWeight: 500 }}>
                      {srv.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Form Inputs */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
                2. DATOS DE CONTACTO & DETALLES DEL PROYECTO
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#5c5247', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Nombre Completo *</span>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofía Mendoza"
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid rgba(197, 160, 89, 0.35)', fontSize: '11px', background: '#faf8f5', color: '#1a1510', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#5c5247', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Correo Electrónico *</span>
                  <input
                    type="email"
                    required
                    placeholder="sofia@ejemplo.com"
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid rgba(197, 160, 89, 0.35)', fontSize: '11px', background: '#faf8f5', color: '#1a1510', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#5c5247', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Plazo Estimado & Presupuesto Orientativo</span>
                <input
                  type="text"
                  placeholder="Ej. Entregables para Noviembre 2026 / Presupuesto aprox. 1.200€"
                  style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid rgba(197, 160, 89, 0.35)', fontSize: '11px', background: '#faf8f5', color: '#1a1510', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#5c5247', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Descripción Detallada del Encargo *</span>
                <textarea
                  required
                  rows={4}
                  placeholder="Explica tu idea, necesidades narrativas, formato final deseado..."
                  style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid rgba(197, 160, 89, 0.35)', fontSize: '11px', background: '#faf8f5', color: '#1a1510', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              {/* DIRECT REFERENCE FILE UPLOADER (Punto 7 del briefing) */}
              <ReferenceUploader
                maxFiles={8}
                maxSizeBytes={20 * 1024 * 1024}
                onFilesChange={(files) => setReferenceFiles(files)}
              />
            </div>

            <button type="submit" className="btn-gold-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Send size={15} />
              <span>ENVIAR SOLICITUD DE PRESUPUESTO</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
