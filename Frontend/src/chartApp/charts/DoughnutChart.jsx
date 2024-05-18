import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

const DoughnutChart = ({ zoneData }) => {
    return (
        <div className="dataCard categoryCard bg-white p-4 shadow rounded-lg">
            <Doughnut
                data={{
                labels: zoneData.map((data) => data.Config.Comment),
                datasets: [
                    {
                    label: "Resource Record Set Count",
                    data: zoneData.map((data) => data.ResourceRecordSetCount),
                    backgroundColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                    ],
                    borderColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                    ],
                    },
                ],
                }}
                options={{
                plugins: {
                    title: {
                    display: true,
                    text: "Resource Record Set Count by Comment",
                    },
                },
                }}
            />
            </div>
              )}

export default DoughnutChart;