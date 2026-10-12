import { Award, BadgeCheck, Trophy, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { achievements, certifications, hackathons, type Achievement } from "@/data/achievements";

const icons = {
  club: Users,
  event: Award,
  hackathon: Trophy,
  certification: BadgeCheck,
  milestone: Trophy,
} as const;

export default function TrophyRoom() {
  return (
    <section
      id="trophy-room"
      aria-labelledby="trophy-room-title"
      className="relative scroll-mt-16 border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="07"
          eyebrow="ACHIEVEMENTS"
          title="TROPHY ROOM"
          subtitle="Leadership roles, events and clubs. Only confirmed items are listed."
        />

        <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
          {achievements.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="h-full">
              <Plate item={item} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <EmptyCase
            title="HACKATHONS"
            items={hackathons}
            hint="Add hackathon wins or participation to src/data/achievements.ts."
          />
          <EmptyCase
            title="CERTIFICATIONS"
            items={certifications}
            hint="Add certifications with their issuer and year to src/data/achievements.ts."
          />
        </div>
      </div>
    </section>
  );
}

function Plate({ item }: { item: Achievement }) {
  const Icon = icons[item.kind];
  return (
    <article className="group flex h-full flex-col justify-between gap-10 bg-charcoal p-7 transition-colors duration-500 hover:bg-steel md:p-8">
      <div className="flex items-center justify-between">
        <Icon size={22} strokeWidth={1.5} aria-hidden="true" className="text-red" />
        <span className="label text-[0.6rem]">{item.organisation}</span>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="display text-4xl text-chalk">{item.title.toUpperCase()}</h3>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cream">{item.role}</p>
        {item.detail ? <p className="text-sm leading-relaxed text-mist">{item.detail}</p> : null}
      </div>
    </article>
  );
}

function EmptyCase({ title, items, hint }: { title: string; items: Achievement[]; hint: string }) {
  return (
    <Reveal className="border border-dashed border-line-strong p-6 md:p-8">
      <h3 className="label mb-4 text-chalk">{title}</h3>
      {items.length ? (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.title} className="font-mono text-sm text-cream">
              {item.title} — {item.role}
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-mono text-xs leading-relaxed text-mist">NONE LISTED YET. {hint}</p>
      )}
    </Reveal>
  );
}
