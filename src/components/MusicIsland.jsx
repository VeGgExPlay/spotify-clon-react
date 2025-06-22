import { useMusic } from "../context/MusicContext";
import { Heart, Pause, Play } from "../icons/Library";
import { useFetch } from "../hooks/useFetch";

export function MusicIsland() {
  const {
    currentSong,
    pauseSong,
    resumeSong,
    setIsPaused,
    isPaused,
    formatTime,
    currentTime,
    duration
  } = useMusic();

  const {artists} = useFetch()

  if (!currentSong) return;

  const currentArtist = Array.isArray(currentSong.artist) ? currentSong.artist[0] : currentSong.artist

  const color = artists.find(artist => artist.artist === currentArtist)?.color

  const className = isPaused ? <Play /> : <Pause />;

  const handlePlay = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      resumeSong();
    } else {
      pauseSong();
    }
  };

  function hexToRgba(hex, opacity) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const rgbaColor = hexToRgba(color, 0.3); // Por ejemplo 50% de opacidad

  const progress = (currentTime / duration) * 100

  return (
    <div className="absolute bottom-0 left-0 w-full h-20 p-3 sm:hidden">
      <div className="flex flex-1 h-full">
        <div
        style={{background: rgbaColor}} 
        className="flex relative flex-col flex-1 rounded-md backdrop-blur-lg overflow-hidden">
          <div className="flex w-full h-full justify-between p-2">
            <section className="flex items-center gap-3">
              <picture className="flex h-full aspect-square rounded-md overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={currentSong.cover}
                  alt=""
                />
              </picture>
              <div>
                <strong>{currentSong.title}</strong>
                <p>{currentSong.artist}</p>
              </div>
            </section>
            <section className="flex items-center gap-3">
              <span className="h-6">
                <Heart />
              </span>
              <button className="h-6" onClick={handlePlay}>
                {className}
              </button>
            </section>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-500 rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
