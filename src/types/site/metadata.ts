export interface OgImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface SiteMetadata {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: OgImage;
  areaServed: string[];
}