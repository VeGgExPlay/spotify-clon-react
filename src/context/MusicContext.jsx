import { createContext, useState, useRef, useContext, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export const MusicContext = createContext();

export function MusicProvider({ children }) {
  const { songs } = useFetch();

  const [isPaused, setIsPaused] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayList, setIsPlayList] = useState(false);
  const [playList, setPlayList] = useState(null);
  const audioRef = useRef(new Audio());

  // Escuchar los efectos del control del volumen
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // Actualizar el índice de la canción actual para controlar el next y el prev cuando cambie la canción
  useEffect(() => {
    if (!songs || !currentSong) return;

    const list = isPlayList ? playList : songs;
    const newIndex = list.findIndex((song) => song.id === currentSong.id);

    setCurrentIndex(newIndex);
  }, [currentSong, songs, playList]);

  // Escuchar los efectos/cambios del currentIndex o del songs
  useEffect(() => {
    const handleEnded = () => {
      if (isPlayList && currentIndex >= playList.length - 1) return;
      if (!isPlayList && currentIndex >= songs.length - 1) return;
      nextSong();
    };

    // Escuchar cuando se pausa la canción desde cualquier parte
    const handlePause = () => {
      setIsPaused(true);
    };

    // Escuchar cuando se resume la canción desde cualquier parte
    const handleResume = () => {
      setIsPaused(false);
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
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("play", handleResume);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, [currentIndex, songs]);

  // Escuchar cuando la música se pausa desde cualquier otra parte
  useEffect(() => {}, []);

  const nextSong = () => {
    const list = isPlayList ? playList : songs;
    const nextIndex = currentIndex + 1;

    if (currentIndex === -1 || nextIndex >= list.length) {
      return; // <- Evita continuar si estamos al final
    }

    playSong(list[nextIndex], isPlayList);
  };

  const prevSong = () => {
    if (isPlayList && playList && currentIndex > 0) {
      playSong(playList[currentIndex - 1], true);
    } else if (!isPlayList && songs && currentIndex > 0) {
      playSong(songs[currentIndex - 1]);
    }
  };

  const playSong = (song = null, isFromPlayList = false, customList = null) => {
    if (customList && Array.isArray(customList)) {
      setIsPlayList(true);
      setPlayList(customList);
      if (!song) song = customList[0];
    }

    if (!song) {
      console.warn("⚠️ Canción inválida, no se puede reproducir");
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(song.audioUrl);
    } else {
      audioRef.current.src = song.audioUrl;
    }

    // Controlar los datos del botón de control de medios del navegador
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: song.title,
        artist: Array.isArray(song.artist)
          ? song.artist.join(" & ")
          : song.artist,
        album: song.album,
        artwork: [
          {
            src: song.cover,
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
      });
    }

    // Si se pasa una lista personalizada, usarla
    if (customList && Array.isArray(customList)) {
      setIsPlayList(true);
      setPlayList(customList);
    } else if (isFromPlayList) {
      setIsPlayList(true);
    }
    // ⚠️ Solo genera la playlist si NO viene de una playlist ya existente
    if (isFromPlayList) {
      setIsPlayList(true);

      // Solo si aún no hay una playList o si la canción actual no está en ella
      const songInCurrentPlayList = playList?.some(
        (item) => item.id === song.id
      );

      if (!songInCurrentPlayList) {
        const newPlayList = songs?.filter((item) => {
          if (Array.isArray(item.artist)) {
            return item.artist.some((a) =>
              Array.isArray(song.artist)
                ? song.artist.includes(a)
                : a === song.artist
            );
          }

          return Array.isArray(song.artist)
            ? song.artist.includes(item.artist)
            : item.artist === song.artist;
        });
        setPlayList(newPlayList);
      }
    } else {
      setIsPlayList(false);
    }

    setCurrentSong(song);
    audioRef.current.play().catch((err) => {
      console.error("Error al reproducir el audio:", err);
    });
  };

  const playListStart = (customList = null) => {
    let song

    if (customList && Array.isArray(customList)) {
      setIsPlayList(true);
      setPlayList(customList);
      song = customList[0];
    } else {
      console.warn("⚠️ Canción inválida, no se puede reproducir");
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(song.audioUrl);
    } else {
      audioRef.current.src = song.audioUrl;
    }

    // Controlar los datos del botón de control de medios del navegador
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: song.title,
        artist: Array.isArray(song.artist)
          ? song.artist.join(" & ")
          : song.artist,
        album: song.album,
        artwork: [
          {
            src: song.cover,
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
      });
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

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  }

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
        playListStart,
        formatTime
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
