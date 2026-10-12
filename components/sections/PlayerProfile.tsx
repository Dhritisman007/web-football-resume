"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProfilePhoto from "./ProfilePhoto";
import PlayerAttributes from "./PlayerAttributes";
import { careerGoals, profile } from "@/data/profile";

export default function PlayerProfile() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="player-profile"
      aria-labelledby="player-profile-title"
      className="relative scroll-mt-16 border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="02" eyebrow="ABOUT" title="PLAYER PROFILE" />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
          <Reveal>
            <div ref={cardRef} className="relative mx-auto w-full max-w-[420px]">
              <div className="ticket relative overflow-hidden border-line-strong bg-charcoal p-5 md:p-6">
                <div className="absolute inset-x-0 top-0 h-1 bg-red" aria-hidden="true" />

                <div className="flex items-start justify-between gap-4">
                  <span className="label">PLAYER CARD · 2027</span>
                  <span className="display text-5xl leading-none text-red">27</span>
                </div>

                <div className="relative mt-5 aspect-[4/5] overflow-hidden border border-line bg-steel">
                  <motion.div className="absolute inset-[-8%]" style={{ y: photoY }}>
                    <div className="relative h-full w-full">
                      <ProfilePhoto />
                    </div>
                  </motion.div>
                  <div className="pitch-lines absolute inset-0 opacity-30 mix-blend-overlay" aria-hidden="true" />
                </div>

                <div className="mt-6">
                  <p className="display text-[clamp(2.5rem,6vw,3.75rem)] text-chalk">
                    {profile.name.toUpperCase()}
                  </p>
                  <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
                    <Field label="POSITION" value={profile.positions.primary} wide />
                    <Field label="SECONDARY" value={profile.positions.secondary} wide />
                    <Field label="STRONG FOOT" value={profile.positions.strongFoot} />
                    <Field label="CLUB" value={profile.positions.club} />
                    <Field label="GRADUATION" value={profile.positions.graduation} />
                    <Field label="DEGREE" value="B.TECH · CSE · AIML" />
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal className="flex flex-col gap-6">
              <p className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-cream">
                Builds intelligent systems, software products and data-driven applications.
              </p>
              {profile.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-2xl text-base leading-relaxed text-mist md:text-lg">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <p className="label mb-4">TARGET ROLES</p>
              <ul className="flex flex-wrap gap-3">
                {careerGoals.targetRoles.map((role) => (
                  <li
                    key={role}
                    className="border border-line-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-chalk"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <PlayerAttributes />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <dt className="label text-[0.6rem]">{label}</dt>
      <dd className="mt-1 font-mono text-sm text-chalk">{value}</dd>
    </div>
  );
}
