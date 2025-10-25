import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

const MusicPlayer = () => {
  const playlist = [
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      cover: "https://i.ytimg.com/vi/fHI8X4OXluQ/sddefault.jpg",
      audioUrl: "/music/blinding_lights.mp3",
    },
    {
      title: "Bad Guy",
      artist: "Billie Eilish",
      cover:
        "https://d94thh4m1x8qv.cloudfront.net/eyJidWNrZXQiOiJkaXktbWFnYXppbmUiLCJrZXkiOiJkL2RpeS9BcnRpc3RzL0IvQmlsbGllLUVpbGlzaC9TY3JlZW5zaG90LTIwMTktMDMtMjktYXQtMTcuMzUuMzUtY29weS5qcGciLCJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjgyLCJwcm9ncmVzc2l2ZSI6dHJ1ZSwidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWl6ZVNjYW5zIjp0cnVlfSwicmVzaXplIjp7IndpZHRoIjoxNTAwLCJoZWlnaHQiOjEwMDAsImZpdCI6ImNvdmVyIn0sInNoYXJwZW4iOnRydWV9fQ==",
      audioUrl: "/music/bad_guy.mp3",
    },
    {
      title: "God’s Plan",
      artist: "Drake",
      cover: "https://i.scdn.co/image/ab67616d0000b27391b302336c213f03b5476280",
      audioUrl: "/music/gods_plan.mp3",
    },
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, volume]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1 < playlist.length ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : playlist.length - 1
    );
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#181818] border-t border-[#333] p-4 flex items-center justify-between z-50">
      {/* Song Info */}
      <div className="flex items-center space-x-4">
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-md object-cover"
        />
        <div>
          <p className="text-white font-medium">{currentTrack.title}</p>
          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6">
        <button
          onClick={handlePrev}
          className="text-gray-300 hover:text-white transition"
        >
          <SkipBack size={22} />
        </button>

        <button
          onClick={togglePlayPause}
          className="bg-[#8b00ff] text-black rounded-full p-3 hover:bg-[#17a44c] transition"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={handleNext}
          className="text-gray-300 hover:text-white transition"
        >
          <SkipForward size={22} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center space-x-2">
        <Volume2 className="text-gray-300" size={20} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 accent-[#8b00ff]"
        />
      </div>

      <audio ref={audioRef} src={currentTrack.audioUrl} />
    </div>
  );
};

export default MusicPlayer;
