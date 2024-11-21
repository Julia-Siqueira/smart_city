import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Components/NavBar';

export default function CrudUmidade() {
    const [index, setIndex] = useState('');
    const [getIDG, setIDG] = useState('');
    const [getValorG, setValorG] = useState('');
    const [getTimeG, setTimeG] = useState('');
    const [getID, setID] = useState('');
    const [getValor, setValor] = useState('');
    const [getTime, setTime] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            console.log('Token Home:', storedToken);
            setToken(storedToken);
        }
    }, []);

    const capturar = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/upload/umidade/${index}`);
            setIDG(response.data.sensor_id);
            setValorG(response.data.valor);
            setTimeG(response.data.timestamp);
        } catch (error) {
            console.log(error);
        }
    };

    const postar = async () => {
        try {
            const novoSensor = {
                sensor_id: getID,
                valor: getValor,
                timestamp: getTime,
            };

            await axios.post(
                'http://127.0.0.1:8000/upload/umidade/',
                novoSensor,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert('Sensor adicionado');
            setTime('');
            setID('');
            setValor('');
            console.log('deu certo');
        } catch (error) {
            console.log(error);
            alert('Erro ao adicionar o sensor');
        }
    };

    return (
        <div style={styles.body}>
            <Navbar />
            <div style={styles.container}>
                <h1 style={styles.titulo}> CRUD </h1>
            <div style={styles.get}>
                <p style={styles.title}>GET</p>
                <div style={styles.text}>
                    <p style={styles.text}>ID: </p>
                    <input
                        value={index}
                        onChange={(e) => setIndex(e.target.value)}
                        style={styles.caixaID}
                    />
                    <button style={styles.btn} onClick={capturar}> <p style={styles.textoBotao}>GET</p> </button>
                </div>
                <p style={styles.text}>Sensor</p>
                <input
                    value={getIDG}
                    onChange={(e) => setIDG(e.target.value)}
                    style={styles.caixaGet}
                />
                <p style={styles.text}>Valor</p>
                <input
                    value={getValorG}
                    onChange={(e) => setValorG(e.target.value)}
                    style={styles.caixaGet}
                />
                <div style={styles.global}>
                    <div style={styles.aic}>
                        <p style={styles.text}>Timestamp</p>
                        <input
                            value={getTimeG}
                            onChange={(e) => setTimeG(e.target.value)}
                            style={styles.caixaGet}
                        />
                    </div>
                </div>
            </div>

            <div style={styles.post}>
                <p style={styles.title}>POST - UPDATE - DELETE</p>
                <p style={styles.text}>Sensor</p>
                <input
                    value={getID}
                    onChange={(e) => setID(e.target.value)}
                    style={styles.caixaGet}
                />
                <p style={styles.text}>Valor</p>
                <input
                    value={getValor}
                    onChange={(e) => setValor(e.target.value)}
                    style={styles.caixaGet}
                />
                <div style={styles.global}>
                    <div style={styles.aic}>
                        <p style={styles.text}>Timestamp</p>
                        <input
                            value={getTime}
                            onChange={(e) => setTime(e.target.value)}
                            style={styles.caixaGet}
                        />
                    </div>
                </div>
                <div style={styles.botoes}>
                    <button style={styles.btnP} onClick={postar}> <p style={styles.textoBotao}>POST</p> </button>
                    <button style={styles.btnU} onClick={postar}> <p style={styles.textoBotao}>UPDATE</p> </button>
                    <button style={styles.btnD} onClick={postar}> <p style={styles.textoBotao}>DELETE</p> </button>
                </div>
                
            </div>
            
        </div>
        </div>
        
    );
}

export const styles = {
    text:{
        display: 'flex', 
        flexDirection: 'row' 
    },
    textoBotao:{
        fontWeight: '700'
    },
    body:{
        margin: 0,
        padding: 0,
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #8CB9D9 0%, #8CB9D9 100%)",
        display: "flex",
        flexDirection: 'column',
        minHeight: "100vh",
    },
  container: {
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      borderRadius: '20px',
      justifyContent: 'center',
      alignItems: 'center'
  },
  get: {
    backgroundColor: "#edf6f9",
    padding: "30px 30px",
    borderRadius: "25px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
    width: "80%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: '1%'
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
    marginBottom: '5%' 
  },
  caixaGet: {
    width: '90%',
    height: '20px',
    borderWidth: '2px',
    borderRadius: '8px',
    borderColor: '#4F728B',
    borderStyle: 'solid',
    marginBottom: '20px',
    marginLeft: '10px',
    padding: '10px',
    outline: 'none',
  },
  caixaID: {
      width: '10%',
      height: '20px',
      borderWidth: '2px',
      borderRadius: '8px',
      borderColor: '#4F728B',
      borderStyle: 'solid',
      marginBottom: '20px',
      marginLeft: '10px',
      padding: '10px',
      outline: 'none',
  },
  btn: {
      width: '10%',
      height: '40px',
      backgroundColor: '#94A1DB',
      marginLeft: '15px',
      borderRadius: '10px',
      cursor: 'pointer',
      color: 'white',
      border: 'none',
  },
  btnP: {
      width: '10%',
      height: '40px',
      backgroundColor: '#5F958E',
      marginLeft: '15px',
      borderRadius: '10px',
      cursor: 'pointer',
      color: 'white',
      border: 'none',
  },
  btnU: {
      width: '10%',
      height: '40px',
      backgroundColor: '#8e7dbe',
      marginLeft: '15px',
      borderRadius: '10px',
      cursor: 'pointer',
      color: 'white',
      border: 'none',
  },
  btnD: {
      width: '10%',
      height: '40px',
      backgroundColor: '#d4778e',
      marginLeft: '15px',
      borderRadius: '10px',
      cursor: 'pointer',
      color: 'white',
      border: 'none',
  },
  aic: {
      width: '30%',
  },
  global: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
  },
  divImagem: {
      height: '180px',
      width: '150px',
      backgroundColor: '#CDCDCD',
      margin: '20px',
      borderRadius: '10px',
      float: 'right',
  },
  title:{
    fontSize: '30px',
    fontWeight: '500',
    color: '#4F728B'
  },
  titulo:{
    color: 'white',
    fontSize: '50px'
  },
  botoes:{
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '2%'
  }
};



