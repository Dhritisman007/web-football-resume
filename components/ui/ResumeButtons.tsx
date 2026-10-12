"use client";

import { useAssetExists } from "@/hooks/useAssetExists";
import { profile } from "@/data/profile";

// Download and view buttons for /public/resume.pdf. If the file is missing,
// the buttons show as "to add" instead of linking to a 404.
export default function ResumeButtons({ compact = false }: { compact?: boolean }) {
  const exists = useAssetExists(profile.resumePath);
  const base =
    "inline-flex min-h-12 items-center justify-center gap-3 border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300";

  if (exists) {
    return (
      <div className={`flex flex-wrap gap-3 ${compact ? "" : "pt-2"}`}>
        <a
          href={profile.resumePath}
          download
          data-cursor="ENTER"
          className={`${base} border-red bg-red text-chalk hover:bg-chalk hover:text-ink`}
        >
          DOWNLOAD RESUME
        </a>
        <a
          href={profile.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="VIEW"
          className={`${base} border-line-strong text-chalk hover:border-red hover:text-red`}
        >
          VIEW RESUME
        </a>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${compact ? "" : "pt-2"}`}>
      <span
        aria-disabled="true"
        className={`${base} cursor-not-allowed border-dashed border-line-strong text-mist`}
      >
        {exists === null ? "CHECKING RESUME…" : "DOWNLOAD RESUME"}
      </span>
      {exists === false ? (
        <span className="label text-[0.6rem] text-mist/80">ADD public/resume.pdf TO ENABLE</span>
      ) : null}
    </div>
  );
}
