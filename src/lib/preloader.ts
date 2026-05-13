import type { HomeHeroContent, HomeHeroImageAsset } from "@/types/home";

export const PRELOADER_FONT_URLS = [
  "/fonts/switzer/Switzer-Variable.woff2",
  "/fonts/switzer/Switzer-Medium.woff2",
  "/fonts/switzer/Switzer-Semibold.woff2",
] as const;

export type HomeHeroAssetBucket = "desktop" | "mobile";

export function getHomeHeroAssets(
  hero: HomeHeroContent,
  bucket: HomeHeroAssetBucket,
) : HomeHeroImageAsset[] {
  return hero.images.map((image) =>
    bucket === "mobile" ? image.mobile : image.desktop,
  );
}
