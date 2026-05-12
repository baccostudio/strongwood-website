import type { FooterLink } from "./footer";

export interface HeaderConfig {
  brandLogoAlt: string;
  brandLogoHref: string;
  logoButtonLabel: string;
  menuText: string;
  closeLabel: string;
  menuLinks: FooterLink[];
}
