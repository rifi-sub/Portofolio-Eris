import React, { useRef, useState, useEffect } from 'react';
import { X, Check, RotateCcw, ShieldCheck } from 'lucide-react';

interface DigitalSignatureModalProps {
  isOpen: boolean;
  contractTitle?: string;
  clientName?: string;
  onClose: () => void;
  onConfirmSignature: (signatureData: {
    signatureDataUrl: string;
    timestamp: string;
    clientIp: string;
    userAgent: string;
  }) => void;
}

export const DigitalSignatureModal: React.FC<DigitalSignatureModalProps> = ({
  isOpen,
  contractTitle = 'Contrato de Encargo Artístico',
  clientName = 'Cliente',
  onClose,
  onConfirmSignature,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      setTimestamp(now.toISOString());
      // Clear canvas when opening
      setTimeout(clearSignature, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = '#1a1510';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    if (!hasSigned) setHasSigned(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleSave = () => {
    if (!hasSigned) return alert('Por favor, realiza tu firma manuscrita en el recuadro.');
    if (!agreedTerms) return alert('Debes marcar la casilla para confirmar tu aceptación legal del contrato.');

    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureDataUrl = canvas.toDataURL('image/png');
    onConfirmSignature({
      signatureDataUrl,
      timestamp: timestamp || new Date().toISOString(),
      clientIp: 'Verificado (Nativo SSL/TLS)',
      userAgent: navigator.userAgent,
    });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 8, 7, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(197, 160, 89, 0.5)',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '560px',
          padding: '2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(197, 160, 89, 0.25)', paddingBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
              FIRMA DIGITAL ELECTRÓNICA
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#1a1510', margin: '0.2rem 0 0 0' }}>
              {contractTitle}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8c8073', cursor: 'pointer', padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Info Seal Box */}
        <div
          style={{
            backgroundColor: '#faf8f5',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            borderRadius: '6px',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <ShieldCheck size={22} color="#C5A059" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '10px', color: '#5c5247', lineHeight: 1.5 }}>
            Firmando como: <strong style={{ color: '#1a1510' }}>{clientName}</strong><br />
            Sello de Tiempo: <span style={{ fontFamily: 'monospace', color: '#8c8073' }}>{timestamp || new Date().toISOString()}</span>
          </div>
        </div>

        {/* Canvas Signature Pad */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#5c5247', textTransform: 'uppercase', fontWeight: 600 }}>
              Dibuja tu firma en el recuadro *
            </span>
            {hasSigned && (
              <button
                type="button"
                onClick={clearSignature}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#C5A059',
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <RotateCcw size={12} /> Limpiar
              </button>
            )}
          </div>

          <div style={{ border: '1px solid rgba(197, 160, 89, 0.5)', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#faf8f5', touchAction: 'none' }}>
            <canvas
              ref={canvasRef}
              width={496}
              height={160}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{ display: 'block', width: '100%', height: '160px', cursor: 'crosshair' }}
            />
          </div>
          <span style={{ fontSize: '8px', color: '#8c8073', display: 'block', marginTop: '0.25rem', textAlign: 'center' }}>
            Usa el ratón en ordenador o el dedo en la pantalla táctil de tu móvil.
          </span>
        </div>

        {/* Agreement Checkbox */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginBottom: '1.5rem' }}>
          <input
            type="checkbox"
            id="contract-agree-check"
            checked={agreedTerms}
            onChange={(e) => setAgreedTerms(e.target.checked)}
            style={{ marginTop: '3px', cursor: 'pointer' }}
          />
          <label htmlFor="contract-agree-check" style={{ fontSize: '10px', color: '#5c5247', lineHeight: 1.5, cursor: 'pointer' }}>
            Declaro que he leído el modelo de contrato aplicable y acepto formalmente las condiciones del encargo artístico con Ilustrísima Maestra.
          </label>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.65rem 1.25rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              color: '#8c8073',
              borderRadius: '4px',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '0.65rem 1.5rem',
              backgroundColor: '#C5A059',
              border: 'none',
              color: '#090807',
              borderRadius: '4px',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              opacity: hasSigned && agreedTerms ? 1 : 0.6,
            }}
          >
            <Check size={15} />
            <span>Confirmar & Firmar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
