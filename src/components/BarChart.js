import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

// Import Chart is not visualeble used, but on the background! See set-up!

function BarChart({ inputBarChart }) {
  // ** SET THE DATA FOR THE CHARTER, BASED ON TEH SAME DATA IN 'filteredNames' ** //
  const chartdata = {
    labels: Object.keys(inputBarChart).map((item) => item),
    datasets: [
      {
        label: "Fun",
        data: Object.values(inputBarChart).map((item) => item.fun),
      },
      {
        label: "Difficulty",
        data: Object.values(inputBarChart).map((item) => item.difficulty),
      },
    ],
  };

  // ** SET CHART OPTIONS ** //
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { left: 10, right: 10, bottom: 60 },
    },
  };

  return <Bar data={chartdata} options={options} />;
}

export default BarChart;
