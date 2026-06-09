import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div>
        <Link to="/" className="logo">
          Psico Agenda
        </Link>
      </div>

      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/pacientes">Pacientes</Link></li>
          <li><Link to="/agenda">Agenda</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;