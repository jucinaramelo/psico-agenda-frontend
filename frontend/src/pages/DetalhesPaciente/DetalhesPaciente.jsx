import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { getPacientes } from "../../services/pacienteService";

import "./DetalhesPaciente.css";

function DetalhesPaciente() {
  const { id } = useParams();

  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    const pacientes = getPacientes();

    const encontrado = pacientes.find(
      (paciente) => String(paciente.id) === id
    );

    setPaciente(encontrado);
  }, [id]);

  if (!paciente) {
    return (
      <>
        <Navbar />

        <main className="detalhes-page">
          <div className="detalhes-container">
            <h2>Paciente não encontrado.</h2>

            <Link
              to="/pacientes"
              className="voltar-button"
            >
              ← Voltar para pacientes
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="detalhes-page">

        <div className="detalhes-container">

          <Link
            to="/pacientes"
            className="voltar-button"
          >
            ← Voltar para pacientes
          </Link>

          <section className="paciente-header">

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

            <div>
              <h1>{paciente.nome}</h1>

              <p>
                {paciente.idade || "--"} anos
                {paciente.genero && ` • ${paciente.genero}`}
              </p>
            </div>

          </section>

          <section className="info-card">

            <h2>Informações do paciente</h2>

            <div className="info-grid">

              <div className="info-item">
                <span>Telefone</span>
                <strong>{paciente.telefone || "-"}</strong>
              </div>

              <div className="info-item">
                <span>E-mail</span>
                <strong>{paciente.email || "-"}</strong>
              </div>

              <div className="info-item">
                <span>Profissão</span>
                <strong>{paciente.profissao || "-"}</strong>
              </div>

            </div>

            <div className="observacoes">
              <span>Observações</span>

              <p>
                {paciente.observacoes ||
                  "Nenhuma observação cadastrada."}
              </p>
            </div>

          </section>

          <section className="modulos-card">

            <h2>Ficha Clínica</h2>

            <div className="modulos-grid">

              <Link
                to={`/pacientes/${paciente.id}/anamnese`}
                className="modulo-card"
              >
                <h3>📝 Anamnese</h3>
                <p>Registrar informações iniciais.</p>
              </Link>

              <Link
                to={`/pacientes/${paciente.id}/evolucoes`}
                className="modulo-card"
              >
                <h3>📖 Evoluções</h3>
                <p>Registrar atendimentos.</p>
              </Link>

              <Link
                to={`/pacientes/${paciente.id}/consultas`}
                className="modulo-card"
              >
                <h3>📅 Consultas</h3>
                <p>Visualizar agenda do paciente.</p>
              </Link>

            </div>

          </section>

          <div className="actions">

            <Link
              to={`/pacientes/${paciente.id}/editar`}
              className="editar-button"
            >
              Editar paciente
            </Link>

          </div>

        </div>

      </main>
    </>
  );
}

export default DetalhesPaciente;