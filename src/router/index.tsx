import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Main Entry Selector */}
          <Route path="/" element={<Home />} />

          {/* Portfolio & Services Hierarchy */}
          <Route path="/portfolio" element={<ListadoServicios />} />
          <Route path="/portfolio/presupuesto" element={<SolicitarPresupuesto />} />
          <Route path="/portfolio/:servicioSlug" element={<DetalleServicio />} />
          <Route path="/portfolio/:servicioSlug/:proyectoSlug" element={<FichaProyecto />} />

          {/* General Information Pages */}
          <Route path="/proceso-de-trabajo" element={<ProcesoDeTrabajo />} />
          <Route path="/contrato" element={<Contrato />} />
          <Route path="/sobre-mi" element={<SobreMi />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/faq" element={<FAQ />} />

          {/* E-Commerce Hierarchy */}
          <Route path="/tienda" element={<TiendaHome />} />
          <Route path="/tienda/:productoSlug" element={<FichaProducto />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
