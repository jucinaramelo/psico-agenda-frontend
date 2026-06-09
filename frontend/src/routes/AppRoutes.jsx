import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Pacientes from "../pages/Pacientes/Pacientes";
import NovoPaciente from "../pages/NovoPaciente/NovoPaciente";
import DetalhesPaciente from "../pages/DetalhesPaciente/DetalhesPaciente";
import Agenda from "../pages/Agenda/Agenda";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Pacientes */}
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/novo" element={<NovoPaciente />} />
        <Route path="/pacientes/:id" element={<DetalhesPaciente />} />

        {/* Agenda */}
        <Route path="/agenda" element={<Agenda />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;