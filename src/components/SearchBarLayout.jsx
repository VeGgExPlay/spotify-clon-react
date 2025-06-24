import { House } from "../icons/Library";
import { SearchBar } from "./SearchBar";

export function SearchBarLayout({handleHomeNavigate}) {
  return (
    <div className="flex flex-1 h-full items-center gap-3 relative sm:static">
      <button
        onClick={handleHomeNavigate}
        className="bg-[#3f3f3f] h-full rounded-full cursor-pointer p-3 opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-105"
      >
        <House></House>
      </button>
      <div className="flex h-full w-full">
        <SearchBar></SearchBar>
      </div>
    </div>
  );
}
