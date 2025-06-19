import {
  DeviceConnect,
  DevicePlay,
  FullScreenPlay,
  Next,
  Pause,
  Prev,
  Queue,
  Repeat,
  Resume,
  Shuffle,
  Volume,
  VolumeMuted,
} from "../icons/Library";

import { useEffect, useState } from "react";

import { useMusic } from "../context/MusicContext";

export function PlayingBar() {
  const {
    pauseSong,
    resumeSong,
    currentSong,
    duration,
    currentTime,
    audioRef,
    volume,
    setVolume,
    nextSong,
    prevSong,
    isPaused,
    setIsPaused,
  } = useMusic();
  const [lastVolume, setLastVolume] = useState(0);

  const playPauseIcon = isPaused ? <Resume /> : <Pause />;
  const classDisabled = currentSong ? "" : "opacity-50";
  const isMuted = volume == 0 ? <VolumeMuted /> : <Volume />;

  useEffect(() => {
    if (isPaused) {
      setIsPaused(!isPaused);
    }
  }, [currentSong]);

  const handleClick = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      resumeSong();
    } else {
      pauseSong();
    }
  };

  const handleChange = (event) => {
    const value = Number(event.target.value);
    audioRef.current.currentTime = value;
  };

  // Ajustar Volumen
  const handleVolume = (event) => {
    // Formatear volumen de 100 a 1 antes de pasarlo
    const formatedVolume = event.target.value / 100;
    setVolume(formatedVolume);
  };

  // Mutear la canción al presionar el botón y conservar el volumen anterior
  const handleMute = () => {
    setLastVolume(volume);
    volume == 0 ? setVolume(lastVolume) : setVolume(0);
  };

  // Formatear segundos a mm:ss
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  return (
    <div className="flex p-2 gap-2 w-full h-full items-center justify-between">
      <section className="flex flex-1 h-14">
        {currentSong && (
          <div className="flex w-full h-full gap-3 items-center">
            <picture className="aspect-square h-full rounded-md overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={currentSong.cover}
                alt=""
              />
            </picture>
            <div>
              <header>
                <strong className="text-md">{currentSong.title}</strong>
              </header>
              <footer>
                <span className="text-xs opacity-75">{currentSong.artist}</span>
              </footer>
            </div>
          </div>
        )}
      </section>
      <section
        className={`flex flex-1 flex-col max-w[722px] w-1/3 items-center ${classDisabled}`}
      >
        <div className="flex w-full justify-center">
          <div className="flex gap-7">
            <button>
              <span>
                <Shuffle />
              </span>
            </button>
            <button className="cursor-pointer" onClick={prevSong}>
              <span>
                <Prev />
              </span>
            </button>
            <button
              onClick={handleClick}
              className="bg-white rounded-full p-2 cursor-pointer"
              disabled={currentSong ? false : true}
            >
              <span>{playPauseIcon}</span>
            </button>
            <button className="cursor-pointer" onClick={nextSong}>
              <span>
                <Next />
              </span>
            </button>
            <button>
              <span>
                <Repeat />
              </span>
            </button>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <div>{formatTime(currentTime)}</div>
          <div className="flex flex-1 items-center">
            <div className="relative w-full h-1">
              <input
                className="absolute top-0 left-0 h-full w-full"
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleChange}
                disabled={currentSong ? false : true}
              />
            </div>
          </div>
          <div>{formatTime(duration)}</div>
        </div>
      </section>
      <section className="flex justify-end flex-1">
        <div className="flex items-center gap-4">
          <button>
            <span>
              <DevicePlay />
            </span>
          </button>
          <button>
            <span>
              <Queue />
            </span>
          </button>
          <button>
            <span>
              <DeviceConnect />
            </span>
          </button>
          <div className="flex w-25 items-center gap-2">
            <button onClick={handleMute} className="cursor-pointer">
              {isMuted}
            </button>
            <div className="group hover:cursor-pointer flex relative w-full h-2 items-center justify-end">
              <input
                className="w-full h-1/2"
                type="range"
                min={0}
                max={100}
                value={volume * 100}
                onChange={handleVolume}
              />
            </div>
          </div>
          <button>
            <FullScreenPlay />
          </button>
        </div>
      </section>
    </div>
  );
}
