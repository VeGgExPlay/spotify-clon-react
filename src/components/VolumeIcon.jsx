import { Volume, VolumeMuted } from "../icons/Library";

export function VolumeIcon({ volume }) {
  return volume === 0 ? <VolumeMuted /> : <Volume />;
}