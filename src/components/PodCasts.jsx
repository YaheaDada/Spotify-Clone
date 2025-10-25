import React from "react";
import { motion } from "framer-motion";

const podcasts = [
  {
    id: 1,
    title: "The Daily Drive",
    host: "Spotify Studios",
    cover: "https://i.scdn.co/image/ab67656300005f1ffed98c4fdc504416141e9409",
  },
  {
    id: 2,
    title: "TechTalk Weekly",
    host: "Alex Johnson",
    cover: "https://i.scdn.co/image/ab67656300005f1f371369a614b8505e9fcdc62c",
  },
  {
    id: 3,
    title: "Mindset Mastery",
    host: "Dr. Emily Wong",
    cover: "https://i.scdn.co/image/ab67656300005f1faee1957f2176b367c36be8e6",
  },
  {
    id: 4,
    title: "Crime Files",
    host: "Dark Audio",
    cover: "https://i.scdn.co/image/ab67656300005f1f89d6c02cb5331a8099fbee68",
  },
  {
    id: 5,
    title: "Startup Stories",
    host: "Lena Ruiz",
    cover: "https://i.scdn.co/image/ab67656300005f1f2ca1d2f0cf980151118460fe",
  },
  {
    id: 5,
    title: "Startup Stories",
    host: "Lena Ruiz",
    cover: "https://pbcdn1.podbean.com/imglogo/image-logo/17600528/CYE_COVER_w_bug_vax2aa_300x300.jpeg",
  },
  {
    id: 5,
    title: "Startup Stories",
    host: "Lena Ruiz",
    cover: "https://pbcdn1.podbean.com/imglogo/image-logo/19569935/SHORT_FLIM_PODCAST78nvg_300x300.jpg",
  },
];

const PodcastsSection = () => {
  return (
    <div className="w-full p-9 text-gray-100 mb-3">
      <div className="max-w-[1800px] mx-auto bg-[#1e1e1e] p-9 rounded-3xl shadow-lg border border-[#333]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#8b00ff]">
             Popular Podcasts
          </h2>
          <button className="text-gray-400 hover:text-[#8b00ff] transition-colors text-lg underline cursor-pointer">
            See all
          </button>
        </div>

        {/* Podcast cards */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-3 cursor-pointer">
          {podcasts.map((podcast) => (
            <motion.div
              key={podcast.id}
              whileHover={{ scale: 1.05 }}
              className="min-w-[220px] bg-[#181818] hover:bg-[#222] border border-[#333] rounded-2xl overflow-hidden transition-all duration-200 shadow-md"
            >
              <div className="relative">
                <img
                  src={podcast.cover}
                  alt={podcast.title}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute bottom-3 right-3 bg-[#8b00ff] text-black p-3 rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white truncate">
                  {podcast.title}
                </h3>
                <p className="text-sm text-gray-400">{podcast.host}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastsSection;
