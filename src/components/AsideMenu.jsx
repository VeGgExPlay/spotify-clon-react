import {
  Contract,
  FullScreen,
  Magnifyer,
  Plus,
  Sandwich,
} from "../icons/Library";

import { useFetch } from "../hooks/useFetch";
import { SideMenuCard } from "./SideMenuCard";

export function AsideMenu() {
  const {songs} = useFetch();

  if (!songs) return <p>Cargando canciones...</p>;

  return (
    <div className="flex overflow-x-hidden sm:overflow-x-auto flex-col flex-1 bg-[#121212] rounded-lg p-4 gap-5">
      <section className="flex flex-col gap-5">
        <div className="flex justify-center sm:justify-between">
          <button className="flex gap-2 items-center">
            <Contract />
            <span className="hidden lg:block">Tu bliblioteca</span>
          </button>
          <div className="hidden gap-2 sm:flex">
            <button className="flex bg-[#333333] py-1 px-3 rounded-full gap-2 items-center">
              <Plus />
              <span className="hidden lg:block">Crear</span>
            </button>
            <button className="cursor-pointer transition-colors duration-300 hover:bg-[#333333] p-2 rounded-full gap-2 items-center">
              <FullScreen />
            </button>
          </div>
        </div>
        <ul className="hidden gap-2 sm:flex">
          <li className="bg-[#333333] px-3 rounded-full flex items-center justify-center leading-none h-8">
            <span>Listas</span>
          </li>
          <li className="bg-[#333333] px-3 rounded-full flex items-center justify-center leading-none h-8">
            <span>Artistas</span>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-5">
        <header className="flex justify-between items-center">
          <button className="h-8 transition-colors duration-300 cursor-pointer p-2 hover:bg-[#333333] rounded-full">
            <Magnifyer />
          </button>
          <button className="hidden sm:flex opacity-50 cursor-pointer transition-transform duration-100 hover:opacity-100 hover:scale-105 gap-2 items-center text-white">
            <span>Recientes</span>
            <Sandwich />
          </button>
        </header>
        {/* <SideMenuCard
          isPlayList={true}
          cover={"https://misc.scdn.co/liked-songs/liked-songs-64.png"}
          title={"Canciones que te gustan"}
          description={"Lista - 1 canción"}
        /> */}
        {songs?.slice(0, 4).map((song) => (
          <SideMenuCard
            key={song.id}
            song={song}
          />
        ))}
      </section>
    </div>
  );
}
