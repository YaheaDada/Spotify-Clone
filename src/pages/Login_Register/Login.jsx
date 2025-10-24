import React, { useState } from "react";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className=" bg-[#271D52] flex items-center justify-center h-screen w-screen">
      <div className="relative w-full max-w-md border-1 border-[#49BFE3] ">
        <div className="  absolute inset-0 bg-gradient-to-r from-[#49BFE3] to-[#5E60CF] opacity-20 animate-pulse "></div>
        <div className="relative bg-[#271D52]/80 backdrop-blur-sm p-12 rounded-lg shadow-lg border-1 border-[#49BFE3]">
          <div className="space-y-6">
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setIsSignIn(true)}
                className={`px-4 py-2 rounded-l ${
                  isSignIn ? "bg-[#5E60CF]" : "bg-[#271D52]/50"
                } text-white`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`px-4 py-2 rounded-r ${
                  !isSignIn ? "bg-[#5E60CF]" : "bg-[#271D52]/50"
                } text-white`}
              >
                Sign Up
              </button>
            </div>
            {isSignIn ? (
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 rounded bg-[#271D52]/50 text-white border border-[#49BFE3]/30 focus:outline-none focus:border-[#5E60CF]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded bg-[#271D52]/50 text-white border border-[#49BFE3]/30 focus:outline-none focus:border-[#5E60CF]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#5E60CF] text-white p-3 rounded hover:bg-[#49BFE3] transition-colors"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 rounded bg-[#271D52]/50 text-white border border-[#49BFE3]/30 focus:outline-none focus:border-[#5E60CF]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded bg-[#271D52]/50 text-white border border-[#49BFE3]/30 focus:outline-none focus:border-[#5E60CF]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded bg-[#271D52]/50 text-white border border-[#49BFE3]/30 focus:outline-none focus:border-[#5E60CF]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#5E60CF] text-white p-3 rounded hover:bg-[#49BFE3] transition-colors"
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
