import type { HomeHeroContent } from "@/types/home";

export const homeHero: HomeHeroContent = {
  images: [
    {
      alt: "Cocina con isla blanca con combinación de muebles azules y marrones",
      desktop: {
        src: "/images/home/hero/home-hero-deskt.webp",
        width: 1447,
        height: 1080,
      },
      mobile: {
        src: "/images/home/hero/home-hero-mob.webp",
        width: 440,
        height: 820,
      },
    },
  ],
  subtitleLines: ["MUEBLES A MEDIDA"],
  label: "(QUÉ HACEMOS)",
  topMarqueeItems: [
    { text: "EQUIPAMIENTO DE OBRA", weight: "medium" },
    { text: "PLACARES", weight: "medium" },
    { text: "MESAS", weight: "light" },
    { text: "COCINAS", weight: "medium" },
    { text: "BIBLIOTECAS", weight: "light" },
    { text: "CAMAS Y RESPALDOS", weight: "medium" },
    { text: "RACKS DE TV", weight: "light" },
    { text: "ESCRITORIOS", weight: "light" },
  ],
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
