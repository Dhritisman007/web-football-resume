"use client";

import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { academyStages, education } from "@/data/education";

export default function Academy() {
  const reduce = useReducedMotion();

  return (
    <section
      id="academy"
      aria-labelledby="academy-title"
      className="relative scroll-mt-16 border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="06" eyebrow="EDUCATION" title="THE ACADEMY" />

        <Reveal className="ticket mt-16 grid gap-8 p-6 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div className="flex flex-col gap-4">
            <p className="label">CLUB</p>
            <h3 className="display text-[clamp(3.5rem,9vw,7rem)] text-chalk">{education.institution}</h3>
            <p className="font-mono text-sm uppercase tracking-wider text-cream">
              {education.degree} · {education.program}
            </p>
            <p className="text-sm text-mist">{education.fullName}</p>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-mist">
              SPECIALIZATION: <span className="text-chalk">{education.specialization}</span>
            </p>
          </div>
          <dl className="flex flex-col justify-end gap-4 border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div>
              <dt className="label text-[0.6rem]">PERIOD</dt>
              <dd className="display mt-1 text-4xl text-red">{education.period}</dd>
            </div>
            <div>
              <dt className="label text-[0.6rem]">CGPA</dt>
              <dd className="mt-1 font-mono text-sm text-cream">{education.cgpa}</dd>
            </div>
            <div>
              <dt className="label text-[0.6rem]">LOCATION</dt>
              <dd className="mt-1 font-mono text-sm text-cream">{education.location}</dd>
            </div>
          </dl>
        </Reveal>

        <div className="relative mt-20">
          <p className="label mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-red" aria-hidden="true" />
            CAREER PROGRESSION
          </p>
          <ol className="grid gap-6 md:grid-cols-4 md:gap-4">
            {academyStages.map((stage, index) => (
              <motion.li
                key={stage.stage}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col gap-4 border-t-2 border-line-strong pt-6 transition-colors hover:border-red"
              >
                <span className="label text-red">{stage.stage}</span>
                <span className="display text-[clamp(2rem,4vw,2.75rem)] leading-none text-chalk">
                  {stage.label}
                </span>
                <span className="label text-[0.6rem] text-mist">{stage.years}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
