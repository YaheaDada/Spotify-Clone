import React, { useState, useEffect } from 'react'
import { BarChart, LineChart, PieChart } from '@mui/x-charts'
import { Card, CardContent, Typography, Box } from '@mui/material'

const Mahmoud = () => {
  const [seasonData, setSeasonData] = useState([])
  const [topSongs, setTopSongs] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState('4weeks')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('seasons') // 'seasons' or 'topsongs'
  const [rawData, setRawData] = useState([]) // Store original data for JSON export

  // Function to determine season from month
  const getSeason = (month) => {
    if (month >= 3 && month <= 5) return 'Spring'
    if (month >= 6 && month <= 8) return 'Summer'
    if (month >= 9 && month <= 11) return 'Fall'
    return 'Winter'
  }

  // Function to filter data by time period
  const filterByTimePeriod = (data, period) => {
    // Find the latest date in the data
    const latestDate = new Date(Math.max(...data.map(entry => new Date(entry.ts).getTime())))
    let cutoffDate

    switch (period) {
      case '4weeks':
        cutoffDate = new Date(latestDate.getTime() - (4 * 7 * 24 * 60 * 60 * 1000))
        break
      case '6months':
        cutoffDate = new Date(latestDate.getTime() - (6 * 30 * 24 * 60 * 60 * 1000))
        break
      case '1year':
        cutoffDate = new Date(latestDate.getTime() - (365 * 24 * 60 * 60 * 1000))
        break
      default:
        cutoffDate = new Date(latestDate.getTime() - (4 * 7 * 24 * 60 * 60 * 1000))
    }

    const filtered = data.filter(entry => {
      if (!entry.ts) return false
      const entryDate = new Date(entry.ts)
      return entryDate >= cutoffDate
    })
    
    return filtered
  }

  // Function to get top songs by ms played
  const getTopSongs = (data, period) => {
    const filteredData = filterByTimePeriod(data, period)
    const songStats = {}

    filteredData.forEach(entry => {
      if (entry.master_metadata_track_name && entry.master_metadata_album_artist_name && entry.ms_played) {
        const key = `${entry.master_metadata_track_name} - ${entry.master_metadata_album_artist_name}`
        
        if (!songStats[key]) {
          songStats[key] = {
            trackName: entry.master_metadata_track_name,
            artistName: entry.master_metadata_album_artist_name,
            albumName: entry.master_metadata_album_album_name || 'Unknown Album',
            totalMs: 0,
            playCount: 0
          }
        }
        
        songStats[key].totalMs += entry.ms_played
        songStats[key].playCount += 1
      }
    })

    return Object.values(songStats)
      .sort((a, b) => b.totalMs - a.totalMs)
      .slice(0, 100)
      .map((song, index) => ({
        ...song,
        rank: index + 1,
        totalMinutes: Math.round((song.totalMs / (1000 * 60)) * 100) / 100,
        totalHours: Math.round((song.totalMs / (1000 * 60 * 60)) * 100) / 100
      }))
  }

  // Function to analyze listening patterns by season
  const analyzeListeningBySeason = (data) => {
    const seasonStats = {
      Spring: { totalMs: 0, playCount: 0, tracks: new Set() },
      Summer: { totalMs: 0, playCount: 0, tracks: new Set() },
      Fall: { totalMs: 0, playCount: 0, tracks: new Set() },
      Winter: { totalMs: 0, playCount: 0, tracks: new Set() }
    }

    data.forEach(entry => {
      if (entry.ts && entry.ms_played) {
        const date = new Date(entry.ts)
        const month = date.getMonth() + 1 // getMonth() returns 0-11, so add 1
        const season = getSeason(month)
        
        seasonStats[season].totalMs += entry.ms_played
        seasonStats[season].playCount += 1
        
        if (entry.master_metadata_track_name) {
          seasonStats[season].tracks.add(entry.master_metadata_track_name)
        }
      }
    })

    // Convert to array and calculate hours
    return Object.entries(seasonStats).map(([season, stats]) => ({
      season,
      totalHours: Math.round((stats.totalMs / (1000 * 60 * 60)) * 100) / 100,
      playCount: stats.playCount,
      uniqueTracks: stats.tracks.size,
      avgPlayTime: Math.round((stats.totalMs / stats.playCount) / 1000) // in seconds
    })).sort((a, b) => b.totalHours - a.totalHours)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/spotify_data_history.json')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        const analyzedData = analyzeListeningBySeason(data)
        const topSongsData = getTopSongs(data, selectedPeriod)
        setSeasonData(analyzedData)
        setTopSongs(topSongsData)
        setRawData(data) // Store raw data for JSON export
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedPeriod])

  // Function to export top songs as JSON
  const exportTopSongsAsJSON = () => {
    const exportData = {
      exportInfo: {
        timestamp: new Date().toISOString(),
        period: selectedPeriod,
        periodLabel: selectedPeriod === '4weeks' ? 'Last 4 Weeks' : 
                    selectedPeriod === '6months' ? 'Last 6 Months' : 'Last Year',
        totalSongs: topSongs.length
      },
      topSongs: topSongs.map(song => ({
        rank: song.rank,
        trackName: song.trackName,
        artistName: song.artistName,
        albumName: song.albumName,
        totalMs: song.totalMs,
        totalMinutes: song.totalMinutes,
        totalHours: song.totalHours,
        playCount: song.playCount
      }))
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `top-songs-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Function to export seasonal data as JSON
  const exportSeasonalDataAsJSON = () => {
    const exportData = {
      exportInfo: {
        timestamp: new Date().toISOString(),
        analysisType: 'Seasonal Listening Patterns',
        totalSeasons: seasonData.length
      },
      seasonalData: seasonData.map(season => ({
        season: season.season,
        totalHours: season.totalHours,
        playCount: season.playCount,
        uniqueTracks: season.uniqueTracks,
        avgPlayTime: season.avgPlayTime
      }))
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `seasonal-analysis-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Update top songs when period changes
  useEffect(() => {
    if (topSongs.length > 0) {
      // Re-fetch data when period changes
      const fetchTopSongs = async () => {
        try {
          const response = await fetch('/spotify_data_history.json')
          if (response.ok) {
            const data = await response.json()
            const topSongsData = getTopSongs(data, selectedPeriod)
            setTopSongs(topSongsData)
          }
        } catch (err) {
          console.error('Error updating top songs:', err)
        }
      }
      fetchTopSongs()
    }
  }, [selectedPeriod])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading your listening data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Your Music Analytics Dashboard
        </h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('seasons')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'seasons'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📅 Seasonal Analysis
            </button>
            <button
              onClick={() => setActiveTab('topsongs')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'topsongs'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🎵 Top Songs
            </button>
          </div>
        </div>

        {/* Seasons Tab Content */}
        {activeTab === 'seasons' && (
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Your Music Listening Patterns by Season
            </h2>
        
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {seasonData.map((season, index) => (
                <div 
                  key={season.season}
                  className={`bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 ${
                    index === 0 ? 'ring-4 ring-yellow-400' : ''
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-3xl mb-2 ${
                      season.season === 'Spring' ? 'text-green-500' :
                      season.season === 'Summer' ? 'text-yellow-500' :
                      season.season === 'Fall' ? 'text-orange-500' : 'text-blue-500'
                    }`}>
                      {season.season === 'Spring' ? '🌸' :
                       season.season === 'Summer' ? '☀️' :
                       season.season === 'Fall' ? '🍂' : '❄️'}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {season.season}
                      {index === 0 && <span className="text-yellow-500 ml-2">👑</span>}
                    </h2>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="text-sm text-gray-600">Total Listening Time</div>
                        <div className="text-xl font-bold text-gray-800">
                          {season.totalHours} hours
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="text-sm text-gray-600">Songs Played</div>
                        <div className="text-xl font-bold text-gray-800">
                          {season.playCount.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="text-sm text-gray-600">Unique Tracks</div>
                        <div className="text-xl font-bold text-gray-800">
                          {season.uniqueTracks.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="text-sm text-gray-600">Avg. Play Time</div>
                        <div className="text-xl font-bold text-gray-800">
                          {Math.floor(season.avgPlayTime / 60)}:{(season.avgPlayTime % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        
            {/* Charts Section */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Seasonal Hours Chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  📊 Listening Hours by Season
                </h3>
                {seasonData.length > 0 && (
                  <BarChart
                    xAxis={[{
                      scaleType: 'band',
                      data: seasonData.map(s => s.season),
                    }]}
                    series={[{
                      data: seasonData.map(s => s.totalHours),
                      color: '#10B981',
                    }]}
                    height={300}
                  />
                )}
              </div>

              {/* Seasonal Play Count Chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  🎵 Songs Played by Season
                </h3>
                {seasonData.length > 0 && (
                  <BarChart
                    xAxis={[{
                      scaleType: 'band',
                      data: seasonData.map(s => s.season),
                    }]}
                    series={[{
                      data: seasonData.map(s => s.playCount),
                      color: '#3B82F6',
                    }]}
                    height={300}
                  />
                )}
              </div>

              {/* Seasonal Distribution Pie Chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  🥧 Seasonal Distribution
                </h3>
                {seasonData.length > 0 && (
                  <PieChart
                    series={[{
                      data: seasonData.map((s, index) => ({
                        id: s.season,
                        value: s.totalHours,
                        label: s.season,
                        color: ['#10B981', '#F59E0B', '#EF4444', '#3B82F6'][index]
                      })),
                    }]}
                    height={300}
                  />
                )}
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  📊 Summary
                </h3>
                {seasonData.length > 0 && (
                  <button
                    onClick={exportSeasonalDataAsJSON}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Export JSON</span>
                  </button>
                )}
              </div>
              <div className="text-center text-gray-600">
                <p className="text-lg">
                  You listen to music most during <span className="font-bold text-green-600">
                    {seasonData[0]?.season}
                  </span> with {seasonData[0]?.totalHours} hours of listening time!
                </p>
                <p className="mt-2">
                  Total across all seasons: {seasonData.reduce((sum, season) => sum + season.totalHours, 0).toFixed(1)} hours
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top Songs Tab Content */}
        {activeTab === 'topsongs' && (
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Top 100 Songs by Play Time
            </h2>
            
            {/* Time Period Selector */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-lg">
                <button
                  onClick={() => setSelectedPeriod('4weeks')}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${
                    selectedPeriod === '4weeks'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Last 4 Weeks
                </button>
                <button
                  onClick={() => setSelectedPeriod('6months')}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${
                    selectedPeriod === '6months'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Last 6 Months
                </button>
                <button
                  onClick={() => setSelectedPeriod('1year')}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${
                    selectedPeriod === '1year'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Last Year
                </button>
              </div>
            </div>

            {/* Top Songs Charts */}
            {topSongs.length > 0 && (
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                {/* Top 10 Songs Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    🏆 Top 10 Songs by Play Time
                  </h3>
                  <BarChart
                    xAxis={[{
                      scaleType: 'band',
                      data: topSongs.slice(0, 10).map(song => song.trackName.length > 15 ? song.trackName.substring(0, 15) + '...' : song.trackName),
                    }]}
                    series={[{
                      data: topSongs.slice(0, 10).map(song => song.totalHours),
                      color: '#F59E0B',
                    }]}
                    height={300}
                  />
                </div>

                {/* Top Artists Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    🎤 Top Artists by Play Time
                  </h3>
                  {(() => {
                    const artistStats = {}
                    topSongs.forEach(song => {
                      if (!artistStats[song.artistName]) {
                        artistStats[song.artistName] = 0
                      }
                      artistStats[song.artistName] += song.totalHours
                    })
                    const topArtists = Object.entries(artistStats)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 8)
                      .map(([artist, hours]) => ({ artist, hours }))
                    
                    return (
                      <BarChart
                        xAxis={[{
                          scaleType: 'band',
                          data: topArtists.map(a => a.artist.length > 12 ? a.artist.substring(0, 12) + '...' : a.artist),
                        }]}
                        series={[{
                          data: topArtists.map(a => a.hours),
                          color: '#8B5CF6',
                        }]}
                        height={300}
                      />
                    )
                  })()}
                </div>
              </div>
            )}

            {/* Top Songs List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      🎵 Top 100 Songs ({selectedPeriod === '4weeks' ? 'Last 4 Weeks' : selectedPeriod === '6months' ? 'Last 6 Months' : 'Last Year'})
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Showing {topSongs.length} songs
                    </p>
                  </div>
                  {topSongs.length > 0 && (
                    <button
                      onClick={exportTopSongsAsJSON}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Export JSON</span>
                    </button>
                  )}
                </div>
              </div>
              
              {topSongs.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-gray-500 text-lg">
                    No songs found for the selected time period.
                  </div>
                  <div className="text-gray-400 text-sm mt-2">
                    Try selecting a different time period or check if there's data available.
                  </div>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  <div className="divide-y divide-gray-200">
                    {topSongs.map((song, index) => (
                      <div key={`${song.trackName}-${song.artistName}`} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                index < 3 ? 'bg-yellow-500' : 
                                index < 10 ? 'bg-green-500' : 
                                'bg-gray-400'
                              }`}>
                                {song.rank}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-900 truncate">
                                {song.trackName}
                              </h4>
                              <p className="text-sm text-gray-600 truncate">
                                {song.artistName} • {song.albumName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">
                                {song.totalHours > 1 ? `${song.totalHours}h` : `${song.totalMinutes}m`}
                              </div>
                              <div>Total Time</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">
                                {song.playCount}
                              </div>
                              <div>Plays</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mahmoud
