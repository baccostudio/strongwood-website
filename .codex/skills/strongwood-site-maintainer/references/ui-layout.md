# UI and Layout

Use this reference when the request is about layout, sections, shared components, responsiveness, motion, image treatment, or spacing.

## Shared Building Blocks

- `src/components/shared/PageHero.tsx` is the standard page hero and already supports page-specific `subtitleClassName`.
- `src/components/shared/PageIntro.tsx` and `src/components/shared/WorkSteps.tsx` are reused across marketing pages.
- `src/components/layout/Header.tsx` and `Footer.tsx` own global navigation and footer behavior.
- Reuse existing project and home sections before introducing new wrappers or variant components.

## Layout Rules

- Main sections should use `py-[clamp(56px,10vw,96px)]` unless there is a clear visual reason to break the rule.
- If the section already owns that padding, keep inner wrappers at `py-0`.
- Project detail sections are the main exception and use `py-[clamp(36px,6vw,64px)]`.

## Mobile Stability

- Prefer `calc(var(--vh, 1vh) * 100)` for critical viewport-height sections.
- Avoid `svh`, `lvh`, and `dvh` in sticky or scroll-animated containers.
- Preserve the safe-area-aware mobile menu behavior and stable overlay height pattern in `Header.tsx`.
- Preserve the width-change-only viewport recalculation pattern in `src/app/page.client.tsx`.

## Visual System

- Keep colors driven by CSS custom properties in `src/app/globals.css`.
- Use local images from `public/images/` through `next/image` with explicit dimensions or `fill`.
- Preserve the self-hosted Switzer setup and existing Tailwind token usage.
