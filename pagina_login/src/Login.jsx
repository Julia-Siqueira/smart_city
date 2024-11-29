import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    // estados
    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        console.log("Token1: ", token)
        localStorage.clear();
        console.log("Token2: ", token)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if(!username || !password){
            alert('Preencha todos os campos');
            return;
        }

        try{
            const tokenResponse = await axios.post("http://127.0.0.1:8000/api/token/", {
                username: username,
                password: password
            });

            const token = tokenResponse.data.access;
            localStorage.setItem('authToken', token);
            alert('Bem vindo(a) ao Smart City');

            const from = location.state?.from || "/sensores";
            navigate(from);

        }

        catch(err){
            console.error("Erro ao fazer login:", err);
            setErrorMessage('Erro ao fazer login.')
        }
    };

    return (
        <div style={styles.body}>
            <h1 style={styles.title}>Smart City</h1>
            <div style={styles.container}>
            {/* Renderização condicional */}
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
        
                {/* Nome do usuário */}
                <div style={styles.inputGroup}>
                    <p style={styles.text}>Nome de usuário</p>
                    <input
                        type="text"
                        id="username" // serve para o htmlFor
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        style={styles.input}
                        // e: informações sobre a interação
                        // e.target.value: elemento que gerou o evento e a informação inserida
                    />
                </div>

                {/* Senha */}
                <div style={styles.inputGroup}>
                    <p style={styles.text}>Senha</p>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>

                {/* Botão de envio */}
                <button type='submit' style={styles.button}>Entrar</button>
            </form>
        <a style={styles.link}><Link to="/cadastro">Ainda não possui login? Faça seu cadastro.</Link></a>
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      paddingRight: '60px',
      paddingLeft: '60px',
      paddingTop: '60px',
      paddingBottom: '60px',
      border: '1px solid #6D9DBE',
      borderRadius: '20px',
      textAlign: 'center',
      backgroundColor: '#6D9DBE',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '12px',
      border: '1px solid #fff',
      height: '30px',
      fontFamily: 'Lexend, sans-serif'
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#8CB9D9',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      marginBottom: '20px',
      width: '70%',
      height: '40px',
      fontFamily: 'Lexend, sans-serif'
    },
    error: {
      color: 'red',
      marginBottom: '15px',
      backgroundColor: 'white',
      width: '50%',
      borderRadius: '5px',
      padding: '5px'
    },
    link:{
        marginBottom: '10px',
        color: 'white',

    },
    text:{
        color: 'white',
        textAlign: 'left',
        fontSize: '18px'
    },
    title:{
        color:'white',
        fontSize: '40px',
        textAlign: "left"
    }
  };

  export default Login;