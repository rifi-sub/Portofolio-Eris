import React, { useState } from 'react';
import { Mail, MapPin, Send, Sparkles, CheckCircle } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';

export const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sentModal, setSentModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentModal(true);
  };

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
      <Breadcrumb items={[{ label: 'Contacto' }]} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        <div>
          <Badge variant="terracotta" icon={<Sparkles size={14} />} style={{ marginBottom: '0.75rem' }}>
            Hablemos
          </Badge>
          <h1 style={{ marginBottom: '1rem' }}>Contacto Directo con el Estudio</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            ¿Tienes alguna consulta general, propuesta de colaboración o duda sobre la tienda? Déjanos un mensaje.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(224, 109, 83, 0.15)',
                  color: 'var(--accent-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Correo del estudio</div>
                <div style={{ fontWeight: 600 }}>contacto@artisanstudio.com</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(217, 119, 6, 0.15)',
                  color: 'var(--accent-amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Ubicación</div>
                <div style={{ fontWeight: 600 }}>Barcelona / Madrid, España (Envíos Mundiales)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Card glass style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nombre"
              required
              placeholder="Tu nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              required
              placeholder="tuemail@dominio.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Asunto"
              required
              placeholder="Ej. Consulta sobre láminas / Pregunta editorial"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
            <div className="ui-form-group">
              <label className="ui-form-label ui-form-label--required">Mensaje</label>
              <textarea
                className="ui-textarea"
                rows={5}
                required
                placeholder="Escribe tu mensaje..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <Button variant="primary" fullWidth size="lg" type="submit" rightIcon={<Send size={18} />}>
              Enviar Mensaje
            </Button>
          </form>
        </Card>
      </div>

      <Modal
        isOpen={sentModal}
        onClose={() => setSentModal(false)}
        title="Mensaje Enviado"
        footer={<Button variant="primary" fullWidth onClick={() => setSentModal(false)}>Cerrar</Button>}
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <CheckCircle size={48} color="var(--accent-emerald)" style={{ marginBottom: '1rem' }} />
          <h3>¡Mensaje enviado con éxito!</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Gracias por contactar con Artisan Studio. Te responderemos lo antes posible.
          </p>
        </div>
      </Modal>
    </div>
  );
};
