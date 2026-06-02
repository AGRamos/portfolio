# AGENTS.md

## Stack
- **Astro v6** + **Tailwind v4** wired via the `@tailwindcss/vite` plugin in `astro.config.mjs` (NOT `@astrojs/tailwind` — see Gotchas).
- Tailwind v4 has no `tailwind.config.mjs`. All design tokens (colors, fonts, animations) live in `src/styles/global.css` under `@theme {}` and `@layer utilities`.
- Content is fully JSON/MD-driven via Astro Content Collections. Astro site URL is set to `https://agramos.github.io/portfolio-opencode` in `astro.config.mjs` — canonical/OG/RSS URLs resolve there even in `dev`.

## Commands
- `npm run dev` — dev server on `http://localhost:4321/`
- `npm run build` — static build to `dist/` (this is the only verification step available; see Gotchas)
- `npm run preview` — preview built site
- There are no `lint` / `test` / `typecheck` / `format` scripts. `package.json` has zero `devDependencies`.

## Content Collections (Astro v6 API)
- Schemas in `src/content.config.ts` (root, NOT `src/content/config.ts` — that path is deprecated in v6).
- Three collections, all using loaders:
  - `experience` — JSON files in `src/content/experience/` (role, company, startDate, endDate?, location, achievements[], technologies?).
  - `projects` — JSON files in `src/content/projects/` (title, description, technologies[], github?, live?, featured, order, summary?). Sorted in `Projects.astro` by `order`.
  - `blog` — `.md` / `.mdx` files in `src/content/blog/` (title, description, pubDate, updatedDate?, draft, tags[]). Rendered via `src/pages/blog/index.astro` and `src/pages/blog/[...slug].astro`. RSS feed at `/rss.xml` (see `src/pages/rss.xml.ts`) and `draft: true` posts are excluded.
- Schemas are validated at build time — a missing or wrong-typed field will fail the build.

## Project Layout
```
src/
  assets/        # imported via `astro:assets` Image (e.g. Hero.astro → hero-portrait.jpg)
  components/    # 11 .astro files: Hero, Now, Timeline, Education, Skills, Projects,
                 #   Certifications, Testimonials, Contact, ThemeToggle, ScrollProgress
  content/       # experience/, projects/, blog/ (per above)
  layouts/       # Layout.astro (only)
  pages/         # index.astro, 404.astro, blog/index.astro, blog/[...slug].astro, rss.xml.ts
  styles/        # global.css only
public/          # favicon.svg, og-image.svg, cv.pdf, robots.txt
```

## Conventions
- **Client-side JS** is intentionally minimal but NOT zero. Scripts exist in `Layout.astro` (inline `is:inline` theme init to prevent FOUC), `ThemeToggle.astro` (toggle click + `.fade-up` IntersectionObserver), `ScrollProgress.astro` (rAF-throttled scroll bar), and `Hero.astro` (rotating phrases typewriter). Don't add more without good reason.
- **Dark mode** uses Tailwind's `class` strategy — `<html>` toggles `.dark`. `localStorage['theme']` persists; `prefers-color-scheme` is the first-visit fallback. `Layout.astro` defaults to `class="dark"` on `<html>`.
- **Color tokens** to use: `amber-500/600/400` for accent, `var(--color-cream-*)` (light) and `var(--color-surface-*)` (dark) for surfaces, `var(--color-ink-soft/mute)` for body text. `text-amber-600 dark:text-amber-400` is the standard eyebrow/link pattern.
- **Tech stack tags** are rendered inline (see `Projects.astro:60-64`): `rounded-sm border ... bg-[var(--color-cream-1)] px-2 py-0.5 font-mono text-[10px] tracking-wider` with dark variants.
- **Skill proficiency** uses qualitative tiers (`primary` / `frequent` / `working`), never percentages. Data lives inline in `Skills.astro` (not a content collection).
- **Eyebrow labels** (e.g. "№ 06 / Selected") use `font-eyebrow text-[10px] tracking-[0.35em] uppercase`.
- **Headings** use `font-display` (Fraunces) with `font-light tracking-tight`. Section numbers run as № 01–08 in the order they appear in `index.astro`.
- Components are mobile-first, semantic HTML5, with `aria-label` / `aria-labelledby` on interactive elements and landmark regions. External links use `target="_blank" rel="noopener noreferrer"`.

## Gotchas
- **Do not install `@astrojs/tailwind`** — it is incompatible with Astro 6. Use `@tailwindcss/vite` only (already wired in `astro.config.mjs`).
- **`tsconfig.json` extends `astro/tsconfigs/strict`** but there is no `tsc` script. Type errors only surface via `astro build` / `astro dev` and via the editor.
- **Do not commit** `dist/`, `node_modules/`, `.astro/`, or `.env*` (all in `.gitignore`).
- **Deploy targets are preconfigured** for both: `netlify.toml` (build `npm run build` → publish `dist`, security headers + immutable `/_astro/*` cache) and `vercel.json` (`framework: astro`, cleanUrls, trailingSlash: false, security headers + immutable asset cache). No CI workflows checked in (no `.github/`).
- **`@astrojs/mdx`** is installed so blog posts can be `.mdx` even though the current posts are `.md`. Either is fine.
