# Lighthouse Desktop 04 - Static Cache / bfcache

## Problema Lighthouse
La home se servía como ruta dinámica y producción devolvía `Cache-Control: no-store`, bloqueando bfcache.

## Objetivo
Mantener la home static-first y mover el contador dinámico a una API aislada.

## Archivos tocados
- `src/components/home/HomeProjectsSection.tsx`
- `src/components/home/HomeProjects.tsx`
- `src/lib/home-project-stats-format.ts`
- `src/lib/home-project-stats.ts`
- `src/app/api/project-stats/route.ts`

## Checklist de cambios
- La home renderiza inicialmente el contador estático.
- La API `/api/project-stats` resuelve el contador live con fallback.
- El cliente hidrata el contador después del mount y conserva el fallback si la API falla.

## Comandos de verificación
- `npm run lint`
- `npm run build`
- Confirmar que `/` figura como `○ Static` en la salida de build.
- Lighthouse desktop sobre `/`

## Resultado esperado
El HTML de `/` deja de depender del fetch DB y el `no-store` queda limitado a `/api/project-stats`.
