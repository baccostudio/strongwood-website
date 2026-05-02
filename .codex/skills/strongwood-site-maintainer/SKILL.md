---
name: strongwood-site-maintainer
description: Single entry skill for the Strongwood repository. Maintain the Next.js landing, edit typed content and SEO data, and harden Vercel production behavior while preserving the repo conventions: English code, Spanish (Argentina) UI text, local assets, CSS variable colors, typed content in src/content, and static-first public routes. Use when Codex needs to decide whether a Strongwood request belongs to UI/layout work, content/SEO updates, or production hardening and then execute the matching workflow.
---

# Strongwood Site Maintainer

Use this as the only Strongwood repo skill. Start here, classify the request, then follow exactly one primary workflow unless the task is genuinely cross-cutting.

## Routing Decision

1. If the request is about sections, layout, shared components, animations, responsiveness, spacing, image rendering, or page composition, follow the `UI/Layout` workflow and read [references/ui-layout.md](./references/ui-layout.md).
2. If the request is about copy, navigation labels, metadata, OG images, legal text, sitemap, robots, footer or header data, or project content, follow the `Content/SEO` workflow and read [references/content-seo.md](./references/content-seo.md).
3. If the request is about Vercel deploy issues, hydration mismatches, invalid HTML, dynamic rendering, preloaders, tracking scripts, production-only failures, or performance regressions, follow the `Vercel Hardening` workflow and read [references/vercel-hardening.md](./references/vercel-hardening.md).
4. If the request spans more than one area, pick the blocking workflow first, complete that diagnosis or fix, then apply the secondary workflow.

## Global Rules

- Read `AGENTS.md` first and treat it as the source of truth for repo behavior.
- Keep code, identifiers, and comments in English.
- Keep all visible text, `alt`, `aria-label`, `title`, and user-facing errors in Spanish (Argentina).
- Keep route segments in English.
- Keep static content in `src/content/`; do not hardcode content arrays or long UI copy in components.
- Keep colors in `src/app/globals.css` via CSS custom properties; do not introduce hardcoded hex values in components.
- Keep images local under `public/images/` and render them through `next/image`.
- Preserve self-hosted Switzer usage from `public/fonts/switzer/`.

## UI/Layout Workflow

1. Reuse existing shared building blocks before creating new wrappers.
2. Prefer named exports for components and keep default exports only in `page.tsx`.
3. Respect section spacing standards and the `subtitleClassName` adjustment pattern already used by `PageHero`.
4. Preserve the mobile stability rules around `--vh`, safe-area padding, and sticky sections.

## Content/SEO Workflow

1. Update canonical content modules first.
2. Preserve or update matching TypeScript types when shapes change.
3. Keep metadata in Spanish (Argentina) and keep OG assets local.
4. If a route or project slug changes, review sitemap, robots, images, and cross-links.

## Vercel Hardening Workflow

1. Run `npm run lint`.
2. Run `npm run build`.
3. Keep public pages static unless a real requirement forces dynamic behavior.
4. Search first for invalid HTML, script timing issues, hydration mismatches, and env-sensitive branches before assuming router bugs.
5. Treat `InitialLoaderScript.tsx`, `Preloader.tsx`, `Header.tsx`, `TrackingHeadScripts.tsx`, `TrackingNoScript.tsx`, and `src/app/page.client.tsx` as production-sensitive hotspots.

## Validation

- Run `npm run lint`.
- Run `npm run build`.
- If navigation, layout, or production behavior changed, verify the affected route in production mode when practical.
