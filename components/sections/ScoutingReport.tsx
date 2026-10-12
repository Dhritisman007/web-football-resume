import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ResumeButtons from "@/components/ui/ResumeButtons";
import { achievements } from "@/data/achievements";
import { education } from "@/data/education";
import { transfers } from "@/data/experience";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { attributes } from "@/data/skills";

// A printable one-page summary built from the same data as the rest of the site.
export default function ScoutingReport() {
  return (
    <section
      id="scouting-report"
      aria-labelledby="scouting-report-title"
      className="relative scroll-mt-16 border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="10"
          eyebrow="RESUME"
          title="SCOUTING REPORT"
          subtitle="The resume in one place. Download the full PDF below."
        />

        <Reveal className="ticket mt-16 p-6 md:p-12">
          <header className="flex flex-col gap-3 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label">{profile.club} · {profile.season}</p>
              <h3 className="display mt-2 text-[clamp(3rem,8vw,6rem)] leading-none text-chalk">
                {profile.name.toUpperCase()}
              </h3>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-cream md:text-right">
              <p>{profile.positions.primary}</p>
              <p className="text-mist">{profile.degree}</p>
            </div>
          </header>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <ReportBlock title="TECHNICAL PROFILE">
              <ul className="flex flex-wrap gap-2">
                {attributes.map((attribute) => (
                  <li key={attribute.name} className="border border-line-strong px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-chalk/85">
                    {attribute.name}
                  </li>
                ))}
              </ul>
            </ReportBlock>

            <ReportBlock title="PROJECT HISTORY">
              <ol className="flex flex-col gap-2 font-mono text-sm text-cream">
                {projects.map((project) => (
                  <li key={project.id} className="flex gap-3">
                    <span className="text-red">{project.number}</span>
                    <span>{project.title}</span>
                  </li>
                ))}
              </ol>
            </ReportBlock>

            <ReportBlock title="EXPERIENCE">
              <ol className="flex flex-col gap-3 text-sm text-cream">
                {transfers.map((transfer) => (
                  <li key={`${transfer.year}-${transfer.organisation}`} className="flex flex-col">
                    <span className="font-mono text-xs uppercase tracking-wider text-chalk">
                      {transfer.year} · {transfer.organisation}
                    </span>
                    <span className="text-mist">{transfer.role}</span>
                  </li>
                ))}
              </ol>
            </ReportBlock>

            <ReportBlock title="EDUCATION">
              <p className="font-mono text-sm text-cream">
                {education.degree} {education.program}
              </p>
              <p className="mt-1 text-mist">
                {education.institution} · {education.specialization} · {education.period}
              </p>
            </ReportBlock>

            <ReportBlock title="ACHIEVEMENTS">
              <ul className="flex flex-col gap-2 text-sm text-cream">
                {achievements.map((item) => (
                  <li key={item.title}>
                    {item.title} <span className="text-mist">— {item.role}</span>
                  </li>
                ))}
              </ul>
            </ReportBlock>
          </div>

          <div className="mt-12 border-t border-line pt-8">
            <ResumeButtons />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReportBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="label flex items-center gap-3 text-chalk">
        <span className="h-px w-6 bg-red" aria-hidden="true" />
        {title}
      </h4>
      {children}
    </div>
  );
}
