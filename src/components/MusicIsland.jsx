import { useMusic } from "../context/MusicContext";
import { Heart, Pause, Play } from "../icons/Library";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import { ControlBar } from "./ControlBar";

export function MusicIsland() {
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    currentSong,
    pauseSong,
    resumeSong,
    setIsPaused,
    isPaused,
    currentTime,
    duration,
  } = useMusic();

  const { artists } = useFetch();

  if (!currentSong || !artists) return;

  const currentArtist = Array.isArray(currentSong.artist)
    ? currentSong.artist[0]
    : currentSong.artist;

  const color = artists.find(
    (artist) => artist.artist === currentArtist
  )?.color;

  const className = isPaused ? <Play /> : <Pause />;

  const classExpanded = isExpanded ? "musicIslandExpand" : ""

  const handlePlay = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      resumeSong();
    } else {
      pauseSong();
    }
  };

  function hexToRgba(hex, opacity) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const rgbaColor = hexToRgba(color, 0.3); // Por ejemplo 50% de opacidad

  const progress = (currentTime / duration) * 100;

  // Evitar que el clic de los botones se propague al elemento padre
  const handleButtons = (e) => {
    e.stopPropagation(); // Evita que el click llegue al div padre
    handlePlay();
  };

  const handleClassExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      onClick={handleClassExpanded}
      style={{ background: rgbaColor }}
      className={`absolute transition-all duration-150 bottom-4 left-1/2 -translate-x-1/2 w-full h-15 max-w-[95%] rounded-md sm:hidden flex flex-col gap-4 z-20 overflow-hidden ${classExpanded} backdrop-blur-lg`}
    >
      <div
        className="flex relative flex-col h-15 w-full"
      >
        <div className="flex w-full h-full justify-between p-2">
          <section className="flex items-center gap-3">
            <picture className="flex h-full aspect-square rounded-md overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={currentSong.cover}
                alt=""
              />
            </picture>
            <div>
              <strong>{currentSong.title}</strong>
              <p>{currentSong.artist}</p>
            </div>
          </section>
          <section className="flex items-center gap-3">
            <button className="h-6">
              <Heart />
            </button>
            <button className="h-6" onClick={handleButtons}>
              {className}
            </button>
          </section>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-500/75 rounded overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="h-full p-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <picture className="flex h-1/3 aspect-square rounded-md overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={currentSong.cover}
                alt=""
              />
            </picture>
            <div className="text-center">
              <strong className="text-3xl">{currentSong.title}</strong>
              <p className="font-semibold">{currentSong.artist}</p>
            </div>
          </div>
          <div className="w-full">
            <ControlBar></ControlBar>
          </div>
        </div>
      </div>
    </div>
  );
}
