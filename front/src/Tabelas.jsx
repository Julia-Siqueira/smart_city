import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Components/NavBar';
import { useNavigate } from 'react-router-dom'; // Importar o hook useNavigate

function TabelaSensores(){
    const[data, setData] = useState([]);
    const[error, setError] = useState(null);
    const[token, setToken] = useState('');
    const navigate = useNavigate(); // Usar o hook useNavigate para navegação

    const navigateSensores = () => {
      navigate('/tabelas'); // Redireciona para a página "/contador"
  };
    const navigateTemperatura = () => {
      navigate('/temperatura'); // Redireciona para a página "/contador"
  };
    const navigateLuminosidade = () => {
      navigate('/luminosidade'); // Redireciona para a página "/contador"
  };
    const navigateUmidade = () => {
      navigate('/umidade'); // Redireciona para a página "/contador"
  };

    useEffect(() => () => {
      const fetchAllSensors = async () => {
        try{
          const response = await axios.get("http://127.0.0.1:8000/api/sensores/");
          console.log(response.data);
          setData(response.data);
        }
        catch(error){
          console.log("Erro: ", error);
        }
        finally{

        }
      };

      fetchAllSensors();
    }, []);

    return(
      <div style={styles.body}>
      <Navbar/>
        <h2 style={styles.h2}>Dados dos Sensores</h2>
        <div style={styles.botoes}>
        <button style={styles.button} onClick={navigateSensores}>Sensores</button>
          <button style={styles.button} onClick={navigateTemperatura}>Temperatura</button>
          <button style={styles.button} onClick={navigateLuminosidade}>Luminosidade</button>
          <button style={styles.button} onClick={navigateUmidade}>Umidade</button>
        </div>
        <div style={styles.divTabela}>
        <table style={styles.tabela}>
            <thead style={styles.colunas}>
                <tr>
                    <th style={styles.categoria}>ID</th>
                    <th style={styles.categoria}>Localização</th>
                    <th style={styles.categoria}>Latitude</th>
                    <th style={styles.categoria}>Longitude</th>
                    <th style={styles.categoria}>Sensor ID</th>
                    <th style={styles.categoria}>Tipo</th>
                    <th style={styles.categoria}>Status</th>
                </tr>
            </thead>
            <tbody style={styles.linhas}>
                {data.map((sensor) => (
                    <tr style={styles.categoria} key={sensor.id}>
                        <td style={styles.categoria}>{sensor.id}</td>
                        <td style={styles.categoria}>{sensor.localizacao}</td>
                        <td style={styles.categoria}>{sensor.latitude}</td>
                        <td style={styles.categoria}>{sensor.longitude}</td>
                        <td style={styles.categoria}>{sensor.sensor_id}</td>
                        <td style={styles.categoria}>{sensor.tipo}</td>
                        <td style={styles.categoria}>{sensor.status_operacional ? "Ativo" : "Inativo"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
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
    
    minHeight: "100vh",
},
  h2:{
    color: "#fff",
    textAlign: "center",
    fontSize: "50px",
    marginTop: '5%',
    marginBottom: '2%'
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
  },
  tabela:{
    width: '70%',
  },
  divTabela:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default TabelaSensores;