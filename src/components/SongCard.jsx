import { useMusic } from "../context/MusicContext";
import { Vinyl } from "../icons/Library";
import { useNavigate } from "react-router-dom";

export function SongCard({ song }) {
  const { currentSong, playSong } = useMusic();
  const navigate = useNavigate();

  const classActualSong = song?.id === currentSong?.id ? "" : "hidden";

  const handleClick = () => {
    /* playSong(song); */
    navigate(`song/${song.id}`);
  };

  return (
    <button
      onClick={handleClick}
      key={song.id}
      className="grid-item"
    >
      <div className="flex flex-col w-full h-full gap-2">
        <picture className="w-full relative aspect-square rounded-md overflow-hidden">
          <div className={`vinyl h-full aspect-square absolute -bottom-1/2 -left-1/2 ${classActualSong}`}>
              <span className="relative h-full w-full flex">
                <picture className="absolute flex h-full w-full aspect-square items-center justify-center rounded-full outline-3 outline-black">
                  <img
                    className="h-1/2 w-1/2 object-cover rounded-full outline-2 outline-black"
                    src={song.cover}
                    alt={song.title}
                  />
                </picture>
                <Vinyl></Vinyl>
              </span>
            </div>
          <img className="h-full w-full object-cover block" src={song.cover} alt="" />
        </picture>
        <div className="flex flex-col text-start">
          <strong className="text-2xl truncate-text w-full">{song.title}</strong>
          <p className="truncate-text w-full">{Array.isArray(song.artist) ? song.artist.join(" & ") : song.artist}</p>
        </div>
      </div>
    </button>
  );
}
