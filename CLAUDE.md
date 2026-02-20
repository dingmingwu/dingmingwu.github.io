# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static GitHub Pages site (dingmingwu.github.io) — an academic portfolio for Associate Professor Dingming Wu at Shenzhen University. There is **no build system, no package manager, and no compilation step**. Everything runs directly in the browser via CDN scripts.

## Deployment

Push to `main` branch on GitHub to deploy. GitHub Pages serves the files directly.

```bash
git add <files>
git commit -m "message"
git push origin main
```

## Tech Stack (all CDN, no local install)

Every HTML file loads these from CDN:
- **React 18** + **ReactDOM** (UMD build) — components defined with JSX
- **Babel Standalone** — transpiles JSX in-browser at runtime (via `<script type="text/babel">`)
- **Tailwind CSS** — utility classes loaded from CDN play script
- **Phosphor Icons** — `<i class="ph-fill ph-{icon-name}">` syntax
- **KaTeX** — math rendering (only in course pages)
- **Fonts**: JetBrains Mono + Inter from Google Fonts

## Architecture

### Main Portfolio (`index.html`)
A single-file React app. All data is hardcoded as JavaScript objects at the top of the `<script type="text/babel">` block:
- `personalInfo` — contact info
- `researchInterestsData` — research areas with icon names and bullet points
- `publicationsData` — `{ journals: [...], conferences: [...] }` arrays; each entry has `id`, `title`, `venue`, `year`, `authors`, `pdf` (relative path to PDF file in root)
- `booksData` — book entries with `cover` image and `url`
- `projectsData` — funded research grants
- `studentData` — `{ phd: [...], master: [...], alumni: [...] }`

The React component tree renders sections: Home → Research → Publications → Projects → Patents → Teaching → Research Team → Career (CV) → Footer. Navigation uses `scrollIntoView`. There is an animated particle canvas background (`BackgroundCanvas`).

**Author highlighting**: `dangerouslySetInnerHTML` is used to bold "Dingming Wu" in author lists via string replacement.

### Course Material Pages
`algorithm.html` is the course index. Individual topic pages (`dp.html`, `greedy.html`, `maxflow.html`, `amortized.html`, `np.html`, `complexity.html`, `divide.html`, `backtrack.html`) follow the same single-file React + Babel pattern with KaTeX for math formulas.

### Design System (shared across all pages)
- Background: `#020617` (slate-950)
- Accent color: cyan-500 (`rgb(6, 182, 212)`)
- `.glass-panel` class: dark semi-transparent background + cyan border glow on hover
- `.font-mono`: JetBrains Mono
- `SectionHeader` component pattern: small monospace subtitle + large bold heading + cyan underline bar

### Static Assets
PDF files for publications and patents are stored directly in the repository root and referenced by filename (e.g., `pdf: "p2031-wu.pdf"`). Profile photo: `58ef8c68fc22804e839d2e7fb9f2283c.png`. Book covers: `.jpg` files in root.

## Key Conventions

- To add a publication: append an object to `publicationsData.journals` or `publicationsData.conferences` in `index.html`, add the PDF file to the repo root.
- To add a patent: add a `<PatentItem>` in the Patents section JSX with the PDF filename.
- Publication IDs follow the pattern `J{n}` (journals) and `C{n}` (conferences), numbered from oldest to newest.
- The `authors` string uses `dangerouslySetInnerHTML` — "Dingming Wu" is automatically bolded; the string is otherwise plain text with no HTML.
