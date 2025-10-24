import React from "react";
import TopArtistsByPeriod from "../../Questions/masa/TopArtistsByPeriod";
import AverageListeningTime from "../../Questions/masa/AverageListeningTime";
import UniqueSongsCount from "../../Questions/masa/UniqueSongsCount";
import MostActiveSeason from "../../Questions/masa/MostActiveHour";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen ">
      <TopArtistsByPeriod />
      <AverageListeningTime />
      <MostActiveSeason />
      <UniqueSongsCount />
    </div>
  );
};

export default HomePage;
