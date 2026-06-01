Act as an Expert Frontend Web Developer and UI/UX Designer. Your task is to build a modern, fully responsive, and blazing-fast personal portfolio and resume website from scratch.

**Tech Stack:**
* Framework: Astro (for Static Site Generation and zero-JS frontend by default)
* Styling: Tailwind CSS (mobile-first approach)
* Content Management: MDX (Markdown) Collections for projects and resume data
* UI Components: Clean HTML/CSS, no heavy UI libraries to maintain maximum performance.

**Core Requirements:**
1.  **Architecture:** The site must be completely static. No backend or database. All dynamic-looking content (projects, experience) must be driven by local JSON files or Astro Content Collections (`src/content/`) so it is easily editable by non-frontend developers.
2.  **Performance:** Must target a 100/100 Lighthouse score. Use Astro's native image optimization (`<Image />`), semantic HTML5, and keep the bundle size extremely minimal. 
3.  **Design:** Minimalist, clean, and highly professional. Implement a seamless Dark/Light mode toggle using Tailwind's dark mode feature.
4.  **Responsiveness:** Perfect rendering on mobile, tablet, and desktop viewports using CSS Grid and Flexbox.
5.  **Accessibility (a11y):** Semantic tags (main, section, article), ARIA labels where necessary, and perfect keyboard navigability are mandatory.

**Required Sections / Layout:**
* **Hero Section:** Catchy headline, brief introduction (e.g., "Senior Salesforce Developer & Technical Lead building autonomous AI systems"), and dual Call-To-Action buttons (Download CV / Contact).
* **Experience/CV Timeline:** A vertical timeline layout showcasing professional roles, companies, dates, and bullet points of achievements.
* **Projects Gallery:** A CSS grid layout displaying projects. Each project card must include a title, a short description, tech stack tags (e.g., LWC, Apex, Agentforce, Docker, Python), and external links (GitHub/Live).
* **Contact/Footer:** A clean section with social icons (LinkedIn, GitHub) and a clean `mailto:` integration.

**Output required from you:**
1.  Provide the complete terminal commands to initialize the project and install dependencies.
2.  Provide the recommended folder structure.
3.  Write the code for the main configuration files (`astro.config.mjs`, `tailwind.config.mjs`).
4.  Write the complete code for the main Layout component (`Layout.astro`), the Index page (`index.astro`), and the Project Card component (`ProjectCard.astro`).