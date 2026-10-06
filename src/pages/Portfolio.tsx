import React, { useEffect, useState, useMemo } from 'react';
import { Eye } from 'lucide-react';
import { portfolioApi, getMediaUrl } from '../services/portfolioApi';
import { ArtworkLightbox } from '../components/ui/ArtworkLightbox';
import { BackButton } from '../components/ui/BackButton';
import type { Project } from '../types';
import './Portfolio.css';

export const Portfolio: React.FC = () => {
  const [artworks, setArtworks] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeLightboxArtwork, setActiveLightboxArtwork] = useState<Project | null>(null);

  useEffect(() => {
    portfolioApi.getProjects().then((data) => {
      // Filter out inactive artworks if specified
      const activeData = data.filter((p) => (p as any).active !== false);
      // Sort by order if available
      activeData.sort((a, b) => ((a as any).order || 99) - ((b as any).order || 99));
      setArtworks(activeData);
      setLoading(false);
    });
  }, []);

  // Extraer categorías únicas disponibles
  const categories = useMemo(() => {
    const defaultCategories = ['Editorial', 'Personajes', 'Entornos', 'Retratos', 'Mascotas', 'Personal'];
    const presentCategories = new Set<string>();

    artworks.forEach((art) => {
      if (art.category && art.category.trim()) {
        presentCategories.add(art.category.trim());
      }
    });

    if (presentCategories.size === 0) {
      return ['Todos', ...defaultCategories];
    }

    const ordered: string[] = [];
    defaultCategories.forEach((cat) => {
      if (presentCategories.has(cat)) {
        ordered.push(cat);
        presentCategories.delete(cat);
      }
    });
    presentCategories.forEach((cat) => ordered.push(cat));

    return ['Todos', ...ordered];
  }, [artworks]);

  // Filtrado de obras
  const filteredArtworks = useMemo(() => {
    if (selectedCategory === 'Todos') return artworks;
    return artworks.filter((art) => art.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [artworks, selectedCategory]);

  return (
    <div className="portfolio-page">
      {/* Top Controls & Header */}
      <div className="portfolio-header-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <BackButton />
          <span style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600 }}>
            GALERÍA DE ILUSTRACIONES ✦ ILUSTRÍSIMA MAESTRA
          </span>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '3.25rem',
              letterSpacing: '0.08em',
              color: '#1a1510',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              fontWeight: 400,
            }}
          >
            Portfolio
          </h1>
          <div style={{ fontSize: '12px', color: '#C5A059', marginBottom: '0.75rem' }}>✦ — — — ✦</div>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#5c5247', textTransform: 'uppercase', lineHeight: 1.8, margin: 0 }}>
            Una selección de encargos editoriales, diseño de personajes y obra artística personal.
          </p>
        </div>

        {/* Discreet Category Filters */}
        <div className="portfolio-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`portfolio-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Gallery */}
      <div className="portfolio-gallery-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#8c8073', fontSize: '12px', letterSpacing: '0.2em' }}>
            CARGANDO GALERÍA...
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#8c8073', fontSize: '12px' }}>
            No hay ilustraciones en esta categoría por el momento.
          </div>
        ) : (
          <div className="portfolio-masonry-grid">
            {filteredArtworks.map((art) => (
              <div
                key={art.id}
                className="portfolio-masonry-item"
                onClick={() => setActiveLightboxArtwork(art)}
              >
                <div className="portfolio-item-wrapper">
                  <img
                    src={getMediaUrl(art.coverImage)}
                    alt={art.title}
                    loading="lazy"
                    className="portfolio-item-image"
                  />

                  {/* Hover Overlay */}
                  <div className="portfolio-item-overlay">
                    <div className="portfolio-item-content">
                      <span className="portfolio-item-category">
                        {art.category || 'Ilustración'}
                      </span>
                      <h3 className="portfolio-item-title">{art.title}</h3>
                      <div className="portfolio-item-action">
                        <Eye size={14} />
                        <span>Ver Obra Completa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <ArtworkLightbox
        artwork={activeLightboxArtwork}
        artworks={filteredArtworks}
        onClose={() => setActiveLightboxArtwork(null)}
        onSelectArtwork={(art) => setActiveLightboxArtwork(art)}
      />
    </div>
  );
};
