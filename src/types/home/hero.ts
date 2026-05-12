import type { HomeHeroImage } from "./media";

export type HomeHeroImageAsset = Omit<HomeHeroImage, "alt">;

export interface HomeHeroResponsiveImage {
  alt: string;
  desktop: HomeHeroImageAsset;
  mobile: HomeHeroImageAsset;
}

export interface HomeHeroMarqueeItem {
  text: string;
  weight: "light" | "medium";
}

export interface HomeHeroContent {
  images: HomeHeroResponsiveImage[];
  label: string;
  marqueeItems: HomeHeroMarqueeItem[];
}
