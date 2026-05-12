# Runtime and SEO

Use this reference when changing canonical URL handling, structured data, robots, sitemap, optional runtime data, or deploy-time behavior.

## Metadata and Canonicals

- `src/lib/seo.ts` resolves `SITE_URL` and builds metadata objects.
- `src/app/layout.tsx` sets shared metadata, structured data, and tracking wrappers.
- `src/app/sitemap.ts` and `src/app/robots.ts` depend on `getSiteUrl()`.

## Optional Runtime Data

- `src/app/api/project-stats/route.ts` returns either a DB-backed work count or the static fallback from `src/content/home/`.
- `src/lib/home-projects.ts` reads `project_code_sequence` and falls back safely on errors.
- `src/lib/db.ts` builds the optional MySQL pool from `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`.

## Production Checklist

1. Run `npm run lint`.
2. Run `npm run build`.
3. If env wiring changed, test with production-like env vars and `next start` when practical.
4. If metadata changed, verify canonical URLs, OG images, and sitemap output.
5. If the issue is Vercel-only, inspect preloader, tracking, and client component boundaries before widening the change.
