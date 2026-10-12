"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TechnologyCard from "./TechnologyCard";
import {
  startingXI,
  technologies,
  techByName,
  type Slot,
  type Tech,
  type TechCategory,
} from "@/data/skills";

const categories: TechCategory[] = ["Programming", "AI / ML", "Web", "Databases", "Blockchain", "Tools"];

export default function StartingXI() {
  const [selected, setSelected] = useState<Tech | null>(null);

  const pick = (name: string) => setSelected(techByName(name) ?? null);
  const selectedName = selected?.name ?? null;

  return (
    <section
      id="starting-xi"
      aria-labelledby="starting-xi-title"
      className="relative scroll-mt-16 border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="04"
          eyebrow="SKILLS"
          title="STARTING XI"
          subtitle="The technologies I bring onto the pitch. Select any player for details."
        />

        {/* Desktop: the formation on a pitch. */}
        <Reveal className="mt-16 hidden md:block">
          <Pitch onPick={pick} selectedName={selectedName} />
        </Reveal>

        {/* Mobile: the same XI as stacked cards, grouped by line. */}
        <div className="mt-12 grid gap-4 md:hidden">
          {formationRows().map((row, rowIndex) => (
            <Reveal key={rowIndex} delay={rowIndex * 0.05}>
              <ul className="grid gap-3 sm:grid-cols-3">
                {row.map((slot) => (
                  <li key={slot.label}>
                    <SlotCard slot={slot} active={selectedName === slot.ref} onPick={pick} wide />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {selected ? (
          <div className="mt-10">
            <TechnologyCard tech={selected} onClose={() => setSelected(null)} />
          </div>
        ) : null}

        <Reveal className="mt-20">
          <p className="label mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-red" aria-hidden="true" />
            FULL SQUAD
          </p>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="display mb-4 text-3xl text-chalk">{category.toUpperCase()}</h3>
                <ul className="flex flex-wrap gap-2">
                  {technologies
                    .filter((tech) => tech.category === category)
                    .map((tech) => {
                      const isSelected = selectedName === tech.name;
                      return (
                        <li key={tech.name}>
                          <button
                            type="button"
                            onClick={() => setSelected(tech)}
                            aria-pressed={isSelected}
                            data-cursor="VIEW"
                            className={`min-h-10 border px-3 py-2 font-mono text-[0.7rem] uppercase tracking-wider transition-colors ${
                              isSelected
                                ? "border-red bg-red text-chalk"
                                : "border-line-strong text-chalk/85 hover:border-red hover:text-red"
                            }`}
                          >
                            {tech.name}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Groups the formation by line, top to bottom, for the mobile stack.
function formationRows(): Slot[][] {
  const rows = new Map<number, Slot[]>();
  startingXI.forEach((slot) => {
    const key = Math.round(slot.y / 12);
    rows.set(key, [...(rows.get(key) ?? []), slot]);
  });
  return [...rows.keys()].sort((a, b) => a - b).map((key) => rows.get(key) ?? []);
}

function Pitch({
  onPick,
  selectedName,
}: {
  onPick: (name: string) => void;
  selectedName: string | null;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[16/11] w-full max-w-4xl overflow-hidden border border-line-strong bg-[linear-gradient(180deg,#0d0d0d,#111_50%,#0d0d0d)]">
      {/* Pitch markings */}
      <div aria-hidden="true" className="absolute inset-4 border border-line">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
        <div className="absolute left-1/2 top-1/2 h-[30%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-line-strong" />
        <div className="absolute left-0 top-1/2 h-[46%] w-[16%] -translate-y-1/2 border-y border-r border-line" />
        <div className="absolute right-0 top-1/2 h-[46%] w-[16%] -translate-y-1/2 border-y border-l border-line" />
      </div>

      {startingXI.map((slot, index) => (
        <motion.div
          key={slot.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SlotCard slot={slot} active={selectedName === slot.ref} onPick={onPick} />
        </motion.div>
      ))}
    </div>
  );
}

function SlotCard({
  slot,
  active,
  onPick,
  wide = false,
}: {
  slot: Slot;
  active: boolean;
  onPick: (name: string) => void;
  wide?: boolean;
}) {
  const size = wide ? "w-full px-4 py-4" : "min-w-[96px] px-3 py-2 md:min-w-[120px]";

  if (slot.role || !slot.ref) {
    return (
      <div
        className={`${size} border border-dashed border-line-strong bg-ink/80 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist`}
      >
        {slot.label}
      </div>
    );
  }

  const ref = slot.ref;
  return (
    <button
      type="button"
      onClick={() => onPick(ref)}
      aria-pressed={active}
      data-cursor="VIEW"
      className={`${size} border text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-all duration-300 ${
        active
          ? "border-red bg-red text-chalk"
          : "border-line-strong bg-ink/80 text-chalk hover:-translate-y-0.5 hover:border-red"
      }`}
    >
      {slot.label}
    </button>
  );
}
