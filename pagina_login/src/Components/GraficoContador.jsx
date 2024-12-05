import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const GraficoContador = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/contador-data/')  // Ajuste a URL conforme necessário
      .then((response) => {
        const hoje = new Date().toISOString().split('T')[0];
        const formattedData = [['Data', 'Valor']]; // Cabeçalhos do gráfico
        response.data.forEach(item => {
          // Converte a string timestamp para um objeto Date
          const date = new Date(item.timestamp);
          const dataAtual = date.toISOString().split('T')[0];
          const value = item.valor;

          if(dataAtual === hoje){
            formattedData.push([date, value]);
          }
          
        });
        setChartData(formattedData);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  return (
    <div>

      {chartData.length > 1 ? (
        <Chart
          chartType="AreaChart"
          data={chartData}
          options={{
            hAxis: { title: 'Data', titleTextStyle: { color: '#333' } },
            vAxis: { title: 'Valor', minValue: 0 },
            legend: { position: 'bottom' },
          }}
          width="100%"
          height="400px"
        />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default GraficoContador;
