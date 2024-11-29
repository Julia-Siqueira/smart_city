import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar o hook useNavigate
import Navbar from './Components/NavBar';

function TabelaLuminosidade(){
    const[data, setData] = useState([]);
    const[error, setError] = useState(null);
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

    useEffect(() => {
      const fetchContadores = async () => {
          try {
              const token = localStorage.getItem("authToken");
              if (!token) {
                  throw new Error("Token de autenticação não encontrado.");
              }

              const response = await axios.get("http://127.0.0.1:8000/api/luminosidade/", {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });

              setData(response.data);
          } catch (err) {
              console.error("Erro ao buscar os contadores:", err);
              setError(err.message);
          }
      };

      fetchContadores();
  }, []);



  return (
    <div style={styles.body}>
      <Navbar/>
        <h1 style={styles.h2}>Dados dos Sensores de Luminosidade</h1>
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
                    <th>ID</th>
                    <th>Sensor</th>
                    <th>Luminosidade</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody style={styles.linhas}>
                {data.map((temperatura) => (
                    <tr key={temperatura.id}>
                        <td>{temperatura.id}</td>
                        <td>{temperatura.sensor}</td>
                        <td>{temperatura.valor}</td>
                        <td>{temperatura.timestamp}</td>
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

export default TabelaLuminosidade;