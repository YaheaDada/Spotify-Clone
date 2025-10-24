import React, { useEffect, useState } from "react";

const AverageListeningTime = () => {
  const [avgTime, setAvgTime] = useState(null);
  const [error, setError] = useState("");

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

          const date = item.ts.split("T")[0];

          
          if (!dailyTotals[date]) dailyTotals[date] = 0;
          dailyTotals[date] += item.ms_played;
        });

        
        const totalDays = Object.keys(dailyTotals).length;
        const totalMs = Object.values(dailyTotals).reduce(
          (a, b) => a + b,
          0
        );

        const avgMs = totalMs / totalDays;

        const hours = Math.floor(avgMs / (1000 * 60 * 60));
        const minutes = Math.floor((avgMs % (1000 * 60 * 60)) / (1000 * 60));

        setAvgTime({ hours, minutes });
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setError(" حدث خطأ أثناء تحميل البيانات.");
      });
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Average Daily Listening Time
      </h1>
      {avgTime ? (
        <p className="text-lg">
          {avgTime.hours} hours and {avgTime.minutes} minutes per day on average
        </p>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default AverageListeningTime;
