import type { Metadata } from "next";
import { headers } from "next/headers";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";
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
  const projectStats = await getHomeProjectStatsAction();

  return (
    <HomeClient
      initialIsMobile={initialIsMobile}
      projectsContent={homeContent.projects}
      projectStats={projectStats}
    />
  );
}
