# AGENTS.md

## Stack
- **Astro v6** + **Tailwind v4** wired via the `@tailwindcss/vite` plugin in `astro.config.mjs` (NOT `@astrojs/tailwind` — see Gotchas).
- Tailwind v4 has no `tailwind.config.mjs`. All design tokens (colors, fonts, animations) live in `src/styles/global.css` under `@theme {}` and `@layer utilities`.
- Content is fully JSON/MD-driven via Astro Content Collections. Astro site URL is set to `https://agramos.github.io/portfolio` and `base: '/portfolio'` in `astro.config.mjs` — canonical/OG/RSS URLs resolve there even in `dev`, and the whole site serves under the `/portfolio` subpath.
- Integrations: `@astrojs/sitemap` (emits `sitemap-index.xml` at build) and `@astrojs/mdx`.

## Commands
- `npm run dev` — dev server on `http://localhost:4321/portfolio/` (note the base subpath)
- `npm run build` — static build to `dist/` (this is the only verification step available; see Gotchas)
- `npm run preview` — preview built site
- `npm run check` — `astro check` typechecking (also runs in CI before the build). devDependencies: `@astrojs/check`, `typescript`. There are no `lint` / `test` / `format` scripts.

## Content Collections (Astro v6 API)
- Schemas in `src/content.config.ts` (root, NOT `src/content/config.ts` — that path is deprecated in v6).
- Six collections, all using loaders:
  - `experience` — JSON files in `src/content/experience/` (role, company, startDate, endDate?, location, achievements[], technologies?, order?). Sorted in `Timeline.astro` by `order` then `startDate` descending.
  - `projects` — JSON files in `src/content/projects/` (title, description, technologies[], github?, live?, caseStudy?, featured, order, summary?). Sorted in `Projects.astro` by `order`. `caseStudy` is a site-relative path (e.g. a blog post) — `Projects.astro` prefixes it with the base.
  - `blog` — `.md` / `.mdx` files in `src/content/blog/` (title, description, pubDate, updatedDate?, draft, tags[]). Rendered via `src/pages/blog/index.astro` and `src/pages/blog/[...slug].astro` (posts emit `og:type=article`, `article:published_time`, and BlogPosting JSON-LD). RSS feed at `/rss.xml` (see `src/pages/rss.xml.ts`) and `draft: true` posts are excluded.
  - `certifications` — JSON files in `src/content/certifications/` (name, issuer, year, url?, order). Sorted by `order`.
  - `education` — JSON files in `src/content/education/` (year, yearDisplay, degree, institution, detail, tags[], order). Sorted by `order` (chronological, oldest first).
  - `now` — JSON files in `src/content/now/` (label, value, detail, order). Sorted by `order`. The "Updated <month>" note is computed from the build date in `index.astro`.
- There is deliberately NO testimonials section — placeholder quotes were removed; don't reintroduce testimonials without real, verifiable quotes from the owner.
- Schemas are validated at build time — a missing or wrong-typed field will fail the build.
- Hero data (stats + rotating phrases) lives in `src/data/hero.json`, imported directly (not a content collection).

## Project Layout
```
src/
  assets/        # imported via `astro:assets` Image (e.g. Hero.astro → hero-portrait.jpg)
  components/    # 10 .astro files: Hero, Now, Timeline, Education, Skills, Projects,
                 #   Certifications, Contact, ThemeToggle, ScrollProgress
  content/       # experience/, projects/, blog/, certifications/, education/,
                 #   testimonials/, now/ (per above)
  data/          # hero.json (stats + rotating phrases for Hero section)
  layouts/       # Layout.astro (only)
  pages/         # index.astro, 404.astro, blog/index.astro, blog/[...slug].astro, rss.xml.ts
  styles/        # global.css only
public/          # favicon.svg, og-image.png (+ legacy og-image.svg), robots.txt, fonts/ (self-hosted WOFF2)
```

## Conventions
- **Client-side JS** is intentionally minimal but NOT zero. Scripts exist in `Layout.astro` (inline `is:inline` theme init to prevent FOUC), `ThemeToggle.astro` (toggle click + `.fade-up` IntersectionObserver + `aria-checked` state), `ScrollProgress.astro` (rAF-throttled scroll bar), and `Hero.astro` (rotating phrases typewriter reading `data-phrases`). Don't add more without good reason.
- **Never add attributes (e.g. `type="module"`) to a `<script>` tag that contains TypeScript** — any attribute implies `is:inline`, so Astro ships the source verbatim and the TS annotations become browser SyntaxErrors. Use a bare `<script>` (processed + transpiled) unless the script is deliberately inline plain JS (like the theme init).
- **Dark mode** uses Tailwind's `class` strategy — `<html>` toggles `.dark`. `localStorage['theme']` persists; `prefers-color-scheme` is the first-visit fallback. `Layout.astro` defaults to `class="dark"` on `<html>`.
- **Color tokens** to use: amber for accent, `var(--color-cream-*)` (light) and `var(--color-surface-*)` (dark) for surfaces, `var(--color-ink-soft/mute)` for body text. `text-amber-700 dark:text-amber-400` is the standard eyebrow/small-text pattern — amber-600 fails WCAG AA (~3:1) on cream for small text, so reserve amber-600 in light mode for large display type (`text-2xl` and up).
- **Tech stack tags** are rendered inline (see `Projects.astro:60-64`): `rounded-sm border ... bg-[var(--color-cream-1)] px-2 py-0.5 font-mono text-[10px] tracking-wider` with dark variants.
- **Skill proficiency** uses qualitative tiers (`primary` / `frequent` / `working`), never percentages. Data lives inline in `Skills.astro` (not a content collection).
- **Eyebrow labels** (e.g. "№ 06 / Selected") use `font-eyebrow text-[10px] tracking-[0.35em] uppercase`.
- **Headings** use `font-display` (Fraunces) with `font-light tracking-tight`. Section numbers run as № 01–08 in the order they appear in `index.astro`.
- **Positioning** is "Senior Salesforce Developer & AI Engineer" — use it consistently in titles, meta descriptions, the hero, and JSON-LD; don't reintroduce "Project Manager" / "Technical Lead" variants.
- **Fonts are self-hosted** — `public/fonts/` contains WOFF2 files for DM Sans, Fraunces, and JetBrains Mono (latin + latin-ext subsets). `@font-face` declarations in `global.css` handle loading with `font-display: swap` and `unicode-range`. No Google Fonts CDN request.
- **No email on the site** — the owner does not want their email address published in any form (visible, obfuscated, or in data attributes). All contact goes through LinkedIn (`https://linkedin.com/in/alejandrogrd`). Do not reintroduce a mailto link or email text anywhere.
- Components are mobile-first, semantic HTML5, with `aria-label` / `aria-labelledby` on interactive elements and landmark regions. External links use `target="_blank" rel="noopener noreferrer"`.
- **Performance target is 100/100 Lighthouse** across all categories. Use `astro:assets` `<Image />` for visual assets (automatic WebP + explicit dimensions to avoid CLS).

## Gotchas
- **Do not install `@astrojs/tailwind`** — it is incompatible with Astro 6. Use `@tailwindcss/vite` only (already wired in `astro.config.mjs`).
- **The `dark:` variant is remapped to the `.dark` class** via `@custom-variant dark (&:where(.dark, .dark *));` in `global.css`. Tailwind v4's default is the `prefers-color-scheme` media query, which silently breaks the manual theme toggle — never remove that line.
- **`tsconfig.json` extends `astro/tsconfigs/strict`** but there is no `tsc` script. Type errors only surface via `astro build` / `astro dev` and via the editor.
- **Do not commit** `dist/`, `node_modules/`, `.astro/`, or `.env*` (all in `.gitignore`).
- **Deploy is GitHub Pages** via `.github/workflows/deploy.yml`: on push to `master` (or manual dispatch), Node 22 + `npm ci` + `npm run build`, then `dist/` is uploaded and deployed with the official Pages actions. The former `netlify.toml` / `vercel.json` configs were removed.
- **`base: '/portfolio'` is set**, so every internal URL must carry the base prefix (`import.meta.env.BASE_URL`). Several hrefs are still root-relative (`/`, `/blog/`, `/favicon.svg`, `/rss.xml`, `/sitemap-index.xml`, and the `og:image` default in `Layout.astro`) and 404 on GitHub Pages — prefix them when touching those files.
- **`@astrojs/mdx`** is installed so blog posts can be `.mdx` even though the current posts are `.md`. Either is fine.
- **OG image** must be a PNG or JPG (not SVG) — most social platforms don't render SVG OG images. `Layout.astro` defaults `image` to the base-prefixed `/og-image.png`, which exists in `public/`.