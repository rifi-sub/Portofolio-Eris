import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, FileText, Wrench, Package, Image, Plus, ArrowRight } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import { adminApi } from '../services/adminApi';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    projectsCount: 0,
    servicesCount: 0,
    productsCount: 0,
    mediaCount: 0
  });

  useEffect(() => {
    async function loadStats() {
      const [p, s, prod, m] = await Promise.all([
        portfolioApi.getProjects(),
        portfolioApi.getServices(),
        portfolioApi.getProducts(),
        adminApi.getMediaItems()
      ]);
      setStats({
        projectsCount: p.length,
        servicesCount: s.length,
        productsCount: prod.length,
        mediaCount: m.length
      });
    }
    loadStats();
  }, []);

  const cards = [
    { title: 'Obras de Arte', count: stats.projectsCount, path: '/admin/projects', icon: FolderKanban, color: '#C5A059' },
    { title: 'Subapartados / Textos', count: 4, path: '/admin/content', icon: FileText, color: '#60a5fa' },
    { title: 'Servicios', count: stats.servicesCount, path: '/admin/services', icon: Wrench, color: '#a78bfa' },
    { title: 'Productos Tienda', count: stats.productsCount, path: '/admin/products', icon: Package, color: '#f43f5e' },
    { title: 'Biblioteca de Medios', count: stats.mediaCount, path: '/admin/media', icon: Image, color: '#34d399' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0, color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '2rem' }}>
          Resumen General
        </h1>
        <p style={{ color: '#A3998D', margin: '0.5rem 0 0', fontSize: '0.95rem' }}>
          Bienvenida al panel de gestión de contenido e ilustraciones.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.path}
              style={{
                backgroundColor: '#12100E',
                border: '1px solid rgba(197,160,89,0.25)',
                borderRadius: '10px',
                padding: '1.5rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.2s, border-color 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#A3998D', fontWeight: 500 }}>{card.title}</span>
                  <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#F3D89D', marginTop: '0.25rem' }}>
                    {card.count}
                  </div>
                </div>
                <div style={{
                  padding: '0.6rem',
                  borderRadius: '8px',
                  backgroundColor: `${card.color}15`,
                  color: card.color
                }}>
                  <Icon size={24} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: card.color, fontWeight: 600 }}>
                <span>Gestionar</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ backgroundColor: '#12100E', border: '1px solid rgba(197,160,89,0.25)', borderRadius: '10px', padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.25rem', color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', fontSize: '1.25rem' }}>
          Acciones Rápidas
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Link
            to="/admin/projects"
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: '#C5A059',
              color: '#090807',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Plus size={16} />
            <span>Añadir Nueva Obra</span>
          </Link>

          <Link
            to="/admin/content"
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'rgba(197,160,89,0.15)',
              border: '1px solid rgba(197,160,89,0.4)',
              color: '#F3D89D',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FileText size={16} />
            <span>Editar Textos de la Web</span>
          </Link>

          <Link
            to="/admin/media"
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#E5D6C5',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Image size={16} />
            <span>Subir Imágenes a la Biblioteca</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
