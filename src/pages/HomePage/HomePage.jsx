import React from "react";
import { BarChart } from "@mui/x-charts";

const HomePage = () => {
  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
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
    </div>
  );
};

export default HomePage;
