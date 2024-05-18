import React from "react";
import zoneData from "../Data/custom_data.json";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import DoughnutChart from "./charts/DoughnutChart";

const privateZoneCount = zoneData.filter(zone => zone.Config.PrivateZone).length;
const nonPrivateZoneCount = zoneData.length - privateZoneCount;

export const ChartApp = () => {
  return (
    <div className="App p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <LineChart zoneData={zoneData}/>
        <BarChart zoneData={zoneData}/>
        <DoughnutChart zoneData={zoneData}/>
        <PieChart zoneData={zoneData}/>
      </div>
    </div>
  );
}

export default ChartApp;
