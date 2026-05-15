import type { HomeHeroContent } from "@/types/home";

export const homeHero: HomeHeroContent = {
  images: [
    {
      alt: "Cocina en L con muebles oscuros e iluminación lineal",
      desktop: {
        src: "/images/home/hero/hero-section-1.webp",
        width: 4096,
        height: 2725,
      },
      mobile: {
        src: "/images/home/hero/hero-section-1-mob.webp",
        width: 795,
        height: 1445,
      },
    },
    {
      alt: "Cocina con techo de madera, mesadas de madera y ventana central",
      desktop: {
        src: "/images/home/hero/hero-section-2.webp",
        width: 4096,
        height: 2725,
      },
      mobile: {
        src: "/images/home/hero/hero-section-2-mob.webp",
        width: 795,
        height: 1445,
      },
    },
    {
      alt: "Cocina en L, mesadas de madera y ventana central",
      desktop: {
        src: "/images/home/hero/hero-section-4.webp",
        width: 4096,
        height: 2725,
      },
      mobile: {
        src: "/images/home/hero/hero-section-4-mob.webp",
        width: 795,
        height: 1445,
      },
    },
    {
      alt: "Cocina con isla blanca con combinación de muebles azules y marrones",
      desktop: {
        src: "/images/home/hero/hero-section-3.webp",
        width: 4096,
        height: 2725,
      },
      mobile: {
        src: "/images/home/hero/hero-section-3-mob.webp",
        width: 795,
        height: 1445,
      },
    },
  ],
  label: "(QUÉ HACEMOS)",
  marqueeItems: [
    { text: "PLACARES", weight: "light" },
    { text: "RACKS DE TV", weight: "medium" },
    { text: "COCINAS", weight: "light" },
    { text: "ESCRITORIOS", weight: "medium" },
    { text: "CAMAS Y RESPALDOS", weight: "light" },
    { text: "MESAS", weight: "medium" },
    { text: "EQUIPAMIENTO DE OBRA", weight: "light" },
    { text: "BIBLIOTECAS", weight: "medium" },
  ],
};
