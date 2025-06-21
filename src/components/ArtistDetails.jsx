import { useFetch } from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { Pause, Play } from "../icons/Library";
import { useMusic } from "../context/MusicContext";
import { GradientBackground } from "./GradientBackground";
import { motion } from "framer-motion";
import { linearGradient } from "framer-motion/client";

export function ArtistDetails() {
  const {playListStart} = useMusic()
  const { songs, artists } = useFetch();
  const { id } = useParams();

  if (!songs || !artists) return <div>Cargando...</div>;

  const artist = artists?.find((artist) => artist.artist === id);

  // Filtrar las canciones correspondientes del artista
  const artistSongs = songs.filter((song) => {
    if (Array.isArray(song.artist)) {
        return song.artist.some(item => item === artist.artist);
    }
    return artist.artist === song.artist;
  });

  const handlePlay = () => {
    playListStart(artistSongs)
  };

  return (
    <motion.div
      key={artist.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 h-full"
    >
      <div className="flex flex-1 h-full">
        <section className="flex flex-col flex-1 relative">
          <div
            style={{
              background: `linear-gradient(to top,  rgba(0,0,0,0) 10%, ${artist.color} 40%, rgba(0,0,0,0) 100%)`,
            }}
            id="gradient1"
            className={`absolute h-9/12 w-full z-20 opacity-30 pointer-events-none`}
          ></div>
          <div
            style={{
              background: `linear-gradient(to bottom, ${artist.color} -50%, rgba(1,1,1,0) 100%)`,
            }}
            id="gradient2"
            className={`absolute h-9/12 w-full opacity-70 pointer-events-none`}
          ></div>
          <header className="flex relative min-h-90 items-end overflow-hidden">
            <div className="absolute h-full w-full z-10 bg-gradient-to-t from-black/75 to-transparent"></div>
            <picture className="flex absolute flex-1 h-full w-full">
              <img
                className="h-full w-full object-cover"
                src={artist.picture}
                alt=""
              />
            </picture>
            {/* <GradientBackground
              detailSong={artist}
              top={"0"}
              height={"150%"}
              opacity={"75"}
            /> */}
            <div className="flex h-full w-full items-end p-6 z-20">
              <article className="flex flex-col gap-4 p-6">
                <div>
                  <p className="font-bold text-sm">
                    {artist.isVerified ? "☑️ Artista verificado" : "Artista"}
                  </p>
                  <strong className="text-7xl">{artist.artist}</strong>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-md">
                    14,000,000 oyentes mensuales
                  </p>
                </div>
              </article>
            </div>
          </header>
          <section className="flex w-full">
            <div className="flex flex-1 flex-col p-6 gap-6 z-20">
              <div className="flex h-16 w-full items-center gap-6">
                <button
                  onClick={handlePlay}
                  className="flex items-center justify-center h-full aspect-square bg-green-500 rounded-full text-black transition-transform duration-75 hover:scale-102"
                >
                  <Play />
                </button>
                <button className="flex h-fit border-1 border-white/50 items-center rounded-full px-4 py-2 transition-all duration-75 hover:border-white hover:scale-104">
                  <p className="font-semibold">Seguir</p>
                </button>
              </div>
            </div>
          </section>
          <section className="flex w-full">
            <div className="flex flex-1 flex-col p-6 gap-3">
              <h1 className="font-bold text-2xl">Populares</h1>
              <ul className="flex flex-col">
                {artistSongs.map((song, index) => (
                  <li
                    key={song.id}
                    className="flex w-full p-3 justify-between rounded-md hover:bg-[#424242]"
                  >
                    <div className="flex h-12 items-center gap-4">
                      <span className="font-semibold text-lg">{index + 1}</span>
                      <picture className="flex h-full aspect-square rounded-md overflow-hidden">
                        <img
                          className="h-full w-full object-cover"
                          src={song.cover}
                          alt={song.title}
                        />
                      </picture>
                      <Link to={`/song/${song.id}`} className="font-semibold underline-offset-4 decoration-white decoration-2 hover:underline">
                        {song.title}
                      </Link>
                    </div>
                    <div className="flex h-12 w-1/3 items-center gap-4">
                      <div className="flex w-full justify-between">
                        <span>155.555</span>
                        <span>{song.duration}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </section>
      </div>
    </motion.div>
  );
}
