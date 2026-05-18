import { siteMetadata } from "@/content/site/metadata";
import type { LegalPageContent } from "@/types/legal";

export const termsContent: LegalPageContent = {
  title: "Términos & condiciones | Strongwood",
  description:
    "Condiciones de uso del sitio y alcance de los servicios de Strongwood.",
  heading: "Términos & condiciones",
  ogImage: siteMetadata.defaultOgImage,
  hero: {
    title: "(TÉRMINOS)",
    subtitleLines: ["USO DEL SITIO", "INFORMACIÓN", "Y SERVICIOS"],
    imageSrc: "/images/hero/hero-home-banner-strongwood.svg",
    imageAlt: "Detalle de cocina con muebles a medida",
  },
  updatedLabel: "Última actualización: 5 de abril de 2026",
  sections: [
    {
      title: "Aceptación de los términos",
      paragraphs: [
        "Al navegar este sitio aceptás estos términos y condiciones. Si no estás de acuerdo, te pedimos que no uses la web.",
        "Estos términos aplican a las visitas, consultas y uso de la información publicada por Strongwood.",
      ],
    },
    {
      title: "Servicios y presupuestos",
      paragraphs: [
        "La información publicada es orientativa y puede cambiar sin previo aviso.",
        "Los presupuestos se brindan de manera personalizada y pueden requerir relevamiento, medidas y definición de materiales.",
      ],
    },
    {
      title: "Propiedad intelectual",
      paragraphs: [
        "Los textos, imágenes, diseños y marcas exhibidos pertenecen a Strongwood o se utilizan con autorización.",
        "No está permitido copiar o usar el contenido con fines comerciales sin autorización escrita.",
      ],
    },
    {
      title: "Responsabilidad",
      paragraphs: [
        "Strongwood trabaja para mantener la información actualizada, pero no garantiza exactitud total o ausencia de errores.",
        "El uso que hagas del sitio y la información es bajo tu responsabilidad.",
      ],
    },
    {
      title: "Modificaciones",
      paragraphs: [
        "Podemos actualizar estos términos en cualquier momento. Las versiones vigentes se publican en esta misma página.",
      ],
    },
    {
      title: "Contacto",
      paragraphs: [
        "Si tenés dudas sobre estos términos, escribinos y te respondemos a la brevedad.",
      ],
      listItems: ["strongwoodventas@gmail.com"],
    },
  ],
};
