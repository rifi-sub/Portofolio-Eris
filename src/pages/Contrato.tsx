import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileCheck, Lock, DollarSign, Scale, HelpCircle } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody } from '../components/ui/Card';

export const Contrato: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
      <Breadcrumb items={[{ label: 'Contrato & Términos' }]} />

      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <Badge variant="terracotta" icon={<ShieldCheck size={14} />} style={{ marginBottom: '0.75rem' }}>
            Marco Legal & Transparencia
          </Badge>
          <h1 style={{ marginBottom: '1rem' }}>Condiciones Generales del Encargo</h1>
          <p style={{ fontSize: '1.1rem' }}>
            Para garantizar una relación profesional clara y protegida, todos nuestros encargos se rigen por un contrato estándar de ilustración y cesión de derechos de autor.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
          {/* Section 1 */}
          <Card glass style={{ padding: '1.5rem' }}>
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--accent-terracotta)' }}>
                <Scale size={24} />
                <h3 style={{ fontSize: '1.3rem' }}>1. Propiedad Intelectual & Derechos de Autor</h3>
              </div>
              <p style={{ lineHeight: '1.7', fontSize: '0.975rem', marginBottom: '1rem' }}>
                De acuerdo con la Ley de Propiedad Intelectual, el ilustrador conserva la autoría y los derechos morales inalienables sobre las obras creadas. El cliente recibe una <strong>licencia de explotación comercial en exclusiva</strong> ajustada al ámbito, formato y plazo acordado en el contrato específico del encargo.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                * El ilustrador se reserva el derecho de exhibir las ilustraciones en sus portfolios profesionales, exposiciones y publicaciones promocionales del estudio.
              </p>
            </CardBody>
          </Card>

          {/* Section 2 */}
          <Card glass style={{ padding: '1.5rem' }}>
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--accent-amber)' }}>
                <DollarSign size={24} />
                <h3 style={{ fontSize: '1.3rem' }}>2. Calendario de Pagos & Depósito</h3>
              </div>
              <ul style={{ lineHeight: '1.8', fontSize: '0.975rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Depósito Inicial (50%):</strong> Se abonará antes del inicio del trabajo para reservar la plaza en la agenda del estudio.</li>
                <li><strong>Pago Final (50%):</strong> Se abonará tras la aprobación final del arte y con carácter previo a la entrega de los archivos maestros en alta resolución.</li>
              </ul>
            </CardBody>
          </Card>

          {/* Section 3 */}
          <Card glass style={{ padding: '1.5rem' }}>
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>
                <FileCheck size={24} />
                <h3 style={{ fontSize: '1.3rem' }}>3. Rondas de Revisión & Cambios</h3>
              </div>
              <p style={{ lineHeight: '1.7', fontSize: '0.975rem', marginBottom: '1rem' }}>
                Cada proyecto incluye <strong>2 rondas de corrección en la etapa de bocetos</strong> para validar composición, personajes y elementos narrativos. Tras la aprobación del boceto, se procede al coloreado final, que incluye hasta 2 revisiones de ajustes cromáticos menores.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                * Cambios estructurales solicitados una vez aprobada la fase de boceto o una vez iniciado el renderizado final se tarifarán por hora de trabajo adicional (45€/h).
              </p>
            </CardBody>
          </Card>

          {/* Section 4 */}
          <Card glass style={{ padding: '1.5rem' }}>
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--accent-rose)' }}>
                <Lock size={24} />
                <h3 style={{ fontSize: '1.3rem' }}>4. Acuerdos de Confidencialidad (NDA)</h3>
              </div>
              <p style={{ lineHeight: '1.7', fontSize: '0.975rem' }}>
                Respetamos de forma absoluta la confidencialidad de lanzamientos editoriales o producciones de cine/videojuegos no anunciadas. Firmamos acuerdos NDA bajo solicitud sin coste adicional antes de revisar materiales sensibles de guión o briefing.
              </p>
            </CardBody>
          </Card>
        </div>

        <div
          style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid var(--border-dark)',
          }}
        >
          <HelpCircle size={32} color="var(--accent-terracotta)" style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>¿Tienes alguna duda sobre los términos?</h3>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Consúltanos cualquier cláusula específica antes de formalizar tu encargo.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contacto">
              <Button variant="outline">Contactar con el estudio</Button>
            </Link>
            <Link to="/faq">
              <Button variant="secondary">Ir a FAQ</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
