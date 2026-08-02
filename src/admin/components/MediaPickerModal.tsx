import React, { useEffect, useState } from 'react';
import { X, Check, Image as ImageIcon } from 'lucide-react';
import { adminApi, getMediaUrl } from '../services/adminApi';
import { ImageUploader } from './ImageUploader';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUrl: (url: string) => void;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectUrl,
  title = 'Seleccionar Imagen'
}) => {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const items = await adminApi.getMediaItems();
      setMediaItems(items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(6px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#12100E',
        border: '1px solid rgba(197,160,89,0.3)',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 50px rgba(0,0,0,0.9)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(197,160,89,0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#F3D89D', fontSize: '1.1rem', fontFamily: 'var(--font-serif, serif)' }}>
            {title}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#A3998D', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(197,160,89,0.2)', padding: '0 1.5rem' }}>
          <button
            onClick={() => setActiveTab('library')}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'library' ? '2px solid #C5A059' : '2px solid transparent',
              color: activeTab === 'library' ? '#F3D89D' : '#A3998D',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Biblioteca de Medios ({mediaItems.length})
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'upload' ? '2px solid #C5A059' : '2px solid transparent',
              color: activeTab === 'upload' ? '#F3D89D' : '#A3998D',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Subir Nueva Imagen
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'upload' ? (
            <ImageUploader onUploadSuccess={() => { fetchMedia(); setActiveTab('library'); }} />
          ) : loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#A3998D' }}>Cargando imágenes...</div>
          ) : mediaItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#A3998D' }}>
              <ImageIcon size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <div>No hay imágenes en la biblioteca. ¡Sube alguna primero!</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}>
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectUrl(item.url);
                    onClose();
                  }}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid rgba(197,160,89,0.3)',
                    cursor: 'pointer',
                    backgroundColor: '#000'
                  }}
                >
                  <img
                    src={getMediaUrl(item.url)}
                    alt={item.originalName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(197,160,89,0.3)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }} className="media-hover-overlay">
                    <Check size={24} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
