import { Play, Pin } from "../icons/Library";
import { useMusic } from "../context/MusicContext";

export function SideMenuCard({ song, cover, title, description, isPlayList }) {
  const {playSong} = useMusic()

  const handleClick = () => {
    playSong(song)
  }

  if (isPlayList || !song)
    return (
      <article className="flex group cursor-pointer items-center relative">
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
              <span>
                {description}
              </span>
            </span>
          </div>
        </div>
      </article>
    );

  return (
    <button onClick={handleClick} className="flex text-start group cursor-pointer items-center relative">
      <div className="absolute group-hover:bg-[#424242] opacity-25 rounded-lg w-full scale-x-105 scale-y-120 h-full z-10" />
      <div className="flex gap-2 items-center">
        <picture className="flex relative items-center aspect-square justify-center object-contain rounded-md overflow-hidden h-14">
          <div className="absolute opacity-0 group-hover:opacity-100">
            <Play></Play>
          </div>
          <img className="h-full w-full object-cover" src={song.cover} alt="" />
        </picture>
        <div className="flex flex-col z-20 gap-1">
          <p>{song.title}</p>
          <span className="flex gap-2 items-center text-sm opacity-50">
            <p>{song.artist}</p>
          </span>
        </div>
      </div>
    </button>
  );
}
