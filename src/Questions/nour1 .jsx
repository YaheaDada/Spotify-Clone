const calculateTotalListeningTime = (data) => {
  // 1. Aggregate: Sum all ms_played values
  const totalMs = data.reduce((sum, record) => sum + record.ms_played, 0);

  // 2. Convert: ms to total minutes
  const totalMinutes = totalMs / (1000 * 60);

  // Convert to hours and minutes for better display
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  if (hours > 0) {
    return `${hours} hours and ${minutes} minutes`;
  }
  return `${Math.round(totalMinutes)} minutes`;
};

// Example usage:
// const timeDisplay = calculateTotalListeningTime(allListenData);
// console.log(timeDisplay);
export default calculateTotalListeningTime;
