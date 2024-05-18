import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

const BarChart = ({ zoneData }) => {
    return (
        <div className="dataCard customerCard bg-white p-4 shadow rounded-lg">
          <Bar
            data={{
              labels: zoneData.map((data) => data.Name),
              datasets: [
                {
                  label: "Private Zone",
                  data: zoneData.map((data) => data.Config.PrivateZone ? 1 : 0),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Private Zones",
                },
              },
            }}
          />
        </div>
    )
}

export default BarChart;