import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { getPacientes } from "../../services/pacienteService";

import "./Anamnese.css";
console.log("CSS IMPORTADO");
import { toast } from "react-toastify";

function Anamnese() {
  const { id } = useParams();

  const [paciente, setPaciente] = useState(null);

  const perguntasPadrao = [
    { id: "estadoCivil", label: "Estado civil" },
    { id: "escolaridade", label: "Escolaridade" },
    { id: "terapiaAnterior", label: "Já fez terapia?" },
    { id: "medicamentos", label: "Medicamentos" },
    { id: "diagnostico", label: "Diagnóstico" },
    { id: "sono", label: "Como está o sono?" },
    { id: "alimentacao", label: "Como está sua alimentação?" },
    { id: "motivo", label: "Motivo da procura", campoFull: true },
    { id: "expectativa", label: "Expectativas com a terapia", campoFull: true },
  ];

  function carregarDadosPaciente() {
    const pacientes = getPacientes();
    const encontrado = pacientes.find(
      (p) => String(p.id) === id
    );
    setPaciente(encontrado);
  }

  useEffect(() => {
    carregarDadosPaciente();

    function escutarAlteracoesStorage(e) {
      if (e.key === "psico-agenda-pacientes") {
        carregarDadosPaciente();
      }
    }

    window.addEventListener("storage", escutarAlteracoesStorage);

    return () => {
      window.removeEventListener("storage", escutarAlteracoesStorage);
    };
  }, [id]);

  if (!paciente) {
    return (
      <>
        <Navbar />
        <main className="anamnese-page">
          <div className="anamnese-container">
            <h2>Paciente não encontrado.</h2>
            <Link to="/pacientes" className="voltar-button">
              ← Voltar
            </Link>
          </div>
        </main>
      </>
    );
  }

  const formularioRespondido = paciente.anamnese?.respondida ?? false;

  function copiarLinkFormulario() {
    navigator.clipboard.writeText(
      `${window.location.origin}/formulario/${paciente.id}`
    );
    toast.success("Link copiado com sucesso!");
  }

  const perguntasParaExibir = paciente.estruturaPerguntas && paciente.estruturaPerguntas.length > 0
    ? paciente.estruturaPerguntas
    : perguntasPadrao;

  return (
    <>
      <Navbar />

      <main className="anamnese-page">
        <div className="anamnese-container">
          <Link to={`/pacientes/${paciente.id}`} className="voltar-button">
            ← Voltar para o paciente
          </Link>

          <div className="page-header">
            <h1>Anamnese</h1>
            <p className="subtitle">
              Paciente: <strong>{paciente.nome}</strong>
            </p>
          </div>

          <section className="card">
            <h2>Status</h2>
            <div className="status-badge">
              <div className="status-dot"></div>
              {formularioRespondido
                ? "Formulário respondido"
                : "Aguardando resposta do paciente"}
            </div>

            <div className="status-actions">
              <button className="primary-button" onClick={copiarLinkFormulario}>
                Copiar link
              </button>
              <Link to={`/formulario/${paciente.id}?mode=view`} className="secondary-button">
                Visualizar formulário
              </Link>
            </div>
          </section>

          <section className="card">
            <h2>Respostas do paciente</h2>

            {!formularioRespondido ? (
              <div className="empty-state">
                <div className="empty-state-icon">📝</div>
                <h3>Nenhuma resposta recebida</h3>
              </div>
            ) : (
              <div className="respostas-grid">
                {perguntasParaExibir.map((pergunta) => {
                  const resposta = paciente.anamnese?.[pergunta.id] || "Não respondido";
                  const isFull = pergunta.campoFull || pergunta.tipo === "textarea" || pergunta.id.startsWith("custom_");

                  return (
                    <div 
                      key={pergunta.id} 
                      className={`campo ${isFull ? "campo-full" : ""}`}
                    >
                      <span>{pergunta.label}</span>
                      {isFull ? (
                        <p>{resposta}</p>
                      ) : (
                        <strong>{resposta}</strong>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="card">
            <h2>Plano de tratamento</h2>
            <div className="empty-state">
              <div className="empty-state-icon">👨‍⚕️</div>
              <h3>Em desenvolvimento</h3>
              <p>
                Após analisar as respostas do paciente, o psicólogo poderá registrar hipóteses,
                objetivos terapêuticos e o plano de tratamento.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Anamnese;