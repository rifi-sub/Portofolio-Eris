import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getMediaUrl } from '../../services/portfolioApi';

export interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ url: string; altText?: string }>;
  initialIndex?: number;
  title?: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, images.length]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 12, 9, 0.94)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      {/* Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#F3D89D',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Maximize2 size={18} color="#C5A059" />
          <span
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#F3D89D',
              fontWeight: 600,
            }}
          >
            {title || 'VISTA AMPLIADA SIN RECOORTES'}
          </span>
          {images.length > 1 && (
            <span
              style={{
                fontSize: '11px',
                color: '#C5A059',
                marginLeft: '0.5rem',
                padding: '2px 8px',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                borderRadius: '3px',
              }}
            >
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          aria-label="Cerrar vista ampliada"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(197, 160, 89, 0.5)',
            color: '#F3D89D',
            padding: '0.5rem',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Viewport */}
      <div
        style={{
          position: 'relative',
          maxWidth: '92vw',
          maxHeight: '82vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={getMediaUrl(currentImage.url)}
          alt={currentImage.altText || title || 'Imagen completa del producto'}
          style={{
            maxWidth: '100%',
            maxHeight: '82vh',
            objectFit: 'contain',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            background: 'rgba(255, 255, 255, 0.03)',
          }}
        />

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Imagen anterior"
            style={{
              position: 'absolute',
              left: '-3.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(20, 15, 10, 0.8)',
              border: '1px solid rgba(197, 160, 89, 0.6)',
              color: '#F3D89D',
              borderRadius: '50%',
              padding: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Imagen siguiente"
            style={{
              position: 'absolute',
              right: '-3.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(20, 15, 10, 0.8)',
              border: '1px solid rgba(197, 160, 89, 0.6)',
              color: '#F3D89D',
              borderRadius: '50%',
              padding: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
            }}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Footer Info */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          textAlign: 'center',
          color: 'rgba(243, 216, 157, 0.85)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
        }}
      >
        {currentImage.altText && <p style={{ margin: 0 }}>{currentImage.altText}</p>}
        <p style={{ margin: '4px 0 0 0', opacity: 0.6, fontSize: '10px' }}>
          Haz clic fuera de la imagen o pulsa Esc para cerrar
        </p>
      </div>
    </div>
  );
};
