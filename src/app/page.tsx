import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { HomeHeroStack } from "@/components/home/HomeHeroStack";
import { HomeProjectsSection } from "@/components/home/HomeProjectsSection";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";
import {
  getHomeHeroPreloadAssets,
  HOME_HERO_IMAGE_SIZES,
} from "@/lib/preloader";
import { buildMetadata, buildViewport } from "@/lib/seo";
import HomeClient from "./page.client";

export const metadata: Metadata = buildMetadata({
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
  canonicalPath: "/", 
  siteName: siteConfig.metadata.siteName,
  ogImage: homeContent.metadata.ogImage,
});

export const viewport = buildViewport(homeContent.metadata.themeColor);

export default function Home() {
  const heroAssets = getHomeHeroPreloadAssets(homeContent.hero);

  heroAssets.forEach(({ asset, media }) => {
    const { props } = getImageProps({
      alt: "",
      src: asset.src,
      width: asset.width,
      height: asset.height,
      sizes: HOME_HERO_IMAGE_SIZES,
    });

    preload(props.src, {
      as: "image",
      imageSrcSet: props.srcSet,
      imageSizes: HOME_HERO_IMAGE_SIZES,
      media,
      type: "image/webp",
    });
  });

  return (
    <main className="relative">
      <HomeHeroStack content={homeContent.hero} />
      <HomeProjectsSection content={homeContent.projects} />
      <HomeClient />
    </main>
  );
}
