"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MANAGER_MODE_EVENT } from "@/lib/events";
import { technologies, techByName } from "@/data/skills";

// Opened by five quick logo clicks, or by ↑ ↑ ↓ ↓ ← → ← → on the keyboard.
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
];

// 4-3-3 lineup as shown in the brief. The 4-3-3 is the shape, and the
// positions are the technologies, shown as players.
const lineup: { name: string; x: number; y: number; number: number }[] = [
  { name: "AI / ML", x: 50, y: 12, number: 9 },
  { name: "Python", x: 30, y: 34, number: 10 },
  { name: "Java", x: 70, y: 34, number: 11 },
  { name: "React", x: 22, y: 60, number: 7 },
  { name: "FastAPI", x: 78, y: 60, number: 8 },
  { name: "PostgreSQL", x: 32, y: 80, number: 2 },
  { name: "DSA", x: 68, y: 80, number: 4 },
  { name: "DHRITISMAN", x: 50, y: 92, number: 27 },
];

const tactics = ["BUILD", "EXPERIMENT", "ANALYZE", "DEPLOY", "ITERATE"];

export default function ManagerMode() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Open from the logo event.
  useEffect(() => {
    const onEvent = () => setOpen(true);
    window.addEventListener(MANAGER_MODE_EVENT, onEvent);
    return () => window.removeEventListener(MANAGER_MODE_EVENT, onEvent);
  }, []);

  // Konami code opens it. Typing in a field never triggers it.
  useEffect(() => {
    let index = 0;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(target.tagName))) return;

      if (event.key === KONAMI[index]) {
        index += 1;
        if (index === KONAMI.length) {
          index = 0;
          setOpen(true);
        }
      } else {
        index = event.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Escape closes it, and the page behind stops scrolling while it is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = picked ? techByName(picked) : undefined;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Manager mode tactical board"
          className="fixed inset-0 z-[90] overflow-y-auto bg-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="pitch-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative mx-auto flex min-h-full max-w-6xl flex-col gap-10 px-5 pb-16 pt-6 md:px-10">
            <header className="flex items-center justify-between gap-4">
              <div>
                <p className="label text-red">MANAGER MODE</p>
                <p className="display text-4xl text-chalk">DHRITISMAN FC · TACTICAL BOARD</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="label flex min-h-11 items-center gap-2 border border-line-strong px-4 hover:border-red hover:text-red"
              >
                EXIT
                <X size={16} aria-hidden="true" />
              </button>
            </header>

            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <section aria-label="Formation 4-3-3" className="flex flex-col gap-4">
                <p className="label">FORMATION · 4-3-3</p>
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-line-strong bg-[linear-gradient(180deg,#0d0d0d,#111)] md:aspect-[4/3]">
                  <div aria-hidden="true" className="absolute inset-4 border border-line">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
                    <div className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
                  </div>
                  {lineup.map((player, index) => {
                    const isPicked = picked === player.name;
                    return (
                      <motion.button
                        key={player.name}
                        type="button"
                        onClick={() => setPicked(isPicked ? null : player.name)}
                        aria-pressed={isPicked}
                        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
                        style={{ left: `${player.x}%`, top: `${player.y}%` }}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + index * 0.06, duration: 0.45 }}
                      >
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs tabular-nums md:h-12 md:w-12 ${
                            isPicked
                              ? "border-red bg-red text-chalk"
                              : player.name === "DHRITISMAN"
                                ? "border-chalk bg-chalk text-ink"
                                : "border-line-strong bg-steel text-chalk"
                          }`}
                        >
                          {player.number}
                        </span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-chalk md:text-[0.65rem]">
                          {player.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {selected ? (
                  <p className="border border-line-strong bg-charcoal p-4 font-mono text-xs leading-relaxed text-cream">
                    <span className="text-red">{selected.name}</span> · {selected.category} · USED IN{" "}
                    {selected.usedIn.join(", ")}
                  </p>
                ) : (
                  <p className="label text-mist/70">SELECT A PLAYER FOR THEIR BRIEF.</p>
                )}
              </section>

              <aside className="flex flex-col gap-10">
                <section aria-label="Tactical style" className="flex flex-col gap-4">
                  <p className="label">TACTICAL STYLE</p>
                  <ol className="flex flex-col divide-y divide-line border-y border-line">
                    {tactics.map((tactic, index) => (
                      <li key={tactic} className="flex items-baseline gap-4 py-4">
                        <span className="label w-8 text-red">{String(index + 1).padStart(2, "0")}</span>
                        <span className="display text-4xl text-chalk">{tactic}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <section aria-label="Squad size" className="flex flex-col gap-3">
                  <p className="label">SQUAD · {technologies.length} TECHNOLOGIES ON THE BENCH</p>
                  <p className="font-mono text-xs leading-relaxed text-mist">
                    The full squad is listed in the Starting XI section.
                  </p>
                </section>
              </aside>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
