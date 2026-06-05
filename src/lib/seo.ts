import type { Metadata, Viewport } from "next";
import type { ThemeColor } from "@/types/site";

const FALLBACK_SITE_URL = "http://localhost:3000";
const BASE_VIEWPORT: Omit<Viewport, "themeColor"> = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  colorScheme: "light",
  viewportFit: "cover",
};

type OgImage = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
};

type MetadataInput = {
  title: string;
  description: string;
  canonicalPath: string;
  siteName: string;
  ogImage: OgImage;
  ogType?: "website" | "article";
};

export function getSiteUrl() {
  const raw = process.env.SITE_URL?.trim();
  const base = raw && raw.length > 0 ? raw : FALLBACK_SITE_URL;
  return new URL(base.endsWith("/") ? base : `${base}/`);
}

export function buildMetadata({
  title,
  description,
  canonicalPath,
  siteName,
  ogImage,
  ogType = "website",
}: MetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(canonicalPath.replace(/^\//, ""), siteUrl);
  const ogUrl = new URL(ogImage.src.replace(/^\//, ""), siteUrl);

  return {
    title,
    description,
    metadataBase: siteUrl,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      siteName,
      url: canonicalUrl,
      locale: "es_AR",
      type: ogType,
      images: [
        {
          url: ogUrl,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

export function buildViewport(themeColor: ThemeColor): Viewport {
  return {
    ...BASE_VIEWPORT,
    themeColor,
  };
}
