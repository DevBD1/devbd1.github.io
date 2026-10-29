# src/data — the site's content

Every word on the site comes from the YAML files in this folder. Both layouts,
the map (`/`) and the résumé (`/resume/` and its PDF), read the same files. Edit
them and push: the site rebuilds itself. No code changes needed.

| File | What it drives |
| --- | --- |
| `site.yaml` | Page title, description, URL, map options, which experience kinds each layout shows |
| `profile.yaml` | Name, headline, tagline, email, profile links, "Open to work" |
| `sets.yaml` | Map: the sets (U and each company inside it); each top-level set gets a column. Résumé: a project's set is shown as the org it was built under |
| `projects.yaml` | Map: placed by `set` and `started`. Résumé: listed in file order |
| `experience.yaml` | Map: Life column. Résumé: Experience (newest first) |
| `education.yaml` | Map: Life column. Résumé: Education (newest first) |
| `certificates.yaml` | Map: Life column. Résumé: Certificates (newest first) |
| `skills.yaml` | Map: Toolbox. Résumé: Skills |

Each file starts with a comment that lists its fields. A section with no
entries is hidden.

## Rules of thumb

- Dates are `"YYYY"` or `"YYYY-MM"`, **in quotes**. End dates may be `present`.
- `id`s must be unique within a file. `projects.yaml → set` must match an `id` in `sets.yaml`.
- Exactly one set has `parent: null`: the universal set (U).
- Add a company: add a set with `parent: devbd1`, a `founded` date and a `tone`. It gets its own column automatically.
- Tones: `neutral`, `blue`, `orange`, `violet`, `green`, `teal`, `pink`.
- A planned project can skip `started`; on the map it shows in the current year with a dashed outline.
- Empty years on the map can be hidden (`site.yaml → timeline.hideEmptyYears`).
- The map's "as of" date is the build date, so each deploy refreshes it.

## When something is wrong

`npm run build` (and the GitHub Pages deploy) stops with a message naming the
file, the entry and the field, for example:

```
src/data/projects.yaml has problems:
  • entry 2 (id: gyrolog) → started: use 'YYYY' or 'YYYY-MM' (in quotes)
```
