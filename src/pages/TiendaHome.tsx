import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioApi, getMediaUrl } from '../services/portfolioApi';
import type { Product, ProductCategory } from '../types';
import { Search, ShoppingBag, PackageCheck, Truck, ShieldCheck, HelpCircle, Maximize2 } from 'lucide-react';
import { ImageLightboxModal } from '../components/shop/ImageLightboxModal';

export const TiendaHome: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoriaSel, setCategoriaSel] = useState<string>('todos');
  const [precioSel, setPrecioSel] = useState<string>('todos');
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [hero, setHero] = useState<any>({});

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: Array<{ url: string; altText?: string }>;
    title: string;
  }>({
    isOpen: false,
    images: [],
    title: '',
  });

  useEffect(() => {
    portfolioApi.getProducts().then(setProducts);
    portfolioApi.getCategories().then(setCategories);
    portfolioApi.getContentSection('store_hero').then(setHero);
  }, []);

  const categorias = [{ id: 'todos', nombre: 'TODAS LAS OBRAS' }, ...categories.map(category => ({ id: category.slug, nombre: category.name }))];

  const productosFiltrados = products.filter((p: Product) => {
    // 1. Búsqueda por título o descripción
    const coincideTexto = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Filtro Categoría
    let coincideCat = true;
    if (categoriaSel !== 'todos') coincideCat = p.productCategory?.slug === categoriaSel || p.category === categoriaSel;

    // 3. Filtro Precio
    let coincidePrecio = true;
    if (precioSel === 'under25') coincidePrecio = p.price <= 25;
    if (precioSel === '25to50') coincidePrecio = p.price > 25 && p.price <= 50;
    if (precioSel === 'over50') coincidePrecio = p.price > 50;

    return coincideTexto && coincideCat && coincidePrecio;
  });

  const openLightbox = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const mediaEntries = product.media && product.media.length > 0
      ? product.media.map(m => ({ url: m.url, altText: m.altText || product.title }))
      : [{ url: product.coverImage, altText: product.title }];

    setLightbox({
      isOpen: true,
      images: mediaEntries,
      title: product.title,
    });
  };

  const bannerImg = hero.images
    ? (typeof hero.images === 'string' ? JSON.parse(hero.images)[0] : hero.images[0])
    : null;
  const bannerUrl = getMediaUrl(bannerImg);

  return (
    <div className="page-container">
      <div className="section-wrapper">
        {/* Banner de la Tienda (si está configurado en Admin) */}
        {bannerUrl && (
          <div style={{ width: '100%', maxHeight: '350px', borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid rgba(197, 160, 89, 0.35)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
            <img src={bannerUrl} alt={hero.title || 'Banner Tienda'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Header de la Tienda */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
           <span className="section-subtitle">{hero.subtitle || 'OBRAS DE AUTOR & EDICIONES LIMITADAS'}</span>
           <h1 className="page-title" style={{ fontSize: '3.25rem' }}>
             {hero.title || 'TIENDA DE ARTE DE AUTOR'} <span style={{ color: '#C5A059' }}>✦</span>
           </h1>
           <p style={{ maxWidth: '620px', margin: '1rem auto 0 auto', fontSize: '13px', color: '#5c5247', lineHeight: 1.8 }}>
             {hero.content || 'Explora colecciones exclusivas de láminas Fine Art impresas en papel de algodón de 310g, piezas al óleo originales y recursos digitales para creadores.'}
          </p>
        </div>

        {/* Buscador & Barra de Filtros */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '1.75rem', marginBottom: '3.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '1.25rem', alignItems: 'center' }}>
            {/* Input Buscador */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#C5A059' }} />
              <input
                type="text"
                placeholder="Buscar obra, lámina o producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  backgroundColor: '#faf8f5',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  color: '#1a1510',
                  outline: 'none'
                }}
              />
            </div>

            {/* Selector de Precio */}
            <div>
              <select
                value={precioSel}
                onChange={(e) => setPrecioSel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  backgroundColor: '#faf8f5',
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '11px',
                  color: '#1a1510',
                  outline: 'none',
                  letterSpacing: '0.05em'
                }}
              >
                <option value="todos">TODOS LOS PRECIOS</option>
                <option value="under25">HASTA 25 €</option>
                <option value="25to50">DE 25 € A 50 €</option>
                <option value="over50">MÁS DE 50 €</option>
              </select>
            </div>

            {/* Contador de Productos */}
            <div style={{ textAlign: 'right', fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#C5A059', fontWeight: 600 }}>
              MOSTRANDO {productosFiltrados.length} OBRAS
            </div>
          </div>

          {/* Selector de Categorías (Tabs) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px dashed rgba(197, 160, 89, 0.2)' }}>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSel(cat.id)}
                className={categoriaSel === cat.id ? 'btn-gold-primary' : 'btn-gold-outline'}
                style={{ fontSize: '10px', padding: '0.45rem 1rem' }}
              >
                <span>{cat.nombre}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        {productosFiltrados.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', background: '#ffffff', border: '1px solid rgba(197,160,89,0.25)', color: '#5c5247' }}>
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
            {productosFiltrados.map((prod, index) => {
              const coverUrl = getMediaUrl(prod.coverImage);
              const isLimited = prod.stock && prod.stock <= 15;
              const badgeText = prod.isDigital ? 'DIGITAL HD' : isLimited ? `EDICIÓN LIMITADA (${prod.stock} ud)` : 'FINE ART';

              return (
                <div
                  key={prod.id}
                  className="card-luxury card-product-clickable"
                  onClick={() => navigate(`/tienda/${prod.slug}`)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  <div>
                    {/* Header Card Meta */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#C5A059', marginBottom: '0.75rem', fontWeight: 600 }}>
                      <span>0{index + 1}</span>
                      <span className="badge-gold" style={{ fontSize: '8px' }}>{badgeText}</span>
                    </div>

                    {/* Imagen del Producto - Cuadrada para uniformidad visual */}
                    <div
                      className="product-image-container"
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '1 / 1',
                        overflow: 'hidden',
                        background: '#f5f2eb',
                        marginBottom: '1.25rem',
                        border: '1px solid rgba(197,160,89,0.25)',
                      }}
                    >
                      <img
                        src={coverUrl}
                        alt={prod.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transition: 'transform 0.35s ease',
                        }}
                      />

                      {/* Botón flotante para ampliar imagen en proporciones originales */}
                      <button
                        onClick={(e) => openLightbox(prod, e)}
                        title="Ver imagen en proporciones originales"
                        aria-label="Ampliar fotografía"
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          right: '0.75rem',
                          background: 'rgba(20, 15, 10, 0.75)',
                          border: '1px solid rgba(197, 160, 89, 0.5)',
                          color: '#F3D89D',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          opacity: 0.9,
                          transition: 'all 0.2s ease',
                          zIndex: 5,
                        }}
                        className="btn-zoom-hover"
                      >
                        <Maximize2 size={14} />
                      </button>
                    </div>

                    {/* Título & Descripción */}
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#1a1510', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {prod.title}
                    </h3>
                    <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {prod.description}
                    </p>
                  </div>

                  {/* Footer Card & Precio */}
                  <div style={{ borderTop: '1px solid rgba(197, 160, 89, 0.2)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#7a6f64', display: 'block' }}>PRECIO</span>
                      <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.25rem', fontWeight: 700, color: '#1a1510' }}>
                        {prod.price.toFixed(2)} €
                      </span>
                    </div>

                    <div
                      className="btn-gold-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '10px', pointerEvents: 'none' }}
                    >
                      <ShoppingBag size={13} />
                      <span>VER OBRA</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Visor Lightbox Modal de Imágenes */}
        <ImageLightboxModal
          isOpen={lightbox.isOpen}
          onClose={() => setLightbox({ ...lightbox, isOpen: false })}
          images={lightbox.images}
          title={lightbox.title}
        />

        {/* Sección Informativa: CÓMO HACER UN PEDIDO */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.35)', padding: '3.5rem 3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle">GUÍA PARA EL COMPRADOR</span>
            <h2 className="section-title">
              CÓMO FUNCIONA EL ENVÍO & COMPRA <span style={{ color: '#C5A059' }}>✦</span>
            </h2>
            <p style={{ fontSize: '12px', color: '#5c5247', maxWidth: '560px', margin: '0.5rem auto 0 auto' }}>
              Cada pieza física se empaqueta a mano con cuidado artesanal para garantizar que llegue impecable a tus manos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#faf8f5', border: '1px solid #C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#C5A059' }}>
                <PackageCheck size={22} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', marginBottom: '0.5rem' }}>
                1. Selección & Firma
              </h4>
              <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6 }}>
                Las láminas Fine Art son firmadas y numeradas a mano antes del empaquetado.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#faf8f5', border: '1px solid #C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#C5A059' }}>
                <Truck size={22} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', marginBottom: '0.5rem' }}>
                2. Empaque Protector
              </h4>
              <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6 }}>
                Protegidas en tubos rígidos de cartón kraft reforzado con papel de seda sin ácido.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#faf8f5', border: '1px solid #C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#C5A059' }}>
                <ShieldCheck size={22} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', marginBottom: '0.5rem' }}>
                3. Envío Certificado
              </h4>
              <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6 }}>
                Envíos nacionales en 48-72h e internacionales con código de seguimiento en tiempo real.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#faf8f5', border: '1px solid #C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#C5A059' }}>
                <HelpCircle size={22} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', marginBottom: '0.5rem' }}>
                4. Descargas Instantáneas
              </h4>
              <p style={{ fontSize: '11px', color: '#5c5247', lineHeight: 1.6 }}>
                Los archivos de descargas digitales se reciben al instante en tu correo tras la confirmación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
