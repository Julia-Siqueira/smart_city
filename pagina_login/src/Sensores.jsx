import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/NavBar";

// quando é uma função, precisa começar com letra maiúscula
function Sensores() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/crud');
    };
    const handleNavigateTabelas = () => {
        navigate('/tabelas');
    };

    return (
        <div style={styles.body}>
            <Navbar/>
            <div style={styles.containerFormulario}>
                <div>
                    <h1 style={styles.h1}>Upload de Arquivos CSV</h1>
                    <button style={styles.button} onClick={handleNavigate}>Fazer Alterações</button>
                    <button style={styles.button} onClick={handleNavigateTabelas}>Ver Tabelas</button>
                </div>
                <CarregarForm title="Sensores" actionUrl="/upload_sensores" />
                <CarregarForm title="Contador" actionUrl="/upload_contadores" />
                <CarregarForm title="Luminosidade" actionUrl="/upload_luminosidade" />
                <CarregarForm title="Temperatura" actionUrl="/upload_temperatura" />
                <CarregarForm title="Umidade" actionUrl="/upload_umidade" />
            </div>
            <div style={styles.divGraficos}>
                <h1 style={styles.tituloGrafico}>Gráficos</h1>
            </div>
        </div>
    );
}

function CarregarForm({ title, actionUrl }) {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : '');
    };

    return (
        <div style={styles.secaoFormulario}>
            <h2 style={styles.h2}>{title}</h2>
            <form method="POST" encType="multipart/form-data" action={actionUrl}>
                <div style={styles.uploadArquivos}>
                    <label
                        htmlFor={`file_${(title || '').toLowerCase()}`}
                        id={`label_${(title || '').toLowerCase()}`}
                        style={styles.label}
                    >
                        {fileName ? `Arquivo selecionado: ${fileName}` : `Escolha o arquivo de ${title || 'arquivo'}`}
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept=".csv"
                        required
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <button type="submit" style={styles.button}>Enviar {title || 'arquivo'}</button>
            </form>

      
        </div>

    );
}

export const styles = {
    body: {
        margin: 0,
        padding: 0,
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #8CB9D9 0%, #8CB9D9 100%)",
        display: "flex",
        flexDirection: 'column',
        minHeight: "100vh",
    },
    containerFormulario: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: "40px 30px",
        borderRadius: "25px",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
        maxWidth: "1500px",
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        margin: "0 auto",
        marginTop: '20px'
    },
    h1: {
        fontSize: "30px",
        marginBottom: "25px",
        color: "#444",
        fontWeight: 600,
    },
    secaoFormulario: {
        margin: "20px 10px",
        padding: "20px",
        border: "2px solid #ddd",
        borderRadius: "15px",
        backgroundColor: "#f9f9f9",
        maxWidth: "400px"
    },
    h2: {
        fontSize: "24px",
        marginBottom: "15px",
        color: "#333",
    },
    uploadArquivos: {
        textAlign: "center",
    },
    label: {
        display: "block",
        width: "80%",
        padding: "15px",
        margin: "0 auto",
        border: "2px solid #ddd",
        borderRadius: "20px",
        backgroundColor: "#f9f9f9",
        color: "#333",
        textAlign: "center",
        cursor: "pointer",
        transition: "border-color 0.3s ease, background-color 0.3s ease",
    },
    button: {
        background: "#6D9CBE",
        color: "#fff",
        border: "2px solid white",
        borderRadius: "25px",
        padding: "15px 40px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "20px",
        display: "inline-block",
        width: "80%",
        transition: "all 0.3s ease",
        fontFamily: "Lexend",
    },
    divGraficos:{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: "40px 30px",
        borderRadius: "25px",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
        maxWidth: "1500px",
        width: "30%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        marginTop: '20px'
    },
    tituloGrafico:{
        color: '#4f728b'
    }
};

export default Sensores;
