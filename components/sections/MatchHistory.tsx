"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/data/projects";

export default function MatchHistory() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="match-history"
      aria-labelledby="match-history-title"
      className="relative scroll-mt-16 border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="03"
          eyebrow="PROJECTS"
          title="MATCH HISTORY"
          subtitle="Every project is a match. Every build tells a story."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05} className={index === 0 ? "lg:col-span-2" : ""}>
              <ProjectCard project={project} featured={index === 0} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
