import type { ThemeColor } from "@/types/site";
import { routeThemeColors } from "@/content/site/route-theme-colors";

const LEGAL_ROUTE_PATHS = new Set([
  "/terminos-condiciones",
  "/politica-privacidad",
]);

function normalizePathname(pathname: string | null | undefined) {
  if (!pathname || pathname.length === 0) {
    return "/";
  }

  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function resolveThemeColorForPath(pathname: string | null | undefined): ThemeColor {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === "/") {
    return routeThemeColors.home;
  }

  if (normalizedPathname === "/nosotros") {
    return routeThemeColors.nosotros;
  }

  if (normalizedPathname === "/contacto") {
    return routeThemeColors.contacto;
  }

  if (normalizedPathname === "/proyectos") {
    return routeThemeColors.proyectos;
  }

  if (normalizedPathname.startsWith("/proyectos/")) {
    return routeThemeColors.projectDetail;
  }

  if (LEGAL_ROUTE_PATHS.has(normalizedPathname)) {
    return routeThemeColors.legal;
  }

  return routeThemeColors.default;
}
