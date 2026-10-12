import { ArrowDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { careerGoals } from "@/data/profile";
import { nextTransfer } from "@/data/experience";

export default function NextFixture() {
  return (
    <section
      id="next-fixture"
      aria-labelledby="next-fixture-title"
      className="relative scroll-mt-16 border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="11" eyebrow="CAREER GOALS" title="NEXT FIXTURE" />

        <Reveal className="ticket relative mt-16 overflow-hidden p-6 md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(200,16,46,0.18),transparent_70%)]" aria-hidden="true" />

          <p className="label flex items-center gap-3 text-red">
            <span className="h-2 w-2 rounded-full bg-red" aria-hidden="true" />
            UPCOMING FIXTURE
          </p>

          <div className="relative mt-8 grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <p className="display text-[clamp(3rem,9vw,7rem)] text-chalk">DHRITISMAN FC</p>
            <p className="label text-center text-red">VS</p>
            <p className="display text-[clamp(3rem,9vw,7rem)] text-mist md:text-right">THE NEXT CHALLENGE</p>
          </div>

          <dl className="relative mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <dt className="label text-[0.6rem]">DATE</dt>
              <dd className="display mt-1 text-4xl text-chalk">2027</dd>
            </div>
            <div>
              <dt className="label text-[0.6rem]">STATUS</dt>
              <dd className="display mt-1 text-4xl text-red">LOCKED IN</dd>
            </div>
            <div>
              <dt className="label text-[0.6rem]">LOOKING FOR</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {nextTransfer.lookingFor.map((role) => (
                  <span key={role} className="border border-line-strong px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-cream">
                    {role}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="mt-16">
          <p className="label mb-8">THE PATH</p>
          <ol className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-stretch md:gap-0">
            {careerGoals.path.map((step, index) => (
              <li key={step} className="flex flex-col items-start gap-3 md:flex-1 md:flex-row md:items-center">
                <span className="w-full border border-line-strong bg-charcoal px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-chalk md:text-center">
                  {step}
                </span>
                {index < careerGoals.path.length - 1 ? (
                  <>
                    <ArrowDown size={18} aria-hidden="true" className="ml-6 text-red md:hidden" />
                    <span aria-hidden="true" className="hidden h-px w-6 shrink-0 bg-red md:block" />
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
