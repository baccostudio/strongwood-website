import type { SiteTrackingConfig } from "@/types/site";

export const siteTracking: SiteTrackingConfig = {
  facebookPixel: {
    enabled: true,
    pixelId: "1167956061337350",
    scriptLocale: "en_US",
  },
  googleTagManager: {
    enabled: true,
    containerId: "GTM-N89WFSBK",
    dataLayerName: "dataLayer",
  },
};
