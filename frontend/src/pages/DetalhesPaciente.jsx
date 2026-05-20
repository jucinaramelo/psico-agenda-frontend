import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function DetalhesPaciente() {
  const { id } = useParams();

  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    buscarPaciente();
  }, []);

  async function buscarPaciente() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/pacientes`
      );

      const encontrado = response.data.find(
        (p) => p.id === Number(id)
      );

      setPaciente(encontrado);

    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  }

  if (!paciente) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>Detalhes do Paciente</h2>

      <p>Nome: {paciente.nome}</p>
      <p>Idade: {paciente.idade}</p>
      <p>Telefone: {paciente.telefone}</p>

      <div>
        <Link to={`/anamnese/${paciente.id}`}>
          Anamnese
        </Link>

        {" | "}

        <Link to={`/evolucao/${paciente.id}`}>
          Evolução
        </Link>
      </div>

    </div>
  );
}

export default DetalhesPaciente;