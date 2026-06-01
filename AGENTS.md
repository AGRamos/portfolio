# AGENTS.md

## Stack
- **Astro v6** + **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, NOT `@astrojs/tailwind`)
- Tailwind v4 has no `tailwind.config.mjs` — theme tokens live in `src/styles/global.css` under `@theme {}`
- All content (experience, projects) is JSON-driven via Astro Content Collections

## Commands
- `npm run dev` — dev server on `http://localhost:4321/`
- `npm run build` — static build to `dist/`
- `npm run preview` — preview built site
- No lint/test/typecheck scripts are configured — `npm run build` is the primary verification step

## Content Collections (Astro v6 API)
- Schema lives in `src/content.config.ts` (root, NOT `src/content/config.ts` — that path is deprecated in v6)
- Each collection MUST use a loader, e.g. `loader: glob({ pattern: '**/*.json', base: './src/content/<name>' })`
- New JSON files in `src/content/experience/` or `src/content/projects/` are picked up automatically

## Conventions
- Keep client-side JS to absolute zero. Only `ThemeToggle.astro` and the inline theme-init script in `Layout.astro` use JS — both are required.
- Dark mode uses Tailwind's `class` strategy. The `<html>` element toggles `.dark`. Theme persists via `localStorage` and respects `prefers-color-scheme` on first visit.
- Color tokens: `amber-500/600/400` for accent, custom `--color-surface-*` (dark) and `--color-cream-*` (light) defined in `global.css`.
- Components are mobile-first, semantic HTML5, with ARIA labels on interactive elements.
- Tech stack tags use the monospaced pill style: `rounded-sm bg-[var(--color-cream-2)] ... font-mono`.

## Gotchas
- `@astrojs/tailwind` is NOT compatible with Astro 6 — do not reinstall it. Use `@tailwindcss/vite` only.
- Do not commit `dist/`, `node_modules/`, `.astro/`, or `.env*` (covered by `.gitignore`).
- Content collection JSON schemas are validated at build time — a missing or wrong-typed field will fail the build.