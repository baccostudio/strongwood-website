# Content and SEO

Use this reference when the request changes copy, metadata, OG images, navigation labels, legal text, project copy, sitemap, robots, or other typed content.

## Canonical Content Sources

- `src/content/site/` owns shared site data such as header, footer, metadata, pages, preloader, and tracking.
- `src/content/home/` owns home copy, home SEO, and the work-count fallback content.
- `src/content/proyectos/` owns project list metadata, listing UI strings, featured selections, and project detail data.
- `src/content/legal/` owns legal documents for privacy and terms.

## SEO Flow

- Build page metadata through `buildMetadata()` in `src/lib/seo.ts`.
- Resolve canonical URLs from `SITE_URL`; fall back to `http://localhost:3000`.
- Keep OG images local under `public/images/` and reference them from typed content whenever possible, preferring reuse of existing source assets over duplicated OG-only copies.
- Keep page metadata in Spanish (Argentina).

## Route Checklist

- If a route slug changes, review internal links, metadata, `src/app/sitemap.ts`, and `src/app/robots.ts`.
- If a project slug or visibility changes, review `src/app/proyectos/[id]/page.tsx`, featured items in `src/content/proyectos/page.ts`, and `src/app/sitemap.ts`.
- If header or footer data changes, update the typed content module instead of hardcoding values in layout components.

## Copy Guardrails

- Preserve the existing Strongwood tone unless the user explicitly asks for a rewrite.
- Keep hero subtitles and CTA labels short enough to survive mobile layouts.
- Do not move large content objects into route components or `layout.tsx`.
