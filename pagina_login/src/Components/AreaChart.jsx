import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [], // Datas serão preenchidas aqui
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  useEffect(() => {
    // Buscar dados do backend
    fetch("http://127.0.0.1:8000/api/fastapi-dados/") // Substitua pelo endpoint da sua API
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verifique o formato dos dados
  
        // Verifique se a resposta é um array antes de mapear
        if (Array.isArray(data)) {
          // Formatar os dados para o gráfico
          const categories = data.map((item) => item.data); // Datas para o eixo X
          const values = data.map((item) => item.valor); // Valores para o eixo Y
  
          setChartData({
            series: [
              {
                name: "Valores",
                data: values,
              },
            ],
            options: {
              ...chartData.options,
              xaxis: {
                ...chartData.options.xaxis,
                categories: categories,
              },
            },
          });
        } else {
          console.error("Dados não são um array:", data);
        }
      })
      .catch((error) => console.error("Erro ao buscar os dados:", error));
  }, []); // Executa uma vez ao montar o componente
  

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default ApexChart;
