import { createContext, useState, useRef, useContext, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export const MusicContext = createContext();

export function MusicProvider({ children }) {
  const songs = useFetch();

  const [isPaused, setIsPaused] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio());

  // Escuchar los efectos del control del volumen
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // Actualizar el índice de la canción actual para controlar el next y el prev cuando cambie la canción
  useEffect(() => {
    if (!songs || !currentSong) return;
    const newCurrentIndex = songs?.findIndex(
      (song) => song.id === currentSong.id
    );
    setCurrentIndex(newCurrentIndex);
  }, [currentSong, songs]);

  // Escuchar los efectos/cambios del currentIndex o del songs
  useEffect(() => {
    const handleEnded = () => {
      if (currentIndex !== -1 && currentIndex < songs.length - 1) {
        playSong(songs[currentIndex + 1]);
      }
    };

    const audio = audioRef.current;

    // Establecer el audio actual en base al audio actual de la canción
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, [currentIndex, songs]);

  const nextSong = () => {
    if (currentIndex !== -1 && currentIndex < songs.length - 1) {
      playSong(songs[currentIndex + 1]);
    }
  };

  const prevSong = () => {
    if (currentIndex !== -1 && currentIndex > 0) {
      playSong(songs[currentIndex - 1]);
    }
  };

  const playSong = (song) => {
    if (isPaused) {
      setIsPaused(!isPaused);
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(song.audioUrl);
    } else {
      audioRef.current.src = song.audioUrl;
    }
    setCurrentSong(song);
    audioRef.current.play().catch((err) => {
      console.error("Error al reproducir el audio:", err);
    });
  };

  const pauseSong = () => {
    audioRef.current.pause();
  };

  const resumeSong = () => {
    audioRef.current.play();
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        playSong,
        setVolume,
        volume,
        resumeSong,
        pauseSong,
        currentTime,
        duration,
        audioRef,
        nextSong,
        prevSong,
        isPaused,
        setIsPaused,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
