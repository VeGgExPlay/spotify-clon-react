import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Pause, Play } from "../icons/Library";
import { useMusic } from "../context/MusicContext";
import { GradientBackground } from "./GradientBackground";
import { motion } from "framer-motion";

export function MusicDetails() {
  const {
    playSong,
    isPaused,
    setIsPaused,
    currentSong,
    resumeSong,
    pauseSong,
  } = useMusic();
  const { songs, artists } = useFetch();
  const { id } = useParams();

  if (!songs || !artists) return <div>Cargando...</div>;

  const detailSong = songs?.find((songs) => songs.id === id);
  const artist = artists?.find((artist) => detailSong.artist === artist.artist);

  const isCurrentSong = currentSong?.id === detailSong.id ? true : false;

  let classPaused;

  if (isCurrentSong) {
    classPaused = isPaused || !currentSong ? <Play /> : <Pause />;
  } else {
    classPaused = <Play />;
  }

  const handlePlay = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      resumeSong();
    } else if (!currentSong || !isCurrentSong) {
      playSong(detailSong);
    } else {
      pauseSong();
    }
  };

  return (
    <motion.div
      key={detailSong.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 h-full"
    >
      <div className="flex flex-1 h-full">
        <section className="flex flex-col flex-1 relative">
          <GradientBackground detailSong={detailSong} />
          <header className="flex relative h-max w-full items-end overflow-hidden">
            <GradientBackground
              detailSong={detailSong}
              top={"0"}
              height={"150%"}
              opacity={"50"}
            />
            <div className="flex h-full w-full items-end p-6 z-10">
              <picture className="flex h-60 aspect-square rounded-md overflow-hidden shadow-2xl">
                <img className="object-cover" src={detailSong.cover} alt="" />
              </picture>
              <article className="flex flex-col gap-4 p-6">
                <div>
                  <p className="font-bold text-sm">
                    {detailSong.type === "song" ? "Canción" : "Album"}
                  </p>
                  <strong className="text-7xl">{detailSong.title}</strong>
                </div>
                <div className="flex gap-2 items-center">
                  <picture className="flex h-6 aspect-square rounded-full overflow-hidden">
                    <img
                      className="object-cover h-auto w-auto"
                      src={artist.picture}
                      alt=""
                    />
                  </picture>
                  <p className="font-semibold text-md">{detailSong.artist}</p>
                  <span className="text-center font-bold">·</span>
                  <p className="font-semibold text-md">{detailSong.title}</p>
                  <span className="text-center font-bold">·</span>
                  <p className="font-semibold text-md opacity-75">
                    {detailSong.year}
                  </p>
                  <span className="text-center font-bold">·</span>
                  <p className="font-semibold text-md opacity-75">
                    {detailSong.duration}
                  </p>
                </div>
              </article>
            </div>
          </header>
          <section className="flex flex-1">
            <div className="flex flex-1 flex-col p-6 gap-6 z-20">
              <div className="flex h-16 w-full">
                <button
                  onClick={handlePlay}
                  className="flex items-center justify-center h-full aspect-square bg-green-500 rounded-full text-black transition-transform duration-75 hover:scale-102"
                >
                  {classPaused}
                </button>
              </div>
              <button className="flex items-center gap-4 h-25 w-full p-2 rounded-sm transition-colors duration-75 hover:bg-[#333333]/50">
                <picture className="flex h-full aspect-square rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={artist.picture}
                    alt=""
                  />
                </picture>
                <div className="flex flex-col items-start">
                  <p className="font-semibold text-md">Artista</p>
                  <strong className="text-lg">{detailSong.artist}</strong>
                </div>
              </button>
            </div>
          </section>
        </section>
      </div>
    </motion.div>
  );
}
