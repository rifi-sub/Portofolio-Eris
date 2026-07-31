import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Home } from '../pages/Home';
import { ListadoServicios } from '../pages/ListadoServicios';
import { DetalleServicio } from '../pages/DetalleServicio';
import { FichaProyecto } from '../pages/FichaProyecto';
import { SolicitarPresupuesto } from '../pages/SolicitarPresupuesto';
import { ProcesoDeTrabajo } from '../pages/ProcesoDeTrabajo';
import { Contrato } from '../pages/Contrato';
import { TiendaHome } from '../pages/TiendaHome';
import { FichaProducto } from '../pages/FichaProducto';
import { SobreMi } from '../pages/SobreMi';
import { Contacto } from '../pages/Contacto';
import { FAQ } from '../pages/FAQ';

// Admin imports
import { AdminAuthProvider } from '../admin/context/AdminAuthContext';
import { ProtectedAdminRoute } from '../admin/components/ProtectedAdminRoute';
import { AdminLayout } from '../admin/components/AdminLayout';
import { AdminLogin } from '../admin/pages/AdminLogin';
import { AdminDashboard } from '../admin/pages/AdminDashboard';
import { AdminContentEditor } from '../admin/pages/AdminContentEditor';
import { AdminProjects } from '../admin/pages/AdminProjects';
import { AdminServices } from '../admin/pages/AdminServices';
import { AdminProducts } from '../admin/pages/AdminProducts';
import { AdminMediaLibrary } from '../admin/pages/AdminMediaLibrary';

// Wrapper that renders Layout with nested routes via <Outlet>
const WithLayout: React.FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);

// Wrapper for Admin pages with AdminLayout
const WithAdminLayout: React.FC = () => (
  <ProtectedAdminRoute>
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  </ProtectedAdminRoute>
);

export const AppRouter: React.FC = () => {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Home: owns its nav, footer and full scroll height — NO Layout wrapper */}
          <Route path="/" element={<Home />} />

          {/* All public routes share standard Layout */}
          <Route element={<WithLayout />}>
            <Route path="/portfolio" element={<ListadoServicios />} />
            <Route path="/portfolio/presupuesto" element={<SolicitarPresupuesto />} />
            <Route path="/portfolio/:servicioSlug" element={<DetalleServicio />} />
            <Route path="/portfolio/:servicioSlug/:proyectoSlug" element={<FichaProyecto />} />

            <Route path="/proceso-de-trabajo" element={<ProcesoDeTrabajo />} />
            <Route path="/contrato" element={<Contrato />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/faq" element={<FAQ />} />

            <Route path="/tienda" element={<TiendaHome />} />
            <Route path="/tienda/:productoSlug" element={<FichaProducto />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<WithAdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/content" element={<AdminContentEditor />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/media" element={<AdminMediaLibrary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
};

