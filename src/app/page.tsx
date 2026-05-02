import type { Metadata } from "next";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import HomeClient from "./page.client";

export const metadata: Metadata = buildMetadata({
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
  canonicalPath: "/",
  siteName: siteConfig.metadata.siteName,
  ogImage: homeContent.metadata.ogImage,
});

export default function Home() {
  return (
    <HomeClient projectsContent={homeContent.projects} />
  );
}
