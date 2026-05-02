import type { HeaderConfig } from "@/types/site";

export const siteHeader: HeaderConfig = {
  logoAlt: "Logo de Strongwood",
  logoVariants: {
    darkSrc: "/images/brand/logo-strongwood-header-black.svg",
    beigeSrc: "/images/brand/logo-strongwood-header-beige.svg",
    whiteSrc: "/images/brand/logo-strongwood-header-white.svg",
  },
  logoButtonLabel: "Abrir menú",
  menuText: "Menú",
  closeLabel: "Cerrar",
  menuLinks: [
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  defaultVariant: "dark",
};
