import type { WhatsappFloatingButtonConfig } from "@/types/site";

const whatsappPhoneNumber = "5491171196506";
const whatsappMessage =
  "Hola! Estuve mirando su pagina web y me gustaria hacerles algunas consultas";

export const whatsappFloatingButton: WhatsappFloatingButtonConfig = {
  href: `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(
    whatsappMessage,
  )}`,
  label: "Escribinos por WhatsApp",
  ariaLabel: "Escribinos por WhatsApp",
  title: "Escribinos por WhatsApp",
  iconImageSrc: "/images/icons/whatsapp-icon.svg",
  iconAlt: "Icono de WhatsApp",
};
