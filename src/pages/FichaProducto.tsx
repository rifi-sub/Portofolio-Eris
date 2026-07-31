import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioApi } from '../services/portfolioApi';
import type { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

export const FichaProducto: React.FC = () => {
  const { productoSlug } = useParams<{ productoSlug: string }>();
  const [producto, setProducto] = useState<Product | null>(null);

  useEffect(() => {
    if (productoSlug) {
      portfolioApi.getProductBySlug(productoSlug).then((data) => {
        if (data) setProducto(data);
      });
    }
  }, [productoSlug]);

  if (!producto) {
    return <div className="page-container"><div style={{ padding: '4rem', textAlign: 'center', color: '#5c5247' }}>Cargando producto...</div></div>;
  }

  return (
    <div className="page-container">
      <div className="section-wrapper">
        {/* Back Link */}
        <Link to="/tienda" className="link-gold" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
          <span>← VOLVER A LA TIENDA</span>
        </Link>

        {/* Product Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
          {/* Product Image Gallery */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '1.5rem' }}>
            <div style={{ width: '100%', height: '440px', overflow: 'hidden', background: '#f5f2eb' }}>
              <img
                src={producto.coverImage}
                alt={producto.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Product Information */}
          <div>
            <span className="section-subtitle">{producto.category}</span>
            <h1 className="page-title" style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>
              {producto.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '2rem', color: '#1a1510', fontWeight: 600 }}>
                {producto.price.toFixed(2)} €
              </span>
              <span className="badge-gold">
                {(producto.stock ?? 1) > 0 ? 'EN STOCK / LISTO PARA ENVÍO' : 'AGOTADO'}
              </span>
            </div>

            <div className="star-ornament" style={{ margin: '1.25rem 0' }}>
              <span className="star-symbol">✦</span>
            </div>

            <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8, marginBottom: '2rem' }}>
              {producto.description}
            </p>

            {/* Specifications */}
            <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '1.25rem', marginBottom: '2rem' }}>
              <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', letterSpacing: '0.2em', color: '#C5A059', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                DETALLES DE LA OBRA
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '11px', color: '#5c5247', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>• <strong>Formato:</strong> {!producto.isDigital ? 'Impresión Fine Art en papel Giclée 300g' : 'Archivo Digital HD (PDF + TIFF)'}</li>
                <li>• <strong>Edición:</strong> Firmada y numerada a mano por Ilustrísima Maestra</li>
                <li>• <strong>Envío:</strong> Tubo protector reforzado con certificado de autenticidad</li>
              </ul>
            </div>

            {/* Purchase CTA */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-gold-primary" style={{ flex: 1 }}>
                <ShoppingBag size={16} />
                <span>AÑADIR A LA CESTA</span>
              </button>
              <Link to="/contacto" className="btn-gold-outline">
                <span>CONSULTAR ENCARGO</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
