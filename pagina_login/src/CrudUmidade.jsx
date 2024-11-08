import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div style={styles.container}>
            <div style={styles.get}>
                <p>GET</p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ marginBottom: 10, fontWeight: 'bold' }}>ID: </p>
                    <input
                        value={index}
                        onChange={(e) => setIndex(e.target.value)}
                        style={styles.caixaID}
                    />
                    <button style={styles.btn} onClick={capturar}>
                        GET
                    </button>
                </div>
                <p style={{ marginBottom: 10, fontWeight: 'bold' }}>Sensor</p>
                <input
                    value={getIDG}
                    onChange={(e) => setIDG(e.target.value)}
                    style={styles.caixaGet}
                />
                <p style={{ marginBottom: 10, fontWeight: 'bold' }}>Valor</p>
                <input
                    value={getValorG}
                    onChange={(e) => setValorG(e.target.value)}
                    style={styles.caixaGet}
                />
                <div style={styles.global}>
                    <div style={styles.aic}>
                        <p style={{ marginBottom: 10, fontWeight: 'bold' }}>Timestamp</p>
                        <input
                            value={getTimeG}
                            onChange={(e) => setTimeG(e.target.value)}
                            style={styles.caixaGet}
                        />
                    </div>
                </div>
            </div>

            <div style={styles.post}>
                <p>POST</p>
                <p style={{ marginBottom: 10, fontWeight: 'bold' }}>Sensor</p>
                <input
                    value={getID}
                    onChange={(e) => setID(e.target.value)}
                    style={styles.caixaGet}
                />
                <p style={{ marginBottom: 10, fontWeight: 'bold' }}>Valor</p>
                <input
                    value={getValor}
                    onChange={(e) => setValor(e.target.value)}
                    style={styles.caixaGet}
                />
                <div style={styles.global}>
                    <div style={styles.aic}>
                        <p style={{ marginBottom: 10, fontWeight: 'bold' }}>Timestamp</p>
                        <input
                            value={getTime}
                            onChange={(e) => setTime(e.target.value)}
                            style={styles.caixaGet}
                        />
                    </div>
                </div>
                <button style={styles.btnP} onClick={postar}>
                    POST
                </button>
            </div>
        </div>
    );
}

export const styles = {
  container: {
      backgroundColor: '#fff',
      padding: '10px',
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
      borderRadius: '20px'
  },
  get: {
      backgroundColor: '#DCD6F7',
      padding: '20px',
      borderRadius: '8px',
  },
  post: {
      backgroundColor: '#D6E5E3',
      padding: '20px',
      borderRadius: '8px',
  },
  caixaGet: {
      height: '25px',
      borderRadius: '5px',
      padding: '10px',
      backgroundColor: 'white',
      width: '90%',
      marginBottom: '10px',
      outline: 'none',
  },
  caixaID: {
      width: '10%',
      height: '30px',
      borderWidth: '1px',
      borderRadius: '8px',
      backgroundColor: 'white',
      borderColor: 'white',
      marginBottom: '10px',
      padding: '10px',
      outline: 'none',
  },
  btn: {
      width: '10%',
      height: '30px',
      backgroundColor: '#94A1DB',
      marginLeft: '15px',
      borderRadius: '10px',
      cursor: 'pointer',
      color: 'white',
      border: 'none',
  },
  btnP: {
      width: '15%',
      height: '30px',
      backgroundColor: '#5F958E',
      marginLeft: '15px',
      borderRadius: '10px',
      cursor: 'pointer',
      color: 'white',
      border: 'none',
  },
  btnD: {
      width: '15%',
      height: '30px',
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
};



