import { useEffect, useState } from "react";
import axios from "axios";

function Agenda() {
    const [pacientes, setPacientes] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [pacienteId, setPacienteId] = useState("");

    useEffect(() => {
        buscarPacientes();
        buscarConsultas();
    }, []);

    async function buscarPacientes() {
        const response = await axios.get("http://127.0.0.1:8000/pacientes");
        setPacientes(response.data);
    }

    async function buscarConsultas() {
        const response = await axios.get("http://127.0.0.1:8000/consultas");
        setConsultas(response.data);
    }

    async function cadastrarConsulta(e) {
        e.preventDefault();

        await axios.post("http://127.0.0.1:8000/consultas", {
            data: data,
            hora: hora,
            paciente_id: Number(pacienteId),
        });

        setData("");
        setHora("");
        setPacienteId("");

        buscarConsultas();
    }

    function buscarNomePaciente(id) {
        const paciente = pacientes.find((p) => p.id === id);

        if (paciente) {
            return paciente.nome;
        }

        return "Paciente não encontrado";
    }

    return (
        <div>
            <h2>Agenda</h2>

            <form onSubmit={cadastrarConsulta}>
                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                />

                <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    required
                />

                <select
                    value={pacienteId}
                    onChange={(e) => setPacienteId(e.target.value)}
                    required
                >
                    <option value="">Selecione o paciente</option>

                    {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                            {paciente.nome}
                        </option>
                    ))}
                </select>

                <button type="submit">Agendar</button>
            </form>

            <h3>Consultas Agendadas</h3>

            <ul>
                {consultas.map((consulta) => (
                    <li key={consulta.id}>
                        {consulta.data} às {consulta.hora} - {buscarNomePaciente(consulta.paciente_id)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Agenda;