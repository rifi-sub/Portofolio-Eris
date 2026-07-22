import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { mockFAQs } from '../data/mockData';
import type { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [abiertos, setAbiertos] = useState<Record<string, boolean>>({
    [mockFAQs[0]?.id || '1']: true,
  });

  const toggle = (id: string) => {
    setAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-container">
      <div className="section-wrapper" style={{ maxWidth: '880px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle">PREGUNTAS FRECUENTES</span>
          <h1 className="page-title">
            DUDAS & GUÍA DE COMPRA <span style={{ color: '#C5A059' }}>✦</span>
          </h1>

          <div className="star-ornament" style={{ justifyContent: 'center', margin: '1rem 0' }}>
            <span className="star-symbol">✦</span>
          </div>

          <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto' }}>
            Encuentra información clara sobre la producción de láminas, tiempos de entrega, licencias de uso y el proceso de encargo personalizado.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockFAQs.map((faq: FAQItem) => {
            const isOpen = !!abiertos[faq.id];
            return (
              <div
                key={faq.id}
                style={{
                  background: '#ffffff',
                  border: isOpen ? '1px solid #C5A059' : '1px solid rgba(197, 160, 89, 0.3)',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1510', fontWeight: 500 }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    color="#C5A059"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid rgba(197, 160, 89, 0.15)' }}>
                    <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.8, margin: 0, paddingTop: '1rem' }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
