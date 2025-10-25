import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TopArtistsByPeriod = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("year");
  const [artists, setArtists] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/spotify_data_history.json")
      .then((res) => res.json())
      .then((json) => {
        const arr = Array.isArray(json) ? json : [json];
        setData(arr);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const now = new Date();
    let cutoff = new Date(now);

    if (period === "year") cutoff.setFullYear(now.getFullYear() - 1);
    else if (period === "sixMonths") cutoff.setMonth(now.getMonth() - 6);
    else if (period === "fourWeeks") cutoff.setDate(now.getDate() - 28);

    let filtered = data.filter((item) => new Date(item.ts) >= cutoff);
    if (filtered.length === 0) filtered = data;

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

  const visibleArtists = showAll ? artists : artists.slice(0, 10);

  return (
    <div className="text-white p-6 w-full">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-2">
           Top Artists by Listening Time
        </h1>

        <div className="mb-6 flex items-center gap-3">
          <label className="text-gray-300">Filter by period:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="year">Last Year</option>
            <option value="sixMonths">Last 6 Months</option>
            <option value="fourWeeks">Last 4 Weeks</option>
          </select>
        </div>

        <ul className="space-y-2">
          <AnimatePresence>
            {visibleArtists.map((artist, index) => (
              <motion.li
                key={artist.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className=" bg-[#131313] p-4 rounded-xl flex justify-between items-center shadow-sm border border-transparent hover:border-green-400/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-bold w-6 text-right">
                    #{index + 1}
                  </span>
                  <span className="font-medium text-lg">{artist.name}</span>
                </div>
                <span className="text-green-400 font-semibold">
                  {artist.hours.toFixed(2)}h
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {artists.length > 10 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-5 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full transition-all duration-200 shadow-md"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopArtistsByPeriod;
