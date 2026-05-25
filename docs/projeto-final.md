# PROJETO FINAL – DESENVOLVIMENTO WEB FRONTEND

## 1. Identificação

**Aluno:** Jucinara da Silva Melo  
**Matrícula:** 20240001180  
**Disciplina:** ECT3699 – Desenvolvimento Web FrontEnd  
**Professor:** Dr. Aquiles Burlamaqui  
**Período:** 2026.1

---

# Psico Agenda

**Organização clínica e acompanhamento psicológico em um único lugar**

---

## 2. Descrição Geral

O Psico Agenda é uma aplicação web desenvolvida para auxiliar psicólogos no gerenciamento de informações relacionadas ao acompanhamento de pacientes. O sistema tem como objetivo centralizar dados clínicos e facilitar o registro das atividades realizadas durante os atendimentos.

A aplicação permitirá o cadastro de pacientes, visualização de informações individuais, registro de anamneses, acompanhamento de evoluções e organização de consultas. Cada funcionalidade ficará separada em páginas específicas, proporcionando uma navegação mais simples e organizada.

Muitos profissionais utilizam anotações manuais, documentos separados ou ferramentas genéricas para registrar informações clínicas, o que pode dificultar a organização e o acompanhamento do histórico do paciente. O projeto busca reduzir essa dificuldade oferecendo uma interface única para gerenciamento dessas informações.

O desenvolvimento será realizado utilizando React para construção da interface e LocalStorage para persistência local dos dados.

---

## 3. Público-alvo e Persona

### Público-alvo

O sistema Psico Agenda é destinado a profissionais da psicologia que necessitam organizar informações relacionadas ao acompanhamento clínico de pacientes. O projeto busca auxiliar psicólogos que realizam atendimentos individuais e precisam registrar informações de maneira organizada e acessível.

### Persona

**Nome:** Maria Oliveira  
**Idade:** 34 anos  
**Profissão:** Psicóloga Clínica  
**Área de atuação:** Psicologia Infantil e Atendimento Individual

**Contexto:**  
Maria realiza atendimentos presenciais e online e acompanha diversos pacientes semanalmente. Atualmente utiliza anotações manuais para registrar informações clínicas.

**Problema encontrado:**  
A dificuldade em manter registros organizados de anamneses, evoluções e consultas torna o acompanhamento dos pacientes mais trabalhoso.

**Objetivo:**  
Centralizar informações clínicas e acompanhar o histórico dos pacientes em um único sistema.

---

## 4. Funcionalidades

### MUST

**MUST-01 – Cadastro de pacientes**

Como psicólogo, eu quero cadastrar pacientes para armazenar suas informações clínicas.

**Critérios de aceitação:**

- O sistema deve permitir informar nome, telefone e idade.
- Os dados devem permanecer salvos localmente.
- O cadastro deve aparecer na lista de pacientes após o salvamento.

---

**MUST-02 – Listagem de pacientes**

Como psicólogo, eu quero visualizar a lista de pacientes para acompanhar os registros cadastrados.

**Critérios de aceitação:**

- O sistema deve mostrar todos os pacientes cadastrados.
- Deve existir acesso para visualizar detalhes do paciente.
- A lista deve ser atualizada após novos cadastros.

---

**MUST-03 – Visualização de detalhes do paciente**

Como psicólogo, eu quero acessar os detalhes de um paciente para consultar suas informações.

**Critérios de aceitação:**

- O sistema deve exibir nome, idade e telefone.
- Deve existir navegação para anamnese e evolução.
- Cada paciente deve possuir página individual.

---

**MUST-04 – Registro de anamnese**

Como psicólogo, eu quero registrar anamneses para armazenar informações iniciais do paciente.

**Critérios de aceitação:**

- O sistema deve permitir salvar respostas da anamnese.
- As perguntas podem variar conforme a faixa etária.
- As informações devem permanecer salvas.

---

**MUST-05 – Registro de evolução**

Como psicólogo, eu quero registrar evoluções clínicas para acompanhar o desenvolvimento do paciente.

**Critérios de aceitação:**

- Deve ser possível cadastrar data e descrição.
- As evoluções devem aparecer em histórico.
- Os registros devem ficar associados ao paciente.

---

**MUST-06 – Agendamento de consultas**

Como psicólogo, eu quero registrar consultas para organizar atendimentos.

**Critérios de aceitação:**

- Deve permitir informar data e horário.
- As consultas devem ser exibidas em lista.
- O paciente deve ser associado ao atendimento.

---

### NICE

**NICE-01 – Pesquisa de pacientes**

Como psicólogo, eu quero pesquisar pacientes pelo nome para encontrá-los rapidamente.

---

**NICE-02 – Tema escuro**

Como usuário, eu quero alternar entre tema claro e escuro para melhorar a experiência de uso.

---

**NICE-03 – Exportação de resumo do paciente**

Como psicólogo, eu quero exportar informações do paciente para gerar documentos de acompanhamento.

---

**NICE-04 – Dashboard inicial**

Como psicólogo, eu quero visualizar um resumo geral para acompanhar pacientes e consultas.

---

**NICE-05 – Histórico de consultas**

Como psicólogo, eu quero visualizar consultas anteriores para acompanhar atendimentos já realizados.

---

## 5. Mapa do Site 

```text
/                               # pública (landing)
│
├── /pacientes                  # protegida
│   ├── /pacientes/novo
│   └── /pacientes/:id          # dinâmica
│       │
│       ├── /anamnese/:id
│       ├── /evolucao/:id
│       └── /historico/:id
│
├── /agenda                     # protegida
│   ├── /agenda/nova
│   └── /agenda/lista
│
├── /dashboard                  # protegida
│
└── /404                        # pública
```

---

## 6. Wireframes

Os wireframes foram desenvolvidos em baixa fidelidade utilizando Figma. 

### Tela 1 – Dashboard

![Dashboard](wireframes/tela-dashboard.png)

A tela apresenta um dashboard do sistema e acesso rápido às principais funcionalidades.

---

### Tela 2 – Pacientes

![Pacientes](wireframes/tela-pacientes.png)

A tela permite visualizar pacientes cadastrados e acessar seus detalhes.

---

### Tela 3 – Anamnese

![Anamnese](wireframes/tela-anamnese.png)

A tela é destinada ao preenchimento e armazenamento da anamnese do paciente.

---

### Tela 4 – Evolução

![Evolução](wireframes/tela-evolucao.png)

A tela apresenta o histórico de evolução e acompanhamento clínico do paciente.

