import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';
import type { ProductMedia } from '../../types';
import { getMediaUrl } from '../../services/portfolioApi';
import { ImageLightboxModal } from './ImageLightboxModal';

export const ProductGallery: React.FC<{ title: string; coverImage: string; media?: ProductMedia[] }> = ({ title, coverImage, media = [] }) => {
  const entries = media.length ? media : [{ url: coverImage, type: 'IMAGE' as const }];
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const current = entries[index] || entries[0];
  const move = (amount: number) => setIndex((index + amount + entries.length) % entries.length);

  // Prepare images for lightbox (filtering images only)
  const imageEntries = entries
    .filter((m) => m.type === 'IMAGE' || !m.type)
    .map((m) => ({ url: m.url, altText: m.altText || title }));

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(197,160,89,.35)', padding: '1.25rem' }}>
      <div
        style={{
          position: 'relative',
          height: '460px',
          background: '#f5f2eb',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: current.type === 'IMAGE' ? 'pointer' : 'default',
        }}
        onClick={() => {
          if (current.type === 'IMAGE') setIsLightboxOpen(true);
        }}
      >
        {current.type === 'VIDEO' ? (
          <video
            src={getMediaUrl(current.url)}
            controls
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <>
            <img
              src={getMediaUrl(current.url)}
              alt={current.altText || title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transition: 'transform 0.3s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'rgba(20, 15, 10, 0.75)',
                color: '#F3D89D',
                padding: '0.4rem 0.75rem',
                borderRadius: '4px',
                border: '1px solid rgba(197, 160, 89, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '11px',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.05em',
                backdropFilter: 'blur(4px)',
                pointerEvents: 'none',
              }}
            >
              <Maximize2 size={13} />
              <span>AMPLIAR COMPLETA</span>
            </div>
          </>
        )}

        {entries.length > 1 && (
          <>
            <button
              aria-label="Anterior"
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '1rem',
                transform: 'translateY(-50%)',
                border: 0,
                borderRadius: '50%',
                padding: '.5rem',
                background: 'rgba(20,15,10,.75)',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Siguiente"
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              style={{
                position: 'absolute',
                top: '50%',
                right: '1rem',
                transform: 'translateY(-50%)',
                border: 0,
                borderRadius: '50%',
                padding: '.5rem',
                background: 'rgba(20,15,10,.75)',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {entries.length > 1 && (
        <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {entries.map((item, itemIndex) => (
            <button
              key={`${item.url}-${itemIndex}`}
              onClick={() => setIndex(itemIndex)}
              aria-label={`Ver elemento ${itemIndex + 1}`}
              style={{
                position: 'relative',
                flex: '0 0 72px',
                height: 72,
                padding: 0,
                border: itemIndex === index ? '2px solid #C5A059' : '1px solid rgba(197,160,89,.3)',
                background: '#f5f2eb',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              {item.type === 'VIDEO' ? (
                <>
                  <video src={getMediaUrl(item.url)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Play size={18} color="#fff" style={{ position: 'absolute', inset: '50% auto auto 50%', transform: 'translate(-50%, -50%)' }} />
                </>
              ) : (
                <img src={getMediaUrl(item.url)} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={imageEntries}
        initialIndex={Math.max(0, imageEntries.findIndex(img => img.url === current.url))}
        title={title}
      />
    </div>
  );
};
