import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Image as ImageIcon, Plus, Trash2, Layers, Info } from 'lucide-react';
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

  // Specific state for Home Entrance (Dual Covers 50/50)
  const [portfolioCover, setPortfolioCover] = useState('');
  const [storeCover, setStoreCover] = useState('');
  const [portfolioTag, setPortfolioTag] = useState('Entra en mi');
  const [portfolioTitle, setPortfolioTitle] = useState('Portfolio');
  const [portfolioDesc, setPortfolioDesc] = useState('Explora mi trabajo\ny proyectos realizados');
  const [storeTag, setStoreTag] = useState('Descubre mi');
  const [storeTitle, setStoreTitle] = useState('Tienda');
  const [storeDesc, setStoreDesc] = useState('Productos ilustrados,\nhechos con amor');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'single' | 'portfolioCover' | 'storeCover'>('single');
  
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
        
        let loadedImages: string[] = [];
        if (sec?.images) {
          try {
            loadedImages = typeof sec.images === 'string' ? JSON.parse(sec.images) : sec.images;
          } catch (e) {
            loadedImages = [];
          }
        }
        setImages(loadedImages);

        // Home Dual-Cover metadata
        if (selectedSection === 'home_hero') {
          let metaObj: any = {};
          if (sec?.metadata) {
            try {
              metaObj = typeof sec.metadata === 'string' ? JSON.parse(sec.metadata) : sec.metadata;
            } catch (e) {
              metaObj = {};
            }
          }
          setPortfolioCover(metaObj.portfolioCover || loadedImages[0] || '');
          setStoreCover(metaObj.storeCover || loadedImages[1] || '');
          setPortfolioTag(metaObj.portfolioTag || 'Entra en mi');
          setPortfolioTitle(metaObj.portfolioTitle || 'Portfolio');
          setPortfolioDesc(metaObj.portfolioDesc || 'Explora mi trabajo\ny proyectos realizados');
          setStoreTag(metaObj.storeTag || 'Descubre mi');
          setStoreTitle(metaObj.storeTitle || 'Tienda');
          setStoreDesc(metaObj.storeDesc || 'Productos ilustrados,\nhechos con amor');
        }

        // Sobre Mí metadata
        if (selectedSection === 'sobre_mi_bio') {
          let metaObj: any = {};
          if (sec?.metadata) {
            try {
              metaObj = typeof sec.metadata === 'string' ? JSON.parse(sec.metadata) : sec.metadata;
            } catch (e) {
              metaObj = {};
            }
          }
          setFormacion(metaObj.formacion || defaultFormacion);
          setSoftwares(metaObj.softwares || defaultSoftwares);
          setExperiencia(metaObj.experiencia || defaultExperiencia);
        }
      } catch (e) {
        console.error('Error al cargar la sección:', e);
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

      if (selectedSection === 'home_hero') {
        payload.images = [portfolioCover, storeCover].filter(Boolean);
        payload.metadata = JSON.stringify({
          portfolioCover,
          storeCover,
          portfolioTag,
          portfolioTitle,
          portfolioDesc,
          storeTag,
          storeTitle,
          storeDesc
        });
      }

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

  const openPickerFor = (target: 'single' | 'portfolioCover' | 'storeCover') => {
    setMediaPickerTarget(target);
    setShowMediaPicker(true);
  };

  const handleSelectMediaUrl = (url: string) => {
    if (mediaPickerTarget === 'portfolioCover') {
      setPortfolioCover(url);
    } else if (mediaPickerTarget === 'storeCover') {
      setStoreCover(url);
    } else {
      setImages([url]);
    }
  };

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '2rem' }}>
          Gestión de Subapartados & Textos
        </h1>
        <p style={{ color: '#A3998D', margin: '0.5rem 0 0', fontSize: '0.95rem' }}>
          Selecciona el subapartado del portfolio para personalizar sus textos, portadas principales e información visual.
        </p>
      </div>

      {/* Section Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(197,160,89,0.2)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { key: 'home_hero', label: 'Inicio / Portadas Entrada' },
          { key: 'portfolio_hero', label: 'Cabecera Portfolio' },
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
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            {tab.key === 'home_hero' && <Layers size={15} />}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Editor Form Container */}
      <div style={{ backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '10px', padding: '2rem' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#A3998D' }}>Cargando datos de la sección...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* SPECIAL VIEW: HOME ENTRANCE (DUAL PORTADAS 50/50) */}
            {selectedSection === 'home_hero' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Info Card */}
                <div
                  style={{
                    backgroundColor: 'rgba(197,160,89,0.08)',
                    border: '1px solid rgba(197,160,89,0.3)',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}
                >
                  <Info size={22} style={{ color: '#C5A059', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 style={{ margin: '0 0 0.4rem', color: '#F3D89D', fontSize: '1rem', fontWeight: 600 }}>
                      Pantalla de Inicio: Portadas de Acceso Dividido (50 / 50)
                    </h3>
                    <p style={{ margin: 0, color: '#d1c7bc', fontSize: '0.88rem', lineHeight: 1.6 }}>
                      La pantalla principal cuenta con dos accesos independientes: la entrada al <strong>Portfolio (izquierda)</strong> y la entrada a la <strong>Tienda (derecha)</strong>. Puedes asignar o cambiar tu propia ilustración/diseño para cada lado cuando quieras. Si dejas alguna vacía, se mostrará el elegante diseño neutro editorial correspondiente sin ninguna imagen generada con IA.
                    </p>
                  </div>
                </div>

                {/* Dual Column Grid: Left (Portfolio) and Right (Tienda) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.75rem' }}>

                  {/* LEFT: PORTFOLIO COVER CARD */}
                  <div
                    style={{
                      backgroundColor: '#090807',
                      border: '1px solid rgba(197,160,89,0.35)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#F3D89D', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                        1. ENTRADA AL PORTFOLIO (IZQUIERDA)
                      </span>
                      {portfolioCover ? (
                        <span style={{ fontSize: '10px', backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          Ilustración Activa
                        </span>
                      ) : (
                        <span style={{ fontSize: '10px', backgroundColor: 'rgba(197,160,89,0.15)', color: '#F3D89D', border: '1px solid rgba(197,160,89,0.3)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          Fondo Neutro Galería
                        </span>
                      )}
                    </div>

                    {/* Simulated Preview Box */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '210px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: '1px solid rgba(197,160,89,0.25)',
                        backgroundColor: '#1a1815',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '1rem',
                        boxSizing: 'border-box'
                      }}
                    >
                      {portfolioCover ? (
                        <>
                          <img
                            src={getMediaUrl(portfolioCover)}
                            alt="Portada Portfolio"
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(250,247,242,0.5) 0%, rgba(245,240,232,0.85) 100%)' }} />
                        </>
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #FAF7F2 0%, #EFE8DD 55%, #E2D8C6 100%)' }}>
                          <div style={{ position: 'absolute', inset: '12px', border: '1px solid rgba(197,160,89,0.25)' }} />
                        </div>
                      )}

                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#3e352b', textTransform: 'uppercase', fontWeight: 600 }}>
                          {portfolioTag}
                        </span>
                        <h4 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', color: '#1a1510', margin: '4px 0', textTransform: 'uppercase' }}>
                          {portfolioTitle}
                        </h4>
                        <span style={{ fontSize: '8px', color: '#C5A059' }}>✦</span>
                      </div>
                    </div>

                    {/* Image Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => openPickerFor('portfolioCover')}
                        style={{
                          flex: 1,
                          padding: '0.7rem 1rem',
                          backgroundColor: 'rgba(197,160,89,0.2)',
                          border: '1px solid #C5A059',
                          borderRadius: '6px',
                          color: '#F3D89D',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <ImageIcon size={15} />
                        <span>{portfolioCover ? 'Cambiar Ilustración' : 'Elegir o Subir Ilustración'}</span>
                      </button>

                      {portfolioCover && (
                        <button
                          type="button"
                          onClick={() => setPortfolioCover('')}
                          title="Restablecer al diseño neutro editorial"
                          style={{
                            padding: '0.7rem',
                            backgroundColor: 'rgba(239,68,68,0.15)',
                            border: '1px solid rgba(239,68,68,0.4)',
                            borderRadius: '6px',
                            color: '#f87171',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Manual URL input */}
                    <div>
                      <label style={{ display: 'block', color: '#A3998D', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                        URL directa de la imagen o ruta:
                      </label>
                      <input
                        type="text"
                        value={portfolioCover}
                        onChange={(e) => setPortfolioCover(e.target.value)}
                        placeholder="Ej: /mi-portada-portfolio.png o URL externa"
                        style={{
                          width: '100%',
                          padding: '0.6rem',
                          backgroundColor: '#12100E',
                          border: '1px solid rgba(197,160,89,0.25)',
                          borderRadius: '4px',
                          color: '#fff',
                          fontSize: '0.85rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Editable Texts for Left Side */}
                    <div style={{ borderTop: '1px dashed rgba(197,160,89,0.2)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#C5A059', fontWeight: 600, textTransform: 'uppercase' }}>
                        Textos de Entrada Portfolio
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                          <label style={{ display: 'block', color: '#A3998D', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Etiqueta Superior</label>
                          <input
                            type="text"
                            value={portfolioTag}
                            onChange={(e) => setPortfolioTag(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#A3998D', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Título</label>
                          <input
                            type="text"
                            value={portfolioTitle}
                            onChange={(e) => setPortfolioTitle(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', color: '#A3998D', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Descripción / Subtítulo</label>
                        <textarea
                          rows={2}
                          value={portfolioDesc}
                          onChange={(e) => setPortfolioDesc(e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: STORE COVER CARD */}
                  <div
                    style={{
                      backgroundColor: '#090807',
                      border: '1px solid rgba(197,160,89,0.35)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#F3D89D', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                        2. ENTRADA A LA TIENDA (DERECHA)
                      </span>
                      {storeCover ? (
                        <span style={{ fontSize: '10px', backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          Ilustración Activa
                        </span>
                      ) : (
                        <span style={{ fontSize: '10px', backgroundColor: 'rgba(197,160,89,0.15)', color: '#F3D89D', border: '1px solid rgba(197,160,89,0.3)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          Fondo Neutro Atelier Oscuro
                        </span>
                      )}
                    </div>

                    {/* Simulated Preview Box */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '210px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: '1px solid rgba(197,160,89,0.25)',
                        backgroundColor: '#1a1815',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '1rem',
                        boxSizing: 'border-box'
                      }}
                    >
                      {storeCover ? (
                        <>
                          <img
                            src={getMediaUrl(storeCover)}
                            alt="Portada Tienda"
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,12,10,0.55) 0%, rgba(6,5,4,0.85) 100%)' }} />
                        </>
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #191613 0%, #100E0C 55%, #080706 100%)' }}>
                          <div style={{ position: 'absolute', inset: '12px', border: '1px solid rgba(197,160,89,0.22)' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(197,160,89,0.08) 0%, transparent 65%)' }} />
                        </div>
                      )}

                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#F3D89D', textTransform: 'uppercase', fontWeight: 600 }}>
                          {storeTag}
                        </span>
                        <h4 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', color: '#ffffff', margin: '4px 0', textTransform: 'uppercase' }}>
                          {storeTitle}
                        </h4>
                        <span style={{ fontSize: '8px', color: '#C5A059' }}>✦</span>
                      </div>
                    </div>

                    {/* Image Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => openPickerFor('storeCover')}
                        style={{
                          flex: 1,
                          padding: '0.7rem 1rem',
                          backgroundColor: 'rgba(197,160,89,0.2)',
                          border: '1px solid #C5A059',
                          borderRadius: '6px',
                          color: '#F3D89D',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <ImageIcon size={15} />
                        <span>{storeCover ? 'Cambiar Ilustración' : 'Elegir o Subir Ilustración'}</span>
                      </button>

                      {storeCover && (
                        <button
                          type="button"
                          onClick={() => setStoreCover('')}
                          title="Restablecer al diseño neutro oscuro"
                          style={{
                            padding: '0.7rem',
                            backgroundColor: 'rgba(239,68,68,0.15)',
                            border: '1px solid rgba(239,68,68,0.4)',
                            borderRadius: '6px',
                            color: '#f87171',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Manual URL input */}
                    <div>
                      <label style={{ display: 'block', color: '#A3998D', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                        URL directa de la imagen o ruta:
                      </label>
                      <input
                        type="text"
                        value={storeCover}
                        onChange={(e) => setStoreCover(e.target.value)}
                        placeholder="Ej: /mi-portada-tienda.png o URL externa"
                        style={{
                          width: '100%',
                          padding: '0.6rem',
                          backgroundColor: '#12100E',
                          border: '1px solid rgba(197,160,89,0.25)',
                          borderRadius: '4px',
                          color: '#fff',
                          fontSize: '0.85rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Editable Texts for Right Side */}
                    <div style={{ borderTop: '1px dashed rgba(197,160,89,0.2)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#C5A059', fontWeight: 600, textTransform: 'uppercase' }}>
                        Textos de Entrada Tienda
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                          <label style={{ display: 'block', color: '#A3998D', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Etiqueta Superior</label>
                          <input
                            type="text"
                            value={storeTag}
                            onChange={(e) => setStoreTag(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#A3998D', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Título</label>
                          <input
                            type="text"
                            value={storeTitle}
                            onChange={(e) => setStoreTitle(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', color: '#A3998D', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Descripción / Subtítulo</label>
                        <textarea
                          rows={2}
                          value={storeDesc}
                          onChange={(e) => setStoreDesc(e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', boxSizing: 'border-box', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Studio Header & Footer Branding */}
                <div style={{ backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.25)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <span style={{ color: '#F3D89D', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                    ✦ ELEMENTOS DE IDENTIDAD (CENTRO Y PIE)
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', color: '#C5A059', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                        Nombre Central del Estudio
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ilustrísima Maestra"
                        style={{ width: '100%', padding: '0.65rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#C5A059', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                        Lema / Frase del Pie de Página
                      </label>
                      <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="EL ARTE ES EL PUENTE ENTRE MUNDOS"
                        style={{ width: '100%', padding: '0.65rem', backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* STANDARD VIEW FOR OTHER TABS (PORTFOLIO_HERO, STORE_HERO, SOBRE_MI, CONTACTO) */
              <>
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

                {/* Single Image Banner for other pages */}
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    IMAGEN DESTACADA / BANNER DE SECCIÓN
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
                      onClick={() => openPickerFor('single')}
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
                    <div style={{ marginTop: '0.75rem', width: '180px', height: '110px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(197,160,89,0.3)', backgroundColor: '#000' }}>
                      <img
                        src={getMediaUrl(images[0])}
                        alt="Vista previa"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>

                {/* SECCIÓN ESPECIAL SOBRE MÍ */}
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
              </>
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
        onSelectUrl={handleSelectMediaUrl}
      />
    </div>
  );
};
