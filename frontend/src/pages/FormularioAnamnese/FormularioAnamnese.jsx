import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  buscarPacientePorId,
  salvarAnamnese,
  salvarEstruturaPerguntas, 
} from "../../services/pacienteService";

import { toast } from "react-toastify";

import "./FormularioAnamnese.css";

function FormularioAnamnese() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isPsicologoView = document.referrer.includes("localhost") || window.location.search.includes("mode=view");

  const [paciente, setPaciente] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [novaPergunta, setNovaPergunta] = useState("");

  const perguntasPadrao = [
    { id: "estadoCivil", label: "Estado civil", tipo: "select", opcoes: ["Solteiro(a)", "Casado(a)", "União Estável", "Divorciado(a)", "Viúvo(a)"], valor: "" },
    { id: "escolaridade", label: "Escolaridade", tipo: "text", valor: "" },
    { id: "terapiaAnterior", label: "Já realizou terapia anteriormente?", tipo: "select", opcoes: ["Sim", "Não"], valor: "" },
    { id: "medicamentos", label: "Faz uso de medicamentos?", tipo: "text", valor: "" },
    { id: "diagnostico", label: "Possui algum diagnóstico médico?", tipo: "text", valor: "" },
    { id: "sono", label: "Como está seu sono?", tipo: "text", valor: "" },
    { id: "alimentacao", label: "Como está sua alimentação?", tipo: "text", valor: "" },
    { id: "motivo", label: "Qual o motivo da procura pela terapia?", tipo: "textarea", valor: "" },
    { id: "expectativa", label: "Quais são suas expectativas com a terapia?", tipo: "textarea", valor: "" },
  ];

  const [perguntas, setPerguntas] = useState(perguntasPadrao);

  useEffect(() => {
    const pacienteEncontrado = buscarPacientePorId(id);
    if (!pacienteEncontrado) return;
    setPaciente(pacienteEncontrado);

    let estruturaAtual = pacienteEncontrado.estruturaPerguntas && pacienteEncontrado.estruturaPerguntas.length > 0
      ? pacienteEncontrado.estruturaPerguntas
      : perguntasPadrao;

    if (pacienteEncontrado.anamnese) {
      estruturaAtual = estruturaAtual.map(perg => ({
        ...perg,
        valor: pacienteEncontrado.anamnese[perg.id] || ""
      }));
    }

    setPerguntas(estruturaAtual);
  }, [id]);

  function alterarResposta(idPergunta, valor) {
    setPerguntas(prev =>
      prev.map(p => p.id === idPergunta ? { ...p, valor } : p)
    );
  }

  function adicionarNovaPergunta(e) {
    e.preventDefault();
    if (!novaPergunta.trim()) return;

    const novoId = "custom_" + Date.now();
    const nova = {
      id: novoId,
      label: novaPergunta,
      tipo: "textarea",
      valor: ""
    };

    const listaAtualizada = [...perguntas, nova];
    setPerguntas(listaAtualizada);

    salvarEstruturaPerguntas(id, listaAtualizada);

    setNovaPergunta("");
    toast.success("Pergunta adicionada e salva!");
  }

  function excluirPergunta(idPergunta) {
    const listaAtualizada = perguntas.filter(p => p.id !== idPergunta);
    setPerguntas(listaAtualizada);
    
    salvarEstruturaPerguntas(id, listaAtualizada);
    
    toast.warn("Pergunta removida com sucesso!");
  }

  function enviarFormulario() {
    const dadosParaSalvar = {};
    perguntas.forEach(p => {
      dadosParaSalvar[p.id] = p.valor;
    });

    salvarAnamnese(id, dadosParaSalvar);
    toast.success("Respostas enviadas com sucesso!");
    setEnviado(true);
  }

  if (!paciente) {
    return (
      <main className="formulario-page clean-mode">
        <div className="formulario-container">
          <h2>Paciente não encontrado.</h2>
        </div>
      </main>
    );
  }

  if (enviado) {
    return (
      <main className="formulario-page clean-mode">
        <div className="formulario-container">
          <div className="sucesso-card">
            <div className="sucesso-icone">✅</div>
            <h1>Respostas enviadas!</h1>
            <p>Obrigado por preencher sua pré-anamnese.</p>
            <small>Você já pode fechar esta página.</small>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`formulario-page ${!isPsicologoView ? "clean-mode" : ""}`}>
      
      {isPsicologoView && (
        <button type="button" className="voltar-button-link" onClick={() => navigate(-1)}>
          ← Voltar para a tela anterior
        </button>
      )}

      <div className="formulario-container">
        <h1>Pré-Anamnese</h1>
        <p className="subtitle">
          Olá, <strong>{paciente.nome}</strong>! Respondendo às perguntas abaixo, você ajuda a direcionar nosso atendimento.
        </p>

        {isPsicologoView && (
          <div className="painel-edicao-psicologo">
            <h3>⚙️ Gerenciador de Perguntas (Modo Psicóloga)</h3>
            <div className="input-add-group">
              <input 
                type="text" 
                placeholder="Digite uma nova pergunta para o formulário..." 
                value={novaPergunta}
                onChange={(e) => setNovaPergunta(e.target.value)}
              />
              <button type="button" onClick={adicionarNovaPergunta}>+ Adicionar</button>
            </div>
          </div>
        )}

        <form className="formulario">
          {perguntas.map((pergunta) => (
            <div key={pergunta.id} className="campo-form-container">
              
              <div className="campo-form-header">
                <label>{pergunta.label}</label>
                {isPsicologoView && (
                  <button 
                    type="button" 
                    className="btn-excluir-pergunta" 
                    onClick={() => excluirPergunta(pergunta.id)}
                    title="Excluir esta pergunta"
                  >
                    ❌ Excluir
                  </button>
                )}
              </div>

              {pergunta.tipo === "select" ? (
                <select
                  value={pergunta.valor}
                  onChange={(e) => alterarResposta(pergunta.id, e.target.value)}
                  disabled={isPsicologoView}
                >
                  <option value="">Selecione</option>
                  {pergunta.opcoes?.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              ) : pergunta.tipo === "textarea" ? (
                <textarea
                  rows="4"
                  value={pergunta.valor}
                  onChange={(e) => alterarResposta(pergunta.id, e.target.value)}
                  disabled={isPsicologoView}
                />
              ) : (
                <input
                  type="text"
                  value={pergunta.valor}
                  onChange={(e) => alterarResposta(pergunta.id, e.target.value)}
                  disabled={isPsicologoView}
                />
              )}
            </div>
          ))}

          {!isPsicologoView && (
            <button type="button" className="primary-button" onClick={enviarFormulario}>
              Enviar respostas
            </button>
          )}
        </form>
      </div>
    </main>
  );
}

export default FormularioAnamnese;