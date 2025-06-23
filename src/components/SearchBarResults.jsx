import { SideMenuCard } from "./SideMenuCard";

export function SearchBarResults({ visibility, filteredSongs }) {
  return (
    <div className={`flex transition-opacity duration-200 mt-3 p-4 z-40 h-100 w-full rounded-2xl absolute bg-[#121212] overflow-hidden ${visibility}`}>
      <div
        className="flex w-full scrollable"
      >
        <div className="flex h-max w-full">
          <div className="flex flex-1 flex-col gap-4">
            {filteredSongs?.slice(0, 7).map((song) => (
              <SideMenuCard key={song.id} song={song} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
