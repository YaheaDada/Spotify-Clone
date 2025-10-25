import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0c0c0c] border-t border-[#222] text-gray-400 py-10 mt-16">
      <div className="w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            {/* Simple Spotify-style icon */}
            <div className="bg-green-400 rounded-full w-8 h-8 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 
                12-5.37 12-12S18.63 0 12 0zm5.2 17.45a.749.749 0 0 1-1.04.24c-2.83-1.73-6.4-2.12-10.61-1.12a.748.748 0 1 1-.34-1.46c4.54-1.07 8.44-.63 11.56 1.3a.75.75 0 0 1 .33 1.04zm1.48-3.09a.937.937 0 0 1-1.29.3c-3.24-2-8.19-2.59-12.02-1.37a.936.936 0 0 1-.53-1.79c4.22-1.25 9.66-.59 13.32 1.63.43.26.57.82.3 1.23zm.12-3.35c-3.73-2.22-9.94-2.43-13.52-1.29a1.12 1.12 0 1 1-.64-2.14c4.02-1.2 10.01-.96 14.25 1.56a1.12 1.12 0 1 1-1.09 1.87z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">SoundSpace</h2>
          </div>
          <p className="text-sm text-gray-500">
            Discover, listen, and grow your audio world.  
            Explore trending podcasts and your favorite shows — all in one place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Explore</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#8b00ff] transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#8b00ff] transition-colors">
                Podcasts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#8b00ff] transition-colors">
                Charts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#8b00ff] transition-colors">
                New Releases
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#8b00ff] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#8b00ff] transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#8b00ff] transition-colors">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#8b00ff] transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex items-center gap-5">
            {/* Twitter */}
            <a
              href="#"
              className="hover:text-[#8b00ff] transition-transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M24 4.56a9.83 9.83 0 0 1-2.83.78 4.94 4.94 0 0 0 2.16-2.72 
                9.86 9.86 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.39 4.48A13.95 13.95 0 0 1 
                1.67 3.15a4.92 4.92 0 0 0 1.52 6.56A4.9 4.9 0 0 1 .96 9.1v.06a4.93 
                4.93 0 0 0 3.95 4.82 4.93 4.93 0 0 1-2.21.08 4.93 4.93 0 0 0 
                4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.9 13.9 0 0 0 7.55 2.21c9.05 
                0 14-7.5 14-14 0-.21 0-.42-.02-.63A9.99 9.99 0 0 0 24 4.56z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="hover:text-[#8b00ff] transition-transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 
                5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 
                16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 2A3.75 
                3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 
                20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 
                3.75 0 0 0 16.25 4h-8.5zM12 7a5 5 0 1 1 0 
                10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 
                0 0-6zm4.5-.25a1 1 0 1 1 0-2 1 1 0 0 1 0 
                2z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="#"
              className="hover:text-[#8b00ff] transition-transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 0C5.37 0 0 5.4 0 12.07c0 5.34 
                  3.44 9.86 8.2 11.46.6.12.82-.26.82-.58 
                  0-.28-.01-1.03-.02-2.02-3.34.74-4.04-1.63-4.04-1.63-.55-1.4-1.35-1.78-1.35-1.78-1.1-.76.08-.74.08-.74 
                  1.22.09 1.87 1.27 1.87 1.27 1.08 1.88 2.83 
                  1.34 3.52 1.03.11-.8.42-1.34.76-1.65-2.67-.31-5.47-1.37-5.47-6.11 
                  0-1.35.47-2.45 1.25-3.31-.13-.31-.54-1.56.12-3.25 
                  0 0 1.01-.33 3.3 1.26a11.34 11.34 0 0 1 6 0c2.3-1.59 
                  3.3-1.26 3.3-1.26.66 1.69.25 2.94.12 
                  3.25.78.86 1.25 1.96 1.25 3.31 0 4.75-2.8 
                  5.79-5.48 6.1.43.37.82 1.1.82 2.23 0 
                  1.61-.02 2.91-.02 3.3 0 .32.22.71.83.58C20.57 
                  21.92 24 17.4 24 12.07 24 5.4 18.63 0 12 0z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#222] mt-10 pt-6 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#8b00ff]">SoundSpace</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
