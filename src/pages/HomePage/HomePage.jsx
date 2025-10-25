import TopArtistsByPeriod from "../../Questions/masa/TopArtistsByPeriod";
import AverageListeningTime from "../../Questions/masa/AverageListeningTime";
import UniqueSongsCount from "../../Questions/masa/UniqueSongsCount";
import MostActiveSeason from "../../Questions/masa/MostActiveHour";

import React from "react";
import { BarChart, PieChart, Gauge } from "@mui/x-charts";
import Hero from "../../components/Hero";
import HeroSection from "../../components/Hero";

const HomePage = () => {
  const featuredPlaylists = [
    {
      id: 1,
      name: "Top Hits 2025",
      cover:
        "https://images.unsplash.com/photo-1761216466205-940be541402b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
    },
    {
      id: 2,
      name: "Chill Vibes",
      cover: "https://i.scdn.co/image/ab67706f0000000347f9a6ecfd4c2dc83f76f84a",
    },
    {
      id: 3,
      name: "Hip-Hop Heat",
      cover: "https://i.scdn.co/image/ab67706f00000003dc91d6c4df42c4b1f17658cf",
    },
    {
      id: 4,
      name: "Focus Beats",
      cover: "https://i.scdn.co/image/ab67706f0000000338b2dfad83097e4e8adf0d65",
    },
  ];

  const topArtists = [
    {
      id: 1,
      name: "Drake",
      img: "https://www.shutterstock.com/editorial/image-editorial/M6T5A304Nfz1Ie5eNTMwMjg=/drake-440nw-10389989k.jpg",
    },
    {
      id: 2,
      name: "Billie Eilish",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVATvs4V3nTPbcCep-ECSSrzkJgQTvE1H4ew&s",
    },
    {
      id: 3,
      name: "The Weeknd",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/95/The_Weeknd_Cannes_2023.png",
    },
    {
      id: 4,
      name: "Taylor Swift",
      img: "https://m.media-amazon.com/images/M/MV5BYWYwYzYzMjUtNWE0MS00NmJlLTljNGMtNzliYjg5NzQ1OWY5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
  ];

  const genrePlays = [
    { id: 0, value: 40, label: "Pop" },
    { id: 1, value: 25, label: "Hip-Hop" },
    { id: 2, value: 20, label: "Rock" },
    { id: 3, value: 15, label: "Indie" },
  ];

  const dailyStreams = [
    { day: "Mon", streams: 150 },
    { day: "Tue", streams: 190 },
    { day: "Wed", streams: 220 },
    { day: "Thu", streams: 260 },
    { day: "Fri", streams: 310 },
    { day: "Sat", streams: 280 },
    { day: "Sun", streams: 180 },
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-[#121212] to-[#181818] text-gray-100 p-9">
      <HeroSection />
      <div className="max-w-[1800px] mx-auto mb-12 flex flex-col md:flex-row justify-between items-center bg-[#1e1e1e] p-9 rounded-3xl shadow-lg border border-[#333]">
        <div>
          <h1 className="text-5xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-xl text-gray-400">Your daily music dashboard</p>
        </div>
        <div className="mt-6 md:mt-0">
          <button className="px-6 py-3 bg-[#1DB954] hover:bg-[#17a44c] text-black font-semibold rounded-full shadow">
            Explore Music
          </button>
        </div>
      </div>
      {/* Featured Playlists */}
      <div className="max-w-[1800px] mx-auto mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-amber-400">
          Featured Playlists
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredPlaylists.map((p) => (
            <div
              key={p.id}
              className="bg-[#1e1e1e] p-4 rounded-xl hover:bg-[#252525] transition-all border border-[#333] cursor-pointer"
            >
              <img
                src={p.cover}
                alt={p.name}
                className="rounded-xl mb-4 w-full h-48 object-cover"
              />
              <p className="text-lg text-gray-200 font-medium">{p.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Top Artists */}
      <div className="max-w-[1800px] mx-auto mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-amber-400">
          Top Artists
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {topArtists.map((artist) => (
            <div
              key={artist.id}
              className="flex flex-col items-center bg-[#1e1e1e] p-6 rounded-xl border border-[#333] hover:bg-[#252525] transition-all"
            >
              <img
                src={artist.img}
                alt={artist.name}
                className="w-32 h-32 rounded-full border-4 border-[#1DB954] mb-4 object-cover"
              />
              <p className="text-lg text-gray-200 font-medium">{artist.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Analytics Section */}
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-9">
        {/* Daily Streams */}
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333]">
          <h3 className="font-semibold mb-3 text-amber-400 text-center text-xl">
            Streams This Week
          </h3>
          <BarChart
            dataset={dailyStreams}
            xAxis={[{ dataKey: "day", scaleType: "band" }]}
            series={[
              { dataKey: "streams", label: "Streams", color: "#1DB954" },
            ]}
            width={480}
            height={300}
            sx={{
              ".MuiBarElement-root": { fillOpacity: 0.85 },
              ".MuiChartsAxis-tickLabel": { fill: "#aaa" },
              ".MuiChartsAxis-label": { fill: "#ccc" },
            }}
          />
        </div>

        {/* Genre Pie Chart */}
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333]">
          <h3 className="font-semibold mb-3 text-amber-400 text-center text-xl">
            Genre Distribution
          </h3>
          <PieChart
            series={[{ data: genrePlays }]}
            width={400}
            height={300}
            sx={{
              ".MuiPieElement-root": { fillOpacity: 0.85 },
              ".MuiChartsLegend-label": { fill: "#ccc" },
            }}
          />
        </div>

        {/* Average Listening Gauge */}
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333] text-center">
          <h3 className="font-semibold mb-3 text-amber-400 text-xl">
            Avg Listening Time
          </h3>
          <Gauge width={385} height={300} value={145} min={0} max={300} />
          <p className="mt-3 text-gray-300 text-xl">~2h 25m</p>
        </div>
        {/* !DATA */}
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333] ">
          <TopArtistsByPeriod />
        </div>
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333] md:col-span-2 min-h-[750px]">
          <AverageListeningTime />
        </div>

        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333] h-[750px] md:col-span-2">
          <MostActiveSeason />
        </div>
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333]">
          <UniqueSongsCount />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
