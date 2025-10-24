import React from "react";
import Sidebar from "./components/Sidebar"; // make sure this path is correct
import "./index.css";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login_Register/Login";
import { Link, Route, Routes } from "react-router-dom";
import TopArtists from "./Questions/masa/TopArtistsByPeriod";
import TopArtistsByPeriod from "./Questions/masa/TopArtistsByPeriod";
import AverageListeningTime from "./Questions/masa/AverageListeningTime";
import MostActiveHour from "./Questions/masa/MostActiveHour";
import UniqueSongsCount from "./Questions/masa/UniqueSongsCount";
function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Register" element={<Login />} />
      </Routes>
      <TopArtistsByPeriod />
      <AverageListeningTime />
      <MostActiveHour />
      <UniqueSongsCount />
    </div>
  );
}

export default App;
