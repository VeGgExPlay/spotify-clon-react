import {
  Bell,
  Download,
  Explore,
  House,
  Logo,
  Magnifyer,
  People,
} from "../icons/Library";
import { SearchBarResults } from "./SearchBarResults";
import { useFetch } from "../hooks/useFetch";
import { useFilter } from "../context/FilterContext";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export function NavBar() {
  const [focused, setFocused] = useState(false);
  const { setFilters, filterSong } = useFilter();
  const navigate = useNavigate();

  const inputRef = useRef();

  const { songs } = useFetch();
  const songsArray = songs ? Object.values(songs).flat() : "";

  const classSearchBar = focused ? "" : "opacity-0 pointer-events-none";

  const handleFilterChange = (event) => {
    setFilters({
      title: event.target.value,
    });
  };

  const handleFocus = () => {
    setFocused(!focused);
  };

  const handleMouseDown = (e) => {
    e.preventDefault(); // evita que el input pierda foco
    inputRef.current?.focus(); // asegura que el input tenga foco
  };

  const filteredSongs = filterSong(songsArray);

  return (
    <div className="flex flex-1 h-full items-center px-4">
      <div className="flex flex-1 h-full items-center gap-3 relative sm:static">
        <button onClick={() => navigate("/")} className="bg-[#3f3f3f] h-full rounded-full cursor-pointer p-3 opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-105">
          <House></House>
        </button>
        <div className="flex sm:hidden h-full w-full">
          <SearchBar></SearchBar>
        </div>
      </div>
      <div className="hidden sm:flex w-full h-full justify-between items-center gap-4">
        <section className="flex flex-1 h-full justify-between items-center gap-10">
          <button
            onClick={() => navigate("/")}
            className="h-3/4 cursor-pointer"
          >
            <Logo></Logo>
          </button>
        </section>
        <section className="flex flex-1 justify-center items-center h-full gap-2">
          <button className="bg-[#3f3f3f] h-full rounded-full cursor-pointer p-3 opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-105">
            <House></House>
          </button>
          <div className="h-full relative">
            <div className="flex outline-2 outline-transparent bg-[#3f3f3f] h-full rounded-full gap-4 opacity-75 transition-all duration-300 hover:opacity-100 focus-within:outline-white">
              <div className="flex h-full p-3">
                <Magnifyer />
              </div>
              <div className="flex w-full h-full">
                <input
                  onFocus={handleFocus}
                  onBlur={handleFocus}
                  onChange={handleFilterChange}
                  type="text"
                  className="flex h-full text-xl w-90 appearance-none bg-transparent border-none outline-none focus:outline-none"
                  placeholder="¿Qué quieres reproducir?"
                />
              </div>
              <div className="relative flex h-full p-3">
                <div className="absolute border-l-1 h-3/6 self-center -mx-3"></div>
                <Explore />
              </div>
            </div>
            <div onMouseDown={handleMouseDown}>
              <SearchBarResults
                visibility={classSearchBar}
                filteredSongs={filteredSongs}
              />
            </div>
          </div>
        </section>
        <section className="flex flex-1 h-full transition-all duration-200 justify-end gap-6 items-center">
          <button className="bg-white hidden lg:block text-black font-bold rounded-full px-4 h-2/3">
            <span>Descubrir Premium</span>
          </button>
          <button className="hidden lg:flex h-full gap-2 items-center cursor-pointer opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-102">
            <span className="h-1/3">
              <Download />
            </span>
            <span>Instalar app</span>
          </button>
          <div className="hidden md:flex h-full items-center gap-5">
            <button className="flex h-1/3 items-center cursor-pointer opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-105">
              <Bell />
            </button>
            <button className="flex h-1/3 items-center cursor-pointer opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-105">
              <People />
            </button>
          </div>
          <div className="flex bg-[#3f3f3f] rounded-full aspect-square h-full items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105">
            <picture className="flex h-full items-center justify-center aspect-square">
              <img
                className="h-2/3 w-2/3 object-cover rounded-full"
                src="https://i.scdn.co/image/ab67757000003b8269488b2bf7f7e5e58ac6575c"
                alt=""
              />
            </picture>
          </div>
        </section>
      </div>
    </div>
  );
}
