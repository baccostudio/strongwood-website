import type { ProjectDetailUi } from "@/types/proyectos";

export const projectDetailUi: ProjectDetailUi = {
  carouselControls: {
    prevAriaLabel: "Imagen anterior",
    nextAriaLabel: "Imagen siguiente",
    imageLoadingAriaLabel: "Cargando imagen del proyecto",
    icon: {
      src: "/images/icons/menu-arrow-icon.svg",
      alt: "Flecha",
      width: 28,
      height: 28,
    },
  },
  nextProject: {
    ariaLabelPrefix: "Ir al",
    icon: {
      src: "/images/icons/menu-arrow-icon.svg",
      alt: "Flecha de siguiente proyecto",
      width: 34,
      height: 34,
    },
  },
  metadata: {
    descriptionTemplate: "Proyecto en {location} ({year}).",
  },
};
