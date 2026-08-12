import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { adminApi, getMediaUrl } from '../services/adminApi';
import { MediaPickerModal } from '../components/MediaPickerModal';

type SectionKey = 'home_hero' | 'portfolio_hero' | 'store_hero' | 'sobre_mi_bio' | 'contacto_info';

interface FormacionItem { ano: string; titulo: string; centro: string; }
interface SoftwareItem { code: string; name: string; category: string; }
interface ExperienciaItem { periodo: string; puesto: string; descripcion: string; }

export const AdminContentEditor: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<SectionKey>('home_hero');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  
  // Extra metadata for Sobre Mí
  const [formacion, setFormacion] = useState<FormacionItem[]>([]);
  const [softwares, setSoftwares] = useState<SoftwareItem[]>([]);
  const [experiencia, setExperiencia] = useState<ExperienciaItem[]>([]);

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
    portfolio_hero: {
      page: 'portfolio',
      title: 'ILUSTRÍSIMA MAESTRA',
      subtitle: 'BIENVENIDO A MI PORTFOLIO',
      content: 'Ilustración y arte conceptual para proyectos que buscan contar historias inolvidables.'
    },
    store_hero: {
      page: 'tienda',
      title: 'TIENDA DE ARTE DE AUTOR',
      subtitle: 'OBRAS DE AUTOR & EDICIONES LIMITADAS',
      content: 'Explora colecciones exclusivas de láminas Fine Art impresas en papel de algodón de 310g, piezas al óleo originales y recursos digitales para creadores.'
    },
    sobre_mi_bio: {
      page: 'sobre-mi',
      title: 'ILUSTRAR ES CONTAR LO INVISIBLE',
      subtitle: 'SOBRE MÍ',
      content: 'Soy ilustradora y narradora visual. Transformo ideas, emociones y mundos en imágenes que permanecen.\n\nMi trabajo nace de la observación, la sensibilidad y el amor por los detalles. Me inspiran la naturaleza, el simbolismo, las historias y todo lo que habita entre la realidad y la fantasía.'
    },
    contacto_info: {
      page: 'contacto',
      title: 'CONTACTO & ESTUDIO',
      subtitle: 'CANAL DIRECTO',
      content: '¿Tienes una propuesta editorial, encargo particular o consulta sobre la tienda? Estaré encantada de leerte.'
    }
  };

  const defaultFormacion: FormacionItem[] = [
    { ano: '2017', titulo: 'Grado en Bellas Artes', centro: 'Universidad de Sevilla' },
    { ano: '2019', titulo: 'Máster en Ilustración y Concept Art', centro: 'ECV, Valencia' },
    { ano: '2021', titulo: 'Curso de Grabado y Técnicas de Impresión', centro: 'Taller de Arte La Gráfica, Madrid' }
  ];

  const defaultSoftwares: SoftwareItem[] = [
    { code: 'Ps', name: 'Adobe Photoshop', category: 'Pintura & Edición' },
    { code: 'Cp', name: 'Clip Studio Paint', category: 'Entintado & Cómic' },
    { code: 'Pr', name: 'Procreate', category: 'Ilustración Digital' },
    { code: 'Ai', name: 'Adobe Illustrator', category: 'Arte Vectorial' },
    { code: 'Id', name: 'Adobe InDesign', category: 'Maquetación Editorial' }
  ];

  const defaultExperiencia: ExperienciaItem[] = [
    { periodo: '2018 — Actualidad', puesto: 'Ilustradora Freelance', descripcion: 'Proyectos editoriales, concept art, portadas, ilustración publicitaria y encargos personalizados.' },
    { periodo: '2021 — 2023', puesto: 'Ilustradora y Diseñadora', descripcion: 'Estudio Gráfico Nórdico. Desarrollo de campañas visuales y diseño de material editorial.' },
    { periodo: '2019 — 2021', puesto: 'Concept Artist Junior', descripcion: 'Legendary Games. Diseño de personajes, escenarios y props para videojuegos.' }
  ];

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
        setImages(sec?.images ? (typeof sec.images === 'string' ? JSON.parse(sec.images) : sec.images) : []);

        if (selectedSection === 'sobre_mi_bio') {
          let metaObj: any = {};
          if (sec?.metadata) {
            metaObj = typeof sec.metadata === 'string' ? JSON.parse(sec.metadata) : sec.metadata;
          }
          setFormacion(metaObj.formacion || defaultFormacion);
          setSoftwares(metaObj.softwares || defaultSoftwares);
          setExperiencia(metaObj.experiencia || defaultExperiencia);
        }
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
      const payload: any = {
        page: sectionDefaults[selectedSection].page,
        title,
        subtitle,
        content,
        images
      };

      if (selectedSection === 'sobre_mi_bio') {
        payload.metadata = JSON.stringify({ formacion, softwares, experiencia });
      }

      await adminApi.saveContentSection(selectedSection, payload);
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
          Selecciona el subapartado del portfolio para personalizar sus textos, imágenes principales e información detallada.
        </p>
      </div>

      {/* Section Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(197,160,89,0.2)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { key: 'home_hero', label: 'Inicio / Landing' },
          { key: 'portfolio_hero', label: 'Portada Portfolio' },
          { key: 'store_hero', label: 'Tienda & Banner' },
          { key: 'sobre_mi_bio', label: 'Sobre Mí' },
          { key: 'contacto_info', label: 'Contacto & Redes' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedSection(tab.key as SectionKey)}
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: selectedSection === tab.key ? 'rgba(197,160,89,0.2)' : 'transparent',
              color: selectedSection === tab.key ? '#F3D89D' : '#A3998D',
              border: '1px solid',
              borderColor: selectedSection === tab.key ? '#C5A059' : 'transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor Form */}
      <div style={{ backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '10px', padding: '2rem' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#A3998D' }}>Cargando datos...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                TÍTULO PRINCIPAL
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
                SUBTÍTULO / LEMA
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
                CONTENIDO / TEXTO PRINCIPAL
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

            {/* Imagen Principal / Banner / Hero */}
            <div>
              <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                IMAGEN DESTACADA / PORTADA / BANNER DE SECCIÓN
              </label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={images[0] || ''}
                  onChange={(e) => setImages([e.target.value])}
                  placeholder="/portfolio-hero.png o URL de la biblioteca"
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
                    gap: '0.5rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <ImageIcon size={16} />
                  <span>Elegir Imagen</span>
                </button>
              </div>
              {images[0] && (
                <div style={{ marginTop: '0.75rem', width: '160px', height: '100px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(197,160,89,0.3)', backgroundColor: '#000' }}>
                  <img
                    src={getMediaUrl(images[0])}
                    alt="Vista previa"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
              )}
            </div>

            {/* SECCIÓN ESPECIAL SOBRE MÍ: Formación, Softwares, Experiencia */}
            {selectedSection === 'sobre_mi_bio' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(197,160,89,0.25)' }}>
                {/* 1. Formación */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#C5A059', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em' }}>FORMACIÓN ACADÉMICA</h3>
                    <button
                      type="button"
                      onClick={() => setFormacion([...formacion, { ano: '2024', titulo: '', centro: '' }])}
                      style={{ padding: '0.4rem 0.8rem', backgroundColor: 'rgba(197,160,89,0.2)', border: '1px solid #C5A059', color: '#F3D89D', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Plus size={14} /> Añadir Formación
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {formacion.map((item, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 40px', gap: '0.5rem', alignItems: 'center', backgroundColor: '#090807', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(197,160,89,0.2)' }}>
                        <input placeholder="Año" value={item.ano} onChange={(e) => { const next = [...formacion]; next[idx].ano = e.target.value; setFormacion(next); }} style={{ padding: '0.4rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }} />
                        <input placeholder="Título / Grado" value={item.titulo} onChange={(e) => { const next = [...formacion]; next[idx].titulo = e.target.value; setFormacion(next); }} style={{ padding: '0.4rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }} />
                        <input placeholder="Universidad / Centro" value={item.centro} onChange={(e) => { const next = [...formacion]; next[idx].centro = e.target.value; setFormacion(next); }} style={{ padding: '0.4rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }} />
                        <button type="button" onClick={() => setFormacion(formacion.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Softwares */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#C5A059', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em' }}>SOFTWARES QUE UTILIZO</h3>
                    <button
                      type="button"
                      onClick={() => setSoftwares([...softwares, { code: 'Software', name: '', category: '' }])}
                      style={{ padding: '0.4rem 0.8rem', backgroundColor: 'rgba(197,160,89,0.2)', border: '1px solid #C5A059', color: '#F3D89D', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Plus size={14} /> Añadir Software
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {softwares.map((sw, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 40px', gap: '0.5rem', alignItems: 'center', backgroundColor: '#090807', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(197,160,89,0.2)' }}>
                        <input placeholder="Código (ej: Ps)" value={sw.code} onChange={(e) => { const next = [...softwares]; next[idx].code = e.target.value; setSoftwares(next); }} style={{ padding: '0.4rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }} />
                        <input placeholder="Nombre Software" value={sw.name} onChange={(e) => { const next = [...softwares]; next[idx].name = e.target.value; setSoftwares(next); }} style={{ padding: '0.4rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }} />
                        <input placeholder="Categoría (ej: Pintura)" value={sw.category} onChange={(e) => { const next = [...softwares]; next[idx].category = e.target.value; setSoftwares(next); }} style={{ padding: '0.4rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }} />
                        <button type="button" onClick={() => setSoftwares(softwares.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Experiencia Profesional */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#C5A059', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em' }}>EXPERIENCIA PROFESIONAL</h3>
                    <button
                      type="button"
                      onClick={() => setExperiencia([...experiencia, { periodo: '2024 — Actualidad', puesto: '', descripcion: '' }])}
                      style={{ padding: '0.4rem 0.8rem', backgroundColor: 'rgba(197,160,89,0.2)', border: '1px solid #C5A059', color: '#F3D89D', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Plus size={14} /> Añadir Experiencia
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {experiencia.map((exp, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1.5fr 40px', gap: '0.5rem', alignItems: 'center', backgroundColor: '#090807', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(197,160,89,0.2)' }}>
                        <input placeholder="Periodo" value={exp.periodo} onChange={(e) => { const next = [...experiencia]; next[idx].periodo = e.target.value; setExperiencia(next); }} style={{ padding: '0.4rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }} />
                        <input placeholder="Puesto / Cargo" value={exp.puesto} onChange={(e) => { const next = [...experiencia]; next[idx].puesto = e.target.value; setExperiencia(next); }} style={{ padding: '0.4rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }} />
                        <input placeholder="Descripción corta" value={exp.descripcion} onChange={(e) => { const next = [...experiencia]; next[idx].descripcion = e.target.value; setExperiencia(next); }} style={{ padding: '0.4rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }} />
                        <button type="button" onClick={() => setExperiencia(experiencia.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
