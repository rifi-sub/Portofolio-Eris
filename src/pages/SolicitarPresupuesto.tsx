import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Send, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { mockServices } from '../data/mockData';

export const SolicitarPresupuesto: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    companyName: '',
    serviceId: initialServiceId,
    projectType: 'editorial',
    budgetRange: '500-1000',
    deadline: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const serviceOptions = [
    { value: '', label: 'Seleccionar un servicio de catálogo (Opcional)' },
    ...mockServices.map((s) => ({ value: s.id, label: `${s.title} (Desde ${s.priceFrom}€)` })),
  ];

  const projectTypeOptions = [
    { value: 'editorial', label: 'Portada / Ilustración Editorial' },
    { value: 'branding', label: 'Diseño de Personaje / Mascota de Marca' },
    { value: 'digital-art', label: 'Concept Art / Key Art Audiovisual' },
    { value: 'custom-commission', label: 'Encargo Privado / Retrato Original' },
    { value: 'mural', label: 'Mural / Gran Formato' },
    { value: 'other', label: 'Otro tipo de proyecto' },
  ];

  const budgetOptions = [
    { value: '300-500', label: '300€ — 500€ (Encargos individuales / Retratos)' },
    { value: '500-1000', label: '500€ — 1,000€ (Portadas / Mascotas de marca)' },
    { value: '1000-2500', label: '1,000€ — 2,500€ (Sagas editoriales / Packs completos)' },
    { value: '2500+', label: 'Más de 2,500€ (Producciones de gran escala / Murales)' },
  ];

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
      <Breadcrumb
        items={[
          { label: 'Portfolio', url: '/portfolio' },
          { label: 'Solicitar Presupuesto' },
        ]}
      />

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Badge variant="terracotta" icon={<Sparkles size={14} />} style={{ marginBottom: '0.75rem' }}>
            Formulario de Encargo
          </Badge>
          <h1 style={{ marginBottom: '1rem' }}>Solicitar Presupuesto Creativo</h1>
          <p style={{ fontSize: '1.1rem' }}>
            Cuéntanos la visión de tu proyecto. Te responderemos en un plazo máximo de 24-48 horas laborables con una propuesta detallada y desglose de plazos.
          </p>
        </div>

        <Card glass style={{ padding: '2.5rem 2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <Input
                label="Nombre completo"
                required
                placeholder="Ej. Laura Martínez"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              />
              <Input
                label="Correo electrónico"
                type="email"
                required
                placeholder="laura@empresa.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <Input
                label="Empresa / Editorial / Marca"
                placeholder="Ej. Editorial Valhalla (Opcional)"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
              <Select
                label="Servicio de referencia"
                options={serviceOptions}
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <Select
                label="Categoría del proyecto"
                required
                options={projectTypeOptions}
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              />
              <Select
                label="Rango de presupuesto estimado"
                required
                options={budgetOptions}
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              />
            </div>

            <Input
              label="Plazo limite o fecha estimada de entrega"
              placeholder="Ej. 15 de Noviembre de 2026"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />

            <div className="ui-form-group">
              <label className="ui-form-label ui-form-label--required">Detalles y visión del proyecto</label>
              <textarea
                className="ui-textarea"
                rows={5}
                required
                placeholder="Describe brevemente la narrativa, número de ilustraciones requeridas, soporte final (impreso/digital), estilo deseado y cualquier referente visual..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
              }}
            >
              <ShieldCheck size={18} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
              <span>Tus datos están seguros. Respetamos la confidencialidad de tu obra e ideas.</span>
            </div>

            <Button variant="primary" size="lg" fullWidth type="submit" rightIcon={<Send size={18} />}>
              Enviar Solicitud de Presupuesto
            </Button>
          </form>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={submitted}
        onClose={() => setSubmitted(false)}
        title="¡Solicitud Recibida!"
        footer={
          <Link to="/portfolio" style={{ width: '100%' }}>
            <Button variant="primary" fullWidth onClick={() => setSubmitted(false)}>
              Volver al Portfolio
            </Button>
          </Link>
        }
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{ color: 'var(--accent-emerald)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <CheckCircle size={56} />
          </div>
          <h3 style={{ marginBottom: '0.75rem' }}>Gracias, {formData.clientName || 'Cliente'}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Hemos recibido los detalles de tu encargo en nuestro estudio. Revisaremos tu propuesta y nos pondremos en contacto contigo en <strong>{formData.email || 'tu correo'}</strong> en un plazo máximo de 24 a 48 horas.
          </p>
        </div>
      </Modal>
    </div>
  );
};
