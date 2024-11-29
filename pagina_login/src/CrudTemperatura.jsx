import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/NavBar"; // Supondo que você tenha o componente Navbar

function CrudTemperatura() {
    const [valor, setValor] = useState("");
    const [sensorId, setSensorId] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [editingId, setEditingId] = useState(null);  // Para saber se está em modo de atualização
    const [error, setError] = useState("");
    const [temperaturaData, setTemperaturaData] = useState([]);

    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    // Função para criar um novo dado (POST)
    const handleCreate = async () => {
        const newData = { sensor_id: sensorId, valor, timestamp };
        try {
            await axios.post("http://127.0.0.1:8000/api/create/contador/", newData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Dados dos contadores criados com sucesso!");
            resetForm();
            fetchTemperaturaData(); // Atualiza os dados após criar
        } catch (err) {
            console.error("Erro ao criar o dado:", err);
            setError("Erro ao criar o dado.");
        }
    };

    // Função para atualizar um dado (PUT)
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Aqui, removemos os milissegundos ao fazer a atualização
        const updatedData = {
            sensor: sensorId,
            valor: valor,
            timestamp: timestamp.split(".")[0], // Remove os milissegundos
        };

        console.log('Dados a serem enviados para atualização:', updatedData);

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/contador/${editingId}/`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Dado atualizado com sucesso');
            console.log('Resposta da atualização:', response.data);
            fetchTemperaturaData(); // Atualiza os dados após atualizar
            resetForm();
        } catch (error) {
            console.log('Erro ao atualizar o dado:', error);
            alert('Erro ao atualizar o dado');
        }
    };

    // Função para excluir um dado (DELETE)
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/contador/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Dado de umidade excluído com sucesso!");
            fetchTemperaturaData(); // Atualiza os dados após excluir
        } catch (err) {
            console.error("Erro ao excluir o dado:", err);
            setError("Erro ao excluir o dado.");
        }
    };

    // Função para buscar dados de umidade (GET)
    const fetchTemperaturaData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/contador/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTemperaturaData(response.data);
        } catch (err) {
            console.error("Erro ao buscar dados de umidade:", err);
            setError("Erro ao buscar dados.");
        }
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setSensorId("");
        setValor("");
        setTimestamp("");
        setEditingId(null);
    };

    // Função para preencher o formulário com dados do sensor ao editar
    const handleEdit = (id, sensorId, valor, timestamp) => {
        setEditingId(id);
        setSensorId(sensorId);
        setValor(valor);
        setTimestamp(timestamp);
    };

    // Carregar os dados ao montar o componente
    useEffect(() => {
        fetchTemperaturaData();
    }, []);

    return (
        <div style={styles.body}>
            <Navbar />
            <div style={styles.container}>
                <h1 style={styles.titulo}>CRUD de Dados das Temperaturas</h1>

                {/* Formulário de Criar Novo Dado */}
                <div style={styles.post}>
                    <h2>Criar Novo Dado de Temperatura</h2>
                    <input
                        type="number"
                        placeholder="Sensor ID"
                        value={sensorId}
                        onChange={(e) => setSensorId(e.target.value)}
                        style={styles.caixaGet}
                    />
                    <input
                        type="number"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        style={styles.caixaGet}
                    />
                    <input
                        type="datetime-local"
                        placeholder="Timestamp"
                        value={timestamp}
                        onChange={(e) => setTimestamp(e.target.value)}
                        style={styles.caixaGet}
                    />
                    <button onClick={handleCreate} style={styles.btnP}>
                        Adicionar
                    </button>
                </div>

                {/* Formulário de Atualizar Dado */}
                {editingId && (
                    <div style={styles.post}>
                        <h2>Atualizar Dados das Temperaturas</h2>
                        <input
                            type="number"
                            placeholder="Sensor ID"
                            value={sensorId}
                            onChange={(e) => setSensorId(e.target.value)}
                            style={styles.caixaGet}
                        />
                        <input
                            type="number"
                            placeholder="Valor"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            style={styles.caixaGet}
                        />
                        <input
                            type="datetime-local"
                            placeholder="Timestamp"
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            style={styles.caixaGet}
                        />
                        <button onClick={handleUpdate} style={styles.btnU}>
                            Atualizar
                        </button>
                    </div>
                )}

                {/* Mensagens de erro */}
                {error && <div style={styles.error}>{error}</div>}

                {/* Lista de dados */}
                <div style={styles.post}>
                    <h2>Dados das Temperaturas</h2>
                    <table style={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Sensor ID</th>
                                <th>Valor</th>
                                <th>Timestamp</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {temperaturaData.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.valor}</td>
                                    <td>{data.timestamp}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleEdit(data.id, data.sensor_id, data.valor, data.timestamp)
                                            }
                                            style={styles.btnU}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(data.id)}
                                            style={styles.btnD}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const styles = {
    body: {
        margin: 0,
        padding: 0,
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #8CB9D9 0%, #8CB9D9 100%)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    },
    container: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        borderRadius: "20px",
        justifyContent: "center",
        alignItems: "center",
    },
    post: {
        backgroundColor: "#edf6f9",
        padding: "30px 30px",
        borderRadius: "25px",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
        width: "80%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        marginBottom: "5%",
    },
    caixaGet: {
        width: "90%",
        height: "20px",
        borderWidth: "2px",
        borderRadius: "8px",
        borderColor: "#4F728B",
        borderStyle: "solid",
        marginBottom: "20px",
        marginLeft: "10px",
        padding: "10px",
        outline: "none",
    },
    btnP: {
        width: "10%",
        height: "40px",
        backgroundColor: "#5F958E",
        marginLeft: "15px",
        borderRadius: "10px",
        cursor: "pointer",
        color: "white",
        border: "none",
    },
    btnU: {
        width: "20%",
        height: "40px",
        backgroundColor: "#8e7dbe",
        marginLeft: "15px",
        borderRadius: "10px",
        cursor: "pointer",
        color: "white",
        border: "none",
    },
    btnD: {
        width: "20%",
        height: "40px",
        backgroundColor: "#d4778e",
        marginLeft: "15px",
        borderRadius: "10px",
        cursor: "pointer",
        color: "white",
        border: "none",
    },
    tabela: {
        width: "100%",
        marginTop: "20px",
        border: "1px solid #ddd",
        borderCollapse: "collapse",
    },
    error: {
        color: "red",
        margin: "10px 0",
    },
    titulo: {
        color: "white",
        fontSize: "50px",
    },
};

export default CrudTemperatura;
