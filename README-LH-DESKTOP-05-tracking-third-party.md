# Lighthouse Desktop 05 - Tracking Third-Party

## Problema Lighthouse
Best Practices y Performance marcaban JavaScript no usado y cookies de terceros por tags externos.

## Objetivo
Evitar carga duplicada de Meta Pixel manteniendo GTM como fuente única de tracking.

## Archivos tocados
- `src/content/site/tracking.ts`
- `src/app/layout.tsx`

## Checklist de cambios
- Se desactivó el Facebook Pixel directo.
- Google Tag Manager permanece activo.
- Se mantiene la posibilidad de que GTM cargue Google Ads, DoubleClick o Meta desde su contenedor.
- Vercel Analytics y Speed Insights solo cargan cuando existe el runtime de Vercel, evitando errores 404 en Lighthouse local.

## Comandos de verificación
- `npm run lint`
- `npm run build`
- Lighthouse desktop sobre `/`
- Revisar en Network que no haya doble carga directa de `fbevents.js` desde el código del sitio.

## Resultado esperado
Menos JavaScript externo duplicado. Los avisos de cookies pueden persistir si GTM dispara tags publicitarios.
