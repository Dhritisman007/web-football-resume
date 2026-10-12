"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { attributes } from "@/data/skills";

const SEGMENTS = 10;

// Self-assessed strengths, not measurements. Hovering or focusing an
// attribute reveals the technologies and projects behind it.
export default function PlayerAttributes() {
  const [activeName, setActiveName] = useState<string | null>(null);
  const active = attributes.find((attribute) => attribute.name === activeName) ?? null;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-3">
        <h3 className="display text-3xl text-chalk md:text-4xl">PLAYER ATTRIBUTES</h3>
        <p className="label text-[0.6rem] text-mist/80">SELF-ASSESSED · NOT A MEASUREMENT</p>
      </div>

      <ul className="mt-2 divide-y divide-line" onMouseLeave={() => setActiveName(null)}>
        {attributes.map((attribute) => {
          const selected = activeName === attribute.name;
          return (
            <li key={attribute.name}>
              <button
                type="button"
                aria-expanded={selected}
                onMouseEnter={() => setActiveName(attribute.name)}
                onFocus={() => setActiveName(attribute.name)}
                onClick={() => setActiveName(selected ? null : attribute.name)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-3 py-3 text-left sm:grid-cols-[minmax(0,180px)_1fr_auto] sm:gap-5"
              >
                <span
                  className={`font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                    selected ? "text-red" : "text-chalk"
                  }`}
                >
                  {attribute.name}
                </span>
                <span className="hidden gap-1 sm:flex" aria-hidden="true">
                  {Array.from({ length: SEGMENTS }).map((_, index) => (
                    <motion.span
                      key={index}
                      className="h-2 w-full"
                      initial={{ backgroundColor: "rgba(245,245,245,0.08)" }}
                      whileInView={{
                        backgroundColor:
                          index < attribute.level
                            ? selected
                              ? "#c8102e"
                              : "rgba(245,245,245,0.85)"
                            : "rgba(245,245,245,0.08)",
                      }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04, duration: 0.4 }}
                    />
                  ))}
                </span>
                <span className="label tabular-nums text-[0.6rem] text-mist">
                  {attribute.level}/10
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="min-h-[9.5rem] pt-4">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="border border-line-strong bg-charcoal p-5"
            >
              <p className="text-sm leading-relaxed text-cream">{active.note}</p>
              <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                <div>
                  <dt className="label text-[0.6rem]">TECHNOLOGIES</dt>
                  <dd className="mt-1 text-mist">{active.technologies.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="label text-[0.6rem]">USED IN</dt>
                  <dd className="mt-1 text-mist">{active.projects.join(" · ")}</dd>
                </div>
              </dl>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="label text-mist/70"
            >
              HOVER AN ATTRIBUTE TO SEE THE TECH BEHIND IT.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
