# devbd1.github.io

Burak Dorman's portfolio, in two layouts built from the same data:

- **`/` — the map.** A map of nested sets: DevBD1 (U) contains everything, Kukso
  Studios and WickdAlgo are sets inside it. The sets are drawn as columns that run
  down through time, so the map reads as "now" at the top and as history going down.
- **`/resume/` — the résumé.** A plain, printable page (experience, projects, skills,
  education, certificates), opened from the map's "Open the Resume" button.
  `npm run build` also prints it to `/resume.pdf` for the "Download PDF" button.

- **Content:** `src/data/*.yaml` is the only place to edit. See [`src/data/README.md`](src/data/README.md).
- **Stack:** Astro 5, React (server-rendered only, no client JS), Tailwind CSS 4, shadcn/ui.
- **Deploy:** pushing to `main` builds and publishes to GitHub Pages (`.github/workflows/builddeploy.yaml`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # also validates src/data and writes dist/resume.pdf
npx astro check  # type check
```

The PDF step uses an installed Chrome or Edge (via `playwright-core`; no browser
download). GitHub's Ubuntu runners have Chrome. Locally the step only warns if
neither browser is found; in CI it fails the build.

## Layout

```
src/
  data/            canonical content (YAML) + README
  lib/content.ts   loads and validates the YAML (zod), date helpers
  lib/timeline.ts  builds the year × set model (map)
  components/ui/   shadcn/ui primitives (button, badge, card, separator)
  components/site/ page sections (map: header, hero, strata grid, phone list, toolbox, footer; résumé: header, sections)
  layouts/         HTML shell
  pages/index.astro   the map
  pages/resume.astro  the résumé
scripts/resume-pdf.mjs  prints dist/resume/ to dist/resume.pdf
```

Add more shadcn/ui components with `npx shadcn@latest add <name>` (`components.json` is set up).
