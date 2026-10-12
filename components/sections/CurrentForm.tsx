"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { isPlaceholder, profile } from "@/data/profile";
import type { ContributionDay, GithubRepo } from "@/lib/github";

interface ActivityResponse {
  configured: boolean;
  error?: string;
  username?: string;
  total?: number;
  weeks?: ContributionDay[][];
  repos?: GithubRepo[];
  totalRepos?: number;
  fetchedAt?: string;
}

type LoadState =
  | { status: "loading" }
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "ready"; data: ActivityResponse };

// Shades for the activity levels GitHub reports (0 = no activity).
const LEVEL_COLORS = ["#161616", "#3a0a12", "#6b0f1c", "#a3142a", "#c8102e"];

// Live from GitHub through /api/github, which reads public data only and caches it.
export default function CurrentForm() {
  const configured = !isPlaceholder(profile.githubUsername);
  const [state, setState] = useState<LoadState>({ status: configured ? "loading" : "idle" });

  useEffect(() => {
    if (!configured) return;
    const controller = new AbortController();

    fetch("/api/github", { signal: controller.signal })
      .then(async (res) => {
        const data = (await res.json()) as ActivityResponse;
        if (!res.ok || data.error) throw new Error(data.error ?? `Request failed (${res.status})`);
        setState({ status: "ready", data });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          message: error instanceof Error ? error.message : "Could not load GitHub data",
        });
      });

    return () => controller.abort();
  }, [configured]);

  const ready = state.status === "ready" ? state.data : null;
  const languages = ready
    ? [...new Set((ready.repos ?? []).map((repo) => repo.language).filter((l): l is string => Boolean(l)))]
    : [];

  return (
    <section
      id="current-form"
      aria-labelledby="current-form-title"
      className="relative scroll-mt-16 border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="08"
          eyebrow="GITHUB"
          title="CURRENT FORM"
          subtitle={`Live contributions and repositories from github.com/${profile.githubUsername}.`}
        />

        {!configured ? (
          <Reveal className="mt-10 border border-dashed border-line-strong p-5">
            <p className="font-mono text-xs leading-relaxed text-mist">
              NOT CONNECTED. Set the GitHub username in <span className="text-chalk">data/profile.ts</span> to load
              live activity.
            </p>
          </Reveal>
        ) : null}

        {state.status === "error" ? (
          <Reveal className="mt-10 border border-red/60 p-5">
            <p className="font-mono text-xs leading-relaxed text-mist">COULD NOT LOAD FORM: {state.message}</p>
          </Reveal>
        ) : null}

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Stat
            label="CONTRIBUTIONS · LAST YEAR"
            value={ready?.total !== undefined ? ready.total.toLocaleString() : "—"}
            note={ready ? "Commits, pull requests and issues" : state.status === "loading" ? "Loading…" : "Awaiting data"}
          />
          <Stat
            label="REPOSITORIES"
            value={ready?.totalRepos !== undefined ? String(ready.totalRepos) : "—"}
            note={ready ? "Public, from GitHub" : "Awaiting data"}
          />
          <Stat
            label="LANGUAGES"
            value={ready ? String(languages.length) : "—"}
            note={languages.length ? languages.slice(0, 4).join(" · ") : "Awaiting data"}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="ticket p-6 md:p-8">
            <p className="label mb-6">RECENT ACTIVITY · LAST 12 MONTHS</p>
            <Heatmap weeks={ready?.weeks ?? []} />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[0.6rem] uppercase tracking-wider text-mist/80">
              <span>{ready?.fetchedAt ? `Updated ${new Date(ready.fetchedAt).toLocaleDateString()}` : "Live from GitHub"}</span>
              <span className="flex items-center gap-1.5" aria-hidden="true">
                LESS
                {LEVEL_COLORS.map((color) => (
                  <span key={color} className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: color }} />
                ))}
                MORE
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="border border-line-strong bg-charcoal p-6 md:p-8">
            <p className="label mb-6">RECENT REPOSITORIES</p>
            {ready?.repos?.length ? (
              <ul className="flex flex-col divide-y divide-line">
                {ready.repos.slice(0, 5).map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="VIEW"
                      className="flex items-center justify-between gap-4 py-3 hover:text-red"
                    >
                      <span className="truncate font-mono text-sm">{repo.name}</span>
                      <span className="label shrink-0 text-[0.55rem]">{repo.language ?? "—"}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono text-xs leading-relaxed text-mist">
                {state.status === "loading" ? "LOADING FORM…" : "NO REPOSITORIES LOADED."}
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Reveal className="border border-line-strong bg-charcoal p-6">
      <p className="label text-[0.6rem]">{label}</p>
      <p className="display mt-3 text-6xl text-chalk">{value}</p>
      <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-wider text-mist/80">{note}</p>
    </Reveal>
  );
}

// 53 weeks of 7 days, Sunday at the top, shaded by GitHub's own activity level.
function Heatmap({ weeks }: { weeks: ContributionDay[][] }) {
  const days = weeks.flat();
  const summary = days.length
    ? `${days.filter((d) => d.count > 0).length} active days in the last year`
    : "Loading contribution calendar";

  if (!weeks.length) {
    return (
      <div
        role="img"
        aria-label={summary}
        className="grid grid-flow-col gap-[3px] opacity-40"
        style={{ gridTemplateColumns: "repeat(53, minmax(0, 1fr))", gridTemplateRows: "repeat(7, auto)" }}
      >
        {Array.from({ length: 53 * 7 }).map((_, index) => (
          <span key={index} className="aspect-square rounded-[2px] bg-steel" />
        ))}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={summary}
      className="grid grid-flow-col gap-[3px]"
      style={{
        gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
        gridTemplateRows: "repeat(7, auto)",
      }}
    >
      {days.map((day) => (
        <span
          key={day.date}
          title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
          className="aspect-square rounded-[2px]"
          style={{ backgroundColor: LEVEL_COLORS[Math.min(day.level, 4)] }}
        />
      ))}
    </div>
  );
}
