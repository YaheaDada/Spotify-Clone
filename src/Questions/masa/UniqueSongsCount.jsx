import React, { useEffect, useState } from "react";

const UniqueSongsCount = () => {
  const [uniqueCount, setUniqueCount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    
    const dataPath = "/spotify_data_history.json";

    fetch(dataPath)
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
        setError(" Error loading data file.");
      });
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">
         How Many Different Songs Were Played
      </h1>
      {uniqueCount !== null ? (
        <p className="text-lg">
          The user listened to{" "}
          <span className="font-semibold text-blue-600">{uniqueCount}</span>{" "}
          different unique songs.
        </p>
      ) : (
        <p className="text-gray-500">Loading data...</p>
      )}
    </div>
  );
};

export default UniqueSongsCount;
