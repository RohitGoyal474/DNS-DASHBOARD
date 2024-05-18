import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import DoughnutChart from "./charts/DoughnutChart";



export const ChartApp = (data) => {
  const zoneData=data.data.data.HostedZones;
  const privateZoneCount = zoneData.filter(zone => zone.Config.PrivateZone).length;
  const nonPrivateZoneCount = zoneData.length - privateZoneCount;
  return (
    <div className="App p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-0">
        <LineChart zoneData={zoneData}/>
        
        <PieChart zoneData={zoneData}/>
      </div>
    </div>
  );
}

export default ChartApp;
