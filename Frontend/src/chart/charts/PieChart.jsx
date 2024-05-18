import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

const PieChart = ({ zoneData }) => {
    const privateZoneCount = zoneData.filter(zone => zone.Config.PrivateZone).length;
    const nonPrivateZoneCount = zoneData.length - privateZoneCount;
    return (
    <div className="dataCard privateZoneCountCard bg-white p-4 shadow rounded-lg">
            <Pie
                data={{
                labels: ['Private Zones', 'Non-Private Zones'],
                datasets: [
                    {
                    label: 'Zone Count',
                    data: [privateZoneCount, nonPrivateZoneCount],
                    backgroundColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)"
                    ],
                    }
                ],
                }}
                options={{
                plugins: {
                    title: {
                    display: true,
                    text: 'Private vs Non-Private Zones',
                    },
                },
                }}
            />
            </div>
             )}

export default PieChart;