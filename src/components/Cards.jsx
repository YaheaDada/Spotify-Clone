import React from "react";

const VibrantGradientCards = () => {
  const cards = [
    {
      title: "Total Listening Time",
      subtitle: "128h",
      gradient: "bg-gradient-to-r from-[#00FF88] via-[#00B8FF] to-[#8A2BE2]",
    },
    {
      title: "Top Genre",
      subtitle: "Electronic",
      gradient: "bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#FFD700]",
    },
    {
      title: "Top Artist",
      subtitle: "The Weeknd",
      gradient: "bg-gradient-to-r from-[#6A00FF] via-[#C400FF] to-[#FF007F]",
    },
    {
      title: "Top Song",
      subtitle: "Save Your Tears",
      gradient: "bg-gradient-to-r from-[#FF512F] to-[#DD2476]",
    },
    {
      title: "Daily Average",
      subtitle: "3h 45m",
      gradient: "bg-gradient-to-r from-[#00DBDE] to-[#FC00FF]",
    },
    {
      title: "Listening Streak",
      subtitle: "21 Days",
      gradient: "bg-gradient-to-r from-[#11998E] to-[#38EF7D]",
    },
    {
      title: "Unique Tracks",
      subtitle: "428",
      gradient: "bg-gradient-to-r from-[#FC466B] to-[#3F5EFB]",
    },
    {
      title: "Most Played Album",
      subtitle: "After Hours",
      gradient: "bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]",
    },
    {
      title: "Weekly Growth",
      subtitle: "+12%",
      gradient: "bg-gradient-to-r from-[#FF416C] to-[#FF4B2B]",
    },
    {
      title: "Monthly Growth",
      subtitle: "+32%",
      gradient: "bg-gradient-to-r from-[#F7971E] to-[#FFD200]",
    },
    {
      title: "Late Night Sessions",
      subtitle: "40h",
      gradient: "bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]",
    },
    {
      title: "Morning Vibes",
      subtitle: "68h",
      gradient: "bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FFD1FF]",
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="  p-10 text-white font-sans min-w-[1800px]">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6A00FF] via-[#C400FF] to-[#FF007F] mb-10 text-center">
          Your Music Insights
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.gradient} rounded-2xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-[#8b00ff]`}
            >
              <div className="backdrop-blur-sm bg-black/20 p-4 rounded-xl">
                <h2 className="text-2xl font-bold mb-2 drop-shadow-md">
                  {card.title}
                </h2>
                <p className="text-xl font-semibold opacity-90">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VibrantGradientCards;
