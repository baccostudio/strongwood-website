# Lighthouse Desktop 01 - Viewport

## Problema Lighthouse
El audit `meta-viewport` fallaba porque el sitio limitaba el zoom con `maximum-scale=1`.

## Objetivo
Permitir zoom accesible sin modificar el layout ni el tamaño de los campos del formulario.

## Archivos tocados
- `src/lib/seo.ts`

## Checklist de cambios
- Se removió `maximumScale: 1` del viewport base.
- Se mantuvo `userScalable: true`.
- No se tocaron los inputs del formulario, que ya usan `18px`.

## Comandos de verificación
- `npm run lint`
- `npm run build`
- Lighthouse desktop sobre `/`

## Resultado esperado
El audit `meta-viewport` deja de aparecer como fallo de Accessibility.
