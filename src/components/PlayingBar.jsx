import {
  DeviceConnect,
  DevicePlay,
  FullScreenPlay,
  Queue,
} from "../icons/Library";

import { useMusic } from "../context/MusicContext";
import { ControlBar } from "./ControlBar";
import { VolumeControl } from "./VolumeControl";
import { useMemo } from "react";
import { SongInfo } from "./SongInfo";

export function PlayingBar() {
  const { currentSong } = useMusic();

  const artistName = useMemo(() => {
    if (!currentSong) return null;
    const { artist } = currentSong;
    return Array.isArray(artist) ? artist.join(" & ") : artist;
  }, [currentSong]);

  return (
    <div className="flex p-2 w-full h-full items-center justify-between">
      <div className="hidden sm:flex gap-2 w-full h-full items-center justify-between">
        <section className="flex flex-1 h-14 sm:flex-1 flex-[0.5]">
          {currentSong && (
            <SongInfo song={currentSong} artistName={artistName} />
          )}
        </section>
        <section
          className={`flex flex-1 flex-col items-center w-full sm:w-1/3 sm:max-w-[722px]`}
        >
          <ControlBar />
        </section>
        <section className="flex w-full justify-end flex-1 h-14 sm:flex-1 flex-[0.5]">
          <div className="flex h-full w-full justify-end items-center gap-4">
            <button className="hidden sm:flex h-4">
              <span aria-label="Reproducción en dispositivo">
                <DevicePlay />
              </span>
            </button>
            <button aria-label="Cola de reproducción" className="hidden sm:flex h-4">
              <span>
                <Queue />
              </span>
            </button>
            <button aria-label="Conectar dispositivo" className="hidden sm:flex h-4">
              <span>
                <DeviceConnect />
              </span>
            </button>
            <VolumeControl />
            <button aria-label="Pantalla completa" className="hidden sm:flex h-4">
              <FullScreenPlay />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
