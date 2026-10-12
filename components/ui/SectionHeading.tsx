import Reveal from "./Reveal";

interface SectionHeadingProps {
  number: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

// Shared heading for every section: number, label, huge title, optional line.
export default function SectionHeading({
  number,
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col gap-4 ${alignment}`}>
      <p className="label flex items-center gap-3">
        <span className="font-mono text-red">{number}</span>
        <span className="h-px w-8 bg-red/70" aria-hidden="true" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="display text-[clamp(3.25rem,10vw,8.5rem)] text-chalk">{title}</h2>
      {subtitle ? (
        <p className="max-w-xl text-base leading-relaxed text-mist md:text-lg">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
