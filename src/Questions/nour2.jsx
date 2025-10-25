const calculateArtistPercentage = (data, artistName) => {
  // 1. Get Total Listening Time (in ms) for all users
  const totalMs = data.reduce((sum, record) => sum + record.ms_played, 0);

  if (totalMs === 0) return "0.00%";

  // 2. Filter and Aggregate the Artist's Listening Time (in ms)
  const artistMs = data
    .filter((record) => record.master_metadata_album_artist_name === artistName)
    .reduce((sum, record) => sum + record.ms_played, 0);

  // 3. Calculate Percentage: (Artist Time / Total Time) * 100
  const percentage = (artistMs / totalMs) * 100;

  return `${percentage.toFixed(2)}%`;
};

// Example usage:
// const travisScottPercent = calculateArtistPercentage(allListenData, "Travis Scott");
// console.log(travisScottPercent); // e.g., "1.70%"
export default calculateArtistPercentage;
