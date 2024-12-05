import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

const GraficoLuminosidade = ({ filterType = "dia" }) => { // Adiciona a prop filterType
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/luminosidade-data/?filter=${filterType}`)  // Ajusta a URL com o filtro
      .then((response) => {
        const formattedData = [["Data", "Valor"]]; // Cabeçalhos do gráfico
        response.data.forEach((item) => {
          const date = new Date(item.timestamp);
          const value = item.valor;
          formattedData.push([date, value]);
        });
        setChartData(formattedData);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, [filterType]); // Reexecuta o efeito ao mudar o filtro

  return (
    <div>
      {chartData.length > 1 ? (
        <Chart
          chartType="AreaChart"
          data={chartData}
          options={{
            hAxis: { title: "Data", titleTextStyle: { color: "#333" } },
            vAxis: { title: "Valor", minValue: 0 },
            legend: { position: "bottom" },
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

export default GraficoLuminosidade;
