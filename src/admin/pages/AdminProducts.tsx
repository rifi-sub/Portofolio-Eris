import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { adminApi, getMediaUrl } from '../services/adminApi';
import { MediaPickerModal } from '../components/MediaPickerModal';
import type { Product } from '../../types';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getProducts();
      setProducts(data.map((product: any) => ({ ...product, images: typeof product.images === 'string' ? JSON.parse(product.images || '[]') : (product.images || []), tags: typeof product.tags === 'string' ? JSON.parse(product.tags || '[]') : (product.tags || []) })));
      setCategories(await adminApi.getCategories());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenNew = () => {
    setEditingProduct({
      title: '',
      slug: '',
      price: 25,
      category: 'physical-print',
      isDigital: false,
      description: '',
      coverImage: '/portfolio-hero.png',
      stock: 10,
      dimensions: 'A3 (29.7 x 42 cm)',
      featured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await adminApi.deleteProduct(id);
      fetchProducts();
    } catch (e) {
      alert('Error al borrar producto');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.title) return alert('El título es obligatorio');

    const slug = editingProduct.slug || editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      const payload = { ...editingProduct, slug };
      if (editingProduct.id) {
        await adminApi.updateProduct(editingProduct.id, payload);
      } else {
        await adminApi.createProduct(payload);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (e: any) {
      alert(e.message || 'Error al guardar producto');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await adminApi.duplicateProduct(id);
      fetchProducts();
    } catch (e) {
      alert('Error al duplicar el producto');
    }
  };

  const handleToggleVisibility = async (id: string, currentActive: boolean) => {
    try {
      await adminApi.toggleProductVisibility(id, !currentActive);
      fetchProducts();
    } catch (e) {
      alert('Error al cambiar visibilidad');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '2rem' }}>
            Gestión de Productos (Tienda)
          </h1>
          <p style={{ color: '#A3998D', margin: '0.5rem 0 0', fontSize: '0.95rem' }}>
            Administra láminas Fine Art, libros, duplicar u ocultar productos.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: '#C5A059',
            color: '#090807',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Plus size={18} />
          <span>Añadir Producto</span>
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#A3998D' }}>Cargando productos...</div>
      ) : (
       <div style={{ backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.25)', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(197,160,89,0.2)', backgroundColor: 'rgba(197,160,89,0.05)', color: '#C5A059' }}>
                <th style={{ padding: '1rem' }}>Imagen</th>
                <th style={{ padding: '1rem' }}>Producto</th>
                <th style={{ padding: '1rem' }}>Precio</th>
                <th style={{ padding: '1rem' }}>Estado / Stock</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
               {products.map((p: any, productIndex) => (
                 <tr key={p.id} draggable onDragStart={() => setDraggedIndex(productIndex)} onDragOver={e => e.preventDefault()} onDrop={async () => { if (draggedIndex === null || draggedIndex === productIndex) return; const next = [...products]; const [item] = next.splice(draggedIndex, 1); next.splice(productIndex, 0, item); setProducts(next); setDraggedIndex(null); await adminApi.reorderProducts(next.map((product, order) => ({ id: product.id, order }))); }} style={{ borderBottom: '1px solid rgba(197,160,89,0.1)', cursor: 'grab' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ width: '45px', height: '45px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#000' }}>
                      <img
                        src={getMediaUrl(p.coverImage)}
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </td>
                 <td style={{ padding: '1rem', fontWeight: 600, color: '#F3D89D' }}>
                     {p.title}<small style={{ display: 'block', color: '#A3998D', fontWeight: 400 }}>{p.productCategory?.name || p.category}</small>
                  </td>
                  <td style={{ padding: '1rem', color: '#E5D6C5', fontWeight: 700 }}>
                    {p.price} €
                  </td>
                  <td style={{ padding: '1rem', color: '#A3998D' }}>
                    <span style={{ fontSize: '0.75rem', color: p.active !== false ? '#10B981' : '#EF4444', backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {p.active !== false ? 'Activo' : 'Oculto'}
                    </span>
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>
                      {p.isDigital ? '(Digital)' : `(Stock: ${p.stock ?? 0})`}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      <button
                        title="Cambiar visibilidad"
                        onClick={() => handleToggleVisibility(p.id, p.active !== false)}
                        style={{ background: 'none', border: '1px solid rgba(197,160,89,0.3)', color: p.active !== false ? '#10B981' : '#8E9BAE', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        {p.active !== false ? 'Ocultar' : 'Mostrar'}
                      </button>
                      <button
                        title="Duplicar Producto"
                        onClick={() => handleDuplicate(p.id)}
                        style={{ background: 'none', border: '1px solid rgba(197,160,89,0.3)', color: '#F3D89D', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        Duplicar
                      </button>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        style={{ background: 'none', border: '1px solid rgba(197,160,89,0.3)', color: '#F3D89D', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.4)', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(197,160,89,0.2)', paddingBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem' }}>
                {editingProduct.id ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#A3998D', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>CATEGORÍA</label>
                <select value={editingProduct.categoryId || ''} onChange={e => setEditingProduct({ ...editingProduct, categoryId: e.target.value || undefined })} style={{ width: '100%', padding: '.75rem', background: '#090807', color: '#fff', border: '1px solid rgba(197,160,89,.3)', marginBottom: '1rem' }}><option value="">Sin categoría</option>{categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>TÍTULO DEL PRODUCTO *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {editingProduct.id && <div><label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>GALERÍA MULTIMEDIA</label><input type="file" multiple accept="image/*,video/mp4,video/webm,video/quicktime" onChange={async e => { if (e.target.files) { try { await adminApi.uploadProductMedia(editingProduct.id!, e.target.files); alert('Multimedia subida. Cierra y vuelve a abrir para actualizar la galería.'); } catch (error: any) { alert(error.message); } } }} style={{ color: '#A3998D' }} /><small style={{ display: 'block', color: '#A3998D', marginTop: '.4rem' }}>Admite imágenes y vídeos de hasta 200 MB.</small></div>}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>PRECIO (€)</label>
                  <input
                    type="number"
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>STOCK DISPONIBLE</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value, 10) })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>IMAGEN DE PORTADA</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={editingProduct.coverImage || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, coverImage: e.target.value })}
                    style={{ flex: 1, padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowMediaPicker(true)}
                    style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(197,160,89,0.2)', border: '1px solid #C5A059', color: '#F3D89D', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <ImageIcon size={16} /> Elegir
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>DESCRIPCIÓN</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '0.75rem 1.5rem', backgroundColor: 'transparent', border: '1px solid rgba(197,160,89,0.3)', color: '#A3998D', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.75rem 1.75rem', backgroundColor: '#C5A059', border: 'none', color: '#090807', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Save size={18} /> Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectUrl={(url) => {
          if (editingProduct) setEditingProduct({ ...editingProduct, coverImage: url });
        }}
      />
    </div>
  );
};
