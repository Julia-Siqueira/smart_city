import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/NavBar";
import CarregarForm from "./Components/CarregarForm";  // Importando o componente CarregarForm
import GraficoContador from "./Components/GraficoContador";
import GraficoUmidade from "./Components/GraficoUmidade";
import GraficoTemperatura from "./Components/GraficoTemperatura";
import GraficoLuminosidade from "./Components/GraficoLuminosidade";

// quando é uma função, precisa começar com letra maiúscula
function Estatisticas() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log("Token1: ", token)
        if(!token){
            alert('Você precisa do token para entrar');
            navigate('/');
        }
    }, [navigate])


    return (
        <div style={styles.body}>
            <Navbar />

            <h1 style={styles.titulo}>Dados de Hoje</h1>

            <div style={styles.secaoGraficos}>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Umidade</h1>
                    <GraficoUmidade filterType="dia"/>
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Temperatura</h1>
                    <GraficoTemperatura filterType="dia"/>
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Contador</h1>
                    <GraficoContador filterType='dia'/>
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Luminosidade</h1>
                    <GraficoLuminosidade filterType='dia'/>
                </div>
            </div>

            <h1 style={styles.titulo}>Dados do Mês</h1>

            <div style={styles.secaoGraficos}>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Umidade</h1>
                    <GraficoUmidade filterType="mes"/>
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Temperatura</h1>
                    <GraficoTemperatura filterType="mes"/>
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Contador</h1>
                    <GraficoContador filterType="mes"/>
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Luminosidade</h1>
                    <GraficoLuminosidade filterType="mes"/>
                </div>
            </div>

            <h1 style={styles.titulo}>Dados do Ano</h1>
            <div style={styles.secaoGraficos}>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Umidade</h1>
                    <GraficoUmidade filterType="ano"/>
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Temperatura</h1>
                    <GraficoTemperatura filterType="ano"/>
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Contador</h1>
                    <GraficoContador filterType="ano"/>
                </div>
                <div style={styles.divGraficos}>
                    <h1 style={styles.tituloGrafico}>Luminosidade</h1>
                    <GraficoLuminosidade filterType="ano"/>
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
        backgroundColor: "#75ABD1",
        padding: "30px 30px",
        borderRadius: "25px",
        width: "80%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        margin: "20px"
    },
    tituloGrafico: {
        color: 'white',
    },
    secaoGraficos: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"

    },
    secaoGraficos2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",

    },
    titulo:{
        color: "white",
        textAlign: "center",
        marginTop: "50px",
        fontSize: "50px",
    }
};

export default Estatisticas;
