import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const GraficoContador = ({ filterType }) => {
  const [chartData, setChartData] = useState([]);

  const fetchData = () => {
    const url = `http://localhost:8000/api/contador-data/?filtro=${filterType}`;

    axios.get(url)
      .then((response) => {
        const parametros = [['Data', 'Valor']];

        response.data.forEach((item) => {
          const date = new Date(item.timestamp);
          const value = parseFloat(item.valor);
          parametros.push([date, value]);
        });

        setChartData(parametros);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados: ', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [filterType]);

  return (
    <div>

      {chartData.length > 1 ? (
        <Chart
          chartType="AreaChart"
          data={chartData}
          options={{
            hAxis: { 
              title: 'Data', 
              titleTextStyle: { color: '#333' },
              format: filterType === 'dia' ? 'HH:mm' : 
                      filterType === 'mes' ? 'dd' : 
                      'MMM'
            },
            vAxis: { title: 'Valor', minValue: 0 },
            legend: { position: 'bottom' },
          }}
          width="100%"
          height="400px"
        />
      ) : (
        <p>Sem dados para o período selecionado</p>
      )}
    </div>
  );
};

export default GraficoContador;
