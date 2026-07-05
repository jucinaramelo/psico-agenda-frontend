import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

import {
  buscarPacientePorId,
  salvarConsulta,
  removerConsulta,
} from "../../services/pacienteService";

import { toast } from "react-toastify";

import "./Agenda.css";

function Agenda() {
  const { id } = useParams();

  const [paciente, setPaciente] = useState(null);

  const [consulta, setConsulta] = useState({
    data: "",
    horario: "",
    modalidade: "Presencial",
    status: "Agendada",
    observacoes: "",
  });

  useEffect(() => {
    carregarPaciente();
  }, [id]);

  function carregarPaciente() {
    const encontrado = buscarPacientePorId(id);

    if (encontrado) {
      setPaciente(encontrado);
    }
  }

  function alterarCampo(campo, valor) {
    setConsulta((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function salvar() {
    if (!consulta.data || !consulta.horario) {
      toast.error("Informe a data e o horário.");
      return;
    }

    const pacienteAtualizado = salvarConsulta(id, consulta);

    setPaciente(pacienteAtualizado);

    toast.success("Consulta cadastrada com sucesso!");

    setConsulta({
      data: "",
      horario: "",
      modalidade: "Presencial",
      status: "Agendada",
      observacoes: "",
    });
  }

  function excluir(idConsulta) {
    const pacienteAtualizado = removerConsulta(
      paciente.id,
      idConsulta
    );

    setPaciente(pacienteAtualizado);

    toast.success("Consulta removida.");
  }

  if (!paciente) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="agenda-page">
        <div className="agenda-container">

          <Link
            to={`/pacientes/${paciente.id}`}
            className="voltar-button"
          >
            ← Voltar para o paciente
          </Link>

          <div className="page-header">
            <h1>Agenda</h1>

            <p className="subtitle">
              Paciente: <strong>{paciente.nome}</strong>
            </p>
          </div>

          <section className="card">

            <h2>Nova consulta</h2>

            <div className="campo-form">
              <label>Data</label>

              <input
                type="date"
                value={consulta.data}
                onChange={(e) =>
                  alterarCampo("data", e.target.value)
                }
              />
            </div>

            <div className="campo-form">
              <label>Horário</label>

              <input
                type="time"
                value={consulta.horario}
                onChange={(e) =>
                  alterarCampo("horario", e.target.value)
                }
              />
            </div>

            <div className="campo-form">
              <label>Modalidade</label>

              <select
                value={consulta.modalidade}
                onChange={(e) =>
                  alterarCampo("modalidade", e.target.value)
                }
              >
                <option>Presencial</option>
                <option>Online</option>
              </select>
            </div>

            <div className="campo-form">
              <label>Status</label>

              <select
                value={consulta.status}
                onChange={(e) =>
                  alterarCampo("status", e.target.value)
                }
              >
                <option>Agendada</option>
                <option>Realizada</option>
                <option>Cancelada</option>
              </select>
            </div>

            <div className="campo-form">
              <label>Observações</label>

              <textarea
                rows="3"
                value={consulta.observacoes}
                onChange={(e) =>
                  alterarCampo("observacoes", e.target.value)
                }
              />
            </div>

            <button
              className="primary-button"
              onClick={salvar}
            >
              Salvar consulta
            </button>

            <hr className="divisor" />

            <h2>Histórico de consultas</h2>

            {paciente.consultas &&
            paciente.consultas.length > 0 ? (

              <div className="lista-consultas">

                {paciente.consultas.map((consulta) => (

                  <div
                    key={consulta.id}
                    className="consulta-card"
                  >

                    <div className="consulta-topo">

                      <div>

                        <h3>
                          {new Date(
                            consulta.data
                          ).toLocaleDateString("pt-BR")}
                          {" • "}
                          {consulta.horario}
                        </h3>

                        <span>
                          Cadastrada em{" "}
                          {new Date(
                            consulta.criadoEm
                          ).toLocaleString("pt-BR")}
                        </span>

                      </div>

                      <button
                        className="btn-excluir"
                        onClick={() =>
                          excluir(consulta.id)
                        }
                      >
                        Excluir
                      </button>

                    </div>

                    <div className="campo-visualizacao">
                      <strong>Status</strong>

                      <p>{consulta.status}</p>
                    </div>

                    <div className="campo-visualizacao">
                      <strong>Modalidade</strong>

                      <p>{consulta.modalidade}</p>
                    </div>

                    <div className="campo-visualizacao">
                      <strong>Observações</strong>

                      <p>
                        {consulta.observacoes || "-"}
                      </p>
                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="empty-state">

                <div className="empty-state-icon">
                  📅
                </div>

                <h3>Nenhuma consulta cadastrada</h3>

                <p>
                  As consultas cadastradas aparecerão aqui.
                </p>

              </div>

            )}

          </section>

        </div>
      </main>
    </>
  );
}

export default Agenda;