import { useEffect, useState } from "react";
import { salvarPacientes, buscarPacientes } from "../services/storage";
import { Link } from "react-router-dom";

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [telefone, setTelefone] = useState("");

    useEffect(() => {
        const dados = buscarPacientes();

        setPacientes(dados);
    }, []);

    function cadastrarPaciente(event) {
        event.preventDefault();

        const novoPaciente = {
            id: Date.now(),

            nome: nome,

            idade: Number(idade),

            telefone: telefone,
        };

        const novaLista = [
            ...pacientes,
            novoPaciente
        ];

        setPacientes(novaLista);

        salvarPacientes(novaLista);

        setNome("");
        setIdade("");
        setTelefone("");
    }

    return (
        <div>
            <h2>Pacientes</h2>

            <form onSubmit={cadastrarPaciente}>
                <input
                    type="text"
                    placeholder="Nome do paciente"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                />

                <button type="submit">
                    Cadastrar
                </button>
            </form>

            <h3>Lista de Pacientes</h3>

            <ul>
                {pacientes.map((p) => (
                    <li key={p.id}>
                        {p.nome}

                        {" "}

                        <Link to={`/pacientes/${p.id}`}>
                            Ver detalhes
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pacientes;