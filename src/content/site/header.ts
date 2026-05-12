import type { HeaderConfig } from "@/types/site";

export const siteHeader: HeaderConfig = {
  brandLogoAlt: "Logo de la marca Strongwood",
  brandLogoHref: "/",
  logoButtonLabel: "Abrir menú",
  menuText: "Menú",
  closeLabel: "Cerrar",
  menuLinks: [
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
};
