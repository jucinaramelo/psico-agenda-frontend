import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getPacientes } from "../../services/pacienteService";
import "./Dashboard.css";

function Dashboard() {
  const pacientes = getPacientes();

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
              <strong>0</strong>
              <span>Consultas</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div>
              <strong>0</strong>
              <span>Evoluções</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🗓️</div>
            <div>
              <strong>0</strong>
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

            <p className="empty-message">
              Nenhuma consulta agendada.
            </p>
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