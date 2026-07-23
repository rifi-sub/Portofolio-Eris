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

// Wrapper that renders Layout with nested routes via <Outlet>
const WithLayout: React.FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home: owns its nav, footer and full scroll height — NO Layout wrapper */}
        <Route path="/" element={<Home />} />

        {/* All other routes share the standard Layout */}
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
      </Routes>
    </BrowserRouter>
  );
};
