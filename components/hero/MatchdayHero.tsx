"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import ActionLink from "@/components/ui/ActionLink";
import StadiumBackground from "./StadiumBackground";

export default function MatchdayHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [lightsUp, setLightsUp] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  // The CTA turns the lights up and nudges the camera before scrolling on.
  const enterPitch = () => {
    setLightsUp(true);
    const target = document.getElementById("player-profile");
    window.setTimeout(
      () => {
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        setLightsUp(false);
      },
      reduce ? 0 : 700,
    );
  };

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: parallaxY }}
        animate={lightsUp && !reduce ? { scale: 1.06 } : { scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <StadiumBackground intense={lightsUp} />
      </motion.div>

      <motion.div
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-8 px-5 pb-28 md:px-10"
        style={reduce ? undefined : { y: textY }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="label flex items-center gap-3"
        >
          <span className="h-px w-10 bg-red" aria-hidden="true" />
          DHRITISMAN FC — A CAREER IN 90 MINUTES
        </motion.p>

        <h1 id="hero-title" className="flex flex-col">
          <span className="sr-only">Dhritisman Sarma, AI/ML Engineer</span>
          <Line delay={0.1} className="display text-[clamp(4.5rem,19vw,19rem)] text-chalk">
            MATCHDAY
          </Line>
          <Line
            delay={0.25}
            className="display self-end text-[clamp(3rem,11vw,10rem)] text-red"
          >
            2027
          </Line>
        </h1>

        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="flex flex-col gap-4">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="display text-[clamp(2rem,5vw,3.5rem)] text-chalk"
            >
              DHRITISMAN SARMA
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="label flex flex-col gap-1.5 text-chalk/85"
            >
              <span>COMPUTER SCIENCE × AI/ML</span>
              <span className="text-mist">SOFTWARE ENGINEER / BUILDER / PROBLEM SOLVER</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex flex-col gap-5 md:items-end"
          >
            <button
              type="button"
              onClick={enterPitch}
              data-cursor="ENTER"
              className="group relative inline-flex min-h-14 items-center gap-4 overflow-hidden border border-red bg-red px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-chalk before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-chalk before:transition-transform before:duration-500 before:ease-stadium hover:text-ink hover:before:scale-x-100"
            >
              <span className="relative z-10">ENTER THE PITCH</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </button>
            <p className="label flex items-center gap-3 text-mist">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
              </span>
              CURRENT STATUS · AVAILABLE FOR THE NEXT MOVE
            </p>
          </motion.div>
        </div>
      </motion.div>

      <a
        href="#player-profile"
        className="label absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist hover:text-chalk md:flex"
      >
        <span>SCROLL</span>
        <span className="h-10 w-px bg-gradient-to-b from-chalk to-transparent" aria-hidden="true" />
      </a>
    </section>
  );
}

function Line({
  children,
  delay,
  className,
}: {
  children: string;
  delay: number;
  className: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
