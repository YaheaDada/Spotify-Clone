import React, { useState } from "react";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-b from-[#121212] to-[#181818] text-white p-6">
      <div className="relative w-full max-w-md">
        {/* Soft animated gradient background */}
        <div className="absolute inset-0 bg-linear-to-r from-[#1DB954] to-[#1E90FF] opacity-20 animate-pulse rounded-xl"></div>

        {/* Login card */}
        <div className="relative bg-[#1e1e1e]/90 backdrop-blur-sm p-12 rounded-3xl shadow-lg border border-[#333]">
          {/* Toggle buttons */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsSignIn(true)}
              className={`px-6 py-3 rounded-l-xl font-semibold transition-colors ${
                isSignIn
                  ? "bg-[#1DB954] text-white"
                  : "bg-[#1e1e1e]/50 text-gray-300 hover:bg-[#2a2a2a]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`px-6 py-3 rounded-r-xl font-semibold transition-colors ${
                !isSignIn
                  ? "bg-[#1DB954] text-white"
                  : "bg-[#1e1e1e]/50 text-gray-300 hover:bg-[#2a2a2a]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          <div className="space-y-4">
            {isSignIn ? (
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 rounded-xl bg-[#1e1e1e]/50 border border-[#333] text-white focus:outline-none focus:border-[#1DB954] transition-colors"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-xl bg-[#1e1e1e]/50 border border-[#333] text-white focus:outline-none focus:border-[#1DB954] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-[#1DB954] p-3 rounded-xl font-semibold hover:bg-[#1ED760] transition-colors"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 rounded-xl bg-[#1e1e1e]/50 border border-[#333] text-white focus:outline-none focus:border-[#1DB954] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-xl bg-[#1e1e1e]/50 border border-[#333] text-white focus:outline-none focus:border-[#1DB954] transition-colors"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-xl bg-[#1e1e1e]/50 border border-[#333] text-white focus:outline-none focus:border-[#1DB954] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-[#1DB954] p-3 rounded-xl font-semibold hover:bg-[#1ED760] transition-colors"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
