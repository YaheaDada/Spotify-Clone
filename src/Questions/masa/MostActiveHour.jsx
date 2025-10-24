import React, { useEffect, useState } from "react";

const MostActiveSeason = () => {
  const [mostActiveSeason, setMostActiveSeason] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
   
    const dataPath = "/spotify_data_history.json"; 

    fetch(dataPath)
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

       
        let maxSeason = null;
        let maxValue = 0;
        for (const [season, total] of Object.entries(seasonTotals)) {
          if (total > maxValue) {
            maxValue = total;
            maxSeason = season;
          }
        }

      
        const hours = Math.floor(maxValue / (1000 * 60 * 60));
        const minutes = Math.floor((maxValue % (1000 * 60 * 60)) / (1000 * 60));

        setMostActiveSeason({
          season: maxSeason,
          total: `${hours}h ${minutes}m`,
        });
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(" Error loading data file. تأكد من مكان ملف JSON.");
      });
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">
         When the User Listens the Most (Seasons)
      </h1>
      {mostActiveSeason ? (
        <p className="text-lg">
          The user listens the most during{" "}
          <span className="font-semibold text-blue-600">
            {mostActiveSeason.season}
          </span>{" "}
          with a total of{" "}
          <span className="font-semibold text-green-600">
            {mostActiveSeason.total}
          </span>{" "}
          of music played.
        </p>
      ) : (
        <p className="text-gray-500">Loading data...</p>
      )}
    </div>
  );
};

export default MostActiveSeason;
