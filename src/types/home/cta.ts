export interface HomeCtaGalleryImage {
  src: string;
  isHero?: boolean;
  y?: [number, number];
  scale?: [number, number];
}

export interface HomeCtaContent {
  title?: string;
  label: string;
  href: string;
  ariaLabel: string;
  gallery: HomeCtaGalleryImage[];
}
