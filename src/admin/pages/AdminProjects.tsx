import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, X, Save } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import { adminApi } from '../services/adminApi';
import { MediaPickerModal } from '../components/MediaPickerModal';
import type { Project } from '../../types';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaTargetField, setMediaTargetField] = useState<'cover' | 'gallery'>('cover');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenNew = () => {
    setEditingProject({
      title: '',
      slug: '',
      subtitle: '',
      coverImage: '/portfolio-hero.png',
      client: '',
      year: new Date().getFullYear().toString(),
      role: 'Ilustradora',
      description: '',
      conceptText: '',
      resultSummary: '',
      featured: false,
      tags: [],
      gallery: [],
      software: ['Procreate', 'Photoshop']
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProject({ ...proj });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta obra de arte?')) return;
    try {
      await adminApi.deleteProject(id);
      fetchProjects();
    } catch (e) {
      alert('Error al borrar la obra');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return alert('El título es obligatorio');

    // Auto-generar slug si no existe
    const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      const payload = { ...editingProject, slug };
      if (editingProject.id) {
        await adminApi.updateProject(editingProject.id, payload);
      } else {
        await adminApi.createProject(payload);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (e) {
      alert('Error al guardar la obra');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await adminApi.duplicateProject(id);
      fetchProjects();
    } catch (e) {
      alert('Error al duplicar la obra');
    }
  };

  const handleToggleVisibility = async (id: string, currentActive: boolean) => {
    try {
      await adminApi.toggleProjectVisibility(id, !currentActive);
      fetchProjects();
    } catch (e) {
      alert('Error al cambiar visibilidad');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '2rem' }}>
            Gestión de Obras & Trabajos de Arte
          </h1>
          <p style={{ color: '#A3998D', margin: '0.5rem 0 0', fontSize: '0.95rem' }}>
            Añade, modifica, duplica u oculta proyectos del portfolio público.
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
          <span>Añadir Obra</span>
        </button>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#A3998D' }}>Cargando obras...</div>
      ) : projects.length === 0 ? (
        <div style={{ backgroundColor: '#12100E', padding: '3rem', borderRadius: '10px', textAlign: 'center', color: '#A3998D' }}>
          No hay obras creadas todavía. ¡Haz clic en "Añadir Obra" para comenzar!
        </div>
      ) : (
        <div style={{ backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.25)', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(197,160,89,0.2)', backgroundColor: 'rgba(197,160,89,0.05)', color: '#C5A059' }}>
                <th style={{ padding: '1rem' }}>Portada</th>
                <th style={{ padding: '1rem' }}>Título</th>
                <th style={{ padding: '1rem' }}>Cliente / Año</th>
                <th style={{ padding: '1rem' }}>Estado</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p: any) => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(197,160,89,0.1)' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#000' }}>
                      <img
                        src={p.coverImage.startsWith('/') && !p.coverImage.startsWith('/def') ? `http://localhost:5000${p.coverImage}` : p.coverImage}
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#F3D89D' }}>
                    {p.title}
                    <div style={{ fontSize: '0.75rem', color: '#A3998D', fontWeight: 400 }}>/{p.slug}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#E5D6C5' }}>
                    {p.client || '—'} {p.year ? `(${p.year})` : ''}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: p.active !== false ? '#10B981' : '#EF4444', backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {p.active !== false ? 'Publicado' : 'Oculto / Borrador'}
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
                        title="Duplicar Obra"
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

      {/* CRUD Modal */}
      {isModalOpen && editingProject && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.4)', borderRadius: '12px', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(197,160,89,0.2)', paddingBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem' }}>
                {editingProject.id ? 'Editar Obra de Arte' : 'Nueva Obra de Arte'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#A3998D', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>TÍTULO DE LA OBRA *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>SLUG (URL)</label>
                  <input
                    type="text"
                    value={editingProject.slug || ''}
                    placeholder="la-flor-y-la-niebla"
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>SUBTÍTULO / RESUMEN CORTO</label>
                <input
                  type="text"
                  value={editingProject.subtitle || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>CLIENTE</label>
                  <input
                    type="text"
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>AÑO</label>
                  <input
                    type="text"
                    value={editingProject.year || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>ROL</label>
                  <input
                    type="text"
                    value={editingProject.role || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Cover Image Selector */}
              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>IMAGEN DE PORTADA</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={editingProject.coverImage || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                    style={{ flex: 1, padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <button
                    type="button"
                    onClick={() => { setMediaTargetField('cover'); setShowMediaPicker(true); }}
                    style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(197,160,89,0.2)', border: '1px solid #C5A059', color: '#F3D89D', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <ImageIcon size={16} /> Elegir
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#C5A059', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>DESCRIPCIÓN DETALLADA</label>
                <textarea
                  rows={4}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#090807', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '6px', color: '#fff', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={editingProject.featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                />
                <label htmlFor="featuredCheck" style={{ color: '#F3D89D', fontSize: '0.9rem', cursor: 'pointer' }}>
                  Destacar esta obra en la landing y portada
                </label>
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
                  <Save size={18} /> Guardar Obra
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
          if (mediaTargetField === 'cover' && editingProject) {
            setEditingProject({ ...editingProject, coverImage: url });
          }
        }}
      />
    </div>
  );
};
