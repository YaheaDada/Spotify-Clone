import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";

const MostActiveSeason = () => {
  const [seasonData, setSeasonData] = useState([]);
  const [mostActiveSeason, setMostActiveSeason] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/spotify_data_history.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((data) => {
        const seasonTotals = {
          Winter: 0,
          Spring: 0,
          Summer: 0,
          Fall: 0,
        };

        data.forEach((item) => {
          if (!item.ts || !item.ms_played) return;

          const month = new Date(item.ts).getUTCMonth() + 1;
          let season = "";

          if ([12, 1, 2].includes(month)) season = "Winter";
          else if ([3, 4, 5].includes(month)) season = "Spring";
          else if ([6, 7, 8].includes(month)) season = "Summer";
          else if ([9, 10, 11].includes(month)) season = "Fall";

          seasonTotals[season] += item.ms_played;
        });

        const chartData = Object.entries(seasonTotals).map(
          ([season, total]) => ({
            season,
            hours: total / (1000 * 60 * 60),
          })
        );

        const topSeason = chartData.reduce((max, cur) =>
          cur.hours > max.hours ? cur : max
        );

        setSeasonData(chartData);
        setMostActiveSeason(topSeason);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setError("❌ Error loading data file. Please check the JSON path.");
      });
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="  bg-linear-to-b  text-white p-6 flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mb-6 text-[#8b00ff]">
        Most Active Listening Season
      </h1>

      {mostActiveSeason ? (
        <p className="text-lg mb-8 text-gray-200">
          You listened the most during{" "}
          <span className="font-semibold text-[#FF007F]">
            {mostActiveSeason.season}
          </span>{" "}
          — about{" "}
          <span className="font-semibold text-[#FF007F]">
            {mostActiveSeason.hours.toFixed(1)} hours
          </span>{" "}
          of music.
        </p>
      ) : (
        <p className="text-gray-400 mb-8">Loading data...</p>
      )}

      {seasonData.length > 0 && (
        <div className="bg-[#131313] rounded-xl p-4 shadow-lg border border-[#333] w-full max-w-2xl">
          <BarChart
            xAxis={[
              {
                data: seasonData.map((d) => d.season),
                scaleType: "band",
                label: "Season",
                tickLabelStyle: { fill: "#ccc", fontSize: 13 },
              },
            ]}
            series={[
              {
                data: seasonData.map((d) => d.hours),
                label: "Listening Hours",
                color: "#8b00ff",
              },
            ]}
            height={400}
            margin={{ top: 30, right: 30, bottom: 50, left: 70 }}
            sx={{
              ".MuiChartsAxis-label": { fill: "#aaa" },
              ".MuiChartsAxis-tickLabel": { fill: "#bbb" },
              ".MuiBarElement-root": {
                transition: "all 0.3s ease",
              },
              ".MuiBarElement-root:hover": {
                fill: "#ef476f",
              },
              backgroundColor: "#131313",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MostActiveSeason;
