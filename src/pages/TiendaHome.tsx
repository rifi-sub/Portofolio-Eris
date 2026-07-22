import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody, CardFooter } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { mockProducts } from '../data/mockData';

export const TiendaHome: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Todos los productos' },
    { key: 'physical-print', label: 'Láminas Fine Art' },
    { key: 'original-art', label: 'Obras Originales' },
    { key: 'digital-brush', label: 'Recursos Digitales' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
      <Breadcrumb items={[{ label: 'Tienda' }]} />

      {/* Header Banner */}
      <div style={{ marginBottom: '3rem' }}>
        <Badge variant="amber" icon={<ShoppingBag size={14} />} style={{ marginBottom: '0.75rem' }}>
          Galería & Tienda del Estudio
        </Badge>
        <h1 style={{ marginBottom: '1rem' }}>Ediciones Limitadas & Recursos de Autor</h1>
        <p style={{ fontSize: '1.15rem', maxWidth: '750px' }}>
          Impresiones Giclée en papel de algodón de calidad museo, publicaciones ilustradas, obras al óleo sobre panel y herramientas para artistas digitales.
        </p>
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categories.map((cat) => (
          <Tag
            key={cat.key}
            active={selectedCategory === cat.key}
            onClick={() => setSelectedCategory(cat.key)}
          >
            {cat.label}
          </Tag>
        ))}
      </div>

      {/* Product Catalog Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem',
        }}
      >
        {filteredProducts.map((product) => (
          <Card key={product.id} interactive style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={product.coverImage}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {product.isDigital && (
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                  <Badge variant="amber">Descarga Digital</Badge>
                </div>
              )}
              {product.stock && product.stock <= 5 && !product.isDigital && (
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                  <Badge variant="rose">¡Últimas {product.stock} unidades!</Badge>
                </div>
              )}
            </div>

            <CardBody style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {product.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1 }}>
                {product.description}
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                  {product.price} €
                </span>
                {product.dimensions && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    ({product.dimensions})
                  </span>
                )}
              </div>
            </CardBody>

            <CardFooter>
              <Link to={`/tienda/${product.slug}`} style={{ width: '100%' }}>
                <Button variant="amber" fullWidth size="sm" rightIcon={<ArrowRight size={14} />}>
                  Ver Producto
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Shipping & Quality Info Box */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2rem',
          border: '1px solid var(--border-dark)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
        }}
      >
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-amber)' }}>
            Empaquetado Seguro
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Las láminas se envían firmadas, numeradas y protegidas en tubos rígidos de cartón kraft de alta resistencia.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-terracotta)' }}>
            Envío Global
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Envíos certificados con número de seguimiento para toda España, Europa e internacional.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-emerald)' }}>
            Descargas Inmediatas
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Los recursos y pinceles digitales se entregan de forma instantánea al finalizar la compra.
          </p>
        </div>
      </div>
    </div>
  );
};
