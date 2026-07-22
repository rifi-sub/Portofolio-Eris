import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import type { Product } from '../types';

export const TiendaHome: React.FC = () => {
  const [categoriaSel, setCategoriaSel] = useState<string>('todos');

  const categorias = [
    { id: 'todos', nombre: 'TODAS LAS OBRAS' },
    { id: 'fisico', nombre: 'LÁMINAS & OBRAS FÍSICAS' },
    { id: 'digital', nombre: 'DESCARGAS DIGITALES' },
  ];

  const productosFiltrados = categoriaSel === 'todos'
    ? mockProducts
    : mockProducts.filter((p: Product) => (categoriaSel === 'digital' ? p.isDigital : !p.isDigital));

  return (
    <div className="page-container">
      {/* Hero Banner Section */}
      <section className="section-wrapper" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <span className="section-subtitle">OBRAS ILUSTRADAS & EDICIONES LIMITADAS</span>
          <h1 className="page-title" style={{ fontSize: '3.25rem', marginBottom: '0.75rem' }}>
            TIENDA DE AUTOR <span style={{ color: '#C5A059', fontSize: '1.8rem' }}>✦</span>
          </h1>

          <div className="star-ornament" style={{ justifyContent: 'center', margin: '1rem 0' }}>
            <span className="star-symbol">✦</span>
          </div>

          <p style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#5c5247', lineHeight: 1.8, textTransform: 'uppercase' }}>
            Láminas Fine Art firmadas, zines de edición limitada y colecciones de arte digital de alta calidad.
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="section-wrapper" style={{ paddingTop: 0, paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSel(cat.id)}
              style={{
                background: categoriaSel === cat.id ? '#C5A059' : '#ffffff',
                color: categoriaSel === cat.id ? '#ffffff' : '#2c251e',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                padding: '0.6rem 1.5rem',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-wrapper" style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {productosFiltrados.map((prod: Product, index: number) => (
            <div key={prod.id} className="card-hover-gold" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
              {/* Top Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#C5A059', marginBottom: '0.75rem', fontWeight: 600 }}>
                <span>0{index + 1}</span>
                <span className="badge-gold" style={{ fontSize: '8px' }}>{!prod.isDigital ? 'Edición Física' : 'Digital'}</span>
              </div>

              {/* Product Image */}
              <div style={{ width: '100%', height: '220px', overflow: 'hidden', background: '#f5f2eb', marginBottom: '1.25rem' }}>
                <img
                  src={prod.coverImage}
                  alt={prod.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Product Title & Category */}
              <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C5A059', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                {prod.category}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#1a1510', marginBottom: '0.75rem', fontWeight: 500 }}>
                {prod.title}
              </h3>

              {/* Price & Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(197, 160, 89, 0.2)' }}>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem', fontWeight: 600, color: '#1a1510' }}>
                  {prod.price.toFixed(2)} €
                </span>

                <Link to={`/tienda/${prod.slug}`} className="link-gold">
                  <span>VER DETALLES</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
