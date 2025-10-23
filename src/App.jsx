import { useState } from "react";

import "./App.css";
import { BarChart } from "@mui/x-charts/BarChart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1> Yahiea </h1>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
          },
        ]}
        series={[
          {
            data: [9, 7, 8],
          },
        ]}
        height={300}
      />
    </>
  );
}

export default App;
