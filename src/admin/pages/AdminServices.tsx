import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import { adminApi } from '../services/adminApi';
import type { Service } from '../../types';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getServices();
      setServices(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenNew = () => {
    setEditingService({
      title: '',
      slug: '',
      tagline: '',
      description: '',
      category: 'editorial',
      priceFrom: 300,
      currency: '€',
      estimatedDelivery: '2 semanas',
      deliverables: [],
      coverImage: '/srv-editorial.png',
      featured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: Service) => {
    setEditingService({ ...srv });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este servicio?')) return;
    try {
      await adminApi.deleteService(id);
      fetchServices();
    } catch (e) {
      alert('Error al borrar el servicio');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) return alert('El título es obligatorio');

    const slug = editingService.slug || editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      const payload = { ...editingService, slug };
      if (editingService.id) {
        await adminApi.updateService(editingService.id, payload);
      } else {
        await adminApi.createService(payload);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (e) {
      alert('Error al guardar el servicio');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await adminApi.duplicateService(id);
      fetchServices();
    } catch (e) {
      alert('Error al duplicar el servicio');
    }
  };

  const handleToggleVisibility = async (id: string, currentActive: boolean) => {
    try {
      await adminApi.toggleServiceVisibility(id, !currentActive);
      fetchServices();
    } catch (e) {
      alert('Error al cambiar visibilidad');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '2rem' }}>
            Gestión de Servicios
          </h1>
          <p style={{ color: '#A3998D', margin: '0.5rem 0 0', fontSize: '0.95rem' }}>
            Personaliza los paquetes de encargo, tarifas desde, duplicar u ocultar.
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
          <span>Añadir Servicio</span>
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#A3998D' }}>Cargando servicios...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {services.map((s: any) => (
            <div
              key={s.id}
              style={{
                backgroundColor: '#12100E',
                border: '1px solid rgba(197,160,89,0.25)',
                borderRadius: '10px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#F3D89D', fontSize: '1.1rem' }}>{s.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#C5A059', fontWeight: 700 }}>{s.priceFrom} {s.currency}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#A3998D', margin: '0 0 1rem' }}>{s.tagline}</p>
                <span style={{ fontSize: '0.75rem', color: s.active !== false ? '#10B981' : '#EF4444', backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {s.active !== false ? 'Activo' : 'Oculto / Borrador'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid rgba(197,160,89,0.15)', marginTop: '1rem' }}>
                <button
                  title="Cambiar visibilidad"
                  onClick={() => handleToggleVisibility(s.id, s.active !== false)}
                  style={{ background: 'none', border: '1px solid rgba(197,160,89,0.3)', color: s.active !== false ? '#10B981' : '#8E9BAE', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  {s.active !== false ? 'Ocultar' : 'Mostrar'}
                </button>
                <button
                  title="Duplicar Servicio"
                  onClick={() => handleDuplicate(s.id)}
                  style={{ background: 'none', border: '1px solid rgba(197,160,89,0.3)', color: '#F3D89D', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  Duplicar
                </button>
                <button
                  onClick={() => handleOpenEdit(s)}
                  style={{ background: 'none', border: '1px solid rgba(197,160,89,0.3)', color: '#F3D89D', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingService && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.4)', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(197,160,89,0.2)', paddingBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem' }}>
                {editingService.id ? 'Editar Servicio' : 'Nuevo Servicio'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#A3998D', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>TÍTULO DEL SERVICIO *</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>TAGLINE / FRASE DE PRESENTACIÓN</label>
                <input
                  type="text"
                  value={editingService.tagline || ''}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>PRECIO DESDE (€)</label>
                  <input
                    type="number"
                    value={editingService.priceFrom || 0}
                    onChange={(e) => setEditingService({ ...editingService, priceFrom: parseFloat(e.target.value) })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>TIEMPO ESTIMADO</label>
                  <input
                    type="text"
                    value={editingService.estimatedDelivery || ''}
                    onChange={(e) => setEditingService({ ...editingService, estimatedDelivery: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>DESCRIPCIÓN COMPLETA</label>
                <textarea
                  rows={4}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
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
                  <Save size={18} /> Guardar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
