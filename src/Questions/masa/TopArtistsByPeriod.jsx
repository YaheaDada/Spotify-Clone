import React, { useEffect, useState } from "react";

const TopArtistsByPeriod = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("year");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("/spotify_data_history.json")
      .then((res) => res.json())
      .then((json) => {
        console.log("Loaded JSON:", json); 
        setData(json);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const now = new Date();
    const cutoff = new Date();
    if (period === "year") cutoff.setFullYear(now.getFullYear() - 1);
    else if (period === "sixMonths") cutoff.setMonth(now.getMonth() - 6);
    else if (period === "fourWeeks") cutoff.setDate(now.getDate() - 28);

    const filtered = data.filter((item) => new Date(item.ts) >= cutoff);

    const artistMap = {};
    filtered.forEach((item) => {
      const artist = item.master_metadata_album_artist_name;
      const ms = item.ms_played || 0;
      if (artist) {
        artistMap[artist] = (artistMap[artist] || 0) + ms;
      }
    });

    const sorted = Object.entries(artistMap)
      .map(([name, ms]) => ({
        name,
        hours: ms / 1000 / 60 / 60,
      }))
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 100);

    setArtists(sorted);
  }, [data, period]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🎧 Top Artists by Listening Time</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Filter by period: </label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{
            padding: "6px",
            marginLeft: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="year">Last Year</option>
          <option value="sixMonths">Last 6 Months</option>
          <option value="fourWeeks">Last 4 Weeks</option>
        </select>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {artists.map((artist, index) => (
          <li
            key={index}
            style={{
              background: "#f9f9f9",
              padding: "10px",
              marginBottom: "6px",
              borderRadius: "6px",
            }}
          >
            <strong>#{index + 1}</strong> {artist.name} —{" "}
            <span style={{ color: "#555" }}>
              {artist.hours.toFixed(2)} hours
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopArtistsByPeriod;