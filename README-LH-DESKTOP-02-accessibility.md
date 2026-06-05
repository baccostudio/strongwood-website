# Lighthouse Desktop 02 - Accessibility

## Problema Lighthouse
Accessibility marcaba `aria-prohibited-attr` en el contador de trabajos y `color-contrast` en las reseñas compactas de la home y el footer.

## Objetivo
Corregir semántica y contraste sin rediseñar la sección de proyectos ni las cards de reseñas.

## Archivos tocados
- `src/components/home/HomeProjects.tsx`
- `src/components/shared/ContactReviewsMarquee.tsx`
- `src/app/globals.css`

## Checklist de cambios
- Se reemplazó el `aria-label` sobre `span` por texto `sr-only` y número visible `aria-hidden`.
- Se agregaron variables CSS para el fondo y textos de reseñas compactas.
- Se elevó el contraste de descripción, fecha y cuerpo de reseñas en la variante `homeCompact`.
- Se oscurecieron las variables de texto secundario del footer para cumplir AA sobre blanco.

## Comandos de verificación
- `npm run lint`
- `npm run build`
- Lighthouse desktop sobre `/`

## Resultado esperado
Los audits `aria-prohibited-attr` y `color-contrast` dejan de fallar.
