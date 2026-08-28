import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2, FileText, Sparkles, MessageCircle, AlertCircle, Download, ShieldCheck, ArrowRight
} from 'lucide-react';
import { DigitalSignatureModal } from '../components/ui/DigitalSignatureModal';
import { getMediaUrl } from '../services/portfolioApi';

export interface CommissionProjectState {
  id: string;
  token: string;
  clientName: string;
  clientEmail: string;
  projectName: string;
  serviceType: string;
  contractType: 'particular' | 'editorial' | 'empresa' | 'marca';
  stage: 'SOLICITUD' | 'PRESUPUESTO' | 'CONTRATO' | 'RESERVA' | 'BOCETO' | 'COLOR' | 'PAGO_FINAL' | 'ENTREGA' | 'CANCELADO';
  
  // Quote details
  quote?: {
    totalPrice: number;
    depositAmount: number;
    remainingAmount: number;
    deliveryTimeframe: string;
    extraRevisionPercent: number; // e.g. 15%
    breakdownItems: { concept: string; price: number }[];
    status: 'PENDING' | 'ACCEPTED' | 'MODIFICATION_REQUESTED' | 'REJECTED';
    userNote?: string;
  };

  // Contract details
  contractSigned?: boolean;
  signatureData?: {
    signatureDataUrl: string;
    timestamp: string;
    clientIp: string;
  };

  // Payments
  depositPaid?: boolean;
  finalPaid?: boolean;

  // Revisions
  sketchImage?: string;
  sketchApproved?: boolean;

  colorImage?: string;
  colorApproved?: boolean;

  // Final deliverables
  deliverableFiles?: { name: string; url: string; size: string }[];

  // Action log
  historyLog: { date: string; action: string }[];

  // Admin notes (hidden from client, visible in admin)
  internalNotes?: string;
}

export const ClientPortalEncargo: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tokenParam = searchParams.get('token') || 'demo-token-123';

  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [showModifInput, setShowModifInput] = useState(false);

  // Mock initial state for demonstration / client portal
  const [project, setProject] = useState<CommissionProjectState>({
    id: 'enc-2026-089',
    token: tokenParam,
    clientName: 'Elena Rostova',
    clientEmail: 'elena@editorialplaneta.es',
    projectName: 'Portada Novela "La Flor y la Niebla"',
    serviceType: 'Ilustración Editorial & Portadas',
    contractType: 'editorial',
    stage: 'PRESUPUESTO',
    quote: {
      totalPrice: 900,
      depositAmount: 450,
      remainingAmount: 450,
      deliveryTimeframe: '3 Semanas',
      extraRevisionPercent: 15,
      breakdownItems: [
        { concept: 'Diseño de cubierta completa (Frontal, Lomo y Contraportada)', price: 650 },
        { concept: 'Licencia de Explotación Editorial Comercial Estándar', price: 150 },
        { concept: 'Mockup 3D hiperrealista para catálogo comercial', price: 100 }
      ],
      status: 'PENDING'
    },
    historyLog: [
      { date: '25 Agosto 2026', action: 'Solicitud de presupuesto enviada por el cliente' },
      { date: '26 Agosto 2026', action: 'Presupuesto técnico elaborado por Ilustrísima Maestra' }
    ]
  });

  const stagesList = [
    { key: 'SOLICITUD', label: '1. Solicitud' },
    { key: 'PRESUPUESTO', label: '2. Presupuesto' },
    { key: 'CONTRATO', label: '3. Contrato' },
    { key: 'RESERVA', label: '4. Reserva 50%' },
    { key: 'BOCETO', label: '5. Boceto (1ª Rev.)' },
    { key: 'COLOR', label: '6. Color (2ª Rev.)' },
    { key: 'PAGO_FINAL', label: '7. Pago 50%' },
    { key: 'ENTREGA', label: '8. Entrega Final' }
  ];

  const currentStageIndex = stagesList.findIndex(s => s.key === project.stage);

  // Action Handlers
  const handleAcceptQuote = () => {
    setProject(prev => ({
      ...prev,
      quote: prev.quote ? { ...prev.quote, status: 'ACCEPTED' } : undefined,
      stage: 'CONTRATO',
      historyLog: [
        ...prev.historyLog,
        { date: new Date().toLocaleDateString('es-ES'), action: 'Presupuesto aceptado por el cliente' }
      ]
    }));
  };

  const handleConfirmSignature = (sigData: any) => {
    setIsSignatureModalOpen(false);
    setProject(prev => ({
      ...prev,
      contractSigned: true,
      signatureData: sigData,
      stage: 'RESERVA',
      historyLog: [
        ...prev.historyLog,
        { date: new Date().toLocaleDateString('es-ES'), action: 'Contrato firmado digitalmente por el cliente' }
      ]
    }));
  };

  const handlePayDeposit = () => {
    setProject(prev => ({
      ...prev,
      depositPaid: true,
      stage: 'BOCETO',
      sketchImage: '/srv-concept.png',
      historyLog: [
        ...prev.historyLog,
        { date: new Date().toLocaleDateString('es-ES'), action: 'Reserva del 50% confirmada mediante pago online' }
      ]
    }));
  };

  const handleApproveSketch = () => {
    setProject(prev => ({
      ...prev,
      sketchApproved: true,
      stage: 'COLOR',
      colorImage: '/portfolio-hero.png',
      historyLog: [
        ...prev.historyLog,
        { date: new Date().toLocaleDateString('es-ES'), action: 'Boceto (1ª revisión) aprobado por el cliente' }
      ]
    }));
  };

  const handleApproveColor = () => {
    // AUTOMATIZACIÓN DEL SEGUNDO PAGO (Punto 14): Al aprobar color, habilita el pago del 50% restante
    setProject(prev => ({
      ...prev,
      colorApproved: true,
      stage: 'PAGO_FINAL',
      historyLog: [
        ...prev.historyLog,
        { date: new Date().toLocaleDateString('es-ES'), action: 'Color (2ª revisión) aprobado — Habilitado segundo pago del 50%' }
      ]
    }));
  };

  const handlePayFinal = () => {
    setProject(prev => ({
      ...prev,
      finalPaid: true,
      stage: 'ENTREGA',
      deliverableFiles: [
        { name: 'Portada_Completa_CMYK_300DPI.tiff', url: '#', size: '48.5 MB' },
        { name: 'Ilustracion_Digital_RGB.png', url: '#', size: '18.2 MB' },
        { name: 'Mockup_Libro_3D_Catalogo.png', url: '#', size: '8.4 MB' }
      ],
      historyLog: [
        ...prev.historyLog,
        { date: new Date().toLocaleDateString('es-ES'), action: 'Pago final del 50% confirmado — Archivos finales disponibles para descarga' }
      ]
    }));
  };

  return (
    <div style={{ backgroundColor: '#faf8f5', color: '#2c251e', minHeight: '100vh', padding: '2.5rem 2rem 5rem 2rem', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
              ÁREA PRIVADA DEL ENCARGO ✦ ILUSTRÍSIMA MAESTRA
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: '#1a1510', margin: '0.25rem 0 0 0', fontWeight: 400 }}>
              {project.projectName}
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '10px', color: '#8c8073', display: 'block' }}>Cliente: <strong>{project.clientName}</strong></span>
            <span style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>
              Ref: {project.id}
            </span>
          </div>
        </div>

        {/* CANCELLATION NOTICE IF CANCELLED */}
        {project.stage === 'CANCELADO' && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', padding: '1.5rem', marginBottom: '2rem', color: '#dc2626' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              <AlertCircle size={20} />
              <span>Este encargo ha sido marcado como Cancelado</span>
            </div>
            <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6, margin: 0 }}>
              Según las condiciones contractuales: Si se cancela antes de iniciar el trabajo, el importe de la reserva será reembolsado íntegramente. Si el trabajo ya ha iniciado, la reserva queda retenida según los términos acordados.
            </p>
          </div>
        )}

        {/* STEP PROGRESS TRACKER */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', borderRadius: '8px', padding: '1.5rem 1.75rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
            ESTADO ACTUAL DEL PROYECTO
          </span>

          <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '700px', position: 'relative' }}>
            {stagesList.map((stg, idx) => {
              const isDone = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div key={stg.key} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      margin: '0 auto 0.5rem auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: isDone ? '#C5A059' : isCurrent ? '#1a1510' : '#faf8f5',
                      color: isDone || isCurrent ? '#ffffff' : '#8c8073',
                      border: isCurrent ? '2px solid #C5A059' : '1px solid rgba(197, 160, 89, 0.4)',
                    }}
                  >
                    {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                  </div>
                  <span
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.05em',
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? '#C5A059' : isDone ? '#1a1510' : '#8c8073',
                      textTransform: 'uppercase',
                      display: 'block',
                    }}
                  >
                    {stg.label.split('. ')[1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STAGE 1 & 2: PRESUPUESTO SECTION */}
        {(project.stage === 'SOLICITUD' || project.stage === 'PRESUPUESTO') && project.quote && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', borderRadius: '8px', padding: '2.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>
                  PROPUESTA ECONÓMICA Y TÉCNICA
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', margin: '0.2rem 0 0 0' }}>
                  Presupuesto Detallado <span style={{ color: '#C5A059' }}>✦</span>
                </h2>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '9px', color: '#8c8073', textTransform: 'uppercase', display: 'block' }}>IMPORTE TOTAL</span>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.8rem', color: '#1a1510', fontWeight: 700 }}>
                  {project.quote.totalPrice}€
                </span>
              </div>
            </div>

            {/* Breakdown Items Table */}
            <div style={{ backgroundColor: '#faf8f5', border: '1px solid rgba(197, 160, 89, 0.25)', borderRadius: '6px', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                DESGLOSE DEL ENCARGO:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {project.quote.breakdownItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#5c5247', borderBottom: idx < project.quote!.breakdownItems.length - 1 ? '1px dashed rgba(197, 160, 89, 0.2)' : 'none', paddingBottom: '0.5rem' }}>
                    <span>✦ {item.concept}</span>
                    <strong style={{ color: '#1a1510' }}>{item.price}€</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem', fontSize: '11px', color: '#5c5247' }}>
              <div style={{ backgroundColor: '#faf8f5', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                <span style={{ fontSize: '9px', color: '#C5A059', display: 'block', fontWeight: 600 }}>RESERVA INICIAL</span>
                <strong>50% ({project.quote.depositAmount}€)</strong> al firmar contrato
              </div>
              <div style={{ backgroundColor: '#faf8f5', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                <span style={{ fontSize: '9px', color: '#C5A059', display: 'block', fontWeight: 600 }}>SEGUNDO PAGO</span>
                <strong>50% ({project.quote.remainingAmount}€)</strong> tras aprobar color
              </div>
              <div style={{ backgroundColor: '#faf8f5', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                <span style={{ fontSize: '9px', color: '#C5A059', display: 'block', fontWeight: 600 }}>REVISIONES INCLUIDAS</span>
                2 Rondas completas (Boceto + Color)
              </div>
            </div>

            {/* Quote Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '1.5rem' }}>
              <Link
                to="/proceso-de-trabajo"
                target="_blank"
                style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <span>Consultar Proceso de trabajo</span>
                <ArrowRight size={13} />
              </Link>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowModifInput(!showModifInput)}
                  style={{ padding: '0.65rem 1rem', backgroundColor: 'transparent', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#5c5247', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, borderRadius: '4px', cursor: 'pointer' }}
                >
                  Solicitar Modificación
                </button>

                <a
                  href="https://wa.me/?text=Hola%20Ilustr%C3%ADsima%20Maestra,%20tengo%20una%20duda%20sobre%20mi%20presupuesto"
                  target="_blank"
                  rel="noreferrer"
                  style={{ padding: '0.65rem 1rem', backgroundColor: 'transparent', border: '1px solid #25D366', color: '#25D366', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, borderRadius: '4px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <MessageCircle size={14} />
                  <span>Tengo una Duda</span>
                </a>

                <button
                  type="button"
                  onClick={handleAcceptQuote}
                  style={{ padding: '0.65rem 1.5rem', backgroundColor: '#C5A059', border: 'none', color: '#090807', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <CheckCircle2 size={15} />
                  <span>Aceptar Presupuesto</span>
                </button>
              </div>
            </div>

            {showModifInput && (
              <div style={{ marginTop: '1.25rem', backgroundColor: '#faf8f5', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(197, 160, 89, 0.3)' }}>
                <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#5c5247', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Indica los cambios o ajustes que deseas en la propuesta:</span>
                <textarea rows={3} placeholder="Ej. Querría modificar el número de ilustraciones interiores..." style={{ width: '100%', padding: '0.65rem', border: '1px solid rgba(197, 160, 89, 0.3)', fontSize: '11px', outline: 'none', resize: 'vertical' }} />
                <button type="button" onClick={() => { alert('Solicitud de modificación enviada'); setShowModifInput(false); }} className="btn-gold-primary" style={{ marginTop: '0.5rem', padding: '0.4rem 0.85rem', fontSize: '9px' }}>ENVIAR CAMBIOS</button>
              </div>
            )}
          </div>
        )}

        {/* STAGE 3: CONTRATO SECTION */}
        {project.stage === 'CONTRATO' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', borderRadius: '8px', padding: '2.5rem', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              ACUERDO LEGAL DE ENCARGO ARTÍSTICO
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', margin: '0 0 1.5rem 0' }}>
              Modelo de Contrato: {project.contractType.toUpperCase()} <span style={{ color: '#C5A059' }}>✦</span>
            </h2>

            <div style={{ backgroundColor: '#faf8f5', border: '1px solid rgba(197, 160, 89, 0.25)', borderRadius: '6px', padding: '1.5rem', maxHeight: '220px', overflowY: 'auto', fontSize: '11px', color: '#5c5247', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, color: '#1a1510' }}>
                CLÁUSULAS DEL ENCARGO (EDICIÓN {project.contractType.toUpperCase()}):
              </p>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                1. <strong>DERECHOS MORALES Y DE EXPLOTACIÓN:</strong> El autor mantiene los derechos morales sobre la obra final. Al cliente se le concede una licencia de explotación editorial comercial exclusiva para el soporte acordado.
              </p>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                2. <strong>REVISIONES Y MODIFICACIONES:</strong> El presupuesto incluye dos rondas de revisión (1ª Boceto, 2ª Color). Cualquier revisión adicional requerida tras la aprobación del color conllevará un suplemento del {project.quote?.extraRevisionPercent || 15}%.
              </p>
              <p style={{ margin: 0 }}>
                3. <strong>CANCELACIONES:</strong> Si se cancela antes de iniciar el trabajo, se reembolsará el 100% de la reserva. Si el trabajo ya ha sido iniciado, la reserva quedará retenida para cubrir horas de taller.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '10px', color: '#8c8073' }}>
                <ShieldCheck size={18} color="#C5A059" />
                <span>Firma mediante sello digital criptográfico con sellado de tiempo UTC</span>
              </div>

              <button
                type="button"
                onClick={() => setIsSignatureModalOpen(true)}
                className="btn-gold-primary"
              >
                <FileText size={15} />
                <span>FIRMAR CONTRATO DIGITALMENTE</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: RESERVA (50%) SECTION */}
        {project.stage === 'RESERVA' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', borderRadius: '8px', padding: '2.5rem', marginBottom: '2.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              PASARELA DE PAGO SEGURA
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', marginBottom: '1rem' }}>
              Reserva Inicial del 50% ({project.quote?.depositAmount}€) <span style={{ color: '#C5A059' }}>✦</span>
            </h2>
            <p style={{ fontSize: '12px', color: '#5c5247', maxWidth: '540px', margin: '0 auto 2rem auto', lineHeight: 1.7 }}>
              Una vez realizado el pago de la reserva, dará comienzo inmediatamente la fase de boceto y composición de tu encargo.
            </p>

            <button
              type="button"
              onClick={handlePayDeposit}
              className="btn-gold-primary"
              style={{ padding: '0.85rem 2.25rem', fontSize: '11px' }}
            >
              <Sparkles size={16} />
              <span>PAGAR RESERVA (50%) CON STRIPE / TARJETA</span>
            </button>
          </div>
        )}

        {/* STAGE 5 & 6: REVISIONES (BOCETO & COLOR) */}
        {(project.stage === 'BOCETO' || project.stage === 'COLOR') && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', borderRadius: '8px', padding: '2.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>
                  {project.stage === 'BOCETO' ? 'FASE 1 DE REVISIÓN' : 'FASE 2 DE REVISIÓN'}
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', margin: '0.2rem 0 0 0' }}>
                  {project.stage === 'BOCETO' ? 'Propuesta de Boceto & Composición' : 'Propuesta de Color & Paleta'} <span style={{ color: '#C5A059' }}>✦</span>
                </h2>
              </div>

              <span className="badge-gold">
                ✦ PENDIENTE DE TU APROBACIÓN
              </span>
            </div>

            {/* Revision Image Container */}
            <div style={{ width: '100%', maxHeight: '450px', overflow: 'hidden', borderRadius: '6px', border: '1px solid rgba(197, 160, 89, 0.3)', marginBottom: '1.5rem', background: '#000', display: 'flex', justifyContent: 'center' }}>
              <img
                src={getMediaUrl(project.stage === 'BOCETO' ? project.sketchImage : project.colorImage)}
                alt="Propuesta de revisión"
                style={{ maxHeight: '450px', width: 'auto', objectFit: 'contain' }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => alert('Por favor, indica en WhatsApp o por email los cambios específicos para esta revisión.')}
                style={{ padding: '0.75rem 1.25rem', backgroundColor: 'transparent', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#5c5247', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, borderRadius: '4px', cursor: 'pointer' }}
              >
                Solicitar Cambios en esta Fase
              </button>

              <button
                type="button"
                onClick={project.stage === 'BOCETO' ? handleApproveSketch : handleApproveColor}
                className="btn-gold-primary"
              >
                <CheckCircle2 size={16} />
                <span>APROBAR {project.stage === 'BOCETO' ? 'BOCETO' : 'COLOR & PALETA'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 7: SECOND PAYMENT (50% REMAINING UNLOCKED AUTOMATICALLY) */}
        {project.stage === 'PAGO_FINAL' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', borderRadius: '8px', padding: '2.5rem', marginBottom: '2.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              AUTOMATIZACIÓN DE PAGO FINAL
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', marginBottom: '1rem' }}>
              Color Aprobado ✓ · Segundo Pago del 50% ({project.quote?.remainingAmount}€) <span style={{ color: '#C5A059' }}>✦</span>
            </h2>
            <p style={{ fontSize: '12px', color: '#5c5247', maxWidth: '560px', margin: '0 auto 2rem auto', lineHeight: 1.7 }}>
              ¡La fase de color ha sido aprobada con éxito! Tras confirmar el pago del 50% restante, se procederá al renderizado final y generación de los entregables maestros.
            </p>

            <button
              type="button"
              onClick={handlePayFinal}
              className="btn-gold-primary"
              style={{ padding: '0.85rem 2.25rem', fontSize: '11px' }}
            >
              <Sparkles size={16} />
              <span>PAGAR SEGUNDO 50% ({project.quote?.remainingAmount}€)</span>
            </button>
          </div>
        )}

        {/* STAGE 8: FINAL DELIVERABLE FILES DOWNLOAD */}
        {project.stage === 'ENTREGA' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', borderRadius: '8px', padding: '2.5rem', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              PROYECTO FINALIZADO & ENTREGADO
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1a1510', margin: '0 0 1.5rem 0' }}>
              Descarga de Archivos Maestros <span style={{ color: '#C5A059' }}>✦</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {project.deliverableFiles?.map((file, idx) => (
                <div key={idx} style={{ backgroundColor: '#faf8f5', border: '1px solid rgba(197, 160, 89, 0.25)', borderRadius: '6px', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: '#1a1510', display: 'block' }}>{file.name}</strong>
                    <span style={{ fontSize: '9px', color: '#8c8073' }}>{file.size}</span>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert(`Descargando ${file.name}`); }}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#C5A059', color: '#090807', borderRadius: '4px', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Download size={14} /> Descargar
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HISTORIAL BÁSICO DEL PROYECTO */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.25)', borderRadius: '8px', padding: '1.75rem 2rem' }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
            HISTORIAL CRONOLÓGICO DE ACCIONES
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {project.historyLog.map((log, idx) => (
              <div key={idx} style={{ fontSize: '11px', color: '#5c5247', display: 'flex', gap: '1rem', borderBottom: idx < project.historyLog.length - 1 ? '1px dashed rgba(197,160,89,0.15)' : 'none', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#C5A059', fontWeight: 600, minWidth: '120px' }}>{log.date}</span>
                <span>✦ {log.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Signature Modal */}
        <DigitalSignatureModal
          isOpen={isSignatureModalOpen}
          contractTitle={`Contrato de Encargo: ${project.contractType.toUpperCase()}`}
          clientName={project.clientName}
          onClose={() => setIsSignatureModalOpen(false)}
          onConfirmSignature={handleConfirmSignature}
        />
      </div>
    </div>
  );
};
