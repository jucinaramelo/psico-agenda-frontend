import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import Pacientes from "./pages/Pacientes";
import Agenda from "./pages/Agenda";
import DetalhesPaciente from "./pages/DetalhesPaciente";

function App() {
  return (
    <div className="container">
      <h1>Psico Agenda</h1>

      <nav>
        <Link to="/pacientes">Pacientes</Link>

        {" | "}

        <Link to="/agenda">Agenda</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/pacientes/:id" element={<DetalhesPaciente />} />
      </Routes>
    </div>
  );
}

export default App;