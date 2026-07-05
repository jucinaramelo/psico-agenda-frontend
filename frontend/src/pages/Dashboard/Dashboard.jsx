import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getPacientes } from "../../services/pacienteService";
import "./Dashboard.css";

function Dashboard() {
  const pacientes = getPacientes();

  const consultas = pacientes.flatMap(
    (paciente) => paciente.consultas || []
  );

  const evolucoes = pacientes.flatMap(
    (paciente) => paciente.evolucoes || []
  );

  const hoje = new Date().toISOString().split("T")[0];

  const consultasHoje = consultas.filter(
    (consulta) =>
      consulta.data === hoje &&
      consulta.status === "Agendada"
  );

  const proximasConsultas = pacientes
    .flatMap((paciente) =>
      (paciente.consultas || []).map((consulta) => ({
        ...consulta,
        paciente,
      }))
    )
    .filter(
      (consulta) => consulta.status === "Agendada"
    )
    .sort((a, b) => {
      const dataA = `${a.data} ${a.horario}`;
      const dataB = `${b.data} ${b.horario}`;
      return new Date(dataA) - new Date(dataB);
    })
    .slice(0, 5);

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <section className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Visão geral do sistema</p>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <strong>{pacientes.length}</strong>
              <span>Pacientes</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div>
              <strong>{consultas.length}</strong>
              <span>Consultas</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div>
              <strong>{evolucoes.length}</strong>
              <span>Evoluções</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🗓️</div>
            <div>
              <strong>{consultasHoje.length}</strong>
              <span>Hoje</span>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <div className="panel-header">
              <h2>Próximas Consultas</h2>
              <Link to="/agenda">Ver todas →</Link>
            </div>

            {proximasConsultas.length === 0 ? (
              <p className="empty-message">
                Nenhuma consulta agendada.
              </p>
            ) : (
              proximasConsultas.map((consulta) => (
                <Link
                  key={consulta.id}
                  to={`/pacientes/${consulta.paciente.id}/agenda`}
                  className="appointment-item"
                >
                  <div className="avatar">
                    {consulta.paciente.nome.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <strong>{consulta.paciente.nome}</strong>

                    <p>
                      {new Date(consulta.data).toLocaleDateString("pt-BR")}
                      {" • "}
                      {consulta.horario}
                    </p>

                    <small>
                      {consulta.modalidade} • {consulta.status}
                    </small>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <h2>Pacientes Recentes</h2>
              <Link to="/pacientes">Ver todos →</Link>
            </div>

            {pacientes.length === 0 ? (
              <p className="empty-message">
                Nenhum paciente cadastrado.
              </p>
            ) : (
              pacientes.slice(-3).reverse().map((paciente) => (
                <Link
                  to={`/pacientes/${paciente.id}`}
                  className="patient-item"
                  key={paciente.id}
                >
                  <div className="avatar">
                    {paciente.nome.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <strong>{paciente.nome}</strong>
                    <p>{paciente.idade} anos · {paciente.telefone}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;