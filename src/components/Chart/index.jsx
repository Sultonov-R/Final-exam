import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TailSpin } from "react-loader-spinner";
import "./index.css";

const Chart = ({ Id }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartDays = [
    { label: "24 Hours", value: 1 },
    { label: "30 Days", value: 30 },
    { label: "3 Months", value: 90 },
    { label: "1 Year", value: 365 },
  ];

  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(1);

  const fetchCoinChart = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${Id.id}/market_chart?vs_currency=usd&days=${days}`
      );
      const data = await response.json();
      setChartData(data.prices);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCoinChart();
  }, [Id.id, days]);

  return (
    <div className="chart-container">
      {!chartData ? (
        <div className="loader-wrapper">
          <TailSpin
            visible={true}
            height="150"
            width="150"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="2"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <Line
            data={{
              labels: chartData.map(([timestamp]) => {
                const date = new Date(timestamp);
                const time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: chartData.map(([, price]) => price),
                  label: `Price (Past ${days} Days) in USD`,
                  borderColor: "#87CEEB",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setDays(value)}
                selected={value === days}
                className="btn-style"
                style={{
                  backgroundColor: value === days ? "#87CEEB" : "transparent",
                  color: value === days ? "#000000" : "#FFFFFF",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Chart;
