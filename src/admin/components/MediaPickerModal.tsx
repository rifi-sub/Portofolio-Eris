import React, { useEffect, useState } from 'react';
import { X, Check, Image as ImageIcon, Film, Upload } from 'lucide-react';
import { adminApi, getMediaUrl } from '../services/adminApi';
import { ImageUploader } from './ImageUploader';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUrl?: (url: string) => void;
  onSelectUrls?: (urls: string[]) => void;
  multiple?: boolean;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectUrl,
  onSelectUrls,
  multiple = false,
  title = 'Seleccionar Contenido Multimedia'
}) => {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

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
      setSelectedUrls([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSelectUrl = (url: string) => {
    if (!multiple) {
      if (onSelectUrl) onSelectUrl(url);
      if (onSelectUrls) onSelectUrls([url]);
      onClose();
      return;
    }

    if (selectedUrls.includes(url)) {
      setSelectedUrls(selectedUrls.filter((u) => u !== url));
    } else {
      setSelectedUrls([...selectedUrls, url]);
    }
  };

  const handleConfirmMultiple = () => {
    if (selectedUrls.length > 0) {
      if (onSelectUrls) onSelectUrls(selectedUrls);
      if (onSelectUrl) onSelectUrl(selectedUrls[0]);
    }
    onClose();
  };

  const handleUploadedFiles = (uploaded: any[]) => {
    fetchMedia();
    const newUrls = uploaded.map((u) => u.url || u);
    if (newUrls.length > 0) {
      if (multiple && onSelectUrls) {
        onSelectUrls(newUrls);
      } else if (onSelectUrl) {
        onSelectUrl(newUrls[0]);
      }
      onClose();
    } else {
      setActiveTab('library');
    }
  };

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
        border: '1px solid rgba(197,160,89,0.35)',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '850px',
        maxHeight: '88vh',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ImageIcon size={18} color="#C5A059" />
            <h3 style={{ margin: 0, color: '#F3D89D', fontSize: '1.1rem', fontFamily: 'var(--font-serif, serif)' }}>
              {title}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Cerrar modal" style={{ background: 'none', border: 'none', color: '#A3998D', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs selector */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(197,160,89,0.2)', padding: '0 1.5rem', gap: '1rem' }}>
          <button
            onClick={() => setActiveTab('library')}
            style={{
              padding: '0.85rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'library' ? '2px solid #C5A059' : '2px solid transparent',
              color: activeTab === 'library' ? '#F3D89D' : '#A3998D',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem'
            }}
          >
            <ImageIcon size={16} />
            <span>Seleccionar de la Biblioteca ({mediaItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            style={{
              padding: '0.85rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'upload' ? '2px solid #C5A059' : '2px solid transparent',
              color: activeTab === 'upload' ? '#F3D89D' : '#A3998D',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem'
            }}
          >
            <Upload size={16} />
            <span>Subir Archivo Nuevo desde Dispositivo</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'upload' ? (
            <div style={{ padding: '1rem 0' }}>
              <ImageUploader multiple={multiple} onUploadSuccess={handleUploadedFiles} />
            </div>
          ) : loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#A3998D' }}>Cargando biblioteca de medios...</div>
          ) : mediaItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#A3998D' }}>
              <ImageIcon size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <div>No hay archivos en la biblioteca. Haz clic en "Subir Archivo Nuevo" arriba.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}>
              {mediaItems.map((item) => {
                const isSelected = selectedUrls.includes(item.url);
                const isVideo = item.mimeType?.startsWith('video/') || item.url?.match(/\.(mp4|webm|mov|mkv)$/i);

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleSelectUrl(item.url)}
                    style={{
                      position: 'relative',
                      aspectRatio: '1',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: isSelected ? '2px solid #C5A059' : '1px solid rgba(197,160,89,0.3)',
                      cursor: 'pointer',
                      backgroundColor: '#000',
                      boxShadow: isSelected ? '0 0 12px rgba(197,160,89,0.5)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isVideo ? (
                      <div style={{ width: '100%', height: '100%', position: 'relative', background: '#1a1815', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <video src={getMediaUrl(item.url)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                        <Film size={20} color="#F3D89D" style={{ position: 'absolute', top: '0.4rem', left: '0.4rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }} />
                      </div>
                    ) : (
                      <img
                        src={getMediaUrl(item.url)}
                        alt={item.originalName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}

                    {/* Check indicator for selection */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: isSelected ? 'rgba(197,160,89,0.45)' : 'rgba(0,0,0,0.3)',
                      opacity: isSelected ? 1 : 0,
                      transition: 'opacity 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }} className="media-hover-overlay">
                      <div style={{ background: '#C5A059', borderRadius: '50%', padding: '0.25rem', display: 'flex' }}>
                        <Check size={18} color="#000" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer for multiple selection confirmation */}
        {multiple && activeTab === 'library' && (
          <div style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid rgba(197,160,89,0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.4)'
          }}>
            <span style={{ fontSize: '0.85rem', color: '#F3D89D' }}>
              {selectedUrls.length} elemento(s) seleccionado(s)
            </span>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={onClose}
                style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(197,160,89,0.3)', color: '#A3998D', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmMultiple}
                disabled={selectedUrls.length === 0}
                style={{
                  padding: '0.5rem 1.25rem',
                  background: selectedUrls.length > 0 ? '#C5A059' : 'rgba(197,160,89,0.3)',
                  border: 'none',
                  color: '#090807',
                  borderRadius: '6px',
                  fontWeight: 700,
                  cursor: selectedUrls.length > 0 ? 'pointer' : 'not-allowed',
                  fontSize: '0.85rem'
                }}
              >
                Añadir Seleccionados ({selectedUrls.length})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
