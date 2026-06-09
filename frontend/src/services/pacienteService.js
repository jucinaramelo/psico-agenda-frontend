const STORAGE_KEY = "psico-agenda-pacientes";

export function getPacientes() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

export function salvarPacientes(pacientes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pacientes));
}

export function adicionarPaciente(paciente) {
  const pacientes = getPacientes();

  const novoPaciente = {
    id: Date.now(),
    criadoEm: new Date().toISOString(),
    anamneses: [],
    evolucoes: [],
    historico: [],
    ...paciente,
  };

  salvarPacientes([...pacientes, novoPaciente]);

  return novoPaciente;
}

export function buscarPacientePorId(id) {
  const pacientes = getPacientes();
  return pacientes.find((paciente) => paciente.id === Number(id));
}

export function removerPaciente(id) {
  const pacientes = getPacientes();
  const pacientesAtualizados = pacientes.filter(
    (paciente) => paciente.id !== Number(id)
  );

  salvarPacientes(pacientesAtualizados);
}