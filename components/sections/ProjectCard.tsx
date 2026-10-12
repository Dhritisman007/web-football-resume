import { ArrowUpRight, ExternalLink } from "lucide-react";
import { isPlaceholder } from "@/data/profile";
import { realItems } from "@/lib/content";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
}

// One match card. The body opens the match report. The footer links to the
// live project, so a recruiter can open it without going into the report.
export default function ProjectCard({ project, featured = false, onOpen }: ProjectCardProps) {
  const tech = realItems(project.technologies);
  const shown = tech.slice(0, featured ? 6 : 4);
  const more = tech.length - shown.length;
  const demo = project.demo && !isPlaceholder(project.demo) ? project.demo : null;

  return (
    <article className="group ticket flex h-full flex-col transition-colors duration-500 hover:border-red">
      <button
        type="button"
        onClick={() => onOpen(project)}
        data-cursor="VIEW"
        aria-label={`View match: ${project.title}`}
        className="flex flex-1 flex-col gap-6 p-6 text-left md:p-8"
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
      </button>

      <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-4 md:px-8">
        {demo ? (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="ENTER"
            className="label flex min-h-11 items-center gap-2 text-chalk underline-offset-4 hover:text-red hover:underline"
          >
            LIVE DEMO
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        ) : (
          <span className="label text-mist/70">NO LIVE DEMO</span>
        )}
        <span className="label flex items-center gap-2 text-chalk">
          VIEW MATCH
          <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red" />
        </span>
      </div>
    </article>
  );
}
