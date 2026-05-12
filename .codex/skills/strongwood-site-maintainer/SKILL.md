---
name: strongwood-site-maintainer
description: Single entry skill for the Strongwood website repository. Maintain the Next.js landing, edit typed content and SEO data, adjust shared layout and mobile stability patterns, update the project catalog and detail pages, and harden Vercel-safe production behavior including contact runtime wiring. Use when Codex needs one Strongwood skill that can classify the request first and then read the matching internal references for UI/layout, content/SEO, projects, contact flow, or runtime hardening.
---

# Strongwood Site Maintainer

Read `AGENTS.md` first and treat it as the source of truth. Use this as the only Strongwood repo skill. Start here, classify the request, then read only the internal reference files that match the task.

## Routing Workflow

1. If the request is about sections, spacing, responsiveness, shared components, hero subtitles, menu overlays, motion, or viewport stability, read [references/ui-layout.md](./references/ui-layout.md).
2. If the request is about copy, metadata, OG images, navigation labels, legal text, header or footer data, or static route SEO, read [references/content-seo.md](./references/content-seo.md).
3. If the request is about the project catalog, featured items, hidden projects, project slugs, project themes, or `/proyectos` and `/proyectos/[id]`, read [references/project-data.md](./references/project-data.md) and then [references/project-layout.md](./references/project-layout.md) when layout details matter.
4. If the request is about `/contacto`, SMTP, form validation, or notification email output, read [references/contact-flow.md](./references/contact-flow.md).
5. If the request is about canonicals, structured data, sitemap, robots, optional database-backed stats, production env wiring, or Vercel-only runtime behavior, read [references/runtime-seo.md](./references/runtime-seo.md) and [references/vercel-hardening.md](./references/vercel-hardening.md).
6. If the request spans more than one area, fix the blocking workflow first, then handle the secondary workflow with the smallest viable diff.

## Global Rules

- Keep code, identifiers, comments, and route segments in English.
- Keep UI text, alt text, aria labels, titles, and user-facing errors in Spanish (Argentina).
- Keep static content in `src/content/`; do not move long copy or data arrays into components.
- Keep matching types in `src/types/` in sync when content shapes change.
- Keep colors in `src/app/globals.css` via CSS custom properties and Tailwind tokens.
- Keep images local under `public/images/` and render them through `next/image`.
- Preserve the self-hosted Switzer setup in `public/fonts/switzer/`.
- Prefer named exports for components and reserve default exports for route `page.tsx` files.

## Working Style

1. Start from the content module or shared primitive that already owns the behavior.
2. Reuse shared components before creating new wrappers or one-off variants.
3. Preserve static-first behavior for public routes unless the feature truly requires runtime data.
4. Run `npm run lint` and `npm run build` after meaningful changes.
