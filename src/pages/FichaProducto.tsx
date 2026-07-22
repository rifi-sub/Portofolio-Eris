import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, Download } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { mockProducts } from '../data/mockData';

export const FichaProducto: React.FC = () => {
  const { productoSlug } = useParams<{ productoSlug: string }>();
  const product = mockProducts.find((p) => p.slug === productoSlug) || mockProducts[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.coverImage);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedModalOpen, setAddedModalOpen] = useState<boolean>(false);

  const handleAddToCart = () => {
    setAddedModalOpen(true);
  };

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
      <Breadcrumb
        items={[
          { label: 'Tienda', url: '/tienda' },
          { label: product.title },
        ]}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          marginBottom: '5rem',
        }}
      >
        {/* Gallery Preview */}
        <div>
          <div
            style={{
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              border: '1px solid var(--border-dark)',
              marginBottom: '1rem',
              height: '450px',
            }}
          >
            <img
              src={selectedImage}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: selectedImage === img ? '2px solid var(--accent-amber)' : '1px solid var(--border-dark)',
                    cursor: 'pointer',
                    background: 'none',
                    padding: 0,
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Meta & Purchase Box */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {product.isDigital ? (
              <Badge variant="amber" icon={<Download size={14} />}>Recurso Digital</Badge>
            ) : (
              <Badge variant="terracotta">Edición de Autor</Badge>
            )}
            {product.stock && product.stock > 0 && (
              <Badge variant="emerald">{product.stock} disponibles</Badge>
            )}
          </div>

          <h1 style={{ marginBottom: '0.75rem', fontSize: '2.2rem' }}>{product.title}</h1>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '1.5rem' }}>
            {product.price} €
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            {product.description}
          </p>

          {/* Specifications Card */}
          <Card glass style={{ marginBottom: '2rem' }}>
            <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem' }}>
              {product.dimensions && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Dimensiones:</span>
                  <strong>{product.dimensions}</strong>
                </div>
              )}
              {product.paperType && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Papel & Impresión:</span>
                  <strong>{product.paperType}</strong>
                </div>
              )}
              {product.digitalFormat && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Formato digital:</span>
                  <strong>{product.digitalFormat}</strong>
                </div>
              )}
              {product.fileSize && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Tamaño de archivo:</span>
                  <strong>{product.fileSize}</strong>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Action Box */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            {!product.isDigital && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-primary)',
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    padding: '0.625rem 1rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  -
                </button>
                <span style={{ padding: '0 0.75rem', fontWeight: 600 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    padding: '0.625rem 1rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  +
                </button>
              </div>
            )}

            <Button
              variant="amber"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              leftIcon={<ShoppingBag size={20} />}
            >
              Añadir a la Cesta — {(product.price * quantity).toFixed(2)} €
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={16} color="var(--accent-amber)" />
              <span>Envío seguro en 3-5 días laborables con número de seguimiento</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--accent-emerald)" />
              <span>Certificado de autenticidad y embalaje rígido protector</span>
            </div>
          </div>
        </div>
      </div>

      {/* Added to cart modal */}
      <Modal
        isOpen={addedModalOpen}
        onClose={() => setAddedModalOpen(false)}
        title="Producto Añadido"
        footer={
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <Button variant="outline" fullWidth onClick={() => setAddedModalOpen(false)}>
              Seguir Comprando
            </Button>
            <Link to="/tienda" style={{ width: '100%' }}>
              <Button variant="amber" fullWidth onClick={() => setAddedModalOpen(false)}>
                Ir a la Tienda
              </Button>
            </Link>
          </div>
        }
      >
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <img
            src={product.coverImage}
            alt=""
            style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
          />
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{product.title}</h4>
            <p style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>
              {quantity} x {product.price} € = {(product.price * quantity).toFixed(2)} €
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
