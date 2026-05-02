# Mejoras de performance y hardening

## Resumen

El repo quedo mejor parado para Vercel despues de estos ajustes:

- la home dejo de depender de MySQL y volvio a renderizarse como estatica;
- se elimino HTML invalido por `main` anidado desde el layout;
- se corrigieron errores de hooks y pureza en componentes interactivos;
- `npm run lint` y `npm run build` ya pasan en limpio.

## Ajustes aplicados hoy

### 1. Home estatica de nuevo

Se elimino la lectura dinamica del contador de trabajos desde MySQL. Para una landing, ese dato debe vivir en contenido estatico salvo que exista un requerimiento de negocio muy fuerte en contra.

Impacto:

- menos riesgo de diferencias entre local y Vercel;
- menos cold starts y menos acoplamiento a variables de entorno de base de datos;
- build mas simple y mas predecible.

### 2. Estructura HTML mas segura

El `layout` estaba envolviendo todas las paginas con un `main`, mientras las paginas ya devolvian su propio `main`. Eso genera HTML invalido y puede producir efectos raros en navegacion, accesibilidad y autocorrecciones del navegador.

Impacto:

- landmark structure valida;
- menos chances de warnings o comportamientos inconsistentes entre navegadores.

### 3. Menos fragilidad en scripts y motion

Se saco el bootstrap inicial del preloader de `dangerouslySetInnerHTML` y se dejaron los estilos `noscript` como texto directo. Tambien se corrigieron componentes con problemas de `setState` dentro de efectos y uso impuro de `Date.now()` en render.

Impacto:

- menos superficie para mismatches de hidratacion;
- menos renders en cascada;
- mejor base para depurar problemas de navegacion.

## Mejoras recomendadas siguientes

### Prioridad alta

1. Auditar el peso real de `public/images/hero/`, `public/images/home/gallery/` y `public/images/project-details/`.
   Convertir JPG/JPEG/PNG pesados a WebP o AVIF cuando no haya una razon visual para mantenerlos.

2. Revisar `sizes` y prioridad de imagen en secciones above-the-fold.
   La home ya usa `next/image`, pero conviene revisar que las imagenes criticas no descarguen tamaños mas grandes de lo necesario.

3. Probar navegacion local en modo produccion.
   Levantar la app con `next start` y recorrer home, proyectos y detalle para detectar problemas que en `dev` no aparecen.

4. Revisar el costo de scripts de tracking.
   GTM y Pixel deberian quedar fuera del camino critico todo lo posible. Si aparecen regresiones en Core Web Vitals, empezar por ahi.

### Prioridad media

1. Consolidar la logica de `--vh`.
   Hoy existe una estrategia correcta, pero distribuida entre home y header. A futuro conviene centralizarla para reducir efectos y listeners.

2. Agregar placeholders o blur para imagenes grandes de detalle si la carga perceptual sigue siendo pesada.

3. Verificar que todas las rutas usen metadata consistente y OG locales.
   No es un tema de velocidad pura, pero evita inconsistencias de deploy y de indexacion.

4. Revisar vulnerabilidades de dependencias con `npm audit`.
   Hoy quedaron 3 vulnerabilidades reportadas despues de remover `mysql2`.

### Prioridad baja

1. Evaluar una pasada de limpieza de assets no usados.
2. Medir Lighthouse en mobile para priorizar trabajo real sobre optimizacion teorica.
3. Si el tracking crece, considerar consentimiento o carga diferida mas agresiva.

## Checklist para futuros deploys

1. Correr `npm run lint`.
2. Correr `npm run build`.
3. Confirmar que la home siga siendo estatica.
4. Confirmar que no reaparezcan landmarks invalidos como `main` dentro de `main`.
5. Confirmar que no se haya reintroducido fetch dinamico o lectura de base de datos en rutas publicas.
