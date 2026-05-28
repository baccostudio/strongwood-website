# Contact Flow

Use this reference when changing contact content, validation, SMTP behavior, or the notification email output.

## File Map

- `src/content/site/pages.ts` owns `/contacto` copy, field definitions, select options, and email labels.
- `src/types/site/pages.ts` owns the contact page and action-state types.
- `src/app/contacto/page.tsx` composes the page.
- `src/app/contacto/actions.ts` validates input and dispatches the email send.
- `src/lib/contact-mailer.ts` builds SMTP config and sends the message.

## Validation Rules

- Required fields are `fullName`, `email`, `serviceType`, and `message`.
- Max lengths come from typed content for fields and textarea.
- Email validity uses a basic regex in the server action.
- `serviceType` must match one of the configured select options.

## SMTP Rules

- Required envs: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`.
- Optional envs: `SMTP_FROM`, `SMTP_TO`.
- `SMTP_SECURE` accepts truthy values `1`, `true`, `yes` and falsy values `0`, `false`, `no`.
- `SMTP_TO` defaults to `SMTP_USER` when omitted.
- Keep mail subject, labels, and fallback phone text sourced from typed content instead of hardcoding them in the mailer.

## UI Guardrails

- Keep all visible text and validation messages in Spanish (Argentina).
- Keep contact icons and imagery local under `public/images/`.
- If form fields change, update content, types, action validation, and form rendering together.
