import { useFetch } from "../hooks/useFetch";
import { SongCard } from "./SongCard";
import { motion } from "framer-motion";

export function MainContent() {
  const { songs } = useFetch();

  if (!songs) return <p>Cargando...</p>;

  // Agrupar canciones por artista
  // 1.- usamos el reduce para convertir la lista de songs en un nuevo objeto,
  // donde recibe acc que es el acumulador y song que es cada canción del array recorrido
  // 2.- Verificar si song.artist es un array "[NEFFEX, THEFATRAT]" o un string "NEFFEX" con el Array.isArray,
  // en el caso de que sea un string, lo convertimos a un array para poder recorrerlo después
  // 3.- Recorremos el array de artistas por si la canción tiene más de uno con el artist.forEach
  // 4.- Verificamos si ese artista ya tiene un array creado en el objeto acc, y si no lo tiene,
  // lo creamos vacío: "acc["NEFFEX"] = []"
  // 5.- Añadimos la canción acutal al array de ese artista: acc[artist].push(song)
  // 6.- Y terminar el "reduce" con el "return acc", devolviendo el nuevo objeto con todos los artistas,
  // agrupados. El segundo argumento de reduce "{}" indica que acc empezará como un objeto vacío
  const groupedByArtist = songs.reduce((acc, song) => {
    const artists = Array.isArray(song.artist) ? song.artist : [song.artist];

    artists.forEach((artist) => {
      if (!acc[artist]) acc[artist] = [];
      acc[artist].push(song);
    });

    return acc;
  }, {});

  return (
    <motion.div
      key={"main"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 h-full"
    >
      <div className="flex flex-col flex-1 h-max p-8 gap-4 w-full">
        <section className="flex h-auto items-center">
          <ul className="flex gap-2">
            <li className="bg-[#333333] px-3 rounded-full flex items-center justify-center leading-none h-8">
              <span>Todo</span>
            </li>
            <li className="bg-[#333333] px-3 rounded-full flex items-center justify-center leading-none h-8">
              <span>Música</span>
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-8">
            {Object.entries(groupedByArtist).map(([artist, artistSongs]) => (
              <section key={artist} className="flex flex-col flex-1">
                <h2 className="text-3xl font-bold mb-4">Ver más de {artist}</h2>

                <div className="grid-container">
                  {artistSongs.map((song) => (
                    <SongCard key={song.id} song={song} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
