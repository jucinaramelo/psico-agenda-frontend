import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        <section className="home-hero">
          <div className="home-text">
            <h1>
              Mais organização para seus atendimentos psicológicos
            </h1>

            <p>
              O Psico Agenda ajuda a cadastrar pacientes, registrar anamneses,
              acompanhar evoluções clínicas e organizar consultas em uma única
              plataforma.
            </p>

            <div className="home-actions">
              <Link to="/pacientes" className="home-button">
                Começar agora
              </Link>

              <Link to="/dashboard" className="home-secondary-button">
                Ver dashboard
              </Link>
            </div>
          </div>

          <div className="home-panel">
            <h2>Tudo em um só lugar</h2>

            <div className="home-features">
              <Link to="/pacientes" className="home-feature-card">
                <span>👤</span>
                <div>
                  <strong>Pacientes</strong>
                  <p>Cadastre e consulte informações importantes.</p>
                </div>
              </Link>

              <div className="home-feature-card">
                <span>📝</span>
                <div>
                  <strong>Anamnese</strong>
                  <p>Registre dados iniciais do atendimento.</p>
                </div>
              </div>

              <div className="home-feature-card">
                <span>📈</span>
                <div>
                  <strong>Evoluções</strong>
                  <p>Acompanhe o progresso de cada paciente.</p>
                </div>
              </div>

              <Link to="/agenda" className="home-feature-card">
                <span>📅</span>
                <div>
                  <strong>Agenda</strong>
                  <p>Organize consultas e compromissos.</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;