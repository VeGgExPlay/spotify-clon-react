import {
  Contract,
  FullScreen,
  Heart,
  Magnifyer,
  Pin,
  Play,
  Plus,
  Sandwich,
} from "../icons/Library";

import { useFetch } from "../hooks/useFetch";

export function AsideMenu() {
  const songs = useFetch();

  if (!songs) return <p>Cargando canciones...</p>;

  return (
    <div className="flex flex-col flex-1 bg-[#121212] rounded-lg p-4 gap-5">
      <section className="flex flex-col gap-5">
        <div className="flex justify-between">
          <button className="flex gap-2 items-center">
            <Contract />
            <span>Tu bliblioteca</span>
          </button>
          <div className="flex gap-2">
            <button className="flex bg-[#333333] py-1 px-3 rounded-full gap-2 items-center">
              <Plus />
              <span>Crear</span>
            </button>
            <button className="cursor-pointer transition-colors duration-300 hover:bg-[#333333] p-2 rounded-full gap-2 items-center">
              <FullScreen />
            </button>
          </div>
        </div>
        <ul className="flex gap-2">
          <li className="bg-[#333333] py-1 px-3 rounded-full">Listas</li>
          <li className="bg-[#333333] py-1 px-3 rounded-full">Artistas</li>
        </ul>
      </section>
      <section className="flex flex-col gap-5">
        <header className="flex justify-between items-center">
          <button className="h-8 transition-colors duration-300 cursor-pointer p-2 hover:bg-[#333333] rounded-full">
            <Magnifyer />
          </button>
          <button className="flex opacity-50 cursor-pointer transition-transform duration-100 hover:opacity-100 hover:scale-105 gap-2 items-center text-white">
            <span>Recientes</span>
            <Sandwich />
          </button>
        </header>
        <article className="flex group cursor-pointer items-center relative">
          <div className="absolute group-hover:bg-[#424242] opacity-25 rounded-lg w-full scale-x-105 scale-y-115 h-full z-10" />
          <div className="flex gap-2 items-center">
            <div className="flex relative items-center justify-center object-contain rounded-md overflow-hidden h-14 w-14">
              <div className="absolute opacity-0 group-hover:opacity-100">
                <Play></Play>
              </div>
              <img
                src="https://misc.scdn.co/liked-songs/liked-songs-64.png"
                alt=""
              />
            </div>
            <div className="flex flex-col z-20">
              <p>Canciones que te gustan</p>
              <span className="flex gap-2 items-center text-sm opacity-50">
                <p>
                  <Pin />
                </p>
                <p>Lista - 1 canción</p>
              </span>
            </div>
          </div>
        </article>
        {songs?.map((song) => (
          <article
            key={song.id}
            className="flex group cursor-pointer items-center relative"
          >
            <div className="absolute group-hover:bg-[#424242] opacity-25 rounded-lg w-full scale-x-105 scale-y-120 h-full z-10" />
            <div className="flex gap-2 items-center">
              <div className="flex relative items-center justify-center object-contain rounded-md overflow-hidden h-14 w-14">
                <div className="absolute opacity-0 group-hover:opacity-100">
                  <Play></Play>
                </div>
                <img
                  src={song.cover}
                  alt=""
                />
              </div>
              <div className="flex flex-col z-20">
                <p>{song.title}</p>
                <span className="flex gap-2 items-center text-sm opacity-50">
                  <p>{song.artist}</p>
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
