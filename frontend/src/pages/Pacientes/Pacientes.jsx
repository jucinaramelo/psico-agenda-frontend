import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import {
  getPacientes,
  removerPaciente,
} from "../../services/pacienteService";

import "./Pacientes.css";

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setPacientes(getPacientes());
  }, []);

  function handleRemoverPaciente(id) {
    const confirmar = window.confirm(
      "Deseja remover este paciente?"
    );

    if (!confirmar) return;

    removerPaciente(id);
    setPacientes(getPacientes());
  }

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="pacientes-page">

        <section className="pacientes-header">
          <div>
            <h1>Pacientes</h1>

            <p>
              {pacientes.length} paciente
              {pacientes.length !== 1 ? "s" : ""} cadastrado
              {pacientes.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Link
            to="/pacientes/novo"
            className="pacientes-primary-button"
          >
            + Novo Paciente
          </Link>
        </section>

        {pacientes.length > 0 && (
          <section className="pacientes-search-area">
            <input
              type="text"
              placeholder="Pesquisar paciente..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </section>
        )}

        {pacientes.length === 0 ? (
          <section className="pacientes-empty">
            <div className="empty-icon">👥</div>

            <h2>Nenhum paciente cadastrado</h2>

            <p>Cadastre seu primeiro paciente.</p>

            <Link
              to="/pacientes/novo"
              className="pacientes-primary-button"
            >
              + Cadastrar paciente
            </Link>
          </section>
        ) : (
          <section className="pacientes-grid">

            {pacientesFiltrados.map((paciente) => (

              <article
                key={paciente.id}
                className="paciente-card"
              >

                <div className="paciente-left">

                  <div
                    className="paciente-avatar"
                    style={{
                      backgroundColor: "#e1d7f7",
                      borderRadius: "50%",        
                      color: "#6a1b9a",          
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {paciente.nome.charAt(0).toUpperCase()}
                  </div>

                  <div className="lista-paciente-info">
                    <h2>{paciente.nome}</h2>
                    <p className="paciente-idade">
                      {paciente.idade
                        ? `${paciente.idade} anos`
                        : "Idade não informada"}
                    </p>
                  </div>

                </div>

                <div className="paciente-actions">

                  <Link
                    to={`/pacientes/${paciente.id}`}
                    className="paciente-details-button"
                  >
                    Detalhes
                  </Link>

                  <button
                    className="paciente-delete-button"
                    onClick={() =>
                      handleRemoverPaciente(paciente.id)
                    }
                  >
                    🗑️
                  </button>

                </div>

              </article>

            ))}

          </section>
        )}

      </main>
    </>
  );
}

export default Pacientes;