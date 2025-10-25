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

  // Dummy data for charts
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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 w-screen">
      {/* Profile Header */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-amber-400 mb-4 md:mb-0 md:mr-6"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-400 mb-1">{user.email}</p>
          <p className="text-gray-400">{user.phone}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Average Listening Time Gauge */}
        <div className="bg-gray-800 p-6 rounded-xl shadow text-center items-center  ">
          <h3 className="font-semibold mb-2 text-amber-400">
            Avg Listening Time
          </h3>
          <Gauge
            width={200}
            height={200}
            value={135} // minutes
            min={0}
            max={300}
          />
          <p className="mt-2 text-gray-300">~2h 15m</p>
        </div>

        {/* Monthly Plays Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-amber-400 text-center">
            Monthly Plays
          </h3>
          <BarChart
            dataset={monthlyPlays}
            yAxis={[{ dataKey: "month", scaleType: "band" }]}
            series={[{ dataKey: "plays", label: "Plays" }]}
            layout="horizontal"
            height={250}
          />
        </div>

        {/* Unique Songs Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-amber-400 text-center">
            Unique Songs by Genre
          </h3>
          <PieChart series={[{ data: uniqueSongs }]} width={250} height={250} />
        </div>

        {/* Optional: Placeholder for future chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow text-center text-gray-400">
          <h3 className="font-semibold mb-2 text-amber-400">
            Most Active Period
          </h3>
          <p>Evenings (6pm-10pm)</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
