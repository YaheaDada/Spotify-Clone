import React from "react";
import { BarChart, Gauge, PieChart } from "@mui/x-charts";

const Profile = () => {
  const user = {
    firstName: "Yaya",
    lastName: "Dada",
    email: "yaya@example.com",
    phone: "+31 123 456 789",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const monthlyPlays = [
    { month: "Jan", plays: 120 },
    { month: "Feb", plays: 90 },
    { month: "Mar", plays: 150 },
    { month: "Apr", plays: 200 },
    { month: "May", plays: 180 },
  ];

  const uniqueSongs = [
    { id: 0, value: 40, label: "Pop" },
    { id: 1, value: 25, label: "Rock" },
    { id: 2, value: 35, label: "Hip-Hop" },
  ];

  return (
    <div className="min-h-screen w-screen p-9 bg-gradient-to-b from-[#121212] to-[#181818] text-gray-100">
      {/* Profile Header */}
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center bg-[#1e1e1e] p-9 rounded-3xl shadow-lg border border-[#333] mb-12">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-48 h-48 rounded-full border-4 border-amber-400 mb-6 md:mb-0 md:mr-12"
        />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-6xl font-bold mb-3 text-white">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-400 mb-2 text-2xl">{user.email}</p>
          <p className="text-gray-400 text-2xl">{user.phone}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-9">
        {/* Average Listening Time Gauge */}
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333] text-center">
          <h3 className="font-semibold mb-3 text-amber-400 text-xl">
            Avg Listening Time
          </h3>
          <Gauge
            width={385}
            height={300}
            value={135} 
            min={0}
            max={300}
          />
          <p className="mt-3 text-gray-300 text-xl">~2h 15m</p>
        </div>

        {/* Monthly Plays Bar Chart */}
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333]">
          <h3 className="font-semibold mb-3 text-amber-400 text-center text-xl">
            Monthly Plays
          </h3>
          <BarChart
            dataset={monthlyPlays}
            yAxis={[{ dataKey: "month", scaleType: "band" }]}
            series={[{ dataKey: "plays", label: "Plays", color: "#1DB954" }]}
            layout="horizontal"
            width={552}
            height={375}
            sx={{
              ".MuiBarElement-root": { fillOpacity: 0.85 },
              ".MuiChartsAxis-tickLabel": { fill: "#aaa" },
              ".MuiChartsAxis-label": { fill: "#ccc" },
            }}
          />
        </div>

        {/* Unique Songs Pie Chart */}
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333]">
          <h3 className="font-semibold mb-3 text-amber-400 text-center text-xl">
            Unique Songs by Genre
          </h3>
          <PieChart
            series={[{ data: uniqueSongs, color: "#05df72" }]}
            width={442}
            height={375}
            sx={{
              ".MuiPieElement-root": { fillOpacity: 0.85 },
              ".MuiChartsLegend-label": { fill: "#ccc" },
            }}
          />
        </div>

        {/* Placeholder */}
        <div className="bg-[#1e1e1e] p-9 rounded-xl shadow border border-[#333] text-center text-gray-400">
          <h3 className="font-semibold mb-3 text-amber-400 text-xl">
            Most Active Period
          </h3>
          <p className="text-xl">Evenings (6pm-10pm)</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
