import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { headers } from "next/headers";
import { preload } from "react-dom";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";
import { getHomeHeroAssets } from "@/lib/preloader";
import { buildMetadata } from "@/lib/seo";
import { checkIsMobile } from "@/lib/user-agent";
import { getHomeProjectStatsAction } from "./home.actions";
import HomeClient from "./page.client";

export const metadata: Metadata = buildMetadata({
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
  canonicalPath: "/",
  siteName: siteConfig.metadata.siteName,
  ogImage: homeContent.metadata.ogImage,
});

export default async function Home() {
  const requestHeaders = await headers();
  const initialIsMobile = checkIsMobile(requestHeaders.get("user-agent") ?? "");
  const heroAssetBucket = initialIsMobile ? "mobile" : "desktop";
  const heroAssets = getHomeHeroAssets(homeContent.hero, heroAssetBucket);

  heroAssets.forEach((asset) => {
    const { props } = getImageProps({
      alt: "",
      src: asset.src,
      width: asset.width,
      height: asset.height,
      sizes: "100vw",
    });

    preload(props.src, {
      as: "image",
      imageSrcSet: props.srcSet,
      imageSizes: props.sizes,
      type: "image/webp",
    });
  });

  const projectStats = await getHomeProjectStatsAction();

  return (
    <HomeClient
      initialIsMobile={initialIsMobile}
      projectsContent={homeContent.projects}
      projectStats={projectStats}
    />
  );
}
