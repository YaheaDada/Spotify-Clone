import React, { useState, useEffect } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { CircularProgress } from "@mui/material";

const Mahmoud = () => {
  const [seasonData, setSeasonData] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("4weeks");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("seasons");

  const getSeason = (month) => {
    if (month >= 3 && month <= 5) return "Spring";
    if (month >= 6 && month <= 8) return "Summer";
    if (month >= 9 && month <= 11) return "Fall";
    return "Winter";
  };

  const filterByTimePeriod = (data, period) => {
    const latestDate = new Date(
      Math.max(...data.map((e) => new Date(e.ts).getTime()))
    );
    let cutoff;
    switch (period) {
      case "6months":
        cutoff = new Date(latestDate.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
        break;
      case "1year":
        cutoff = new Date(latestDate.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoff = new Date(latestDate.getTime() - 4 * 7 * 24 * 60 * 60 * 1000);
    }
    return data.filter((entry) => entry.ts && new Date(entry.ts) >= cutoff);
  };

  const getTopSongs = (data, period) => {
    const filtered = filterByTimePeriod(data, period);
    const stats = {};
    filtered.forEach((entry) => {
      if (!entry.master_metadata_track_name || !entry.ms_played) return;
      const key = `${entry.master_metadata_track_name} - ${entry.master_metadata_album_artist_name}`;
      if (!stats[key]) {
        stats[key] = {
          trackName: entry.master_metadata_track_name,
          artistName: entry.master_metadata_album_artist_name,
          albumName: entry.master_metadata_album_album_name || "Unknown",
          totalMs: 0,
          playCount: 0,
        };
      }
      stats[key].totalMs += entry.ms_played;
      stats[key].playCount++;
    });
    return Object.values(stats)
      .sort((a, b) => b.totalMs - a.totalMs)
      .slice(0, 100)
      .map((s, i) => ({
        ...s,
        rank: i + 1,
        totalHours: Math.round((s.totalMs / (1000 * 60 * 60)) * 100) / 100,
        totalMinutes: Math.round((s.totalMs / (1000 * 60)) * 100) / 100,
      }));
  };

  const analyzeListeningBySeason = (data) => {
    const stats = {
      Spring: { totalMs: 0, playCount: 0, tracks: new Set() },
      Summer: { totalMs: 0, playCount: 0, tracks: new Set() },
      Fall: { totalMs: 0, playCount: 0, tracks: new Set() },
      Winter: { totalMs: 0, playCount: 0, tracks: new Set() },
    };

    data.forEach((e) => {
      if (!e.ts || !e.ms_played) return;
      const month = new Date(e.ts).getMonth() + 1;
      const s = getSeason(month);
      stats[s].totalMs += e.ms_played;
      stats[s].playCount++;
      if (e.master_metadata_track_name)
        stats[s].tracks.add(e.master_metadata_track_name);
    });

    return Object.entries(stats)
      .map(([season, val]) => ({
        season,
        totalHours: Math.round((val.totalMs / (1000 * 60 * 60)) * 100) / 100,
        playCount: val.playCount,
        uniqueTracks: val.tracks.size,
        avgPlayTime: Math.round(val.totalMs / val.playCount / 1000),
      }))
      .sort((a, b) => b.totalHours - a.totalHours);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/spotify_data_history.json");
        const data = await res.json();
        setSeasonData(analyzeListeningBySeason(data));
        setTopSongs(getTopSongs(data, selectedPeriod));
      } catch (err) {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedPeriod]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white w-full h-full">
        <CircularProgress sx={{ color: "#8b00ff" }} />
        <span className="ml-4 text-lg text-gray-300">
          Loading Spotify data...
        </span>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className=" flex justify-center ">
      <div className="min-h-screen  text-white font-sans p-8  min-w-[1850px] ">
        <h1 className="text-4xl font-bold text-center text-[#8b00ff] mb-8">
          Spotify Listening Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#181818] rounded-lg border border-[#333] flex p-1">
            {["seasons", "topsongs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-[#8b00ff] text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "seasons" ? "📅 Seasons" : "🎵 Top Songs"}
              </button>
            ))}
          </div>
        </div>

        {/* SEASON TAB */}
        {activeTab === "seasons" && (
          <div className="space-y-10">
            <h2 className="text-2xl font-semibold text-[#8b00ff] text-center">
              Listening Time by Season
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {seasonData.map((s) => (
                <div
                  key={s.season}
                  className="bg-[#1e1e1e] border border-[#333] rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all"
                >
                  <div className="text-3xl mb-2">
                    {s.season === "Spring"
                      ? "🌸"
                      : s.season === "Summer"
                        ? "☀️"
                        : s.season === "Fall"
                          ? "🍂"
                          : "❄️"}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-[#8b00ff]">
                    {s.season}
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <p>
                      <span className="text-white font-semibold">
                        {s.totalHours}
                      </span>{" "}
                      hrs listened
                    </p>
                    <p>
                      <span className="text-white font-semibold">
                        {s.playCount}
                      </span>{" "}
                      plays
                    </p>
                    <p>
                      <span className="text-white font-semibold">
                        {s.uniqueTracks}
                      </span>{" "}
                      unique tracks
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
              <div className="bg-[#1e1e1e] rounded-xl border border-[#333] p-4">
                <h3 className="text-center text-[#8b00ff] font-semibold mb-2">
                  Hours by Season
                </h3>
                <BarChart
                  xAxis={[
                    {
                      data: seasonData.map((s) => s.season),
                      scaleType: "band",
                      tickLabelStyle: { fill: "#fff" },
                    },
                  ]}
                  series={[
                    {
                      data: seasonData.map((s) => s.totalHours),
                      color: "#1DB954",
                    },
                  ]}
                  height={300}
                  sx={{ ".MuiChartsAxis-tickLabel": { fill: "#fff" } }}
                />
              </div>

              <div className="bg-[#1e1e1e] rounded-xl border border-[#333] p-4">
                <h3 className="text-center text-[#8b00ff] font-semibold mb-2">
                  Play Count by Season
                </h3>
                <BarChart
                  xAxis={[
                    {
                      data: seasonData.map((s) => s.season),
                      scaleType: "band",
                      tickLabelStyle: { fill: "#fff" },
                    },
                  ]}
                  series={[
                    {
                      data: seasonData.map((s) => s.playCount),
                      color: "#3B82F6",
                    },
                  ]}
                  height={300}
                />
              </div>

              <div className="bg-[#1e1e1e] rounded-xl border border-[#333] p-4">
                <h3 className="text-center text-[#8b00ff] font-semibold mb-2">
                  Season Distribution
                </h3>
                <PieChart
                  series={[
                    {
                      data: seasonData.map((s, i) => ({
                        id: s.season,
                        value: s.totalHours,
                        label: s.season,
                        color: ["#1DB954", "#F59E0B", "#EF4444", "#3B82F6"][i],
                      })),
                    },
                  ]}
                  height={300}
                />
              </div>
            </div>
          </div>
        )}

        {/* TOP SONGS TAB */}
        {activeTab === "topsongs" && (
          <div className="mt-8">
            <h2 className="text-2xl text-[#8b00ff] text-center mb-6 font-semibold">
              Top 100 Songs ({selectedPeriod})
            </h2>

            <div className="flex justify-center mb-6">
              <div className="bg-[#181818] rounded-lg border border-[#333] flex p-1">
                {[
                  { key: "4weeks", label: "4 Weeks" },
                  { key: "6months", label: "6 Months" },
                  { key: "1year", label: "1 Year" },
                ].map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setSelectedPeriod(p.key)}
                    className={`px-4 py-2 rounded-md font-semibold transition-all ${
                      selectedPeriod === p.key
                        ? "bg-[#8b00ff] text-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Song list */}
            <div className="bg-[#181818] rounded-xl border border-[#333] overflow-hidden">
              <div className="max-h-[500px] overflow-y-auto divide-y divide-[#333]">
                {topSongs.map((song) => (
                  <div
                    key={song.rank}
                    className="flex items-center justify-between p-4 hover:bg-[#1c1c1c]"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-black font-bold ${
                          song.rank <= 3 ? "bg-[#8b00ff]" : "bg-[#333]"
                        }`}
                      >
                        {song.rank}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {song.trackName}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {song.artistName} • {song.albumName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div className="font-semibold text-white">
                        {song.totalHours >= 1
                          ? `${song.totalHours}h`
                          : `${song.totalMinutes}m`}
                      </div>
                      <div>{song.playCount} plays</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mahmoud;
