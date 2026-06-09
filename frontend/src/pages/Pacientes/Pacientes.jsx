import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { getPacientes, removerPaciente } from "../../services/pacienteService";

import "./Pacientes.css";

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setPacientes(getPacientes());
  }, []);

  function handleRemoverPaciente(id) {
    const confirmar = confirm("Deseja remover este paciente?");

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
              {pacientes.length === 0
                ? "0 pacientes cadastrados"
                : `${pacientes.length} paciente${
                    pacientes.length > 1 ? "s" : ""
                  } cadastrado${pacientes.length > 1 ? "s" : ""}`}
            </p>
          </div>

          {pacientes.length > 0 && (
            <Link to="/pacientes/novo" className="pacientes-primary-button">
              + Novo Paciente
            </Link>
          )}
        </section>

        {pacientes.length === 0 ? (
          <section className="pacientes-empty">
            <div className="empty-icon">👥</div>

            <h2>Nenhum paciente cadastrado</h2>

            <p>Comece cadastrando seu primeiro paciente.</p>

            <Link to="/pacientes/novo" className="pacientes-primary-button">
              + Cadastrar paciente
            </Link>
          </section>
        ) : (
          <>
            <section className="pacientes-search-area">
              <input
                type="text"
                placeholder="Pesquisar por nome..."
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
              />
            </section>

            {pacientesFiltrados.length === 0 ? (
              <section className="pacientes-empty small">
                <div className="empty-icon">🔍</div>
                <h2>Nenhum paciente encontrado</h2>
                <p>Tente pesquisar por outro nome.</p>
              </section>
            ) : (
              <section className="pacientes-grid">
                {pacientesFiltrados.map((paciente) => (
                  <article className="paciente-card" key={paciente.id}>
                    <div className="paciente-card-header">
                      <div className="paciente-avatar">
                        {paciente.nome.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h2>{paciente.nome}</h2>

                        <p>
                          {paciente.idade || "Idade não informada"} anos
                          {paciente.telefone && ` · ${paciente.telefone}`}
                        </p>
                      </div>
                    </div>

                    {paciente.email && (
                      <p className="paciente-email">✉️ {paciente.email}</p>
                    )}

                    <div className="paciente-card-actions">
                      <Link
                        to={`/pacientes/${paciente.id}`}
                        className="paciente-details-button"
                      >
                        Ver detalhes
                      </Link>

                      <button
                        type="button"
                        className="paciente-delete-button"
                        onClick={() => handleRemoverPaciente(paciente.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Pacientes;