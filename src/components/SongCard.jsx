import { useMusic } from "../context/MusicContext";
import { Vinyl } from "../icons/Library";

export function SongCard({ song }) {
  const { currentSong, playSong } = useMusic();

  const classActualSong = song?.id === currentSong?.id ? "" : "hidden";

  const handleClick = () => {
    playSong(song);
  };

  return (
    <button
      onClick={handleClick}
      key={song.id}
      className="relative group flex cursor-pointer flex-col gap-2 items-start"
    >
      <div className="absolute h-full w-full transition-colors duration-100 group-hover:bg-[#757575]/50 scale-110 rounded-md"></div>
      <picture className="flex relative h-50 aspect-square rounded-md overflow-hidden">
        <img className="h-full w-full object-cover" src={song.cover} alt="" />
        <div className={`absolute bg-black/50 flex h-full w-full ${classActualSong}`}>
            <div className={`vinyl absolute -bottom-20 -left-20`}>
            <span className="relative flex h-47 w-47">
                <picture className="absolute flex h-full w-full aspect-square items-center justify-center rounded-full outline-3 outline-black">
                    <img className="h-1/2 w-1/2 object-cover rounded-full outline-2 outline-black" src={song.cover} alt="" />
                </picture>
                <Vinyl></Vinyl>
            </span>
        </div>
        </div>
      </picture>
      <h1 className="text-lg font-bold z-10">{song.title}</h1>
      <p className="opacity-75">
        {Array.isArray(song.artist) ? song.artist.join(" & ") : song.artist}
      </p>
    </button>
  );
}
