import React, { useEffect, useState } from 'react';
import { portfolioApi, getMediaUrl, type Review } from '../services/portfolioApi';
import { Star, MessageSquareQuote } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Resenas: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    portfolioApi.getReviews().then(setReviews);
  }, []);

  return (
    <div className="page-container">
      <div className="section-wrapper">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle">TESTIMONIOS & EXPERIENCIA DE CLIENTES</span>
          <h1 className="page-title" style={{ fontSize: '3.25rem' }}>
            RESEÑAS & OPINIONES <span style={{ color: '#C5A059' }}>✦</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0 auto', fontSize: '13px', color: '#5c5247', lineHeight: 1.8 }}>
            La confianza y la satisfacción de editoriales, directores de arte y coleccionistas privados en cada encargo y envío de obra.
          </p>
        </div>

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', background: '#ffffff', border: '1px solid rgba(197,160,89,0.25)', color: '#5c5247' }}>
            <p>Cargando reseñas de clientes...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
            {reviews.map((rev) => {
              const avatar = getMediaUrl(rev.avatarUrl);
              const photos = rev.photos ? JSON.parse(rev.photos) : [];

              return (
                <div
                  key={rev.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.02)'
                  }}
                >
                  <div>
                    {/* Rating Stars & Quote Icon */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={15} fill="#C5A059" color="#C5A059" />
                        ))}
                      </div>
                      <MessageSquareQuote size={20} color="rgba(197, 160, 89, 0.5)" />
                    </div>

                    {/* Review Text */}
                    <p style={{ fontSize: '12px', color: '#5c5247', lineHeight: 1.85, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                      "{rev.text}"
                    </p>

                    {/* Photos attached */}
                    {photos.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {photos.map((photo: string, pIdx: number) => (
                          <div key={pIdx} style={{ width: '60px', height: '60px', overflow: 'hidden', border: '1px solid rgba(197,160,89,0.3)', background: '#f5f2eb' }}>
                            <img src={getMediaUrl(photo)} alt="Resultado" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Author Meta */}
                  <div style={{ borderTop: '1px dashed rgba(197, 160, 89, 0.25)', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {avatar ? (
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #C5A059' }}>
                        <img src={avatar} alt={rev.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#faf8f5', border: '1px solid #C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-cinzel)', color: '#C5A059', fontWeight: 700 }}>
                        {rev.author.charAt(0)}
                      </div>
                    )}

                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: '#1a1510', margin: 0 }}>
                        {rev.author}
                      </h4>
                      <p style={{ fontSize: '10px', color: '#7a6f64', margin: '0.15rem 0 0 0' }}>
                        {rev.role} {rev.company ? `• ${rev.company}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(197, 160, 89, 0.3)', padding: '3rem', textAlign: 'center' }}>
          <h3 className="section-title" style={{ marginBottom: '1rem' }}>
            ¿TIENES UN PROYECTO EN MENTE? <span style={{ color: '#C5A059' }}>✦</span>
          </h3>
          <p style={{ fontSize: '12px', color: '#5c5247', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Cuéntanos tu visión narrativa o solicita un presupuesto personalizado para tu obra o publicación.
          </p>
          <Link to="/contacto" className="btn-gold-primary">
            <span>HABLAR CON LA ARTISTA</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
