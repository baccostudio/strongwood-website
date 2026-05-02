import type { NotFoundContent } from "@/types/site";

export const notFoundContent: NotFoundContent = {
  title: "Página no encontrada | Strongwood",
  description: "La página que buscás no existe o fue movida.",
  errorLabel: "Error 404",
  heading: "Página no encontrada",
  hero: {
    title: "(404)",
    subtitleLines: ["ESTA PÁGINA", "NO EXISTE"],
    imageSrc: "/images/hero/hero-home-banner-strongwood.svg",
    imageAlt: "Detalle de muebles de madera en un ambiente cálido",
  },
  message:
    "La URL que ingresaste no está disponible.",
  ctaLabel: "Volver al inicio",
  ctaHref: "/",
  ctaAriaLabel: "Volver al inicio",
};
