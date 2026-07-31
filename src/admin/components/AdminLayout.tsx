import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Image, Package, Wrench, FolderKanban, LogOut, ExternalLink } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Obras / Trabajos', path: '/admin/projects', icon: FolderKanban },
    { label: 'Editor de Páginas', path: '/admin/content', icon: FileText },
    { label: 'Servicios', path: '/admin/services', icon: Wrench },
    { label: 'Tienda (Productos)', path: '/admin/products', icon: Package },
    { label: 'Biblioteca de Medios', path: '/admin/media', icon: Image },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#090807', color: '#E5D6C5', fontFamily: 'var(--font-sans, system-ui)' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '260px',
        backgroundColor: '#12100E',
        borderRight: '1px solid rgba(197,160,89,0.25)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        bottom: 0,
        zIndex: 50
      }}>
        <div>
          {/* Logo Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(197,160,89,0.2)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '1px solid rgba(197,160,89,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(197,160,89,0.1)',
              color: '#F3D89D',
              fontFamily: 'var(--font-serif, serif)',
              fontWeight: 700
            }}>
              IM
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '0.95rem', color: '#F3D89D', fontFamily: 'var(--font-serif, serif)', letterSpacing: '0.1em' }}>
                ADMIN PANEL
              </h1>
              <span style={{ fontSize: '10px', color: '#9A7B42', letterSpacing: '0.15em' }}>ILUSTRÍSIMA MAESTRA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    backgroundColor: isActive ? 'rgba(197,160,89,0.15)' : 'transparent',
                    color: isActive ? '#F3D89D' : '#A3998D',
                    borderLeft: isActive ? '3px solid #C5A059' : '3px solid transparent'
                  }}
                >
                  <Icon size={18} color={isActive ? '#F3D89D' : '#A3998D'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(197,160,89,0.2)' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.85rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: '#C5A059',
              textDecoration: 'none',
              fontSize: '0.8rem',
              border: '1px solid rgba(197,160,89,0.2)'
            }}
          >
            <span>Ver Web Pública</span>
            <ExternalLink size={14} />
          </a>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0.85rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 500
            }}
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '2rem 3rem', boxSizing: 'border-box', minHeight: '100vh' }}>
        {/* Top bar info */}
        <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(197,160,89,0.15)' }}>
          <div style={{ fontSize: '0.8rem', color: '#A3998D' }}>
            Conectado como <strong style={{ color: '#F3D89D' }}>{user?.email || 'admin'}</strong>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};
