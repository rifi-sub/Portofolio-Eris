import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Accordion } from '../components/ui/Accordion';
import { Input } from '../components/ui/Input';
import { Tag } from '../components/ui/Tag';
import { mockFAQs } from '../data/mockData';

export const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { key: 'all', label: 'Todas las preguntas' },
    { key: 'portfolio', label: 'Servicios & Portfolio' },
    { key: 'store', label: 'Tienda & Envíos' },
    { key: 'contracts', label: 'Contratos & Licencias' },
    { key: 'process', label: 'Proceso de Trabajo' },
  ];

  const filteredFaqs = mockFAQs.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
      <Breadcrumb items={[{ label: 'Preguntas Frecuentes' }]} />

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Badge variant="terracotta" icon={<Sparkles size={14} />} style={{ marginBottom: '0.75rem' }}>
            Centro de Ayuda
          </Badge>
          <h1 style={{ marginBottom: '1rem' }}>Preguntas Frecuentes (FAQ)</h1>
          <p style={{ fontSize: '1.1rem' }}>
            Respuestas detalladas sobre servicios por encargo, compras en la tienda, licencias de autor y envíos.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ marginBottom: '2rem' }}>
          <Input
            placeholder="Buscar por palabra clave (ej. derechos, revisiones, envíos...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <Tag
              key={cat.key}
              active={selectedCategory === cat.key}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </Tag>
          ))}
        </div>

        {/* Accordion FAQ List */}
        {filteredFaqs.length > 0 ? (
          <Accordion
            allowMultiple
            items={filteredFaqs.map((faq) => ({
              id: faq.id,
              title: faq.question,
              content: faq.answer,
            }))}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
            No se encontraron preguntas que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};
