import { Explore, Magnifyer } from "../icons/Library";
import { SearchBarResults } from "./SearchBarResults";
import { useFetch } from "../hooks/useFetch";
import { useFilter } from "../context/FilterContext";
import { useState, useRef } from "react";

export function SearchBar() {
  const [focused, setFocused] = useState(false);
  const { setFilters, filterSong } = useFilter();

  const inputRef = useRef();

  const { songs } = useFetch();
  const songsArray = songs ? Object.values(songs).flat() : "";

  const classSearchBar = focused ? "" : "opacity-0 pointer-events-none";

  const handleFilterChange = (event) => {
    setFilters({
      title: event.target.value,
    });
  };

  const handleMouseDown = (e) => {
    e.preventDefault(); // evita que el input pierda foco
    inputRef.current?.focus(); // asegura que el input tenga foco
  };

  const handleClose = () => {
  setFocused(false);
  inputRef.current?.blur(); // opcional: también elimina el foco visual
};

  const filteredSongs = filterSong(songsArray);

  return (
    <div className="h-full w-full sm:relative">
      <div className="flex outline-2 outline-transparent bg-[#3f3f3f] h-full w-full rounded-full gap-2 opacity-75 transition-all duration-300 hover:opacity-100 focus-within:outline-white">
        <div className="flex h-full p-3">
          <Magnifyer />
        </div>
        <div className="flex w-full h-full">
          <input
            ref={inputRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleFilterChange}
            type="text"
            className="flex h-full w-full sm:text-xl appearance-none bg-transparent border-none outline-none focus:outline-none"
            placeholder="¿Qué quieres reproducir?"
          />
        </div>
        <div className="static sm:relative flex h-full p-3">
          <div className="absolute border-l-1 h-3/6 self-center -mx-3"></div>
          <Explore />
        </div>
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="absolute left-0 h-full w-full"
      >
        <SearchBarResults
          visibility={classSearchBar}
          filteredSongs={filteredSongs}
          onSelect={handleClose}
        />
      </div>
    </div>
  );
}
