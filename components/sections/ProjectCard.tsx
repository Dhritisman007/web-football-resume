import { ArrowUpRight } from "lucide-react";
import { realItems } from "@/lib/content";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
}

// One match card. The scoreline is words only, never invented numbers.
export default function ProjectCard({ project, featured = false, onOpen }: ProjectCardProps) {
  const tech = realItems(project.technologies);
  const shown = tech.slice(0, featured ? 6 : 4);
  const more = tech.length - shown.length;

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      data-cursor="VIEW"
      aria-label={`View match: ${project.title}`}
      className="group ticket flex h-full flex-col gap-6 p-6 text-left transition-colors duration-500 hover:border-red md:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="label">
          PROJECT <span className="text-red">{project.number}</span>
        </span>
        <span className="label border border-red/60 px-2.5 py-1 text-[0.6rem] text-cream">
          RESULT · {project.result}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-mist">
        <span className="text-chalk">DHRITISMAN FC</span>
        <span className="text-red">VS</span>
        <span>{project.opponent}</span>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="display text-[clamp(2.5rem,5vw,4rem)] text-chalk transition-colors group-hover:text-red">
          {project.title.toUpperCase()}
        </h3>
        <p className="max-w-prose text-sm leading-relaxed text-mist md:text-base">{project.summary}</p>
      </div>

      <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies">
        {shown.map((item) => (
          <li key={item} className="border border-line-strong px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-chalk/85">
            {item}
          </li>
        ))}
        {more > 0 ? (
          <li className="px-2 py-1 font-mono text-[0.65rem] uppercase text-mist">+{more}</li>
        ) : null}
      </ul>

      <span className="label flex items-center justify-between border-t border-line pt-4 text-chalk">
        VIEW MATCH
        <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red" />
      </span>
    </button>
  );
}
