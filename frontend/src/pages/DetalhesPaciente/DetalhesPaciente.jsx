import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import {
  getPacientes,
  atualizarPaciente,
} from "../../services/pacienteService";

import "./DetalhesPaciente.css";
import { toast } from "react-toastify";

function DetalhesPaciente() {
  const { id } = useParams();

  const [paciente, setPaciente] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const pacientes = getPacientes();

    const encontrado = pacientes.find(
      (paciente) => String(paciente.id) === id
    );

    setPaciente(encontrado);
  }, [id]);

  function salvarPaciente() {
    atualizarPaciente(paciente.id, paciente);

    setEditando(false);

    toast.success("Paciente atualizado com sucesso!");
  }

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

            <div className="paciente-avatar">
              {paciente.nome.charAt(0).toUpperCase()}
            </div>

            <div className="paciente-header-info">

              {editando ? (
                <input
                  className="titulo-input"
                  value={paciente.nome || ""}
                  onChange={(e) =>
                    setPaciente({
                      ...paciente,
                      nome: e.target.value,
                    })
                  }
                />
              ) : (
                <h1>{paciente.nome}</h1>
              )}

              <div className="linha-header">

                {editando ? (
                  <>
                    <input
                      type="number"
                      className="small-input"
                      value={paciente.idade}
                      onChange={(e) =>
                        setPaciente({
                          ...paciente,
                          idade: e.target.value,
                        })
                      }
                    />

                    <select
                      value={paciente.genero}
                      onChange={(e) =>
                        setPaciente({
                          ...paciente,
                          genero: e.target.value,
                        })
                      }
                    >
                      <option value="">Gênero</option>
                      <option>Feminino</option>
                      <option>Masculino</option>
                      <option>Outro</option>
                      <option>Prefiro não informar</option>
                    </select>
                  </>
                ) : (
                  <p>
                    {paciente.idade || "--"} anos
                    {paciente.genero &&
                      ` • ${paciente.genero}`}
                  </p>
                )}

              </div>

            </div>

          </section>

          <section className="info-card">

            <h2>Informações do paciente</h2>

            <div className="info-grid">

              <div className="info-item">
                <span>Telefone</span>

                {editando ? (
                  <input
                    value={paciente.telefone || ""}
                    onChange={(e) =>
                      setPaciente({
                        ...paciente,
                        telefone: e.target.value,
                      })
                    }
                  />
                ) : (
                  <strong>{paciente.telefone || "-"}</strong>
                )}
              </div>

              <div className="info-item">
                <span>E-mail</span>

                {editando ? (
                  <input
                    value={paciente.email}
                    onChange={(e) =>
                      setPaciente({
                        ...paciente,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  <strong>{paciente.email || "-"}</strong>
                )}
              </div>

              <div className="info-item">
                <span>Profissão</span>

                {editando ? (
                  <input
                    value={paciente.profissao}
                    onChange={(e) =>
                      setPaciente({
                        ...paciente,
                        profissao: e.target.value,
                      })
                    }
                  />
                ) : (
                  <strong>{paciente.profissao || "-"}</strong>
                )}
              </div>

            </div>

            <div className="observacoes">

              <span>Observações</span>

              {editando ? (
                <textarea
                  value={paciente.observacoes || ""}
                  onChange={(e) =>
                    setPaciente({
                      ...paciente,
                      observacoes: e.target.value,
                    })
                  }
                />
              ) : (
                <p>
                  {paciente.observacoes ||
                    "Nenhuma observação cadastrada."}
                </p>
              )}

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
                <p>Visualizar Anamnese</p>
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

            {!editando ? (

              <button
                className="editar-button"
                onClick={() => setEditando(true)}
              >
                Editar dados
              </button>

            ) : (

              <>
                <button
                  className="cancelar-button"
                  onClick={() => setEditando(false)}
                >
                  Cancelar
                </button>

                <button
                  className="salvar-button"
                  onClick={salvarPaciente}
                >
                  Salvar alterações
                </button>
              </>

            )}

          </div>

        </div>

      </main>
    </>
  );
}

export default DetalhesPaciente;