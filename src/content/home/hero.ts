import type { HomeHeroContent } from "@/types/home";

export const homeHero: HomeHeroContent = {
  label: "(QUÉ HACEMOS)",
  tagline: "Diseño y fabricación de muebles a medida con identidad propia.",
  wordImage: {
    src: "/images/hero/hero-home-banner-strongwood.svg",
    alt: "Strongwood",
    width: 812,
    height: 155,
  },
  badgeText: "®",
  badgeAriaLabel: "Marca registrada",
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
  floatingImages: [
    {
      src: "/images/home/scroll-hero/amoblamiento-cocina-integral-isla-blanca-horno-embutido.webp",
      layout: {
        base: "-left-[60vw] bottom-[26vh] w-[clamp(180px,28vw,360px)]",
        desktop: "bottom-[0vh]",
      },
      zIndex: {
        base: 3,
        mobile: 10,
      },
      motion: {
        default: {
          range: [0.15, 0.9],
          range2: [0.15, 0.9],
          x: [0, 1125],
          y: [0, 0],
          r: 0,
        },
        mobile: {
          range: [0.3, 0.7],
          range2: [0.3, 0.7],
          x: [0, 650],
        },
        monitor27: {
          x: [0, 1425],
          range2: [0.15, 0.9],
        },
      },
    },
    {
      src: "/images/home/scroll-hero/cocina-con-isla-listones-madera-iluminacion-led.webp",
      layout: {
        base: "-right-[50vw] bottom-[17vh] w-[clamp(160px,22vw,280px)]",
        desktop: "bottom-[16vh]",
        monitor27: "bottom-[0vh]",
      },
      zIndex: {
        base: 8,
      },
      motion: {
        default: {
          range: [0.12, 0.9],
          range2: [0.12, 0.9],
          x: [0, -1375],
          y: [0, 0],
          r: 0,
        },
        mobile: {
          x: [0, -475],
          y: [0, -100],
        },
        monitor27: {
          x: [0, -1750],
        },
      },
    },
    {
      src: "/images/home/scroll-hero/frente-placard-piso-a-techo-diseno-minimalista-moderno.webp",
      layout: {
        base: "left-[65vw] -top-[80vh] w-[clamp(180px,26vw,340px)]",
        desktop: "left-[35vw]",
        monitor27: "left-[55vw]",
      },
      zIndex: {
        base: 12,
      },
      motion: {
        default: {
          range: [0.4, 0.9],
          range2: [0.4, 0.9],
          x: [0, -425],
          y: [0, 625],
          r: 0,
        },
        mobile: {
          range2: [0.2, 0.7],
          x: [0, -225],
          y: [0, 575],
        },
        monitor27: {
          range2: [0.3, 0.9],
          x: [0, -650],
          y: [0, 925],
        },
      },
    },
    {
      src: "/images/home/scroll-hero/mueble-cocina-blanco-nicho-madera-desayunador-moderno.webp",
      layout: {
        base: "right-[16vw] -bottom-[120vh] w-[clamp(170px,25vw,330px)]",
        monitor27: "right-[24vw]",
      },
      zIndex: {
        base: 8,
      },
      motion: {
        default: {
          range: [0.3, 0.85],
          range2: [0.3, 0.85],
          x: [0, 0],
          y: [0, -950],
          r: 0,
        },
        monitor27: {
          y: [0, -1300],
        },
      },
    },
    {
      src: "/images/home/scroll-hero/placard-moderno-puertas-vidrio-cajonera-madera-a-medida.webp",
      critical: true,
      layout: {
        base: "-left-[9vw] top-[0] w-[clamp(220px,34vw,440px)]",
      },
      zIndex: {
        base: 1,
      },
      motion: {
        default: {
          range: [0.2, 0.6],
          range2: [0.2, 0.6],
          x: [0, 200],
          y: [0, 0],
          r: 0,
        },
      },
    },
    {
      src: "/images/home/scroll-hero/mueble-bano-vanitory-flotante-madera-espejo-circular.webp",
      critical: true,
      layout: {
        base: "left-[5vw] bottom-[0vh] w-[clamp(210px,32vw,420px)]",
        desktop: "-bottom-[4vh]",
      },
      zIndex: {
        base: 9,
        mobile: 6,
      },
      motion: {
        default: {
          range: [0.26, 0.78],
          range2: [0.26, 0.78],
          x: [0, -600],
          y: [0, 0],
          r: 0,
        },
        mobile: {
          range: [0.15, 0.78],
          range2: [0.15, 0.78],
          x: [0, -150],
          y: [0, 35],
        },
      },
    },
    {
      src: "/images/home/scroll-hero/cerramiento-vidrio-madera-division-ambientes-living.webp",
      critical: true,
      eager: true,
      layout: {
        base: "right-[25vw] top-[8vh] w-[clamp(200px,30vw,400px)]",
      },
      zIndex: {
        base: 7,
      },
      motion: {
        default: {
          range: [0.06, 0.51],
          range2: [0.06, 0.51],
          x: [0, 0],
          y: [0, -500],
          r: 0,
        },
      },
    },
    {
      src: "/images/home/scroll-hero/muebles-cocina-modernos-color-vison-minimalista.webp",
      critical: true,
      layout: {
        base: "-right-[28vw] -bottom-[16vh] w-[clamp(190px,28vw,360px)]",
        desktop: "right-[21vw] bottom-[12vh]",
      },
      zIndex: {
        base: 6,
      },
      motion: {
        default: {
          range: [0.4, 0.7],
          range2: [0.4, 0.7],
          x: [0, 400],
          y: [0, 50],
          r: 0,
        },
        mobile: {
          range: [0.4, 0.9],
          range2: [0.4, 0.9],
          x: [0, -120],
          y: [0, -70],
        },
      },
    },
    {
      src: "/images/home/scroll-hero/cocina-en-L-muebles-gris-petroleo-lavavajillas-empotrado.webp",
      layout: {
        base: "-right-[6vw] bottom-[31vh] w-[clamp(200px,30vw,400px)]",
        desktop: "-right-[9vw] bottom-[16vh]",
        monitor27: "bottom-[21vh]",
      },
      zIndex: {
        base: 1,
      },
      motion: {
        default: {
          range: [0.3, 0.8],
          range2: [0.3, 0.8],
          x: [0, -2085],
          y: [0, 0],
          r: 0,
        },
        mobile: {
          range: [0.15, 0.8],
          range2: [0.15, 0.8],
          x: [0, -685],
        },
        monitor27: {
          x: [0, -2225],
        },
      },
    },
  ],
};
