import React, { useEffect, useState } from 'react';
import { Trash2, Copy, CheckCircle } from 'lucide-react';
import { adminApi } from '../services/adminApi';
import { ImageUploader } from '../components/ImageUploader';

export const AdminMediaLibrary: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    fetchMedia();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Deseas eliminar este archivo permanentemente?')) return;
    try {
      await adminApi.deleteMediaItem(id);
      fetchMedia();
    } catch (e) {
      alert('Error al eliminar archivo');
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = url.startsWith('/') ? `http://localhost:5000${url}` : url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '2rem' }}>
          Biblioteca de Medios & Archivos
        </h1>
        <p style={{ color: '#A3998D', margin: '0.5rem 0 0', fontSize: '0.95rem' }}>
          Sube y gestiona imágenes para tus obras, servicios, tienda y secciones de la web.
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <ImageUploader onUploadSuccess={fetchMedia} />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#A3998D' }}>Cargando imágenes...</div>
      ) : mediaItems.length === 0 ? (
        <div style={{ backgroundColor: '#12100E', padding: '3rem', borderRadius: '10px', textAlign: 'center', color: '#A3998D' }}>
          No hay archivos guardados en la biblioteca.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
          {mediaItems.map((item) => {
            const fullUrl = item.url.startsWith('/') ? `http://localhost:5000${item.url}` : item.url;
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#12100E',
                  border: '1px solid rgba(197,160,89,0.25)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ width: '100%', height: '140px', backgroundColor: '#000', overflow: 'hidden' }}>
                  <img
                    src={fullUrl}
                    alt={item.originalName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#F3D89D', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.5rem' }}>
                    {item.originalName}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => handleCopyUrl(item.url, item.id)}
                      style={{
                        background: 'none',
                        border: '1px solid rgba(197,160,89,0.3)',
                        color: copiedId === item.id ? '#4ade80' : '#A3998D',
                        borderRadius: '4px',
                        padding: '0.3rem 0.5rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      {copiedId === item.id ? <CheckCircle size={14} /> : <Copy size={14} />}
                      <span>{copiedId === item.id ? '¡Copiado!' : 'URL'}</span>
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#f87171',
                        cursor: 'pointer',
                        padding: '0.3rem'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
