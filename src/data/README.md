# src/data — the site's content

Every word on the site comes from the YAML files in this folder. Edit them and
push: the page rebuilds itself. No code changes needed.

| File | What it drives |
| --- | --- |
| `site.yaml` | Page title, description, URL, timeline options, which sections show |
| `profile.yaml` | Name, tagline, email, CV link, social links, "Open to work" |
| `sets.yaml` | The sets: U (you), and each company or banner inside it. Each top-level set gets a column that starts the year it was founded |
| `projects.yaml` | Everything you build. `set:` puts it in a column; `started:` puts it in a year |
| `experience.yaml` | Jobs and internships → the Life column |
| `education.yaml` | Schools → the Life column |
| `certificates.yaml` | Certificates and workshops → the Life column |
| `skills.yaml` | The Toolbox section |

Each file starts with a comment that lists its fields.

## Rules of thumb

- Dates are `"YYYY"` or `"YYYY-MM"`, **in quotes**. End dates may be `present`.
- `id`s must be unique within a file. `projects.yaml → set` must match an `id` in `sets.yaml`.
- Exactly one set has `parent: null`: the universal set (U).
- Add a company: add a set with `parent: devbd1`, a `founded` date and a `tone`. It gets its own column automatically.
- Tones: `neutral`, `blue`, `orange`, `violet`, `green`, `teal`, `pink`.
- A planned project can skip `started`; it shows in the current year with a dashed outline.
- Years with nothing in them are hidden (`site.yaml → timeline.hideEmptyYears`).
- "As of" is the build date, so each deploy refreshes it.

## When something is wrong

`npm run build` (and the GitHub Pages deploy) stops with a message naming the
file, the entry and the field, for example:

```
src/data/projects.yaml has problems:
  • entry 2 (id: wickdbot) → started: use 'YYYY' or 'YYYY-MM' (in quotes)
```
