import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '../services/adminApi';
import { MediaPickerModal } from '../components/MediaPickerModal';

export const AdminContentEditor: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<'home_hero' | 'sobre_mi_bio' | 'contacto_info'>('home_hero');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const sectionDefaults: Record<string, { page: string; title: string; subtitle: string; content: string }> = {
    home_hero: {
      page: 'home',
      title: 'Ilustrísima Maestra',
      subtitle: 'EL ARTE ES EL PUENTE ENTRE MUNDOS',
      content: 'Estudio de ilustración de autor enfocado en arte editorial, diseño de personajes y concepto visual.'
    },
    sobre_mi_bio: {
      page: 'sobre-mi',
      title: 'Sobre Mí & Filosofía Artística',
      subtitle: 'Ilustradora & Artista Conceptual',
      content: 'Apasionada por la narrativa visual y el detalle minucioso. Con más de 8 años de experiencia colaborando con editoriales internacionales, estudios de animación y marcas independientes.'
    },
    contacto_info: {
      page: 'contacto',
      title: 'Ponte en Contacto',
      subtitle: 'Disponible para encargo y licencias',
      content: 'Email: contacto@ilustrisimamaestra.com\nInstagram: @ilustrisimamaestra\nPinterest: @ilustrisimamaestra'
    }
  };

  useEffect(() => {
    async function loadSection() {
      setLoading(true);
      setSaved(false);
      try {
        const sec = await adminApi.getContentSection(selectedSection);
        const defaults = sectionDefaults[selectedSection];
        setTitle(sec?.title || defaults.title);
        setSubtitle(sec?.subtitle || defaults.subtitle);
        setContent(sec?.content || defaults.content);
        setImages(sec?.images ? JSON.parse(sec.images) : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadSection();
  }, [selectedSection]);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      await adminApi.saveContentSection(selectedSection, {
        page: sectionDefaults[selectedSection].page,
        title,
        subtitle,
        content,
        images
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      alert('Error al guardar sección');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '2rem' }}>
          Gestión de Subapartados & Textos
        </h1>
        <p style={{ color: '#A3998D', margin: '0.5rem 0 0', fontSize: '0.95rem' }}>
          Selecciona el subapartado del portfolio para personalizar sus textos e imágenes principales.
        </p>
      </div>

      {/* Section Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(197,160,89,0.2)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setSelectedSection('home_hero')}
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: selectedSection === 'home_hero' ? 'rgba(197,160,89,0.2)' : 'transparent',
            color: selectedSection === 'home_hero' ? '#F3D89D' : '#A3998D',
            border: '1px solid',
            borderColor: selectedSection === 'home_hero' ? '#C5A059' : 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Inicio / Landing
        </button>

        <button
          onClick={() => setSelectedSection('sobre_mi_bio')}
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: selectedSection === 'sobre_mi_bio' ? 'rgba(197,160,89,0.2)' : 'transparent',
            color: selectedSection === 'sobre_mi_bio' ? '#F3D89D' : '#A3998D',
            border: '1px solid',
            borderColor: selectedSection === 'sobre_mi_bio' ? '#C5A059' : 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Sobre Mí
        </button>

        <button
          onClick={() => setSelectedSection('contacto_info')}
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: selectedSection === 'contacto_info' ? 'rgba(197,160,89,0.2)' : 'transparent',
            color: selectedSection === 'contacto_info' ? '#F3D89D' : '#A3998D',
            border: '1px solid',
            borderColor: selectedSection === 'contacto_info' ? '#C5A059' : 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Contacto & Redes
        </button>
      </div>

      {/* Editor Form */}
      <div style={{ backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '10px', padding: '2rem' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#A3998D' }}>Cargando datos...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Título Principal
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#090807',
                  border: '1px solid rgba(197,160,89,0.3)',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Subtítulo / Lema
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#090807',
                  border: '1px solid rgba(197,160,89,0.3)',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Contenido / Texto Principal
              </label>
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#090807',
                  border: '1px solid rgba(197,160,89,0.3)',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Imagen Principal de Sección */}
            <div>
              <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Imagen Destacada / Fondo de Sección
              </label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={images[0] || ''}
                  onChange={(e) => setImages([e.target.value])}
                  placeholder="/portfolio-hero.png o URL de biblioteca"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#090807',
                    border: '1px solid rgba(197,160,89,0.3)',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowMediaPicker(true)}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(197,160,89,0.2)',
                    border: '1px solid #C5A059',
                    borderRadius: '6px',
                    color: '#F3D89D',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <ImageIcon size={16} />
                  <span>Elegir Imagen</span>
                </button>
              </div>
              {images[0] && (
                <div style={{ marginTop: '0.75rem', width: '120px', height: '80px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(197,160,89,0.3)' }}>
                  <img
                    src={images[0].startsWith('/') ? `http://localhost:5000${images[0]}` : images[0]}
                    alt="Vista previa"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
              )}
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <button
                onClick={handleSave}
                style={{
                  padding: '0.85rem 2rem',
                  backgroundColor: '#C5A059',
                  color: '#090807',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Save size={18} />
                <span>Guardar Cambios</span>
              </button>

              {saved && (
                <div style={{ color: '#4ade80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle size={16} />
                  <span>¡Sección guardada correctamente!</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectUrl={(url) => setImages([url])}
      />
    </div>
  );
};
