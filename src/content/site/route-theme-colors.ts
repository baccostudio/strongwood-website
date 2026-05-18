import { siteThemeColors } from "./theme-colors";

export const routeThemeColors = {
  default: siteThemeColors.paper,
  home: siteThemeColors.paper,
  nosotros: siteThemeColors.brown,
  contacto: siteThemeColors.paper,
  proyectos: siteThemeColors.secondary,
  projectDetail: siteThemeColors.project,
  legal: siteThemeColors.paper,
  notFound: siteThemeColors.paper,
} as const;
