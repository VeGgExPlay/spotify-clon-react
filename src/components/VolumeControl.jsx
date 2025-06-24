import { useMusic } from "../context/MusicContext";
import { useRef } from "react";
import { VolumeIcon } from "./VolumeIcon";

export function VolumeControl() {
  const { volume, setVolume } = useMusic();

  const lastVolumeRef = useRef(null);

  // Ajustar Volumen
  const handleVolume = (event) => {
    // Formatear volumen de 100 a 1 antes de pasarlo
    const value = Number(event.target.value);
    setVolume(value / 100);
  };

  // Mutear la canción al presionar el botón y conservar el volumen anterior
  const handleMute = () => {
    if (volume === 0) {
      setVolume(lastVolumeRef.current || 0.5);
    } else {
      lastVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex sm:w-25 items-center gap-2 range-vertical">
      <button
        aria-label={volume === 0 ? "Desmutear" : "Silenciar"}
        onClick={handleMute}
        className="cursor-pointer h-4"
      >
        <VolumeIcon volume={volume} />
      </button>
      <div className="group hover:cursor-pointer flex relative w-full h-2 items-center justify-end">
        <input
          aria-label="Control de volumen"
          className="w-full h-1/2"
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
}