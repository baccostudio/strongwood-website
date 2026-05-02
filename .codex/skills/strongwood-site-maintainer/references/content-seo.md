# Content/SEO

Use this reference when the request changes copy, navigation labels, metadata, social links, structured footer/header data, project copy, sitemap, robots, or local OG image wiring.

## Content Sources

- Keep all static copy and structured content in `src/content/`.
- If a component needs new text, add it to the typed content module first and pass it through props.
- When content shape changes, update the matching type in `src/types/`.

## SEO Rules

- Keep page metadata in Spanish (Argentina).
- Resolve canonicals from `SITE_URL` with `http://localhost:3000` as the local fallback.
- Keep OG image paths local under `public/images/og/` and reference them from content or metadata code instead of hardcoding ad hoc strings around the app.
- If a page slug changes, review `src/app/sitemap.ts`, `src/app/robots.ts`, internal links, and any project content that points to the old route.

## Copy Guardrails

- Preserve the brand tone already present in the repo unless the user asks for a rewrite.
- Keep UI strings concise and readable on mobile, especially hero subtitles and CTA labels.
- Do not move large content objects into `layout.tsx` or component files.
