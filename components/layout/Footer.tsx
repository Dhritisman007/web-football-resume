import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="label">
          DHRITISMAN FC · {profile.season} · {profile.name}
        </p>
        <p className="label text-mist/70">Built with Next.js, Motion and Tailwind</p>
      </div>
    </footer>
  );
}
