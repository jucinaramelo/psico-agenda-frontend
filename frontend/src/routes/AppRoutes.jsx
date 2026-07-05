import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Pacientes from "../pages/Pacientes/Pacientes";
import NovoPaciente from "../pages/NovoPaciente/NovoPaciente";
import DetalhesPaciente from "../pages/DetalhesPaciente/DetalhesPaciente";
import Anamnese from "../pages/Anamnese/Anamnese";
import Agenda from "../pages/Agenda/Agenda";
import NotFound from "../pages/NotFound/NotFound";
import FormularioAnamnese from "../pages/FormularioAnamnese/FormularioAnamnese";
import Evolucao from "../pages/Evolucao/Evolucao";

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

        {/* Anamnese */}
        <Route path="/pacientes/:id/anamnese" element={<Anamnese />} />

        {/* Agenda */}
        <Route path="/agenda" element={<Agenda />} />

        {/* Formulario Anamnese */}
        <Route path="/formulario/:id" element={<FormularioAnamnese />} />

        {/* Evolução */}
        <Route path="/pacientes/:id/evolucao" element={<Evolucao />} />
        
        {/* Agenda do paciente */}
        <Route path="/pacientes/:id/agenda" element={<Agenda />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;