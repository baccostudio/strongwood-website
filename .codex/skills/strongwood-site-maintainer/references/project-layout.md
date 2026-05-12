# Project Layout

Use this reference when changing the `/proyectos` page or the `/proyectos/[id]` route composition.

## Listing Page

- `src/app/proyectos/page.tsx` composes the hero, intro, work steps, and featured projects.
- `FeaturedProjectGrid` drives the desktop featured layout.
- `MobileFeaturedProjects` drives the mobile featured layout.
- Keep page-level copy in `src/content/proyectos/page.ts`.

## Detail Page

- `src/app/proyectos/[id]/page.tsx` composes `ProjectHero`, `ProjectMetaBar`, `ProjectSections`, `ProjectCarousel`, `ProjectCards`, and `NextProjectCard`.
- The detail page uses `compactSectionClass = "py-[clamp(36px,6vw,64px)]"` to keep sections tighter than the rest of the site.
- Metadata derives from `projectDetailUi.metadata.descriptionTemplate` plus the project content.

## Behavioral Guardrails

- Keep at least one non-`comingSoon` project public so next-project navigation stays meaningful.
- If changing detail ordering or visibility, verify `getProjectById()` and `getNextProject()` still behave correctly.
- If changing the card structure, preserve the content-first flow: update typed content and then adapt the presentational components.
