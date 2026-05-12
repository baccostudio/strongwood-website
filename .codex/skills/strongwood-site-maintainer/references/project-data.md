# Project Data

Use this reference when editing project entries, featured items, slugs, hidden states, or project assets.

## Canonical Files

- `src/content/proyectos/data.ts` owns the project array.
- `src/content/proyectos/page.ts` owns listing copy, featured selections, and page-level labels.
- `src/content/proyectos/ui.ts` owns shared detail-page UI strings and metadata templates.
- `src/types/proyectos/` defines the data contracts.

## Data Rules

- Keep `id` and `slug` stable and aligned unless there is a deliberate reason to separate them.
- Keep all user-facing text and image alt text in Spanish (Argentina).
- Keep explicit `width` and `height` values for local images.
- Store detail assets under `public/images/project-details/<project-slug-or-folder>/`.

## Hidden and Featured Items

- Use `listVariant: "comingSoon"` for non-public or teaser entries.
- If a project becomes hidden or public, review featured selections in `src/content/proyectos/page.ts`.
- If a slug changes, review `generateStaticParams()`, next-project navigation, and `src/app/sitemap.ts`.

## Themes

- Project pages rely on `.project-theme-*` classes in `src/app/globals.css`.
- When adding a new project theme, add the CSS variables there before wiring the new `themeClass` in content.
