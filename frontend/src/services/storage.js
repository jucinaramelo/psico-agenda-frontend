export function salvarPacientes(pacientes) {
  localStorage.setItem(
    "pacientes",
    JSON.stringify(pacientes)
  );
}

export function buscarPacientes() {
  const dados = localStorage.getItem(
    "pacientes"
  );

  return dados ? JSON.parse(dados) : [];
}



export function salvarAnamneses(anamneses) {
  localStorage.setItem(
    "anamneses",
    JSON.stringify(anamneses)
  );
}

export function buscarAnamneses() {
  const dados = localStorage.getItem(
    "anamneses"
  );

  return dados ? JSON.parse(dados) : [];
}



export function salvarEvolucoes(evolucoes) {
  localStorage.setItem(
    "evolucoes",
    JSON.stringify(evolucoes)
  );
}

export function buscarEvolucoes() {
  const dados = localStorage.getItem(
    "evolucoes"
  );

  return dados ? JSON.parse(dados) : [];
}



export function salvarConsultas(consultas) {
  localStorage.setItem(
    "consultas",
    JSON.stringify(consultas)
  );
}

export function buscarConsultas() {
  const dados = localStorage.getItem(
    "consultas"
  );

  return dados ? JSON.parse(dados) : [];
}