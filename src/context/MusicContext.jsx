import { createContext, useState, useRef, useContext } from "react";

export const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null)
  const [volume, setVolume] = useState(1.0)
  const audioRef = useRef(new Audio())

  const playSong = (song) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    audioRef.current = new Audio(song.audioUrl);
    setCurrentSong(song);
    audioRef.volume = volume;
    audioRef.current.play().catch((err) => {
      console.error("Error al reproducir el audio:", err)
    })
  };

  const pauseSong = () => {
    audioRef.current.pause()
  }

  const resumeSong = () => {
    audioRef.current.play()
  }

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        playSong,
        setVolume,
        resumeSong,
        pauseSong
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
