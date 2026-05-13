import type { HomeHeroContent } from "@/types/home";

export const PRELOADER_FONT_URLS = [
  "/fonts/switzer/Switzer-Variable.woff2",
  "/fonts/switzer/Switzer-Medium.woff2",
  "/fonts/switzer/Switzer-Semibold.woff2",
] as const;

export function getHomeReadyAssetSources(hero: HomeHeroContent, isMobile: boolean) {
  return hero.images.map((image) => (isMobile ? image.mobile.src : image.desktop.src));
}
