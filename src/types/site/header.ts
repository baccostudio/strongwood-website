import type { FooterLink } from "./footer";

export interface HeaderLogoVariants {
  darkSrc: string;
  beigeSrc: string;
  whiteSrc: string;
}

export interface HeaderConfig {
  logoAlt: string;
  logoVariants: HeaderLogoVariants;
  logoButtonLabel: string;
  menuText: string;
  closeLabel: string;
  menuLinks: FooterLink[];
  defaultVariant: "dark" | "beige" | "white";
}
