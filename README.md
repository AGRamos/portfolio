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
├── components/
│   ├── Hero.astro            # Hero section with headline + CTAs
│   ├── Timeline.astro        # Vertical experience/CV timeline
│   ├── ProjectCard.astro    # Individual project card
│   ├── Projects.astro        # Projects gallery grid
│   ├── Contact.astro         # Contact section + footer
│   └── ThemeToggle.astro     # Dark/light mode toggle button
├── content/
│   ├── experience/            # JSON files per role
│   └── projects/              # JSON files per project
├── layouts/
│   └── Layout.astro           # Base HTML layout with theme script
├── pages/
│   └── index.astro            # Main page assembling all sections
├── styles/
│   └── global.css             # Tailwind v4 + custom design tokens
└── content.config.ts          # Astro content collection schemas
```

## Content Management

All portfolio content lives in JSON files under `src/content/`. To add or update:

- **Experience** — Add/edit JSON files in `src/content/experience/`. Each entry supports `role`, `company`, `startDate`, `endDate`, `location`, `achievements`, and `technologies`.
- **Projects** — Add/edit JSON files in `src/content/projects/`. Each entry supports `title`, `description`, `technologies`, `github`, `live`, `featured`, and `order`.

No need to touch any component code — just edit the JSON.

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