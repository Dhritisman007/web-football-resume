"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dhritisman-fc-intro-seen";
const BLOCKS = 20;

// Opening sequence. Shown once per browser session, about 2 seconds,
// and it can be skipped at any time.
export default function Loader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = reduce ? 500 : 2000;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => finish(), 250);
      }
    };
    frame = requestAnimationFrame(tick);

    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [visible, reduce]);

  const finish = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage can be blocked. The intro simply plays again next time.
    }
    setVisible(false);
  };

  const filled = Math.round((progress / 100) * BLOCKS);
  const bar = "█".repeat(filled) + "░".repeat(BLOCKS - filled);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <button
            type="button"
            onClick={finish}
            className="label absolute right-5 top-5 min-h-11 border border-line-strong px-4 hover:border-red hover:text-chalk"
          >
            SKIP INTRO
          </button>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <p className="display text-[clamp(3.5rem,12vw,7rem)] text-chalk">
              DHRITISMAN <span className="text-red">FC</span>
            </p>
            <p className="label">EST. 2027</p>
          </motion.div>

          <div className="mt-12 w-full max-w-sm">
            <p className="label mb-3 flex justify-between">
              <span>LOADING MATCHDAY...</span>
              <span className="tabular-nums">{progress}%</span>
            </p>
            <p
              className="font-mono text-sm tracking-tighter text-chalk"
              aria-hidden="true"
            >
              {bar}
            </p>
            <p className="sr-only" role="status">
              Loading {progress} percent
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
