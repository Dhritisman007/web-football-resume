import { type CSSProperties } from "react";

// Atmosphere only: no photos, no video. Floodlight haze, red ambient light,
// a faint pitch grid and film grain. Pure CSS and one tiny SVG.
export default function StadiumBackground({
  intense = false,
  style,
}: {
  intense?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,16,46,0.28),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_120%,rgba(139,0,0,0.35),transparent_60%)]" />
      <div
        className={`floodlight left-[-8%] ${intense ? "floodlight-intense" : ""}`}
        style={style}
      />
      <div
        className={`floodlight right-[-8%] ${intense ? "floodlight-intense" : ""}`}
        style={style}
      />
      <div className="pitch-lines absolute inset-x-0 bottom-0 h-[55%] opacity-[0.12] [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink" />
    </div>
  );
}
