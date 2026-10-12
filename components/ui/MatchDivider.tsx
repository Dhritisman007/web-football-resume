import Reveal from "./Reveal";

// Half-time break between two parts of the page.
export default function MatchDivider({ minute, label }: { minute: string; label: string }) {
  return (
    <Reveal className="relative flex items-center justify-center gap-6 px-5 py-10 md:px-10">
      <span className="h-px flex-1 bg-line-strong" aria-hidden="true" />
      <span className="label flex items-center gap-3 whitespace-nowrap text-chalk">
        <span className="text-red">{minute}</span>
        {label}
      </span>
      <span className="h-px flex-1 bg-line-strong" aria-hidden="true" />
    </Reveal>
  );
}
