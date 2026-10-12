import { X } from "lucide-react";
import type { Tech } from "@/data/skills";

interface TechnologyCardProps {
  tech: Tech;
  onClose: () => void;
}

// Detail panel for one technology: where it was used and what category it is in.
export default function TechnologyCard({ tech, onClose }: TechnologyCardProps) {
  return (
    <div
      role="region"
      aria-label={`Technology details: ${tech.name}`}
      className="ticket relative mx-auto max-w-2xl p-6 md:p-8"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-3">
          <p className="label">TECHNOLOGY</p>
          <h3 className="display text-[clamp(2.5rem,6vw,4.5rem)] text-chalk">{tech.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close technology details"
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-line-strong hover:border-red hover:text-red"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
        <div>
          <dt className="label text-[0.6rem]">USED IN</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {tech.usedIn.map((project) => (
              <span key={project} className="border border-line-strong px-2.5 py-1 font-mono text-xs text-cream">
                {project}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="label text-[0.6rem]">CATEGORY</dt>
          <dd className="mt-2 font-mono text-sm text-cream">{tech.category}</dd>
        </div>
      </dl>
    </div>
  );
}
