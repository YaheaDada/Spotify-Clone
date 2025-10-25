import React, { useEffect, useState } from "react";
import { Gauge } from "@mui/x-charts/Gauge";

const UniqueSongsCount = () => {
  const [uniqueCount, setUniqueCount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/spotify_data_history.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((data) => {
        const uniqueSongs = new Set();

        data.forEach((item) => {
          const track = item.master_metadata_track_name;
          if (track) uniqueSongs.add(track.trim());
        });

        setUniqueCount(uniqueSongs.size);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setError("❌ Error loading data file.");
      });
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;

  // For visualization scale (adjust max as desired)
  const maxSongs = 10000; // You can tune this if your dataset is bigger
  const percentage = uniqueCount
    ? Math.min(uniqueCount / maxSongs, 1) * 100
    : 0;

  return (
    <div className=" bg-gradient-to-b from-[#121212] to-[#181818] text-white flex flex-col items-center justify-center p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Unique Songs Played
      </h1>

      {uniqueCount !== null ? (
        <div className="flex flex-col items-center">
          <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg border border-[#333]">
            <Gauge
              value={uniqueCount}
              valueMin={0}
              valueMax={maxSongs}
              startAngle={-110}
              endAngle={110}
              innerRadius="80%"
              outerRadius="100%"
              sx={{
                width: 250,
                height: 250,
                [`& .MuiGauge-valueArc`]: {
                  fill: "#1DB954",
                },
                [`& .MuiGauge-referenceArc`]: {
                  fill: "#2a2a2a",
                },
                [`& .MuiGauge-valueText`]: {
                  fill: "#1DB954",
                  fontSize: 28,
                  fontWeight: "bold",
                },
              }}
              text={({ value }) => `${Math.round(percentage)}%`}
            />
          </div>

          <p className="text-lg mt-6 text-gray-300">
            You’ve listened to{" "}
            <span className="text-green-400 font-semibold">
              {uniqueCount.toLocaleString()}
            </span>{" "}
            unique songs 🎶
          </p>
        </div>
      ) : (
        <p className="text-gray-400 text-lg">Loading data...</p>
      )}
    </div>
  );
};

export default UniqueSongsCount;
