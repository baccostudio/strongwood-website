# Lighthouse Desktop 06 - Image / LCP Polish

## Problema Lighthouse
Lighthouse sugería mejorar descubrimiento de LCP y entrega de algunas imágenes de galería.

## Objetivo
Optimizar hints y `sizes` sin cambiar imágenes, composición ni animaciones.

## Archivos tocados
- `src/components/home/HomeProjects.tsx`
- `src/components/home/HomeCta.tsx`
- `next.config.ts`

## Checklist de cambios
- Se agregó `fetchPriority="high"` a la imagen de bajo mesada señalada como LCP.
- Se ajustaron los `sizes` desktop de la galería CTA para filas de 3 y 4 columnas.
- Se agregaron `deviceSizes` de `320` y `384` para que Next pueda servir variantes más cercanas a imágenes chicas de desktop.
- Se conservó el loading visual actual.

## Comandos de verificación
- `npm run lint`
- `npm run build`
- Lighthouse desktop sobre `/`
- Revisión visual de la CTA en desktop.

## Resultado esperado
Menos desperdicio de bytes en imágenes y mejor hint de prioridad para LCP.
