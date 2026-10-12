"use client";

import { motion, useReducedMotion } from "motion/react";

// Vertical pipeline. Each stage lights up in turn as it enters the view, and
// a light packet travels down between stages.
export default function ArchitectureDiagram({ steps }: { steps: string[] }) {
  const reduce = useReducedMotion();

  return (
    <ol className="flex flex-col items-stretch gap-0" aria-label="Architecture flow">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-col items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
            className="w-full max-w-md border border-line-strong bg-steel px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-chalk"
          >
            {step}
          </motion.div>

          {index < steps.length - 1 ? (
            <div className="relative flex h-8 w-px justify-center bg-line" aria-hidden="true">
              {reduce ? null : (
                <motion.span
                  className="absolute top-0 h-2 w-2 -translate-x-[3px] rounded-full bg-red"
                  animate={{ y: ["0%", "400%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                />
              )}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
