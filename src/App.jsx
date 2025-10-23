import React from "react";
import Sidebar from "./components/Sidebar"; // make sure this path is correct
import { BarChart } from "@mui/x-charts";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <HomePage />
    </div>
  );
}

export default App;
