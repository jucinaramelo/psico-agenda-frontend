import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        <section className="home-content">
          <div className="home-text">
            <span className="home-badge">Gestão clínica simples e organizada</span>

            <h1>Organize seus atendimentos psicológicos em um só lugar</h1>

            <p>
              Cadastre pacientes, registre anamneses, acompanhe evoluções
              clínicas e organize sua agenda de consultas de forma prática.
            </p>

            <div className="home-actions">
              <Link to="/pacientes" className="home-button">
                Começar agora
              </Link>

              <Link to="/dashboard" className="home-link">
                Ver dashboard
              </Link>
            </div>
          </div>

          <div className="home-card">
            <div className="card-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="card-body">
              <h3>Resumo do dia</h3>

              <div className="info-box">
                <p>Consultas agendadas</p>
                <strong>05</strong>
              </div>

              <div className="info-box">
                <p>Pacientes cadastrados</p>
                <strong>18</strong>
              </div>

              <div className="patient-preview">
                <div></div>
                <section>
                  <strong>Ana Beatriz</strong>
                  <p>Próxima consulta às 14h</p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;