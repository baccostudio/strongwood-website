import type { HeaderThemeConfig } from "@/types/site";

export const headerThemeConfig: HeaderThemeConfig = {
  fallbackTheme: "paper",
  menuOpenTheme: "paper",
  notFoundTheme: "black",
  footerTheme: "black",
  routeDefaults: [
    { pathname: "/", theme: "paper" },
    { pathname: "/nosotros", theme: "paper" },
    { pathname: "/contacto", theme: "paper" },
    { pathname: "/proyectos", theme: "secondary" },
    { pathname: "/proyectos/", theme: "paper", match: "prefix" },
    { pathname: "/terminos-condiciones", theme: "black" },
    { pathname: "/politica-privacidad", theme: "black" },
  ],
};
