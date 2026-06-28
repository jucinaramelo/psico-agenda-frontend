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

        <main className="anamnese-page">
          <div className="anamnese-container">

            <h2>Paciente não encontrado.</h2>

            <Link
              to="/pacientes"
              className="voltar-button"
            >
              ← Voltar
            </Link>

          </div>
        </main>
      </>
    );
  }

  const formularioRespondido =
    paciente.anamnese?.respondida ?? false;

  function copiarLinkFormulario() {
    navigator.clipboard.writeText(
      `${window.location.origin}/formulario/${paciente.id}`
    );

    toast.success("Link copiado com sucesso!");
  }

  return (
    <>
      <Navbar />

      <main className="anamnese-page">

        <div className="anamnese-container">

          <Link
            to={`/pacientes/${paciente.id}`}
            className="voltar-button"
          >
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

              <button
                className="primary-button"
                onClick={copiarLinkFormulario}
              >
                Copiar link
              </button>

              <Link
                to={`/pacientes/${paciente.id}/formulario`}
                className="secondary-button"
              >
                Abrir formulário
              </Link>

            </div>

          </section>

          {/* RESPOSTAS */}

          <section className="card">

            <h2>Respostas do paciente</h2>

            {!formularioRespondido ? (

              <div className="empty-state">

                <div className="empty-state-icon">
                  📝
                </div>

                <h3>Nenhuma resposta recebida</h3>
              </div>

            ) : (

              <div className="respostas-grid">

                <div className="campo">
                  <span>Estado civil</span>
                  <strong>{paciente.anamnese.estadoCivil}</strong>
                </div>

                <div className="campo">
                  <span>Escolaridade</span>
                  <strong>{paciente.anamnese.escolaridade}</strong>
                </div>

                <div className="campo">
                  <span>Já fez terapia?</span>
                  <strong>{paciente.anamnese.terapiaAnterior}</strong>
                </div>

                <div className="campo">
                  <span>Medicamentos</span>
                  <strong>{paciente.anamnese.medicamentos}</strong>
                </div>

                <div className="campo">
                  <span>Diagnóstico</span>
                  <strong>{paciente.anamnese.diagnostico}</strong>
                </div>

                <div className="campo">
                  <span>Como está o sono?</span>
                  <strong>{paciente.anamnese.sono}</strong>
                </div>

                <div className="campo">
                  <span>Como está a alimentação?</span>
                  <strong>{paciente.anamnese.alimentacao}</strong>
                </div>

                <div className="campo campo-full">

                  <span>Motivo da procura</span>

                  <p>
                    {paciente.anamnese.motivo}
                  </p>

                </div>

                <div className="campo campo-full">

                  <span>Expectativas com a terapia</span>

                  <p>
                    {paciente.anamnese.expectativa}
                  </p>

                </div>

              </div>

            )}

          </section>

          {/* PRÓXIMA ETAPA */}

          <section className="card">

            <h2>Plano de tratamento</h2>

            <div className="empty-state">

              <div className="empty-state-icon">
                👨‍⚕️
              </div>

              <h3>Em desenvolvimento</h3>

              <p>
                Após analisar as respostas do paciente,
                o psicólogo poderá registrar hipóteses,
                objetivos terapêuticos e o plano de
                tratamento.
              </p>

            </div>

          </section>

        </div>

      </main>
    </>
  );
}

export default Anamnese;