# UI/Layout

Use this reference when the request is about layout, sections, responsiveness, shared components, animation, image treatment, or visual spacing.

## Layout Rules

- Reuse existing shared components before creating new wrappers.
- Keep named exports for components and reserve default exports for route `page.tsx` files.
- Main sections should use `py-[clamp(56px,10vw,96px)]` unless the design clearly requires an exception.
- If the section already carries that padding, keep inner wrappers at `py-0` to avoid accidental double spacing.

## Mobile Stability

- Prefer `calc(var(--vh, 1vh) * 100)` for critical viewport-height sections.
- Avoid `svh`, `lvh`, and `dvh` in animated or sticky containers.
- Preserve safe-area-aware mobile menu behavior and the stable overlay height approach already used in the repo.
- Keep subtitle adjustments page-specific through `subtitleClassName` instead of adding new one-off hero variants.

## Visual System

- Keep colors driven by CSS custom properties in `src/app/globals.css`.
- Use local images from `public/images/` through `next/image` with explicit sizing or `fill`.
- Preserve the existing Switzer self-hosted font setup.
