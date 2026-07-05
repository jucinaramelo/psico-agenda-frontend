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
    consultas: [],
    evolucoes: [],
    historico: [],

    planoTratamento: {
      hipotese: "",
      objetivos: "",
      abordagem: "",
      frequencia: "",
      observacoes: "",
    },

    ...paciente,
  };

  salvarPacientes([...pacientes, novoPaciente]);

  return novoPaciente;
}

export function buscarPacientePorId(id) {
  const pacientes = getPacientes();

  return pacientes.find(
    (paciente) => paciente.id === Number(id)
  );
}

export function removerPaciente(id) {
  const pacientes = getPacientes();

  const pacientesAtualizados = pacientes.filter(
    (paciente) => paciente.id !== Number(id)
  );

  salvarPacientes(pacientesAtualizados);
}

export function atualizarPaciente(id, dadosAtualizados) {
  const pacientes = getPacientes();

  const pacientesAtualizados = pacientes.map((paciente) => {
    if (paciente.id === Number(id)) {
      return {
        ...paciente,
        ...dadosAtualizados,
      };
    }

    return paciente;
  });

  salvarPacientes(pacientesAtualizados);

  return pacientesAtualizados.find(
    (paciente) => paciente.id === Number(id)
  );
}

export function salvarAnamnese(idPaciente, respostas) {
  return atualizarPaciente(idPaciente, {
    anamnese: {
      respondida: true,
      dataResposta: new Date().toISOString(),
      ...respostas,
    },
  });
}

export function salvarEstruturaPerguntas(idPaciente, estruturaPerguntas) {
  return atualizarPaciente(idPaciente, {
    estruturaPerguntas: estruturaPerguntas
  });
}

export function salvarPlanoTratamento(idPaciente, planoTratamento) {
  return atualizarPaciente(idPaciente, {
    planoTratamento: {
      ...planoTratamento,
      ultimaAtualizacao: new Date().toISOString(),
    },
  });
}

export function salvarEvolucao(idPaciente, evolucao) {
  const paciente = buscarPacientePorId(idPaciente);

  if (!paciente) return null;

  const evolucoes = paciente.evolucoes || [];

  const novaEvolucao = {
    id: Date.now(),
    criadoEm: new Date().toISOString(),
    ...evolucao,
  };

  return atualizarPaciente(idPaciente, {
    evolucoes: [novaEvolucao, ...evolucoes],
  });
}

export function removerEvolucao(idPaciente, idEvolucao) {
  const paciente = buscarPacientePorId(idPaciente);

  if (!paciente) return null;

  return atualizarPaciente(idPaciente, {
    evolucoes: paciente.evolucoes.filter(
      (e) => e.id !== idEvolucao
    ),
  });
}

export function salvarConsulta(idPaciente, consulta) {
  const paciente = buscarPacientePorId(idPaciente);

  if (!paciente) return null;

  const consultas = paciente.consultas || [];

  const novaConsulta = {
    id: Date.now(),
    criadoEm: new Date().toISOString(),
    ...consulta,
  };

  return atualizarPaciente(idPaciente, {
    consultas: [novaConsulta, ...consultas],
  });
}

export function removerConsulta(idPaciente, idConsulta) {
  const paciente = buscarPacientePorId(idPaciente);

  if (!paciente) return null;

  return atualizarPaciente(idPaciente, {
    consultas: paciente.consultas.filter(
      (consulta) => consulta.id !== idConsulta
    ),
  });
}

export function atualizarConsulta(idPaciente, consultaAtualizada) {
  const paciente = buscarPacientePorId(idPaciente);

  if (!paciente) return null;

  const consultasAtualizadas = paciente.consultas.map((consulta) =>
    consulta.id === consultaAtualizada.id
      ? consultaAtualizada
      : consulta
  );

  return atualizarPaciente(idPaciente, {
    consultas: consultasAtualizadas,
  });
}