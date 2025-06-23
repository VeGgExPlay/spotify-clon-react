import {
  DeviceConnect,
  DevicePlay,
  FullScreenPlay,
  Queue,
  Volume,
  VolumeMuted,
} from "../icons/Library";

import { useState } from "react";

import { useMusic } from "../context/MusicContext";
import { ControlBar } from "./ControlBar";

export function PlayingBar() {
  const {
    currentSong,
    volume,
    setVolume,
  } = useMusic();
  const [lastVolume, setLastVolume] = useState(0);

  const isMuted = volume == 0 ? <VolumeMuted /> : <Volume />;

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

  // Formatear los artistas en caso de que sean array
  let artist
  if(currentSong){
    artist = Array.isArray(currentSong.artist) ? currentSong.artist.join(" & ") : currentSong.artist
  }

  return (
    <div className="flex p-2 w-full h-full items-center justify-between">
      <div className="hidden sm:flex gap-2 w-full h-full items-center justify-between">
        <section className="flex flex-1 h-14 sm:flex-1 flex-[0.5]">
        {currentSong && (
          <div className="flex w-full h-full gap-3 items-center">
            <picture className="aspect-square h-full rounded-md overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={currentSong.cover}
                alt=""
              />
            </picture>
            <div className="hidden sm:flex flex-col">
              <header>
                <strong className="text-md">{currentSong.title}</strong>
              </header>
              <footer>
                <span className="text-xs opacity-75">{artist}</span>
              </footer>
            </div>
          </div>
        )}
      </section>
      <section
        className={`flex flex-1 flex-col items-center w-full sm:w-1/3 sm:max-w-[722px]`} >
          <ControlBar />
      </section>
      <section className="flex w-full justify-end flex-1 h-14 sm:flex-1 flex-[0.5]">
        <div className="flex h-full w-full justify-end items-center gap-4">
          <button className="hidden sm:flex h-4">
            <span>
              <DevicePlay />
            </span>
          </button>
          <button className="hidden sm:flex h-4">
            <span>
              <Queue />
            </span>
          </button>
          <button className="hidden sm:flex h-4">
            <span>
              <DeviceConnect />
            </span>
          </button>
          <div className="flex sm:w-25 items-center gap-2 range-vertical">
            <button onClick={handleMute} className="cursor-pointer h-4">
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
          <button className="hidden sm:flex h-4">
            <FullScreenPlay />
          </button>
        </div>
      </section>
      </div>
    </div>
  );
}
