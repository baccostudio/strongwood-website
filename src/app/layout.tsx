import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { InitialLoaderOverlay } from "@/components/layout/InitialLoaderOverlay";
import { JsonLdScript } from "@/components/layout/JsonLdScript";
import { Preloader } from "@/components/layout/Preloader";
import { siteConfig } from "@/content/site";
import {
  PRELOADER_STATE_ATTRIBUTE,
  getPreloaderCookieName,
  getPreloaderDevice,
  isValidPreloaderCookie,
} from "@/lib/preloader";
import { getSiteUrl } from "@/lib/seo";
import { checkIsMobile } from "@/lib/user-agent";
import { TrackingHeadScripts } from "@/components/layout/TrackingHeadScripts";
import { TrackingNoScript } from "@/components/layout/TrackingNoScript";

const siteUrl = getSiteUrl();
const defaultOgUrl = new URL(
  siteConfig.metadata.defaultOgImage.src.replace(/^\//, ""),
  siteUrl
);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteConfig.metadata.defaultTitle,
  description: siteConfig.metadata.defaultDescription,
  openGraph: {
    siteName: siteConfig.metadata.siteName,
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: defaultOgUrl,
        width: siteConfig.metadata.defaultOgImage.width,
        height: siteConfig.metadata.defaultOgImage.height,
        alt: siteConfig.metadata.defaultOgImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgUrl],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  colorScheme: "light",
};

const preloaderNoScriptStyles = `
  html[${PRELOADER_STATE_ATTRIBUTE}="pending"] body {
    overflow: auto !important;
  }

  html[${PRELOADER_STATE_ATTRIBUTE}="pending"] #initial-black-overlay {
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    transform: translateY(-100%) !important;
    transition: none !important;
  }
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const cookieStore = await cookies();
  const isMobile = checkIsMobile(requestHeaders.get("user-agent") ?? "");
  const device = getPreloaderDevice(isMobile);
  const cookieName = getPreloaderCookieName(device);
  const shouldShowPreloader = !isValidPreloaderCookie(
    cookieStore.get(cookieName)?.value,
    device,
  );
  const logoUrl = new URL(siteConfig.footer.logoSrc.replace(/^\//, ""), siteUrl);
  const sameAsLinks = siteConfig.footer.socialLinks.map((link) => link.href);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.metadata.siteName,
    url: siteUrl.toString().replace(/\/$/, ""),
    logo: logoUrl.toString(),
    email: siteConfig.footer.contactEmail,
    sameAs: sameAsLinks,
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.metadata.siteName,
    url: siteUrl.toString().replace(/\/$/, ""),
    image: defaultOgUrl.toString(),
    email: siteConfig.footer.contactEmail,
    areaServed: siteConfig.metadata.areaServed,
    sameAs: sameAsLinks,
  };

  return (
    <html
      lang="es-AR"
      className="h-full antialiased"
      data-preloader-state={shouldShowPreloader ? "pending" : "skip"}
      suppressHydrationWarning
    >
      <head>
        <TrackingHeadScripts tracking={siteConfig.tracking} />
        <noscript>
          <style>{preloaderNoScriptStyles}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <TrackingNoScript tracking={siteConfig.tracking} />
        <InitialLoaderOverlay preloader={siteConfig.preloader} />
        <Preloader />
        <Header {...siteConfig.header} />
        <div className="flex-1">{children}</div>
        <Footer {...siteConfig.footer} />
        <JsonLdScript data={organizationJsonLd} />
        <JsonLdScript data={localBusinessJsonLd} />
      </body>
    </html>
  );
}
