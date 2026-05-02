export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  iconImageSrc: string;
  iconAlt: string;
}

export interface FooterConfig {
  logoSrc: string;
  logoAlt: string;
  logoHref: string;
  menuTitle: string;
  menuLinks: FooterLink[];
  legalTitle: string;
  legalLinks: FooterLink[];
  contactTitle: string;
  contactEmail: string;
  copyright: string;
  socialLinks: SocialLink[];
}