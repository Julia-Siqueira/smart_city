import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TabelaSensores(){
    const[data, setData] = useState([]);
    const[error, setError] = useState(null);
    const[token, setToken] = useState('');

    useEffect(() => () => {
      const fetchUmidade = async () => {
        try{
          const response = await axios.get("http://127.0.0.1:8000/api/umidade/");
          console.log(response.data);
          setData(response.data);
        }
        catch(error){
          console.log("Erro: ", error);
        }
        finally{

        }
      };

      fetchUmidade();
    }, []);

    return(
        <div style={styles.body}>
            <h2 style={styles.h2}>Dados dos sensores</h2>
            <div style={styles.botoes}>
              <button style={styles.button}>Contador</button>
              <button style={styles.button}>Temperatura</button>
              <button style={styles.button}>Luminosidade</button>
              <button style={styles.button}>Umidade</button>
            </div>
            <table style={styles.tabela}>
                <thead style={styles.colunas}>
                    <tr>
                        <th style={styles.categoria}>ID</th>
                        <th style={styles.categoria}>Sensor ID</th>
                        <th style={styles.categoria}>Valor</th>
                        <th style={styles.categoria}>Timestamp</th>
                    </tr>
                </thead>
                <tbody style={styles.linhas}>
                    {data.map((data) => (
                        <tr style={styles.categoria} key={data.id}>
                            <td style={styles.categoria}>{data.sensor_id}</td>
                            <td style={styles.categoria}>{data.valor}</td>
                            <td style={styles.categoria}>{new Date(data.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
    minHeight: "100vh",
},

  h2:{
    color: "#fff",
    textAlign: "center",
    fontSize: "30px"
  },
  categoria:{
    color:"#000",
  },

  colunas:{
    backgroundColor: "#e5e5e5",
  },
  linhas:{
    backgroundColor: "#fff",
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#68a1c9',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    marginBottom: '20px',
    width: '15%',
    height: '40px',
    fontFamily: 'Lexend, sans-serif',
    marginLeft: '20px'
  },
  botoes:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default TabelaSensores;