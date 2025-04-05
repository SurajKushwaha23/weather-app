import { useState, useRef, useEffect } from "react";

const songs = [
  {
    title: "Summer Vibes",
    artist: "Ocean Waves",
    duration: "3:45",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://source.unsplash.com/random/800x800/?summer,beach",
  },
  {
    title: "Mountain High",
    artist: "Peak Climbers",
    duration: "4:20",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://source.unsplash.com/random/800x800/?mountain",
  },
  {
    title: "Urban Lights",
    artist: "City Beats",
    duration: "3:15",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://source.unsplash.com/random/800x800/?city,night",
  },
];

export default function ModernMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const handleLoadStart = () => setIsLoading(true);
    const handleLoadedData = () => setIsLoading(false);
    const handleError = () => setIsLoading(false);

    if (audio) {
      audio.addEventListener("loadstart", handleLoadStart);
      audio.addEventListener("loadeddata", handleLoadedData);
      audio.addEventListener("error", handleError);
      audio.volume = volume;
    }

    return () => {
      if (audio) {
        audio.removeEventListener("loadstart", handleLoadStart);
        audio.removeEventListener("loadeddata", handleLoadedData);
        audio.removeEventListener("error", handleError);
      }
    };
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Playback error:", error);
        setIsPlaying(false);
      }
    };

    isPlaying ? handlePlay() : audio.pause();
  }, [isPlaying, currentSong]);

  const changeSong = (index) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentSong(index);
    setIsPlaying(true);
    setProgress(0);
    audio.pause();
    audio.src = songs[index].url;
    audio.load();
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = (e.target.value / 100) * audio.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleNext = () => changeSong((currentSong + 1) % songs.length);
  const handlePrev = () =>
    changeSong((currentSong - 1 + songs.length) % songs.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-8">
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-6xl p-8 border border-white/10">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNext}
          preload="auto"
        >
          <source src={songs[currentSong].url} type="audio/mpeg" />
          Your browser does not support audio playback.
        </audio>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 relative group">
            <div className="relative overflow-hidden rounded-2xl aspect-square">
              <img
                src={songs[currentSong].cover}
                alt="Album Cover"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <button
              onClick={togglePlay}
              className="absolute bottom-6 right-6 p-4 rounded-full bg-blue-500/90 hover:bg-blue-400 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isPlaying ? (
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {songs[currentSong].title}
              </h2>
              <p className="text-xl text-gray-300">
                {songs[currentSong].artist}
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative pt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-gray-700/50 rounded-full appearance-none cursor-pointer range-thumb:bg-blue-500 range-thumb:w-4 range-thumb:h-4"
                />
                <div
                  className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full pointer-events-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-gray-400">
                <span>
                  {new Date(audioRef.current?.currentTime * 1000 || 0)
                    .toISOString()
                    .substr(14, 5)}
                </span>
                <span>{songs[currentSong].duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={togglePlay}
                  className="p-6 rounded-full bg-blue-500 hover:bg-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isPlaying ? (
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                    </svg>
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3 w-48">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77zm-4 0c-4.01.91-7 4.49-7 8.77 0 4.28 2.99 7.86 7 8.77v-2.06c-2.89-.86-5-3.54-5-6.71s2.11-5.85 5-6.71V3.23z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-gray-700/50 rounded-full appearance-none cursor-pointer range-thumb:bg-blue-500 range-thumb:w-3 range-thumb:h-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-white mb-6">Up Next</h3>
          <div className="space-y-4">
            {songs.map((song, index) => (
              <div
                key={index}
                onClick={() => changeSong(index)}
                className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  index === currentSong
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border-l-4 border-blue-500"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <img
                      src={song.cover}
                      alt="Album"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {index === currentSong && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        index === currentSong ? "text-blue-400" : "text-white"
                      }`}
                    >
                      {song.title}
                    </p>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                  <span
                    className={`text-sm ${
                      index === currentSong ? "text-blue-400" : "text-gray-500"
                    }`}
                  >
                    {song.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg border-t border-white/10 py-4 px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={songs[currentSong].cover}
                alt="Now Playing"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-white">
                  {songs[currentSong].title}
                </p>
                <p className="text-sm text-gray-400">
                  {songs[currentSong].artist}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                {isPlaying ? (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
