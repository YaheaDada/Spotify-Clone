import React from "react";
import {
  BarChart,
  Gauge,
  LineChart,
  PieChart,
  ScatterChart,
} from "@mui/x-charts";

const Profile = () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    x1: Math.floor(Math.random() * 100), // random x1 between 0-99
    y1: Math.floor(Math.random() * 100), // random y1 between 0-99
    x2: Math.floor(Math.random() * 100), // random x2 between 0-99
    y2: Math.floor(Math.random() * 100), // random y2 between 0-99
  }));

  const dataset = [
    { month: "Jan", seoul: 52 },
    { month: "Feb", seoul: 38 },
    { month: "Mar", seoul: 45 },
    { month: "Apr", seoul: 60 },
    { month: "May", seoul: 75 },
  ];
  const valueFormatter = (value) => `${value} mm`;

  const chartSetting = {
    height: 300,
    width: 500,
    // ...other settings
  };


  return (
    <div className="flex flex-col justify-center items-center  w-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[{ dataKey: "seoul", label: "Seoul rainfall", valueFormatter }]}
        layout="horizontal"
        {...chartSetting}
      />

      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
          },
        ]}
        series={[
          {
            data: [9, 7, 8],
          },
        ]}
        height={300}
      />
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={300}
      />
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
        width={200}
        height={200}
      />
      <ScatterChart
        height={300}
        series={[
          {
            label: "Series A",
            data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
          },
          {
            label: "Series B",
            data: data.map((v) => ({ x: v.x2, y: v.y2, id: v.id })),
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
      />
      <Gauge
        width={100}
        height={100}
        value={60}
        startAngle={-90}
        endAngle={90}
      />
      {/* ! */}
    </div>
  );
};

export default Profile;
