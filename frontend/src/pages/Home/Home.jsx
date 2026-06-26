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
            <h1>
              Sua rotina de atendimentos
              <br />
              mais leve e organizada
            </h1>

            <p>
              Gerencie pacientes, registre anamneses, acompanhe evoluções
              clínicas e organize suas consultas em um só lugar.
            </p>

            <div className="home-actions">
              <Link to="/pacientes" className="home-button">
                Começar agora
              </Link>

              <Link to="/dashboard" className="home-link">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="home-features">
            <div className="feature-card">
              <span>👤</span>
              <h3>Pacientes</h3>
              <p>Cadastro e gerenciamento de pacientes.</p>
            </div>

            <div className="feature-card">
              <span>📝</span>
              <h3>Anamnese</h3>
              <p>Registro completo das informações iniciais.</p>
            </div>

            <div className="feature-card">
              <span>📈</span>
              <h3>Evoluções</h3>
              <p>Acompanhamento da evolução clínica.</p>
            </div>

            <div className="feature-card">
              <span>📅</span>
              <h3>Agenda</h3>
              <p>Organização de consultas e horários.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;