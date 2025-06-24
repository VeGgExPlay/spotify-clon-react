export function SongInfo({ song, artistName }) {
  return (
    <div className="flex w-full h-full gap-3 items-center">
      <picture className="aspect-square h-full rounded-md overflow-hidden">
        <img className="h-full w-full object-cover" src={song.cover} alt="" />
      </picture>
      <div className="hidden sm:flex flex-col">
        <header>
          <strong className="text-md">{song.title}</strong>
        </header>
        <footer>
          <span className="text-xs opacity-75">{artistName}</span>
        </footer>
      </div>
    </div>
  );
}
