import React from 'react'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#131313] text-white font-sans p-8 w-screen h-screen">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-green-400">About Us</h1>
          <p className="text-gray-400 text-lg">
            Welcome to our Spotify Analytics Dashboard. Discover your music habits, trends, and favorites
            in a beautifully designed interface.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#181818] border border-[#333] rounded-xl p-6 shadow-lg hover:shadow-green-500/30 transition-all">
            <h2 className="text-2xl font-semibold text-green-400 mb-3">Our Mission</h2>
            <p className="text-gray-300">
              To provide music lovers with deep insights into their listening habits through
              a sleek and interactive dashboard that turns data into stories.
            </p>
          </div>

          <div className="bg-[#181818] border border-[#333] rounded-xl p-6 shadow-lg hover:shadow-green-500/30 transition-all">
            <h2 className="text-2xl font-semibold text-green-400 mb-3">Our Vision</h2>
            <p className="text-gray-300">
              We envision a world where every music listener can understand their preferences,
              explore trends, and get inspired by the music they love most.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-green-400 text-center">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#181818] border border-[#333] rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold mb-4 text-lg">🎵</div>
              <h3 className="font-semibold text-white mb-2">Top Songs</h3>
              <p className="text-gray-300 text-sm">
                See your most played songs and discover hidden favorites over any time period.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#333] rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold mb-4 text-lg">📅</div>
              <h3 className="font-semibold text-white mb-2">Seasonal Trends</h3>
              <p className="text-gray-300 text-sm">
                Analyze your listening patterns across seasons and discover your music mood.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#333] rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold mb-4 text-lg">⚡</div>
              <h3 className="font-semibold text-white mb-2">Fast Insights</h3>
              <p className="text-gray-300 text-sm">
                Get instant analytics and summaries of your Spotify history without waiting.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#181818] border border-[#333] rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all">
          <h2 className="text-2xl font-semibold text-green-400 mb-3">Contact Us</h2>
          <p className="text-gray-300 mb-4">
            Have questions, feedback, or ideas? We’d love to hear from you!
          </p>
          <ul className="space-y-2 text-gray-400">
            <li>Email: <span className="text-green-400 font-semibold">support@spotifyanalytics.com</span></li>
            <li>Twitter: <span className="text-green-400 font-semibold">@SpotifyAnalytics</span></li>
            <li>Website: <span className="text-green-400 font-semibold">www.spotifyanalytics.com</span></li>
          </ul>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} Spotify Analytics Dashboard. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default AboutUs
