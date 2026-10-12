import ActionLink from "@/components/ui/ActionLink";
import Reveal from "@/components/ui/Reveal";
import ResumeButtons from "@/components/ui/ResumeButtons";
import { isPlaceholder, profile } from "@/data/profile";

// Contact. Each link falls back to a "TO ADD" note while it is a placeholder.
export default function FinalWhistle() {
  const email = profile.links.email;
  const emailHref = isPlaceholder(email) ? email : `mailto:${email}`;

  return (
    <section
      id="final-whistle"
      aria-labelledby="final-whistle-title"
      className="relative flex min-h-[90svh] scroll-mt-16 flex-col justify-center overflow-hidden border-t border-line px-5 py-28 md:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(139,0,0,0.4),transparent_70%)]" aria-hidden="true" />
      <div className="pitch-lines absolute inset-0 opacity-[0.07]" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12">
        <Reveal className="flex flex-col gap-6">
          <p className="label flex items-center gap-3">
            <span className="h-px w-10 bg-red" aria-hidden="true" />
            09 · CONTACT
          </p>
          <h2 id="final-whistle-title" className="sr-only">
            Final whistle
          </h2>
          <p className="display text-[clamp(4rem,14vw,13rem)] text-chalk">
            FINAL <span className="text-red">WHISTLE</span>
          </p>
          <p className="display text-[clamp(1.75rem,4vw,3rem)] text-mist">
            90+ MINUTES PLAYED. THE GAME ISN&apos;T OVER.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-8 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4 font-mono text-sm leading-relaxed text-cream md:text-base">
            <p>Looking for an engineer?</p>
            <p>Want to build something?</p>
            <p>Have an interesting problem?</p>
            <p className="display mt-4 text-4xl text-chalk md:text-5xl">LET&apos;S TALK.</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap md:flex-col md:items-stretch lg:flex-row lg:flex-wrap">
            <ActionLink href={emailHref}>EMAIL</ActionLink>
            <ActionLink href={profile.links.linkedin} external variant="ghost">
              LINKEDIN
            </ActionLink>
            <ActionLink href={profile.links.github} external variant="ghost">
              GITHUB
            </ActionLink>
            <ResumeButtons compact />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="label text-mist/70">
            {profile.name} · {profile.club} · {profile.season}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
