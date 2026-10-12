"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { nextTransfer, transfers } from "@/data/experience";

export default function TransferHistory() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section
      id="transfer-history"
      aria-labelledby="transfer-history-title"
      className="relative scroll-mt-16 border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="05"
          eyebrow="EXPERIENCE"
          title="TRANSFER HISTORY"
          subtitle="Each move, in order. Select a transfer to see the detail."
        />

        <ol className="relative mt-16 flex max-w-4xl flex-col">
          {/* Timeline spine that draws itself on scroll */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[15px] top-0 h-full w-px origin-top bg-gradient-to-b from-red via-line-strong to-transparent md:left-[23px]"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {transfers.map((transfer, index) => {
            const isOpen = openIndex === index;
            const panelId = `transfer-panel-${index}`;
            return (
              <li key={`${transfer.year}-${transfer.organisation}`} className="relative">
              <Reveal delay={index * 0.08} className="relative pb-12 pl-12 md:pl-16">
                <span
                  aria-hidden="true"
                  className="absolute left-[9px] top-2 h-3 w-3 rounded-full border border-red bg-ink md:left-[17px]"
                />
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  data-cursor="VIEW"
                  className="group flex w-full flex-col gap-2 text-left"
                >
                  <span className="label text-red">{transfer.year}</span>
                  <span className="display text-[clamp(2rem,5vw,3.5rem)] text-chalk transition-colors group-hover:text-red">
                    {transfer.organisation.toUpperCase()}
                  </span>
                  <span className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-mist">
                    <span>{transfer.role}</span>
                    <span className="text-line-strong">/</span>
                    <span>{transfer.focus}</span>
                    <span className="text-line-strong">/</span>
                    <span className="normal-case tracking-normal">{transfer.period}</span>
                    <span className="ml-2 text-chalk/70 underline-offset-4 group-hover:underline">
                      {isOpen ? "HIDE DETAIL" : "VIEW DETAIL"}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 border-l-2 border-red bg-charcoal p-5">
                        {transfer.highlights.length ? (
                          <ul className="list-inside list-disc space-y-2 text-sm text-cream">
                            {transfer.highlights.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="font-mono text-xs leading-relaxed text-mist">
                            TO WRITE — add the responsibilities and outcomes for this role in
                            src/data/experience.ts.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {index < transfers.length - 1 ? (
                  <ArrowDown
                    size={14}
                    aria-hidden="true"
                    className="absolute bottom-3 left-[9px] text-red md:left-[17px]"
                  />
                ) : null}
              </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal className="relative ml-12 max-w-4xl border border-red/60 bg-charcoal p-6 md:ml-16 md:p-10">
          <p className="label mb-4 flex items-center gap-3 text-red">
            <ArrowDown size={14} aria-hidden="true" />
            NEXT TRANSFER
          </p>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
            <div>
              <p className="label text-[0.6rem]">STATUS</p>
              <p className="display mt-2 text-[clamp(3rem,7vw,5rem)] text-chalk">{nextTransfer.status}</p>
            </div>
            <div>
              <p className="label text-[0.6rem]">LOOKING FOR</p>
              <ul className="mt-3 flex flex-col gap-2">
                {nextTransfer.lookingFor.map((role) => (
                  <li key={role} className="font-mono text-sm uppercase tracking-wider text-cream">
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
