import { siteMetadata } from "@/content/site/metadata";
import { routeThemeColors } from "@/content/site/route-theme-colors";

export const proyectosContent = {
  metadata: {
    title: "Proyectos | Strongwood",
    description:
      "Cocinas, placares y muebles a medida para hogares y obras en CABA y GBA. Diseño e instalación integral.",
    ogImage: siteMetadata.defaultOgImage,
    themeColor: routeThemeColors.proyectos,
  },
  hero: {
    title: "(PROYECTOS)",
    subtitleLines: [
      "DISEÑO DE MUEBLES A MEDIDA PARA",
      "ARQUITECTOS | CONSTRUCTORAS | CLIENTES",
    ],
    imageSrc: "/images/hero/hero-proyectos-desk.webp",
    imageAlt: "Placard con puertas de vidrio y ropa ordenada",
    imageWidth: 1447,
    imageHeight: 600,
    mobileImageSrc: "/images/hero/hero-proyectos-mob.webp",
    mobileImageWidth: 960,
    mobileImageHeight: 1790,
    badgeText: "®",
    badgeAriaLabel: "Marca registrada",
  },
  intro: {
    label: "STRONGWOOD",
    location: "VILLA LYNCH, ARGENTINA.",
    paragraphs: [
      {
        text: "Nos especializamos en el ",
        highlightText: "diseño y fabricación",
        textAfter:
          " de cocinas, placares, equipamientos integrales y mobiliario a medida para hogares y obras.",
      },
      {
        text: "Combinamos maderas y materiales de alta calidad para crear espacios funcionales, duraderos y con diseño único.",
      },
    ],
    cta: {
      label: "COTIZÁ TU OBRA",
      href: "/contacto",
      ariaLabel: "Cotizá tu obra",
    },
  },
  projectList: {
    title: "(PROYECTOS DESTACADOS)",
    subtitle: "Strongwood",
    ctaLabel: "Ver proyecto",
    ariaLabelPrefix: "Ver",
  },
  featured: {
    title: "(PROYECTOS DESTACADOS)",
    scrollHint: "SCROLL PARA EXPLORAR",
    ctaLabel: "CLICK PARA VER PROYECTO COMPLETO",
    items: [
      {
        id: "lavalle-st-39",
        ariaLabel: "Ver proyecto Lavalle",
      },
      {
        id: "cangallo-st-93",
        ariaLabel: "Ver proyecto Cangallo",
      },
      {
        id: "coliqueo-st-53",
        ariaLabel: "Ver proyecto Coliqueo",
      },
      {
        id: "olleros-st-92",
        ariaLabel: "Ver proyecto Olleros",
      },
    ],
  },
  steps: {
    title: "(CÓMO TRABAJAMOS)",
    items: [
      {
        number: "01",
        title: "Consulta inicial",
        subtitle: "Evaluación de necesidades y presupuesto preliminar",
      },
      {
        number: "02",
        title: "Planificación",
        subtitle: "Ajustes de diseño y detalles de entrega",
      },
      {
        number: "03",
        title: "Producción",
        subtitle: "Fabricación de muebles a medida",
      },
      {
        number: "04",
        title: "Control de calidad",
        subtitle: "Evaluación exhaustiva del producto",
      },
      {
        number: "05",
        title: "Logística y montaje",
        subtitle: "Entrega e instalación organizadas",
      },
      {
        number: "06",
        title: "Inspección final",
        subtitle: "Verificación completa en sitio",
      },
    ],
  },
};
