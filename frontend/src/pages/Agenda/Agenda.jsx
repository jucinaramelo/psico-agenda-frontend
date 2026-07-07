import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

import {
  buscarPacientePorId,
  getPacientes,
  salvarConsulta,
  removerConsulta,
} from "../../services/pacienteService";

import { toast } from "react-toastify";

import "./Agenda.css";

function Agenda() {
  const { id } = useParams();

  const agendaGeral = !id;

  const [paciente, setPaciente] = useState(null);
  const [consultas, setConsultas] = useState([]);

  const [consulta, setConsulta] = useState({
    data: "",
    horario: "",
    modalidade: "Presencial",
    status: "Agendada",
    observacoes: "",
  });

  useEffect(() => {
    if (agendaGeral) {
      carregarAgendaGeral();
    } else {
      carregarPaciente();
    }
  }, [id]);

  function carregarPaciente() {
    const encontrado = buscarPacientePorId(id);

    if (encontrado) {
      setPaciente(encontrado);
    }
  }

  function carregarAgendaGeral() {
    const pacientes = getPacientes();

    const lista = pacientes.flatMap((paciente) =>
      (paciente.consultas || []).map((consulta) => ({
        ...consulta,
        pacienteId: paciente.id,
        pacienteNome: paciente.nome,
      }))
    );

    lista.sort((a, b) => {
      const dataA = new Date(`${a.data} ${a.horario}`);
      const dataB = new Date(`${b.data} ${b.horario}`);

      return dataA - dataB;
    });

    setConsultas(lista);
  }

  function alterarCampo(campo, valor) {
    setConsulta((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }
  console.log("Consulta:", consulta);

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

  if (!agendaGeral && !paciente) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="agenda-page">
        <div className="agenda-container">

          {agendaGeral ? (
            <Link
              to="/dashboard"
              className="voltar-button"
            >
              ← Voltar para o Dashboard
            </Link>
          ) : (
            <Link
              to={`/pacientes/${paciente.id}`}
              className="voltar-button"
            >
              ← Voltar para o paciente
            </Link>
          )}

          <div className="page-header">
            <h1>Agenda</h1>

            {!agendaGeral ? (
              <p className="subtitle">
                Paciente: <strong>{paciente.nome}</strong>
              </p>
            ) : (
              <p className="subtitle">
                Todas as consultas cadastradas
              </p>
            )}
          </div>

          {!agendaGeral && (
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

            </section>
          )}

          <section className="card">

            <h2>Consultas</h2>

            {agendaGeral ? (

              consultas.length > 0 ? (

                <div className="lista-consultas">

                  {consultas.map((consulta) => (

                    <div
                      key={consulta.id}
                      className="consulta-card"
                    >

                      <div className="consulta-topo">

                        <div>

                          <h3>
                            {new Date(consulta.data).toLocaleDateString("pt-BR")}
                            {" • "}
                            {consulta.horario}
                          </h3>

                          <span>
                            Paciente: {consulta.pacienteNome}
                          </span>

                        </div>

                        <Link
                          to={`/pacientes/${consulta.pacienteId}/agenda`}
                          className="primary-button"
                        >
                          Abrir
                        </Link>

                      </div>

                      <div className="campo-visualizacao">
                        <strong>Status</strong>
                        <p>{consulta.status}</p>
                      </div>

                      <div className="campo-visualizacao">
                        <strong>Modalidade</strong>
                        <p>{consulta.modalidade}</p>
                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="empty-state">
                  <div className="empty-state-icon">📅</div>

                  <h3>Nenhuma consulta cadastrada</h3>

                  <p>
                    Cadastre consultas na ficha de um paciente.
                  </p>
                </div>

              )

            ) : (

              paciente.consultas &&
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
                            {new Date(consulta.data).toLocaleDateString("pt-BR")}
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
                          onClick={() => excluir(consulta.id)}
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
                        <p>{consulta.observacoes || "-"}</p>
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

              )

            )}

          </section>

        </div>
      </main>
    </>
  );
}

export default Agenda;