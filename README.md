# Portfolio OpenCode

A blazing-fast, fully responsive personal portfolio and resume website built with Astro and Tailwind CSS v4. Static-first, zero client-side JavaScript by default, targeting 100/100 Lighthouse scores.

## Tech Stack

- **Astro v6** — Static Site Generation with zero-JS by default
- **Tailwind CSS v4** — Utility-first styling via `@tailwindcss/vite`, mobile-first approach
- **Content Collections** — JSON-driven experience and projects data in `src/content/`
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
│   └── blog/                   # .md / .mdx writing
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

No need to touch any component code — just edit the data files.

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