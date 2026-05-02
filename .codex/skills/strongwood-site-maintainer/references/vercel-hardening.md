# Vercel Hardening

Use this reference when the request mentions Vercel, production-only failures, hydration issues, invalid HTML, or regressions that do not reproduce clearly in local development.

## First Checks

1. Run `npm run lint`.
2. Run `npm run build`.
3. Inspect the changed route or component for invalid nesting, browser-only APIs during render, unstable random values, and env-sensitive code paths.

## Static-First Bias

- Keep public routes static unless there is a real product requirement for dynamic behavior.
- Be careful around scripts, preloaders, and client components that can behave differently in production.

## Sensitive Files

- `src/components/layout/InitialLoaderScript.tsx`
- `src/components/layout/Preloader.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/TrackingHeadScripts.tsx`
- `src/components/layout/TrackingNoScript.tsx`
- `src/app/page.client.tsx`

## Typical Fix Pattern

- Confirm the failing route or interaction.
- Minimize the change set before refactoring.
- Prefer fixing invalid markup, hydration mismatches, and script timing first.
- Re-run lint and build before closing the task.
