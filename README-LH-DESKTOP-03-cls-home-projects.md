# Lighthouse Desktop 03 - CLS Home Projects

## Problema Lighthouse
Performance mostraba CLS alto en la home, principalmente en el bloque sticky de proyectos.

## Objetivo
Reservar espacio de forma estable desde SSR y evitar cambios de altura después de la hidratación.

## Archivos tocados
- `src/components/home/HomeProjects.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/ViewportHeightScript.tsx`
- `src/app/layout.tsx`

## Checklist de cambios
- Se eliminó el cálculo de altura basado en `trackHeight` y `ResizeObserver`.
- El scroll extra del bloque sticky se conserva con `padding-bottom` calculado por CSS.
- La imagen de bajo mesada y el logo del footer tienen reserva explícita con `aspect-ratio`.
- Se inicializa `--vh` en el `<head>` antes del primer paint para evitar saltos al hidratar.

## Comandos de verificación
- `npm run lint`
- `npm run build`
- Lighthouse desktop sobre `/`
- Revisión visual en `1440x900` y `1365x768`

## Resultado esperado
CLS desktop baja por debajo de `0.1` sin alterar la composición visual.
