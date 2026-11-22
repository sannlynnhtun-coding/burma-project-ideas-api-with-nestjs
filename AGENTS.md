# Project UI Guidance

- Use `$a11y-design` and `$minimalist-ui` for every user-facing page or component change.
- Use `$ui-copywriting` for every user-facing text change; prefer concise, active, specific labels and keep product terms consistent.
- Target WCAG 2.2 AA with native HTML semantics, keyboard access, visible focus, readable contrast, responsive reflow, and reduced-motion support.
- Keep the interface flat and editorial: warm monochrome colors, restrained accents, system fonts, light borders, and no gradients or heavy shadows.
- Keep English and Myanmar content equivalent; mark Myanmar copy with `lang="my"`.
- For bilingual navigation, pills, tags, and buttons:
  - Avoid artificial fixed/min widths; let pills fit content naturally via `inline-flex`.
  - Apply `white-space: nowrap` across both English and Myanmar labels to prevent awkward wrapping.
  - Adjust `:lang(my)` line-height inside buttons/pills to `1.4` for proper vertical centering without clipping diacritics.
- In catalog and dataset listing sections (e.g. `#catalog`), keep API entries sorted alphabetically (A to Z) by default.
- Reuse existing HTML, CSS, SVG assets, and test tooling before adding dependencies.
