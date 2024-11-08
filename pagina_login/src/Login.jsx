import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Login() {

    // estados
    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const[token, setToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // const chamada quando o formulário é enviado
    // recebe informações do evento que aconteceu e válida elas
    const handleSubmit = async (e) => {
        e.preventDefault(); // não deixa a página recarregar
        
        try{
            const tokenResponse = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'smart_user',
                    password: '123456'
                }),
            });

            const tokenData = await tokenResponse.json();

            if (tokenData.access) {
                localStorage.setItem('authToken', tokenData.access);
                const response = await fetch('http://localhost:8000/api/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenData.access}`, 
                    },
                    body: JSON.stringify({
                        username,
                        password
                    }),
                });

                const data = await response.json();
                
                if(data.success){

                    setToken(data.token);
                    console.log('Token recebido:', tokenData.access);
                    localStorage.setItem('authToken', data.token);
                    
                    alert('Login bem-sucedido!');
                    navigate('/sensores');

                } else{
                    setErrorMessage(data.message || 'Erro desconhecido');
                }
            
            } else{
                setErrorMessage(tokenData.detail || 'Erro ao obter o token');
            }
    } catch(error){
        setErrorMessage('Erro de conexão.')
        console.log('Erro:', error);
    }

    };

    return (
        <>
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
        </>
        

            
    );
}

export const styles = {
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
    },
    link:{
        marginBottom: '10px',
        color: 'white'
    },
    text:{
        color: 'white',
        textAlign: 'left',
        fontSize: '18px'
    },
    title:{
        color:'white',
        fontSize: '40px'
    }
  };

  export default Login;