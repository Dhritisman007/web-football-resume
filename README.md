# DHRITISMAN FC — A Career in 90 Minutes

An interactive, football-themed developer portfolio for Dhritisman Sarma.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck
```

Optional: copy `.env.example` to `.env.local` to set the site URL and GitHub username.

## Where things live

- `data/` — all content. Edit these files, not the components.
  - `profile.ts` personal details, links (placeholders end in `_HERE`), resume and photo paths
  - `projects.ts` match cards (fields set to `TODO` render as "to write")
  - `experience.ts`, `education.ts`, `achievements.ts`, `skills.ts`, `sections.ts`
- `components/` — sections, layout, hero, UI primitives, Manager Mode
- `app/` — layout, page, metadata, sitemap, robots, icon

## Assets to add

- `public/profile.jpg` portrait (shows a placeholder until added)
- `public/resume.pdf` resume (buttons show "to add" until added)
- `public/og-image.png` 1200×630 social preview

## Personal links to add (`data/profile.ts`)

- `links.email`, `links.linkedin`, `links.github`
- `githubUsername` (or `NEXT_PUBLIC_GITHUB_USERNAME`) for CURRENT FORM

## Placeholder content to finish (`data/projects.ts`)

Problem, solution, results, challenges, and learnings for each project are marked `TODO`.
