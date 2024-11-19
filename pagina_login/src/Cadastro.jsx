import React, {useState} from "react";

function Cadastro(){

    // estados
    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[email, setEmail] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const[successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setErrorMessage('As senhas não coincidem');
            return;
        }

        try {
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
                const response = await fetch('http://localhost:8000/api/create_user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenData.access}`, 
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    }),
                });
                
                const data = await response.json();

                if (data.success) {
                    setSuccessMessage('Cadastro realizado com sucesso!');
                    setErrorMessage('');
                    window.location.href = "http://localhost:3000";
                } else {
                    setErrorMessage(data.message || 'Erro no cadastro.');
                }
            } else {
                setErrorMessage(tokenData.detail || 'Erro ao obter o token');
            }
        } catch (error) {
            setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
            console.log('Erro:', error);
        }
    };

    return(
        <div style={styles.body}>
        <div style={styles.container}>
            <h2 style={styles.title}>Cadastro</h2>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <p style={styles.text}>
                    Escolha seu nome de Usuário:
                <input
                    style={styles.input}
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    />
                </p>
                <p style={styles.text}>
                    Digite seu e-mail:
                    <input
                       style={styles.input}
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required/>
                </p>
                <p style={styles.text}>
                    Escolha uma senha:
                    <input
                       style={styles.input}
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                </p>
                <p style={styles.text}>
                    Confirme sua senha:
                    <input
                       style={styles.input}
                       type="password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       required/>
                </p>
                <button type="submit" style={styles.button}>
                    Cadastrar
                </button>
            </form>
        </div>
        </div>
    );
}

export const styles = {
    body:{
        margin: 0,
        padding: 0,
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #8CB9D9 0%, #8CB9D9 100%)",
        display: "flex",
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
    inputGroup:{
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
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px'
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
    success: {
        color: 'green',
        marginBottom: '15px',
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
}

export default Cadastro;
