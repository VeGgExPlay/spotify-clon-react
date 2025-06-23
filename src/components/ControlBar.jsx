import { Next, Pause, Prev, Repeat, Resume, Shuffle } from "../icons/Library";
import { useMusic } from "../context/MusicContext";
import { useEffect } from "react";

export function ControlBar() {
  const {
    currentSong,
    duration,
    currentTime,
    nextSong,
    prevSong,
    formatTime,
    isPaused,
    setIsPaused,
    audioRef,
    resumeSong,
    pauseSong,
  } = useMusic();

  useEffect(() => {
    if (isPaused) {
      setIsPaused(!isPaused);
    }
  }, [currentSong]);

  const playPauseIcon = isPaused ? <Resume /> : <Pause />;
  const classDisabled = currentSong ? "" : "opacity-50";

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

  const handleButtons = (e) => {
    e.stopPropagation(); // Evita que el click llegue al div padre
  };

  const handleButtonNext = (e) => {
    handleButtons(e)
    nextSong()
  }

  const handleButtonPrev = (e) => {
    handleButtons(e)
    prevSong()
  }

  const handleButtonPlay = (e) => {
    handleButtons(e)
    handleClick()
  }


  return (
    <section
      className={`flex flex-col items-center gap-2 ${classDisabled} h-full w-full sm:max-w-[722px]`}
    >
      <div className="flex w-full justify-center items-center">
        <div className="flex gap-7 items-center">
          <button className="hidden sm:flex h-4">
            <span>
              <Shuffle />
            </span>
          </button>
          <button className="cursor-pointer h-4" onClick={handleButtonPrev}>
            <span>
              <Prev />
            </span>
          </button>
          <button
            onClick={handleButtonPlay}
            className="bg-white rounded-full h-10 text-black p-2 cursor-pointer"
            disabled={currentSong ? false : true}
          >
            <span>{playPauseIcon}</span>
          </button>
          <button className="cursor-pointer h-4" onClick={handleButtonNext}>
            <span>
              <Next />
            </span>
          </button>
          <button className="hidden sm:flex h-4">
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
  );
}
