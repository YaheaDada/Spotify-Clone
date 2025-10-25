import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const celebrities = [
  {
    name: "Taylor Swift",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWYwYzYzMjUtNWE0MS00NmJlLTljNGMtNzliYjg5NzQ1OWY5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    name: "Drake",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/The_Weeknd_Cannes_2023.png",
  },
  {
    name: "Beyoncé",
    image:
      "https://www.shutterstock.com/editorial/image-editorial/M6T5A304Nfz1Ie5eNTMwMjg=/drake-440nw-10389989k.jpg",
  },
  {
    name: "The Weeknd",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVATvs4V3nTPbcCep-ECSSrzkJgQTvE1H4ew&s",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % celebrities.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center w-full p-4">
      <section className="relative bg-gradient-to-r from-[#6A00FF] via-[#C400FF] to-[#FF007F] text-white py-20 px-6 md:px-20 rounded-2xl mb-[35px] w-[1800px] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Text */}
          <div className="md:w-1/2 mb-10 md:mb-0 z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Music from Your Favorite Celebrities
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Stream, explore, and get closer to the stars you love. Your
              ultimate music experience starts here.
            </p>
            <button className="bg-white text-[#6A00FF] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
              Start Listening
            </button>
          </div>

          {/* Right Image (pushed to end) */}
          <div className="md:w-1/2 flex justify-end items-center relative h-[350px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={celebrities[index].image}
                src={celebrities[index].image}
                alt=""
                className="rounded-2xl shadow-2xl w-[500px] h-[500px] object-cover"
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
