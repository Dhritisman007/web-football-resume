"use client";

import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import ActionLink from "@/components/ui/ActionLink";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { isTodo, realItems } from "@/lib/content";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

// Full-screen match report. Keyboard focus is kept inside, Escape closes it,
// and the page behind does not scroll.
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[65] overflow-y-auto bg-ink/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(200,16,46,0.18),transparent_70%)]" aria-hidden="true" />
      <motion.article
        initial={reduce ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? undefined : { y: 40, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-5xl px-5 pb-24 pt-8 md:px-10 md:pt-14"
      >
        <header className="flex items-start justify-between gap-6 border-b border-line pb-8">
          <div className="flex flex-col gap-4">
            <p className="label">
              PROJECT <span className="text-red">{project.number}</span> · MATCH REPORT
            </p>
            <h2 id="project-modal-title" className="display text-[clamp(3rem,9vw,7rem)] text-chalk">
              {project.title.toUpperCase()}
            </h2>
            <p className="label flex flex-wrap gap-x-3">
              <span className="text-chalk">DHRITISMAN FC</span>
              <span className="text-red">VS</span>
              <span>{project.opponent}</span>
              <span className="text-mist">· RESULT {project.result}</span>
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="label flex min-h-11 shrink-0 items-center gap-2 border border-line-strong px-4 hover:border-red hover:text-red"
          >
            CLOSE
            <X size={16} aria-hidden="true" />
          </button>
        </header>

        <div className="mt-12 grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:gap-16">
          <div className="flex flex-col gap-14">
            <Block title="OVERVIEW">
              <p className="text-base leading-relaxed text-cream md:text-lg">{project.description}</p>
            </Block>

            <Block title="PROBLEM">
              <Todo text={project.problem} />
            </Block>

            <Block title="SOLUTION">
              <Todo text={project.solution} />
            </Block>

            <Block title="ARCHITECTURE">
              {project.architecture ? (
                <ArchitectureDiagram steps={project.architecture} />
              ) : (
                <Todo text="Add the architecture flow for this project." />
              )}
            </Block>

            <Block title="FEATURES">
              {realItems(project.features).length ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {realItems(project.features).map((feature) => (
                    <li key={feature} className="border-l-2 border-red pl-4 text-sm text-cream md:text-base">
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <Todo />
              )}
            </Block>

            <Block title="RESULTS">
              {project.results && !project.results.every(isTodo) ? (
                <ul className="list-inside list-disc space-y-2 text-sm text-cream md:text-base">
                  {project.results.filter((r) => !isTodo(r)).map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              ) : (
                <Todo text="Add measured outcomes only, with the numbers that back them up." />
              )}
            </Block>

            <Block title="CHALLENGES">
              <Todo text={project.challenges} />
            </Block>

            <Block title="WHAT I LEARNED">
              <Todo text={project.learned} />
            </Block>
          </div>

          <aside className="flex flex-col gap-10 md:sticky md:top-10 md:self-start">
            <Block title="TECH STACK">
              <ul className="flex flex-wrap gap-2">
                {realItems(project.technologies).map((tech) => (
                  <li key={tech} className="border border-line-strong px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-chalk">
                    {tech}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="LINKS">
              <div className="flex flex-col gap-3">
                <ActionLink href={project.github ?? "GITHUB_URL_HERE"} variant="ghost" external>
                  GITHUB
                </ActionLink>
                <ActionLink href={project.demo ?? "DEMO_URL_HERE"} external>
                  LIVE DEMO
                </ActionLink>
              </div>
            </Block>
          </aside>
        </div>
      </motion.article>
    </motion.div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="label flex items-center gap-3 text-chalk">
        <span className="h-px w-6 bg-red" aria-hidden="true" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function Todo({ text }: { text?: string }) {
  return (
    <p className="border border-dashed border-line-strong px-4 py-3 font-mono text-xs leading-relaxed text-mist">
      {isTodo(text) ? "TO WRITE — add this section for the project." : text}
    </p>
  );
}
