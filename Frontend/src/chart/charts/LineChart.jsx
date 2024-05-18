import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

const LineChart = ({ zoneData }) => {
    return (
        <div className="dataCard revenueCard bg-white p-4 shadow rounded-lg">
          <Line
            data={{
              labels: zoneData.map((data) => data.Name),
              datasets: [
                {
                  label: "Resource Record Set Count",
                  data: zoneData.map((data) => data.ResourceRecordSetCount),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                }
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Resource Record Set Count per Zone",
                },
              },
            }}
          />
        </div>
    )}

export default LineChart;
