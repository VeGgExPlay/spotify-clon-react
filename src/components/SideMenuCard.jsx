import { Play, Pin } from "../icons/Library";
import { useMusic } from "../context/MusicContext";
import { useNavigate } from "react-router-dom";

export function SideMenuCard({ song, cover, title, description, isPlayList }) {
  const { currentSong } = useMusic();

  const navigate = useNavigate();

  const classActualSong = currentSong?.id === song?.id ? "" : "hidden";

  const handleClick = () => {
    /* playSong(song); */
    navigate(`details/${song.id}`)
  };

  if (isPlayList || !song)
    return (
      <article className="flex flex-1 group cursor-pointer items-center relative">
        <div className="absolute group-hover:bg-[#424242] opacity-25 rounded-lg w-full scale-x-105 scale-y-115 h-full z-10" />
        <div className="flex gap-2 items-center">
          <picture className="flex relative items-center justify-center object-contain rounded-md overflow-hidden h-14 w-14">
            <div className="absolute opacity-0 group-hover:opacity-100">
              <Play></Play>
            </div>
            <img src={cover} alt="" />
          </picture>
          <div className="flex flex-col z-20 gap-1">
            <p>{title}</p>
            <span className="flex gap-2 items-center text-sm opacity-50">
              <p>
                <Pin />
              </p>
              <span>{description}</span>
            </span>
          </div>
        </div>
      </article>
    );

  return (
    <button
      onClick={handleClick}
      className="flex flex-1 text-start group cursor-pointer items-center relative"
    >
      <div className="absolute group-hover:bg-[#424242] opacity-25 rounded-lg w-full scale-x-105 scale-y-120 h-full z-10" />
      <div className="flex gap-2 items-center">
        <picture className="flex relative items-center aspect-square justify-center object-contain rounded-md overflow-hidden h-14">
          <div className="absolute opacity-0 group-hover:opacity-100">
            <Play></Play>
          </div>

          <div
            className={`absolute bg-black/50 flex h-full w-full ${classActualSong}`}
          >
            <div className="absolute flex justify-center bottom-0 gap-1 items-end h-2/3 w-full">
              <span className="w-1 bg-green-400 animate-bar1 rounded-sm"></span>
              <span className="w-1 bg-green-400 animate-bar2 rounded-sm"></span>
              <span className="w-1 bg-green-400 animate-bar3 rounded-sm"></span>
              <span className="w-1 bg-green-400 animate-bar4 rounded-sm"></span>
              <span className="w-1 bg-green-400 animate-bar5 rounded-sm"></span>
            </div>
          </div>

          <img className="h-full w-full object-cover" src={song.cover} alt="" />
        </picture>
        <div className="flex flex-col z-20 gap-1">
          <p>{song.title}</p>
          <span className="flex gap-2 items-center text-sm opacity-50">
            <p>{Array.isArray(song.artist) ? song.artist.join(" & ") : song.artist}</p>
          </span>
        </div>
      </div>
    </button>
  );
}
