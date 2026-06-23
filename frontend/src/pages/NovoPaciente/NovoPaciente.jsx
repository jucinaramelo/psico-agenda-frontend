import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { adicionarPaciente } from "../../services/pacienteService";

import "./NovoPaciente.css";

function NovoPaciente() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    idade: "",
    genero: "",
    telefone: "",
    email: "",
    profissao: "",
    observacoes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.nome.trim()) {
      alert("Informe o nome do paciente.");
      return;
    }

    adicionarPaciente(form);

    navigate("/pacientes");
  }

  return (
    <>
      <Navbar />

      <main className="novo-paciente-page">
        <Link to="/pacientes" className="voltar-link">
          ← Voltar para pacientes
        </Link>

        <section className="novo-paciente-header">
          <h1>Novo Paciente</h1>
          <p>Preencha as informações do paciente.</p>
        </section>

        <form className="paciente-form" onSubmit={handleSubmit}>
          <h2>Dados pessoais</h2>

          <div className="form-group full">
            <label>Nome completo *</label>
            <input
              type="text"
              name="nome"
              placeholder="Nome do paciente"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Idade</label>
              <input
                type="number"
                name="idade"
                placeholder="Ex: 28"
                value={form.idade}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gênero</label>
              <select
                name="genero"
                value={form.genero}
                onChange={handleChange}
              >
                <option value="">Selecionar...</option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Outro">Outro</option>
                <option value="Prefiro não informar">Prefiro não informar</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="text"
                name="telefone"
                placeholder="(84) 99999-9999"
                value={form.telefone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="email@exemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full">
            <label>Profissão</label>
            <input
              type="text"
              name="profissao"
              placeholder="Profissão do paciente"
              value={form.profissao}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full">
            <label>Observações iniciais</label>
            <textarea
              name="observacoes"
              placeholder="Anotações relevantes sobre o paciente..."
              value={form.observacoes}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <Link to="/pacientes" className="cancel-button">
              Cancelar
            </Link>

            <button type="submit" className="save-button">
              Salvar paciente
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default NovoPaciente;