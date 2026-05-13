import type { SiteConfig } from "@/types/site";

import { siteFooter } from "./footer";
import { siteHeader } from "./header";
import { siteMetadata } from "./metadata";
import { sitePages } from "./pages";
import { siteTracking } from "./tracking";

export const siteConfig: SiteConfig = {
  metadata: siteMetadata,
  header: siteHeader,
  footer: siteFooter,
  tracking: siteTracking,
  pages: sitePages,
};
