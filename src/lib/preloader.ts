import type { HomeHeroContent, HomeHeroImageAsset } from "@/types/home";

export const PRELOADER_FONT_URLS = [
  "/fonts/switzer/Switzer-Light.woff2",
  "/fonts/switzer/Switzer-Semibold.woff2",
] as const;

export const HOME_MOBILE_BREAKPOINT = 1024;
export const HOME_HERO_MOBILE_MEDIA = "(max-width: 1023px)";
export const HOME_HERO_DESKTOP_MEDIA = "(min-width: 1024px)";
export const HOME_HERO_IMAGE_SIZES = "100vw";

export interface HomeHeroPreloadAsset {
  asset: HomeHeroImageAsset;
  media: string;
}

export function getHomeHeroPreloadAssets(
  hero: HomeHeroContent,
): HomeHeroPreloadAsset[] {
  return hero.images.flatMap((image) => [
    {
      asset: image.mobile,
      media: HOME_HERO_MOBILE_MEDIA,
    },
    {
      asset: image.desktop,
      media: HOME_HERO_DESKTOP_MEDIA,
    },
  ]);
}
