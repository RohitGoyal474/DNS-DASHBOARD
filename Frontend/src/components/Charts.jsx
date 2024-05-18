import React from "react";


import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

const zoneData = [
  {
    Id: "/hostedzone/Z0134694Q9C5DSTYCAGY",
    Name: "google.com.",
    CallerReference: "5a02d5ec-6996-4d81-a9e0-cd6c4d5e1153",
    Config: {
      Comment: "test",
      PrivateZone: false,
    },
    ResourceRecordSetCount: 2,
  },
  {
    Id: "/hostedzone/Z0234694Q9C5DSTYCAGY",
    Name: "amazon.com.",
    CallerReference: "6b12d6ec-7997-5d82-b9f1-dd7c5e6e1264",
    Config: {
      Comment: "main site",
      PrivateZone: false,
    },
    ResourceRecordSetCount: 10,
  },
  {
    Id: "/hostedzone/Z0334694Q9C5DSTYCAGY",
    Name: "microsoft.com.",
    CallerReference: "7c23e7fc-8998-6e93-c9f2-ed8d6f7f1375",
    Config: {
      Comment: "corporate",
      PrivateZone: true,
    },
    ResourceRecordSetCount: 20,
  },
  {
    Id: "/hostedzone/Z0434694Q9C5DSTYCAGY",
    Name: "apple.com.",
    CallerReference: "8d34f8fd-9999-7fa4-daf3-fe9e7f8g1486",
    Config: {
      Comment: "apple main",
      PrivateZone: false,
    },
    ResourceRecordSetCount: 15,
  },
  {
    Id: "/hostedzone/Z0534694Q9C5DSTYCAGY",
    Name: "netflix.com.",
    CallerReference: "9e45g9ge-aaaa-8gb5-eb04-fg0f8g9h1597",
    Config: {
      Comment: "streaming",
      PrivateZone: true,
    },
    ResourceRecordSetCount: 30,
  },
  {
    Id: "/hostedzone/Z0634694Q9C5DSTYCAGY",
    Name: "facebook.com.",
    CallerReference: "0f56h0hf-bbbb-9hc6-fc15-gh1g9h0i1608",
    Config: {
      Comment: "social",
      PrivateZone: false,
    },
    ResourceRecordSetCount: 25,
  },
  {
    Id: "/hostedzone/Z0734694Q9C5DSTYCAGY",
    Name: "twitter.com.",
    CallerReference: "1g67i1ig-cccc-adh7-gd26-hi2h0i1j1719",
    Config: {
      Comment: "microblogging",
      PrivateZone: true,
    },
    ResourceRecordSetCount: 5,
  },
  {
    Id: "/hostedzone/Z0834694Q9C5DSTYCAGY",
    Name: "github.com.",
    CallerReference: "2h78j2jh-dddd-bei8-he37-ij3i1j2k182a",
    Config: {
      Comment: "code hosting",
      PrivateZone: false,
    },
    ResourceRecordSetCount: 12,
  },
  {
    Id: "/hostedzone/Z0934694Q9C5DSTYCAGY",
    Name: "linkedin.com.",
    CallerReference: "3i89k3ki-eeee-cfj9-if48-jk4j2k3l193b",
    Config: {
      Comment: "professional networking",
      PrivateZone: true,
    },
    ResourceRecordSetCount: 8,
  },
  {
    Id: "/hostedzone/Z1034694Q9C5DSTYCAGY",
    Name: "youtube.com.",
    CallerReference: "4j90l4lj-ffff-dgk0-jg59-kl5k3l4m1a4c",
    Config: {
      Comment: "video platform",
      PrivateZone: false,
    },
    ResourceRecordSetCount: 18,
  },
];

const privateZoneCount = zoneData.filter(
  (zone) => zone.Config.PrivateZone
).length;
const nonPrivateZoneCount = zoneData.length - privateZoneCount;

export const ChartApp = () => {
  return (
    <div className="App p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
                },
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

        <div className="dataCard customerCard bg-white p-4 shadow rounded-lg">
          <Bar
            data={{
              labels: zoneData.map((data) => data.Name),
              datasets: [
                {
                  label: "Private Zone",
                  data: zoneData.map((data) =>
                    data.Config.PrivateZone ? 1 : 0
                  ),
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

        <div className="dataCard privateZoneCountCard bg-white p-4 shadow rounded-lg">
          <Pie
            data={{
              labels: ["Private Zones", "Non-Private Zones"],
              datasets: [
                {
                  label: "Zone Count",
                  data: [privateZoneCount, nonPrivateZoneCount],
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Private vs Non-Private Zones",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartApp;
