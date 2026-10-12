// Server-side GitHub reader. Uses only public data, so no token is needed.
// The contribution calendar is not in the public REST API, so it is read from
// the same public page that github.com renders for the profile.

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0–4, as GitHub shades the calendar
}

export interface GithubRepo {
  name: string;
  url: string;
  language: string | null;
  updatedAt: string;
}

export interface GithubActivity {
  username: string;
  total: number; // contributions in the last year
  weeks: ContributionDay[][]; // columns of 7 days, Sunday first
  repos: GithubRepo[];
  totalRepos: number;
  fetchedAt: string;
}

const USERNAME_PATTERN = /^[A-Za-z0-9-]{1,39}$/;
const REVALIDATE_SECONDS = 3600;

const headers = {
  "User-Agent": "rishi-fc-portfolio",
  Accept: "application/vnd.github+json",
};

export async function getGithubActivity(username: string): Promise<GithubActivity> {
  if (!USERNAME_PATTERN.test(username)) {
    throw new Error("Invalid GitHub username");
  }

  const [calendarRes, userRes, reposRes] = await Promise.all([
    fetch(`https://github.com/users/${username}/contributions`, {
      headers: { "User-Agent": headers["User-Agent"] },
      next: { revalidate: REVALIDATE_SECONDS },
    }),
    fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    }),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    }),
  ]);

  if (!calendarRes.ok) throw new Error(`Contribution calendar returned ${calendarRes.status}`);
  if (!userRes.ok) throw new Error(`GitHub user returned ${userRes.status}`);
  if (!reposRes.ok) throw new Error(`GitHub repos returned ${reposRes.status}`);

  const calendar = parseContributionCalendar(await calendarRes.text());
  const user = (await userRes.json()) as { public_repos: number };
  const repos = (await reposRes.json()) as {
    name: string;
    html_url: string;
    language: string | null;
    updated_at: string;
    fork: boolean;
  }[];

  return {
    username,
    total: calendar.total,
    weeks: calendar.weeks,
    repos: repos
      .filter((repo) => !repo.fork)
      .slice(0, 8)
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        language: repo.language,
        updatedAt: repo.updated_at,
      })),
    totalRepos: user.public_repos,
    fetchedAt: new Date().toISOString(),
  };
}

// Reads the calendar cells, their levels, and the per-day tooltips, which hold the
// exact counts. Exported so the parser can be checked against saved HTML.
export function parseContributionCalendar(html: string): { total: number; weeks: ContributionDay[][] } {
  const totalMatch = html.match(/([\d,]+)\s*contributions?\s*in the last year/);
  const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : 0;

  const tooltips = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)/g)) {
    const text = match[2];
    const count = text.match(/^(\d[\d,]*)\s+contribution/);
    tooltips.set(match[1], count ? Number(count[1].replace(/,/g, "")) : 0);
  }

  const columns = new Map<number, (ContributionDay & { row: number })[]>();
  for (const match of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
    const tag = match[0];
    const id = tag.match(/id="contribution-day-component-(\d+)-(\d+)"/);
    const date = tag.match(/data-date="([^"]+)"/);
    const level = tag.match(/data-level="(\d)"/);
    if (!id || !date || !level) continue;

    // The id is contribution-day-component-{weekday}-{week}, so the week is the second number.
    const row = Number(id[1]);
    const column = Number(id[2]);
    const day = {
      date: date[1],
      count: tooltips.get(`contribution-day-component-${id[1]}-${id[2]}`) ?? 0,
      level: Number(level[1]),
      row,
    };
    columns.set(column, [...(columns.get(column) ?? []), day]);
  }

  const weeks = [...columns.keys()]
    .sort((a, b) => a - b)
    .map((column) =>
      (columns.get(column) ?? [])
        .sort((a, b) => a.row - b.row)
        .map(({ row: _row, ...day }) => day),
    );

  return { total, weeks };
}
