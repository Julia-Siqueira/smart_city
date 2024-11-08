import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TabelaSensores(){
    const[data, setData] = useState([]);
    const[error, setError] = useState(null);
    const[token, setToken] = useState('');

    const fetchData = async () => {
        try {
            // O GET NAO ESTA FUNCIONANDO
          const response = await axios.post('http://127.0.0.1:8000/get/umidade/', {
            sensor_id: 1, // Exemplo de filtro
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setData(response.data);
        } catch (err) {
          console.error("Erro ao carregar os dados:", err);
          setError('Erro ao carregar os dados');
        }
      };
      

    return(
        <div>
            <h2>Dados dos sensores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sensor ID</th>
                        <th>Valor</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((sensor, index) => (
                        <tr key={index}>
                            <td>{sensor.sensor_id}</td>
                            <td>{sensor.valor}</td>
                            <td>{sensor.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default TabelaSensores;