import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";
import {
  getPreloaderCookieName,
  getPreloaderDevice,
  isValidPreloaderCookie,
} from "@/lib/preloader";
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
  const cookieStore = await cookies();
  const initialIsMobile = checkIsMobile(requestHeaders.get("user-agent") ?? "");
  const device = getPreloaderDevice(initialIsMobile);
  const cookieName = getPreloaderCookieName(device);
  const shouldShowPreloader = !isValidPreloaderCookie(
    cookieStore.get(cookieName)?.value,
    device,
  );
  const projectStats = await getHomeProjectStatsAction();

  return (
    <HomeClient
      initialIsMobile={initialIsMobile}
      projectsContent={homeContent.projects}
      projectStats={projectStats}
      shouldShowPreloader={shouldShowPreloader}
    />
  );
}
