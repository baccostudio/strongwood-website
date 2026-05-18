import { siteMetadata } from "@/content/site/metadata";
import { siteThemeColors } from "@/content/site/theme-colors";
import type { LegalPageContent } from "@/types/legal";

export const privacyContent: LegalPageContent = {
  title: "Política de privacidad | Strongwood",
  description:
    "Cómo usamos y protegemos la información que compartís con Strongwood.",
  heading: "Política de privacidad",
  ogImage: siteMetadata.defaultOgImage,
  themeColor: siteThemeColors.paper,
  hero: {
    title: "(PRIVACIDAD)",
    subtitleLines: ["TU INFORMACIÓN", "NUESTRA RESPONSABILIDAD"],
    imageSrc: "/images/hero/hero-home-banner-strongwood.svg",
    imageAlt: "Detalle de muebles de madera en un ambiente cálido",
  },
  updatedLabel: "Última actualización: 5 de abril de 2026",
  sections: [
    {
      title: "Datos que recopilamos",
      paragraphs: [
        "Cuando nos escribís, podemos solicitar tu nombre, email, teléfono y detalles del proyecto para poder asesorarte.",
        "No recopilamos datos sensibles ni información financiera a través del sitio.",
      ],
    },
    {
      title: "Uso de la información",
      paragraphs: [
        "Usamos tus datos para responder consultas, preparar presupuestos y coordinar avances del proyecto.",
        "También podemos usar la información para mejorar la experiencia del sitio y nuestros servicios.",
      ],
    },
    {
      title: "Compartir datos",
      paragraphs: [
        "No vendemos ni alquilamos tu información.",
        "Solo compartimos datos con proveedores que colaboran en el servicio cuando es necesario y bajo acuerdos de confidencialidad.",
      ],
    },
    {
      title: "Seguridad",
      paragraphs: [
        "Aplicamos medidas razonables para proteger la información, pero ningún sistema es infalible.",
        "Si detectás un uso indebido, te pedimos que nos contactes de inmediato.",
      ],
    },
    {
      title: "Tus derechos",
      paragraphs: [
        "Podés solicitar acceso, actualización o eliminación de tus datos personales.",
        "Respondemos las solicitudes en un plazo razonable.",
      ],
    },
    {
      title: "Contacto",
      paragraphs: [
        "Si tenés dudas sobre esta política, escribinos y te respondemos a la brevedad.",
      ],
      listItems: ["strongwoodventas@gmail.com"],
    },
  ],
};
