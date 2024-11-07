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
        <div style={styles.container}>
            <h2>Login</h2>

            {/* Renderização condicional */}
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
        
        {/* Nome do usuário */}
        <div style={styles.inputGroup}>
            <label htmlFor='username'>Nome de usuário</label>
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
            <label htmlFor='password'>Senha</label>
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

            
    );
}

const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      paddingRight: '60px',
      paddingLeft: '30px',
      paddingTop: '20px',
      paddingBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginBottom: '20px'
    },
    error: {
      color: 'red',
      marginBottom: '15px',
    },
    link:{
        marginBottom: '10px',
    }
  };

export default Login;