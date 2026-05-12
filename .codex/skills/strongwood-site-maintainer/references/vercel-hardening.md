# Vercel Hardening

Use this reference when the request mentions Vercel, production-only failures, hydration issues, invalid HTML, build regressions, or runtime behavior that differs from local development.

## First Checks

1. Run `npm run lint`.
2. Run `npm run build`.
3. Inspect the changed route or component for invalid nesting, browser-only APIs during render, unstable values, and env-sensitive branches.

## Production-Sensitive Files

- `src/components/layout/InitialLoaderScript.tsx`
- `src/components/layout/Preloader.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/TrackingHeadScripts.tsx`
- `src/components/layout/TrackingNoScript.tsx`
- `src/app/page.client.tsx`
- `src/app/api/project-stats/route.ts`
- `src/lib/home-projects.ts`
- `src/lib/db.ts`
- `src/lib/contact-mailer.ts`

## Diagnosis Pattern

1. Reproduce the failing route or interaction.
2. Minimize the diff before refactoring.
3. Fix invalid markup, hydration mismatches, and script timing first.
4. Re-check client and server boundaries before assuming a framework regression.
5. Re-run lint and build before closing the task.

## Static-First Bias

- Keep public routes static unless there is a real product requirement for runtime data.
- Treat tracking, preloaders, and optional database reads as higher-risk code paths in production.
