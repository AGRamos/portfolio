# Portfolio OpenCode

A blazing-fast, fully responsive personal portfolio and resume website built with Astro and Tailwind CSS v4. Static-first with minimal client-side JavaScript (theme toggle, scroll progress, typewriter effect), targeting 100/100 Lighthouse scores.

## Tech Stack

- **Astro v6** — Static Site Generation, minimal client-side JS
- **Tailwind CSS v4** — Utility-first styling via `@tailwindcss/vite`, mobile-first approach
- **Content Collections** — JSON/Markdown-driven content in `src/content/` (experience, projects, blog, certifications, education, testimonials, now)
- **Dark/Light Mode** — Seamless theme toggle with `localStorage` persistence and `prefers-color-scheme` fallback

## Project Structure

```
src/
├── assets/                    # Imported via astro:assets (hero portrait)
├── components/                # 11 sections: Hero, Now, Timeline, Education,
│                              #   Skills, Projects, Certifications,
│                              #   Testimonials, Contact, ThemeToggle, ScrollProgress
├── content/
│   ├── experience/             # JSON files per role
│   ├── projects/               # JSON files per project
│   ├── blog/                   # .md / .mdx writing
│   ├── certifications/         # JSON files per credential
│   ├── education/              # JSON files per degree
│   ├── testimonials/           # JSON files per quote
│   └── now/                    # JSON files for the "Currently" section
├── data/
│   └── hero.json               # Hero stats + rotating phrases
├── layouts/
│   └── Layout.astro            # Base HTML layout with theme script
├── pages/
│   ├── index.astro             # Main page assembling all sections
│   ├── 404.astro
│   ├── blog/
│   │   ├── index.astro         # Writing index
│   │   └── [...slug].astro     # Post template
│   └── rss.xml.ts              # RSS feed (excludes drafts)
├── styles/
│   └── global.css              # Tailwind v4 + custom design tokens
└── content.config.ts           # Astro content collection schemas
```

## Content Management

All portfolio content lives under `src/content/`. To add or update:

- **Experience** — Add/edit JSON files in `src/content/experience/`. Each entry supports `role`, `company`, `startDate`, `endDate`, `location`, `achievements`, and `technologies`.
- **Projects** — Add/edit JSON files in `src/content/projects/`. Each entry supports `title`, `description`, `technologies`, `github`, `live`, `featured`, `order`, and `summary`.
- **Writing** — Add `.md` or `.mdx` files in `src/content/blog/`. Frontmatter: `title`, `description`, `pubDate`, `updatedDate?`, `draft`, `tags`. Set `draft: true` to hide from `/blog/` and `/rss.xml`.
- **Certifications / Education / Testimonials / Now** — JSON files in their respective `src/content/` folders, each sorted by an `order` field.
- **Hero** — Stats and rotating typewriter phrases live in `src/data/hero.json`.

No need to touch any component code — just edit the data files. Schemas in `src/content.config.ts` validate everything at build time.

## Commands

| Command           | Action                        |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start dev server on `:4321`   |
| `npm run build`   | Build static site to `dist/`  |
| `npm run preview` | Preview built site locally    |

## Design

- **Typography** — DM Sans (body) + JetBrains Mono (accents)
- **Palette** — Monochromatic with amber accent (`amber-500`), custom surface/cream tokens for both themes
- **Layout** — CSS Grid and Flexbox, responsive from mobile to desktop
- **Accessibility** — Semantic HTML5, ARIA labels, full keyboard navigability

## License

MIT