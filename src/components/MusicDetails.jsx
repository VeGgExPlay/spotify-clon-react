import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Pause, Play } from "../icons/Library";
import { useMusic } from "../context/MusicContext";
import { GradientBackground } from "./GradientBackground";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LoadScreen } from "./LoadScreen";

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
  const navigate = useNavigate();

  if (!songs || !artists) return <LoadScreen />

  const detailSong = songs?.find((songs) => songs.id === id);

  if (detailSong === undefined) return <div>No hay...</div>;

  const artistArray = Array.isArray(detailSong.artist)
    ? detailSong.artist
    : [detailSong.artist];

  const matchedArtists = [];

  artistArray.forEach((item) => {
    const match = artists.find((artist) => artist.artist === item);

    if (match) {
      matchedArtists.push(match);
    }
  });

  const isCurrentSong = currentSong?.id === detailSong.id ? true : false;

  let classPaused;

  if (isCurrentSong) {
    classPaused = isPaused || !currentSong ? <Play /> : <Pause />;
  } else {
    classPaused = <Play />;
  }

  const handlePlay = () => {
    setIsPaused(!isPaused);
    if (isPaused && isCurrentSong) {
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
      className="flex flex-1 h-full w-full"
    >
      <div className="flex flex-1 h-full w-full">
        <section className="flex flex-col h-full w-full relative">
          <div
            style={{
              background: `${detailSong.color}`,
            }}
            id="gradient1"
            className={`absolute h-9/12 w-full z-20 opacity-30 pointer-events-none`}
          ></div>
          <div
            style={{
              background: `${detailSong.color}`,
            }}
            id="gradient2"
            className={`absolute h-9/12 w-full opacity-85 pointer-events-none`}
          ></div>
          <header className="flex relative min-h-fit items-end overflow-hidden">
            <div className="flex h-full w-full relative items-end">
              <div className="absolute bottom-0 left-0 h-full w-full z-10 sm:z-10 bg-gradient-to-t from-black/75 sm:from-black/35 to-transparent"></div>
              <div className="flex h-full w-full relative justify-center sm:justify-start sm:items-end p-6 sm:z-20">
                <picture className="flex h-60 aspect-square rounded-md overflow-hidden shadow-2xl">
                  <img className="h-full w-full object-cover" src={detailSong.cover} alt="" />
                </picture>
                <article className="flex bottom-0 left-0 absolute sm:static flex-col gap-4 p-6 z-20">
                  <div>
                    <p className="font-bold text-sm">
                      {detailSong.type === "song" ? "Canción" : "Album"}
                    </p>
                    <strong className="text-5xl sm:text-7xl">{detailSong.title}</strong>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex">
                      {matchedArtists?.map((artist) => (
                        <picture
                          key={artist.id}
                          className="flex h-6 aspect-square rounded-full overflow-hidden"
                        >
                          <img
                            className="object-cover h-auto w-auto"
                            src={artist.picture}
                            alt=""
                          />
                        </picture>
                      ))}
                    </div>
                    <p className="font-semibold text-md">
                      {/* {detailSong.artist} */}
                    </p>
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
            </div>
          </header>
          <section className="flex w-full">
            <div className="flex flex-1 flex-col p-6 gap-6 z-20">
              <div className="flex h-16 w-full">
                <button
                  onClick={handlePlay}
                  className="flex items-center justify-center h-full aspect-square bg-green-500 rounded-full text-black transition-transform duration-75 hover:scale-102"
                >
                  <span className="h-1/2">
                    {classPaused}
                  </span>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row">
                {matchedArtists?.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => navigate(`/artist/${artist.artist}`)}
                    className="flex items-center gap-4 h-25 w-full p-2 rounded-sm transition-colors duration-75 hover:bg-[#333333]/50"
                  >
                    <picture className="flex h-full aspect-square rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={artist.picture}
                        alt=""
                      />
                    </picture>
                    <div className="flex flex-col items-start">
                      <p className="font-semibold text-md">Artista</p>
                      <strong className="text-lg">{artist.artist}</strong>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </motion.div>
  );
}
