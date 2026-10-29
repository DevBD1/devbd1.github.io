# devbd1.github.io

Burak Dorman's portfolio. The page is a map of nested sets: DevBD1 (U) contains
everything, Kukso Studios and WickdAlgo are sets inside it. The sets are drawn as
columns that run down through time, so the map reads as "now" at the top and as
history going down.

- **Content:** `src/data/*.yaml` is the only place to edit. See [`src/data/README.md`](src/data/README.md).
- **Stack:** Astro 5, React (server-rendered only, no client JS), Tailwind CSS 4, shadcn/ui.
- **Deploy:** pushing to `main` builds and publishes to GitHub Pages (`.github/workflows/builddeploy.yaml`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # also validates src/data
npx astro check  # type check
```

## Layout

```
src/
  data/            canonical content (YAML) + README
  lib/content.ts   loads and validates the YAML (zod)
  lib/timeline.ts  builds the year × set model
  components/ui/   shadcn/ui primitives (button, badge, card, separator)
  components/site/ page sections (header, hero, strata grid, phone list, toolbox, footer)
  layouts/         HTML shell
  pages/index.astro
```

Add more shadcn/ui components with `npx shadcn@latest add <name>` (`components.json` is set up).
