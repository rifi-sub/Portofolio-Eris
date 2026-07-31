import React, { useEffect, useState } from 'react';
import { adminApi } from '../services/adminApi';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    author: '',
    role: '',
    company: '',
    rating: 5,
    text: '',
    avatarUrl: '',
    photos: '[]',
    order: 0,
    active: true
  });

  // Media Picker state
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getReviews();
      setReviews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      author: '',
      role: '',
      company: '',
      rating: 5,
      text: '',
      avatarUrl: '',
      photos: '[]',
      order: reviews.length,
      active: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rev: any) => {
    setEditingId(rev.id);
    setFormData({
      author: rev.author,
      role: rev.role || '',
      company: rev.company || '',
      rating: rev.rating || 5,
      text: rev.text,
      avatarUrl: rev.avatarUrl || '',
      photos: typeof rev.photos === 'string' ? rev.photos : JSON.stringify(rev.photos || []),
      order: rev.order || 0,
      active: rev.active ?? true
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminApi.updateReview(editingId, formData);
      } else {
        await adminApi.createReview(formData);
      }
      setIsModalOpen(false);
      loadReviews();
    } catch (err: any) {
      alert(err.message || 'Error guardando reseña');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar esta reseña?')) return;
    try {
      await adminApi.deleteReview(id);
      loadReviews();
    } catch (err: any) {
      alert(err.message || 'Error borrando reseña');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif, serif)', color: '#F3D89D', margin: 0 }}>
            Gestión de Reseñas & Testimonios
          </h1>
          <p style={{ color: '#8E9BAE', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
            Añade, edita y ordena las opiniones de editoriales y clientes.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          style={{
            backgroundColor: '#C5A059',
            color: '#0A0D14',
            border: 'none',
            padding: '0.65rem 1.25rem',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Plus size={16} />
          <span>Añadir Reseña</span>
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#8E9BAE', textAlign: 'center', padding: '3rem' }}>Cargando reseñas...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {reviews.map((rev) => (
            <div
              key={rev.id}
              style={{
                backgroundColor: '#121620',
                border: '1px solid rgba(197,160,89,0.2)',
                borderRadius: '8px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem' }}>
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#C5A059" color="#C5A059" />
                    ))}
                  </div>
                  <span style={{ fontSize: '11px', color: rev.active ? '#10B981' : '#EF4444', backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {rev.active ? 'Publicado' : 'Oculto'}
                  </span>
                </div>

                <p style={{ color: '#E2E8F0', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1rem' }}>
                  "{rev.text}"
                </p>

                <div style={{ fontSize: '0.8rem', color: '#F3D89D', fontWeight: 600 }}>{rev.author}</div>
                <div style={{ fontSize: '0.75rem', color: '#8E9BAE' }}>{rev.role} {rev.company ? `• ${rev.company}` : ''}</div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleOpenEdit(rev)}
                  style={{ background: 'none', border: '1px solid rgba(197,160,89,0.3)', color: '#F3D89D', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}
                >
                  <Edit2 size={13} />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(rev.id)}
                  style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}
                >
                  <Trash2 size={13} />
                  <span>Borrar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Edición / Creación */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#121620', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '12px', width: '100%', maxWidth: '550px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', marginTop: 0, marginBottom: '1.5rem' }}>
              {editingId ? 'Editar Reseña' : 'Añadir Nueva Reseña'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#8E9BAE', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Nombre del Autor *</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0A0D14', border: '1px solid rgba(197,160,89,0.3)', color: '#E2E8F0', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#8E9BAE', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Puesto / Rol</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Ej: Directora de Arte"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0A0D14', border: '1px solid rgba(197,160,89,0.3)', color: '#E2E8F0', borderRadius: '6px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#8E9BAE', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Empresa / Editorial</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ej: Editorial Planeta"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0A0D14', border: '1px solid rgba(197,160,89,0.3)', color: '#E2E8F0', borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#8E9BAE', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Valoración (1 a 5 Estrellas)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0A0D14', border: '1px solid rgba(197,160,89,0.3)', color: '#E2E8F0', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#8E9BAE', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Texto de la Reseña *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0A0D14', border: '1px solid rgba(197,160,89,0.3)', color: '#E2E8F0', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#8E9BAE', fontSize: '0.8rem', marginBottom: '0.3rem' }}>URL Foto de Avatar / Cliente</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    style={{ flex: 1, padding: '0.65rem', backgroundColor: '#0A0D14', border: '1px solid rgba(197,160,89,0.3)', color: '#E2E8F0', borderRadius: '6px' }}
                  />
                  <button type="button" onClick={() => setShowMediaPicker(true)} style={{ backgroundColor: 'rgba(197,160,89,0.15)', color: '#F3D89D', border: '1px solid rgba(197,160,89,0.3)', padding: '0 0.85rem', borderRadius: '6px', cursor: 'pointer' }}>Elegir</button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ backgroundColor: 'transparent', color: '#8E9BAE', border: 'none', padding: '0.65rem 1.25rem', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ backgroundColor: '#C5A059', color: '#0A0D14', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Guardar Reseña</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectUrl={(url: string) => {
          setFormData((prev: any) => ({ ...prev, avatarUrl: url }));
        }}
      />
    </div>
  );
};
