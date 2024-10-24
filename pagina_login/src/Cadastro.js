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
                    window.location.href = "http://localhost:3000/login";
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
        <div style={styles.container}>
            <h2>Cadastro</h2>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Escolha seu nome de Usuário:
                <input
                    style={styles.input}
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Digite seu e-mail:
                    <input
                       style={styles.input}
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required/>
                </label>
                <label>
                    Escolha uma senha:
                    <input
                       style={styles.input}
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                </label>
                <label>
                    Confirme sua senha:
                    <input
                       style={styles.input}
                       type="password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       required/>
                </label>
                <button type="submit" style={styles.button}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '60px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
    },
    inputGroup:{
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '10px'
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
}

export default Cadastro;
