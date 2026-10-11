# ELM Full-Stack Roadmap

A static, dependency-free implementation of the `Learning Roadmap.dc.html` design
from Claude Design. Three views — **Roadmap**, **Resources**, **The stack** —
with per-step progress saved to `localStorage`.

## Run

```bash
python3 -m http.server 8777
```

Then open <http://localhost:8777>. There is no build step.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Page shell — header, tab bar, progress meter, `<main>` mount point |
| `app.js` | State, rendering and progress persistence (plain ES5-style IIFE, no framework) |
| `app.css` | Page-level layout, interaction states and responsive rules |
| `data.js` | Phases, resources, purchase timing, stack, services and skips — extracted verbatim from the design source |
| `_ds/organic-…/styles.css` | The **Organic** design system: tokens (`--color-*`, `--space-*`, `--radius-*`) plus `.btn` / `.card` / `.tag` / `.table` classes |
| `Learning Roadmap.dc.html` | The imported design source. Kept as the reference for re-syncing |
| `support.js` | Claude Design canvas runtime, only used by the `.dc.html` file |

## Editing content

Edit `data.js` — nothing else needs to change. Adding a phase or a step
automatically updates the totals, the progress meter, the phase-filter chips and
the "up next" label.

Progress keys are `p<phase>-<stepIndex>`, so **reordering the steps inside a
phase will shift which ticks belong to which step**. Append rather than insert if
you want existing progress to stay meaningful.

## Design fidelity

The design expressed everything as inline styles, which cannot carry `:hover`,
`:checked` or media queries. Those moved into `app.css` as state classes
(`.is-active`, `.is-done`, `.is-complete`, `.is-started`) with the same
colour values. Two additions the design source could not express:

- an empty-state message when a filter combination matches nothing (Phase 7 has no resources);
- the header unpins below 640px, where it wraps to three rows.
