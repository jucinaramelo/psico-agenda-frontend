import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { buscarPacientePorId, salvarEvolucao, removerEvolucao, } from "../../services/pacienteService";
import { toast } from "react-toastify";
import "./Evolucao.css";

function Evolucao() {
    const { id } = useParams();

    const [paciente, setPaciente] = useState(null);

    const [novaEvolucao, setNovaEvolucao] = useState({
        data: new Date().toISOString().split("T")[0],
        objetivos: "",
        descricao: "",
        tecnicas: "",
        observacoes: "",
    });

    const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
    const [idEvolucaoExcluir, setIdEvolucaoExcluir] = useState(null);

    useEffect(() => {
        carregarPaciente();
    }, [id]);

    function carregarPaciente() {
        const encontrado = buscarPacientePorId(id);

        if (encontrado) {
            setPaciente(encontrado);
        }
    }

    function alterarCampo(campo, valor) {
        setNovaEvolucao((prev) => ({
            ...prev,
            [campo]: valor,
        }));
    }

    function salvar() {
        if (!novaEvolucao.descricao.trim()) {
            toast.error("Descreva a evolução da sessão.");
            return;
        }

        const pacienteAtualizado = salvarEvolucao(id, novaEvolucao);

        setPaciente(pacienteAtualizado);

        toast.success("Evolução registrada com sucesso!");

        setNovaEvolucao({
            data: new Date().toISOString().split("T")[0],
            objetivos: "",
            descricao: "",
            tecnicas: "",
            observacoes: "",
        });
    }

    function excluirEvolucao() {
        const pacienteAtualizado = removerEvolucao(
            paciente.id,
            idEvolucaoExcluir
        );

        setPaciente(pacienteAtualizado);

        setMostrarModalExcluir(false);
        setIdEvolucaoExcluir(null);

        toast.success("Evolução removida.");
    }

    if (!paciente) {
        return null;
    }

    return (
        <>
            <Navbar />

            {mostrarModalExcluir && (
                <div className="modal-overlay">
                    <div className="modal-confirmacao">

                        <h3>Tem certeza que deseja excluir esta evolução?</h3>

                        <div className="modal-botoes">

                            <button
                                className="secondary-button"
                                onClick={() => {
                                    setMostrarModalExcluir(false);
                                    setIdEvolucaoExcluir(null);
                                }}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-excluir"
                                onClick={excluirEvolucao}
                            >
                                Excluir
                            </button>

                        </div>

                    </div>
                </div>
            )}

            <main className="evolucao-page">

                <div className="evolucao-container">

                    <Link
                        to={`/pacientes/${paciente.id}`}
                        className="voltar-button"
                    >
                        ← Voltar para o paciente
                    </Link>

                    <div className="page-header">
                        <h1>Evolução</h1>

                        <p className="subtitle">
                            Paciente: <strong>{paciente.nome}</strong>
                        </p>
                    </div>

                    <section className="card">

                        <h2>Nova evolução</h2>

                        <div className="campo-form">

                            <label>Data da sessão</label>

                            <input
                                type="date"
                                value={novaEvolucao.data}
                                onChange={(e) =>
                                    alterarCampo("data", e.target.value)
                                }
                            />

                        </div>

                        <div className="campo-form">

                            <label>Objetivos da sessão</label>

                            <textarea
                                rows="3"
                                value={novaEvolucao.objetivos}
                                onChange={(e) =>
                                    alterarCampo("objetivos", e.target.value)
                                }
                            />

                        </div>

                        <div className="campo-form">

                            <label>Evolução da sessão</label>

                            <textarea
                                rows="5"
                                value={novaEvolucao.descricao}
                                onChange={(e) =>
                                    alterarCampo("descricao", e.target.value)
                                }
                            />

                        </div>

                        <div className="campo-form">

                            <label>Técnicas utilizadas</label>

                            <textarea
                                rows="3"
                                value={novaEvolucao.tecnicas}
                                onChange={(e) =>
                                    alterarCampo("tecnicas", e.target.value)
                                }
                            />

                        </div>

                        <div className="campo-form">

                            <label>Observações</label>

                            <textarea
                                rows="3"
                                value={novaEvolucao.observacoes}
                                onChange={(e) =>
                                    alterarCampo("observacoes", e.target.value)
                                }
                            />

                        </div>

                        <button
                            className="primary-button"
                            onClick={salvar}
                        >
                            Salvar evolução
                        </button>

                        <hr className="divisor" />

                        <h2>Histórico de evoluções</h2>

                        {paciente.evolucoes && paciente.evolucoes.length > 0 ? (

                            <div className="lista-evolucoes">

                                {paciente.evolucoes.map((evolucao) => (

                                    <div
                                        key={evolucao.id}
                                        className="evolucao-card"
                                    >

                                        <div className="evolucao-topo">

                                            <div>

                                                <h3>
                                                    Sessão de{" "}
                                                    {new Date(evolucao.data).toLocaleDateString("pt-BR")}
                                                </h3>

                                                <span>
                                                    Registrada em{" "}
                                                    {new Date(evolucao.criadoEm).toLocaleString("pt-BR")}
                                                </span>

                                            </div>

                                            <button
                                                type="button"
                                                className="btn-excluir"
                                                onClick={() => {
                                                    setIdEvolucaoExcluir(evolucao.id);
                                                    setMostrarModalExcluir(true);
                                                }}
                                            >
                                                Excluir
                                            </button>

                                        </div>

                                        <div className="campo-visualizacao">

                                            <strong>Objetivos</strong>

                                            <p>
                                                {evolucao.objetivos || "-"}
                                            </p>

                                        </div>

                                        <div className="campo-visualizacao">

                                            <strong>Evolução</strong>

                                            <p>
                                                {evolucao.descricao}
                                            </p>

                                        </div>

                                        <div className="campo-visualizacao">

                                            <strong>Técnicas</strong>

                                            <p>
                                                {evolucao.tecnicas || "-"}
                                            </p>

                                        </div>

                                        <div className="campo-visualizacao">

                                            <strong>Observações</strong>

                                            <p>
                                                {evolucao.observacoes || "-"}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="empty-state">

                                <div className="empty-state-icon">
                                    📖
                                </div>

                                <h3>Nenhuma evolução registrada</h3>

                                <p>
                                    As sessões registradas aparecerão aqui.
                                </p>

                            </div>

                        )}

                    </section>

                </div>

            </main>

        </>
    );
}

export default Evolucao;