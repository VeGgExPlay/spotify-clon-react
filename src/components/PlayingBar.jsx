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
} from "../icons/Library";

import { useState } from "react";

import { useMusic } from "../context/MusicContext";

export function PlayingBar() {
  const {pauseSong, resumeSong} = useMusic()
  const [isPaused, setIsPaused] = useState(false)

  const playPauseIcon = isPaused ? <Resume /> : <Pause />

  const handleClick = () => {
    setIsPaused(!isPaused)
    if(isPaused){
      resumeSong()
    } else {
      pauseSong()
    }
  }

   return (
    <div className="flex p-2 gap-2 w-full h-full items-center justify-between">
      <section className="flex flex-1"></section>
      <section className="flex flex-1 flex-col max-w[722px] w-1/3 items-center">
        <div className="flex w-full justify-center">
          <div className="flex gap-7">
            <button>
              <span>
                <Shuffle />
              </span>
            </button>
            <button>
              <span>
                <Prev />
              </span>
            </button>
            <button onClick={handleClick} className="bg-white rounded-full p-2 cursor-pointer">
              <span>
                {playPauseIcon}
              </span>
            </button>
            <button>
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
          <div>-:--</div>
          <div className="flex flex-1 items-center">
            <div className="rounded-full bg-white w-full h-1"></div>
          </div>
          <div>-:--</div>
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
          <button className="flex w-25 items-center gap-2">
            <span>
              <Volume />
            </span>
            <div className="group hover:cursor-pointer flex relative w-full h-2 items-center justify-end">
              <div className="bg-white rounded-full w-full h-1 group-hover:bg-green-400" />
              <div className="absolute opacity-0 bg-white rounded-full w-4 h-4 group-hover:opacity-100"></div>
            </div>
          </button>
          <button>
            <FullScreenPlay />
          </button>
        </div>
      </section>
    </div>
  );
}
