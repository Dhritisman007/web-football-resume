"use client";

import { useEffect, useState } from "react";

// Small fixed matchday indicator. The match clock follows scroll,
// running from 0' at the top to 90' at the bottom of the page.
export default function Scoreboard() {
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setMinute(Math.min(90, Math.round(progress * 90)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const finished = minute >= 90;

  return (
    <div
      className="ticket fixed bottom-4 left-4 z-40 hidden items-stretch gap-0 sm:flex"
      aria-hidden="true"
    >
      <div className="flex flex-col justify-center px-3 py-2">
        <span className="display text-base text-chalk">DHRITISMAN FC</span>
        <span className="label text-[0.55rem] text-mist">2027 SEASON</span>
      </div>
      <div className="flex min-w-16 items-center justify-center border-l border-line-strong bg-red px-3">
        <span className="font-mono text-sm tabular-nums text-chalk">
          {finished ? "FT" : `${minute}'`}
        </span>
      </div>
    </div>
  );
}
