export function GradientBackground({ detailSong, top, height, opacity }) {
  return (
    <div
    id="gradient"
      style={{
        background: `
      ${detailSong.color}
    `,
      }}
      className={`absolute ${top ? `top-${top}` : ""} w-full h-${height ? `[${height}]` : "2/3"} z-0 pointer-events-none opacity-${opacity ? `[${opacity}]` : "50"}`}
    ></div>
  );
}
