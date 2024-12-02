import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/NavBar";
import ApexChart from "./Components/AreaChart";
import CarregarForm from "./Components/CarregarForm";  // Importando o componente CarregarForm

// quando é uma função, precisa começar com letra maiúscula
function Sensores() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log("Token1: ", token)
        if(!token){
            alert('Você precisa do token para entrar');
            navigate('/');
        }
    }, [navigate])

    const handleNavigate = () => {
        navigate('/temperaturaCRUD');
    };
    const handleNavigateTabelas = () => {
        navigate('/tabelas');
    };

    const sampleData = [
        { data: "2024-11-29 11:54:11", valor: "34.12" },
        { data: "2024-11-29 11:54:12", valor: "28.74" },
        { data: "2024-11-30 11:54:13", valor: "24.80" },
        { data: "2024-11-30 11:54:14", valor: "37.14" },
      ];
      

    return (
        <div style={styles.body}>
            <Navbar />
            <div style={styles.containerFormulario}>
                <div>
                    <h1 style={styles.h1}>Upload de Arquivos CSV</h1>
                    <button style={styles.button} onClick={handleNavigate}>Fazer Alterações</button>
                    <button style={styles.button} onClick={handleNavigateTabelas}>Ver Tabelas</button>
                </div>
                <CarregarForm title="Sensores" actionUrl="http://127.0.0.1:8000/upload/sensores/" />
                <CarregarForm title="Contador" actionUrl="http://127.0.0.1:8000/upload/contadores/" />
                <CarregarForm title="Luminosidade" actionUrl="http://127.0.0.1:8000/upload/luminosidade/" />
                <CarregarForm title="Temperatura" actionUrl="http://127.0.0.1:8000/upload/temperatura/" />
                <CarregarForm title="Umidade" actionUrl="http://127.0.0.1:8000/upload/umidade/" />
            </div>
            <div style={styles.secaoGraficos}>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Umidade</h1>
                    <ApexChart />
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Temperatura</h1>
                    <ApexChart />
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Contador</h1>
                    <ApexChart />
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Luminosidade</h1>
                    <ApexChart />
                </div>
            </div>
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
    divGraficos: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: "30px 10px",
        borderRadius: "25px",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
        width: "25%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column"
    },
    tituloGrafico: {
        color: '#4f728b'
    },
    secaoGraficos: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: "5%"
    }
};

export default Sensores;
