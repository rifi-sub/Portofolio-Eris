import React, { useEffect, useState } from 'react';
import { adminApi } from '../services/adminApi';
import { Trash2, Mail, Phone, ExternalLink } from 'lucide-react';

export const AdminCommissions: React.FC = () => {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCommission, setEditingCommission] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState<string>('PENDING');
  const [newNotes, setNewNotes] = useState<string>('');

  const loadCommissions = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getCommissions();
      setCommissions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCommissions();
  }, []);

  const statusLabels: Record<string, { label: string; color: string }> = {
    PENDING: { label: '🟡 Pendiente', color: '#F59E0B' },
    AWAITING_REFS: { label: '🔵 Esperando Referencias', color: '#3B82F6' },
    SKETCH: { label: '✏️ Boceto', color: '#8B5CF6' },
    COLOR: { label: '🎨 Prueba de Color', color: '#EC4899' },
    REVISION: { label: '🔍 En Revisión', color: '#10B981' },
    COMPLETED: { label: '✅ Finalizado', color: '#059669' },
    ARCHIVED: { label: '📁 Archivado', color: '#6B7280' }
  };

  const handleOpenEdit = (comm: any) => {
    setEditingCommission(comm);
    setNewStatus(comm.status || 'PENDING');
    setNewNotes(comm.notes || '');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommission) return;
    try {
      await adminApi.updateCommissionStatus(editingCommission.id, newStatus, newNotes);
      setEditingCommission(null);
      loadCommissions();
    } catch (err: any) {
      alert(err.message || 'Error actualizando encargo');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar esta solicitud de encargo?')) return;
    try {
      await adminApi.deleteCommission(id);
      loadCommissions();
    } catch (err: any) {
      alert(err.message || 'Error eliminando encargo');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif, serif)', color: '#F3D89D', margin: 0 }}>
          Seguimiento de Encargos & Presupuestos
        </h1>
        <p style={{ color: '#8E9BAE', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
          Gestiona los estados de los encargos solicitados desde el portfolio (Boceto, Color, Revisión, Finalizado).
        </p>
      </div>

      {loading ? (
        <div style={{ color: '#8E9BAE', textAlign: 'center', padding: '3rem' }}>Cargando encargos...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {commissions.length === 0 ? (
            <div style={{ backgroundColor: '#121620', border: '1px solid rgba(197,160,89,0.2)', padding: '3rem', textAlign: 'center', color: '#8E9BAE', borderRadius: '8px' }}>
              No hay solicitudes de encargo recibidas por el momento.
            </div>
          ) : (
            commissions.map((comm) => {
              const statusInfo = statusLabels[comm.status] || { label: comm.status, color: '#C5A059' };

              return (
                <div
                  key={comm.id}
                  style={{
                    backgroundColor: '#121620',
                    border: '1px solid rgba(197,160,89,0.25)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 0.8fr 0.5fr',
                    gap: '1.5rem',
                    alignItems: 'center'
                  }}
                >
                  {/* Detalles del Cliente & Proyecto */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F3D89D' }}>{comm.projectName}</span>
                      <span style={{ fontSize: '10px', backgroundColor: 'rgba(197,160,89,0.15)', color: '#C5A059', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(197,160,89,0.3)' }}>
                        {comm.serviceType}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#CBD5E1', margin: '0 0 0.5rem 0', lineHeight: 1.5 }}>
                      {comm.description}
                    </p>

                    <div style={{ fontSize: '0.75rem', color: '#8E9BAE', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Mail size={12} /> {comm.email}</span>
                      {comm.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Phone size={12} /> {comm.phone}</span>}
                      {comm.referencesUrl && (
                        <a href={comm.referencesUrl} target="_blank" rel="noreferrer" style={{ color: '#C5A059', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <ExternalLink size={12} /> Referencias
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Presupuesto & Plazo */}
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#8E9BAE' }}>Cliente: <strong style={{ color: '#E2E8F0' }}>{comm.clientName}</strong></div>
                    <div style={{ fontSize: '0.75rem', color: '#8E9BAE', marginTop: '0.25rem' }}>Rango: <strong style={{ color: '#C5A059' }}>{comm.budgetRange || 'No especificado'}</strong></div>
                    <div style={{ fontSize: '0.75rem', color: '#8E9BAE', marginTop: '0.25rem' }}>Fecha límite: <strong style={{ color: '#E2E8F0' }}>{comm.deadline || 'Flexi'}</strong></div>
                  </div>

                  {/* Estado Actual & Notas */}
                  <div>
                    <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.04)', color: statusInfo.color, border: `1px solid ${statusInfo.color}`, padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                      {statusInfo.label}
                    </div>
                    {comm.notes && (
                      <p style={{ fontSize: '0.7rem', color: '#8E9BAE', fontStyle: 'italic', margin: '0.5rem 0 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        Nota: {comm.notes}
                      </p>
                    )}
                  </div>

                  {/* Acciones */}
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleOpenEdit(comm)}
                      style={{ backgroundColor: 'rgba(197,160,89,0.15)', color: '#F3D89D', border: '1px solid rgba(197,160,89,0.3)', padding: '0.5rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Estado
                    </button>
                    <button
                      onClick={() => handleDelete(comm.id)}
                      style={{ backgroundColor: 'transparent', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', padding: '0.5rem 0.65rem', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Modal Cambiar Estado */}
      {editingCommission && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#121620', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '12px', width: '100%', maxWidth: '480px', padding: '2rem' }}>
            <h2 style={{ color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', marginTop: 0, marginBottom: '0.5rem' }}>
              Actualizar Estado del Encargo
            </h2>
            <p style={{ color: '#8E9BAE', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              Proyecto: <strong style={{ color: '#E2E8F0' }}>{editingCommission.projectName}</strong> ({editingCommission.clientName})
            </p>

            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', color: '#8E9BAE', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Seleccionar Estado del Flujo *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0A0D14', border: '1px solid rgba(197,160,89,0.3)', color: '#E2E8F0', borderRadius: '6px' }}
                >
                  <option value="PENDING">🟡 Pendiente (Revisión Inicial)</option>
                  <option value="AWAITING_REFS">🔵 Esperando Referencias del Cliente</option>
                  <option value="SKETCH">✏️ Bocetos Iniciales</option>
                  <option value="COLOR">🎨 Propuesta de Color</option>
                  <option value="REVISION">🔍 Segunda Revisión</option>
                  <option value="COMPLETED">✅ Finalizado & Entregado</option>
                  <option value="ARCHIVED">📁 Archivado</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#8E9BAE', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Notas Internas / Seguimiento</label>
                <textarea
                  rows={4}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Escribe detalles del estado del boceto, acuerdos de plazo, feedback recibido..."
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0A0D14', border: '1px solid rgba(197,160,89,0.3)', color: '#E2E8F0', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setEditingCommission(null)} style={{ backgroundColor: 'transparent', color: '#8E9BAE', border: 'none', padding: '0.65rem 1.25rem', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ backgroundColor: '#C5A059', color: '#0A0D14', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Actualizar Estado</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
