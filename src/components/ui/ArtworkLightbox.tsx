import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../services/portfolioApi';
import type { Project } from '../../types';

interface ArtworkLightboxProps {
  artwork: Project | null;
  artworks: Project[];
  onClose: () => void;
  onSelectArtwork: (art: Project) => void;
}

export const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({
  artwork,
  artworks,
  onClose,
  onSelectArtwork,
}) => {
  if (!artwork) return null;

  const currentIndex = artworks.findIndex((a) => a.id === artwork.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onSelectArtwork(artworks[currentIndex - 1]);
    } else {
      onSelectArtwork(artworks[artworks.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < artworks.length - 1) {
      onSelectArtwork(artworks[currentIndex + 1]);
    } else {
      onSelectArtwork(artworks[0]);
    }
  };

  // Teclado: Escape para cerrar, Flechas para navegar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && artworks.length > 1) {
        const prevIdx = currentIndex > 0 ? currentIndex - 1 : artworks.length - 1;
        onSelectArtwork(artworks[prevIdx]);
      }
      if (e.key === 'ArrowRight' && artworks.length > 1) {
        const nextIdx = currentIndex < artworks.length - 1 ? currentIndex + 1 : 0;
        onSelectArtwork(artworks[nextIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, artworks, onClose, onSelectArtwork]);

  const imageUrl = getMediaUrl(artwork.coverImage);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 8, 7, 0.94)',
        backdropFilter: 'blur(12px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {/* Top Header Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto 1rem auto',
          color: '#ffffff',
        }}
      >
        <button
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            color: '#C5A059',
            padding: '0.4rem 0.85rem',
            borderRadius: '4px',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          <span>← Volver a la Galería</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '11px', color: '#A3998D', letterSpacing: '0.1em' }}>
            {currentIndex + 1} / {artworks.length}
          </span>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              background: 'none',
              border: 'none',
              color: '#F3D89D',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Center Image Container (Preserving Natural Aspect Ratio) */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Previous Button */}
        {artworks.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Anterior obra"
            style={{
              position: 'absolute',
              left: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              color: '#F3D89D',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(4px)',
            }}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* The artwork image */}
        <div style={{ maxWidth: '88vw', maxHeight: '72vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={imageUrl}
            alt={artwork.title}
            style={{
              maxWidth: '100%',
              maxHeight: '72vh',
              objectFit: 'contain',
              borderRadius: '4px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(197,160,89,0.15)',
              border: '1px solid rgba(197, 160, 89, 0.25)',
            }}
          />
        </div>

        {/* Next Button */}
        {artworks.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Siguiente obra"
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              color: '#F3D89D',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(4px)',
            }}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1000px',
          width: '100%',
          margin: '1.5rem auto 0 auto',
          background: 'rgba(18, 16, 14, 0.85)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: '8px',
          padding: '1.25rem 2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '9px',
                letterSpacing: '0.25em',
                color: '#C5A059',
                textTransform: 'uppercase',
                fontWeight: 600,
                border: '1px solid rgba(197, 160, 89, 0.4)',
                padding: '0.15rem 0.5rem',
                borderRadius: '3px',
              }}
            >
              {artwork.category || 'Ilustración'}
            </span>
            {artwork.year && (
              <span style={{ fontSize: '11px', color: '#8c8073' }}>
                {artwork.year} {artwork.client ? `· ${artwork.client}` : ''}
              </span>
            )}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              color: '#F3D89D',
              margin: '0.25rem 0',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            {artwork.title}
          </h3>

          {artwork.description && (
            <p style={{ fontSize: '11px', color: '#C8BEB0', lineHeight: 1.6, margin: '0.5rem 0 0 0', maxWidth: '600px' }}>
              {artwork.description}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/servicios/presupuesto"
            onClick={onClose}
            style={{
              padding: '0.6rem 1.25rem',
              backgroundColor: '#C5A059',
              color: '#090807',
              borderRadius: '4px',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none',
            }}
          >
            <Sparkles size={14} />
            <span>Encargar Obra Similar</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
