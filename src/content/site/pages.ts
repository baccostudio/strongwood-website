import type { PagesConfig } from "@/types/site";

export const sitePages: PagesConfig = {
  proyectos: {
    title: "Proyectos | Strongwood",
    description: "Descubrí proyectos en madera hechos a medida para cada espacio en CABA y GBA.",
    heading: "Proyectos",
    ogImage: {
      src: "/images/og/og-proyectos.svg",
      width: 1200,
      height: 630,
      alt: "Proyectos en madera a medida",
    },
  },
  nosotros: {
    title: "Nosotros | Strongwood",
    description: "Conocé el equipo y la filosofía detrás de Strongwood.",
    heading: "Nosotros",
    ogImage: {
      src: "/images/og/og-nosotros.svg",
      width: 1200,
      height: 630,
      alt: "Equipo Strongwood",
    },
    hero: {
      title: "(QUIÉNES SOMOS)",
      subtitleLines: [
        "DISEÑAMOS Y EJECUTAMOS",
        "PROYECTOS INTEGRALES",
        "DE MUEBLES A MEDIDA",
      ],
      imageSrc: "/images/hero/nosotros-hero-desk.webp",
      imageAlt: "Planos de muebles de madera sobre un tablero",
      imageWidth: 1447,
      imageHeight: 1080,
      mobileImageSrc: "/images/hero/nosotros-hero-mob.webp",
      mobileImageWidth: 440,
      mobileImageHeight: 820,
    },
    intro: {
      label: "STRONGWOOD",
      location: "VILLA LYNCH, ARGENTINA.",
      paragraphs: [
        {
          text: "Somos una empresa familiar apasionada por el diseño y la fabricación de muebles excepcionales.",
        },
        {
          text: "Nos especializamos en diseñar y fabricar cada producto a medida para todo tipo de proyectos completos, ya sea para hogares, obras, oficinas o locales comerciales.",
        },
        {
          text: "Nos encargamos de cada paso del proceso, ",
          highlightText: "desde la conceptualización hasta la instalación final.",
        },
      ],
    },
    mosaic: {
      images: [
        {
          src: "/images/about-us/placas-melamina-egger-strongwood.webp",
          alt: "Muestras de melamina ordenadas en una caja",
        },
        {
          src: "/images/about-us/diseno-muebles-madera-planos.webp",
          alt: "Planos de muebles sobre una mesa de trabajo",
        },
        {
          src: "/images/about-us/deposito-fabrica-muebles-artesanales.webp",
          alt: "Operario revisando planos en el taller",
        },
        {
          src: "/images/about-us/boceto-mueble-madera-a-mano.webp",
          alt: "Mano dibujando un boceto de mueble",
        },
      ],
    },
  },
  contact: {
    title: "Contacto | Strongwood",
    description: "Contanos tu idea y trabajemos juntos en tu próximo proyecto.",
    heading: "Contacto",
    ogImage: {
      src: "/images/og/og-contacto.svg",
      width: 1200,
      height: 630,
      alt: "Contacto Strongwood",
    },
    hero: {
      title: "(CONTÁCTANOS)",
      subtitleLines: [],
      imageSrc: "/images/hero/hero-contactanos-desk.webp",
      imageAlt: "Cocina con muebles de madera y barra blanca",
      imageWidth: 1447,
      imageHeight: 1080,
      mobileImageSrc: "/images/hero/hero-contactanos-mob.webp",
      mobileImageWidth: 440,
      mobileImageHeight: 820,
    },
    formIntro: "Un diseño a medida empieza con una buena conversación",
    formImageAlt: "Cocina moderna con muebles a medida",
    formIncentive: {
      label: "ASESORÍA GRATIS SI COMPLETÁS EL FORMULARIO",
    },
    formFields: [
      {
        id: "fullName",
        placeholder: "Nombre",
        type: "text",
        maxLength: 60,
        errorMessage: "Nombre incompleto",
        isRequired: true,
      },
      {
        id: "email",
        placeholder: "E-Mail",
        type: "email",
        maxLength: 80,
        errorMessage: "Correo inválido",
        isRequired: true,
      },
      {
        id: "phone",
        placeholder: "Teléfono (opcional)",
        type: "tel",
        maxLength: 20,
        errorMessage: "Teléfono incompleto",
        isRequired: false,
      },
    ],
    formSelect: {
      id: "serviceType",
      placeholder: "Tipo de servicio",
      options: ["Cocina", "Placard", "Muebles a medida", "Otro"],
      errorMessage: "Seleccioná un servicio",
      isRequired: true,
    },
    formTextarea: {
      id: "message",
      placeholder: "Contanos tu proyecto, idea o consulta",
      rows: 5,
      maxLength: 500,
      errorMessage: "Consulta incompleta",
      isRequired: true,
    },
    submitLabel: "Enviar consulta",
    submitLoadingLabel: "Enviando...",
    validationMessage: "Completá todos los campos para enviar la consulta.",
    feedbackDialog: {
      closeLabel: "Cerrar mensaje",
      success: {
        title: "Recibimos tu consulta",
        description:
          "Gracias por escribirnos. En breve te respondemos para seguir con la asesoría gratis de tu espacio.",
        // buttonLabel: "Cerrar",
      },
      error: {
        title: "No pudimos confirmar el envío",
        description:
          "Gracias por escribirnos. Si tu consulta ingresó correctamente, en breve te respondemos para seguir con la asesoría gratis de tu espacio.",
        // buttonLabel: "Volver al formulario",
      },
    },
    notificationEmail: {
      subject: "Nueva consulta desde la web",
      intro: "Recibiste una nueva consulta desde el formulario de contacto.",
      fullNameLabel: "Nombre",
      emailLabel: "E-Mail",
      phoneLabel: "Teléfono",
      serviceTypeLabel: "Tipo de servicio",
      messageLabel: "Mensaje",
      emptyPhoneValue: "No informado",
    },
    selectIconSrc: "/images/icons/select-arrow-icon.svg",
    selectIconAlt: "Ícono de selector",
    submitIconSrc: "/images/icons/send-icon.svg",
    submitIconHoverSrc: "/images/icons/send_white.svg",
    submitIconAlt: "Enviar consulta",
  },
};
