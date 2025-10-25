import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";

const AverageListeningTime = () => {
  const [dailyData, setDailyData] = useState([]);
  const [error, setError] = useState("");
  const [avgTime, setAvgTime] = useState(null);

  useEffect(() => {
    fetch("/spotify_data_history.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((data) => {
        const dailyTotals = {};

        data.forEach((item) => {
          if (!item.ts || !item.ms_played) return;

          const date = item.ts.split("T")[0]; // YYYY-MM-DD
          if (!dailyTotals[date]) dailyTotals[date] = 0;
          dailyTotals[date] += item.ms_played;
        });

        const sortedDates = Object.keys(dailyTotals).sort();

        const chartData = sortedDates.map((date) => ({
          date,
          hours: dailyTotals[date] / (1000 * 60 * 60), // convert ms → hours
        }));

        const totalHours = chartData.reduce((sum, d) => sum + d.hours, 0);
        const avgHours = totalHours / chartData.length;
        const avgMinutes = (avgHours % 1) * 60;

        setDailyData(chartData);
        setAvgTime({
          hours: Math.floor(avgHours),
          minutes: Math.floor(avgMinutes),
        });
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setError("errpr ");
      });
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="p-6 text-center text-white w-full justify-center flex-col flex items-center w-full h-full">
      <h1 className="text-3xl font-bold mb-4 text-[#8b00ff]">
        Average Daily Listening Time
      </h1>

      {avgTime ? (
        <p className="text-lg mb-8">
          You listen on average{" "}
          <span className="text-[#FF007F] font-semibold">
            {avgTime.hours}h {avgTime.minutes}m
          </span>{" "}
          per day
        </p>
      ) : (
        <p className="text-gray-400 mb-8">Loading data...</p>
      )}

      {dailyData.length > 0 && (
        <div className="bg-[#131313] rounded-xl p-4 shadow-lg border border-[#333] w-full   text-white">
          <LineChart
            xAxis={[
              {
                data: dailyData.map((d) => d.date),
                scaleType: "band",
                tickLabelStyle: { fill: "#fff", fontSize: 12 },
                labelStyle: { fill: "#fff" },
              },
            ]}
            yAxis={[
              {
                label: "Hours Listened",
                labelStyle: { fill: "#ffff", fontSize: 14, fontWeight: 600 },
                tickLabelStyle: { fill: "#ffff" },
              },
            ]}
            series={[
              {
                data: dailyData.map((d) => d.hours),
                label: "Hours Listened",
                color: "#8b00ff",
                area: true,
                showMark: false,
              },
            ]}
            height={550}
            margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
            sx={{
              ".MuiLineElement-root": { strokeWidth: 2 },
              ".MuiAreaElement-root": { fillOpacity: 0.15 },
              ".MuiChartsAxis-tickLabel": { fill: "#fff" },
              ".MuiChartsAxis-label": { fill: "#fff" },
              ".MuiChartsLegend-label": { fill: "#fff" },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AverageListeningTime;
