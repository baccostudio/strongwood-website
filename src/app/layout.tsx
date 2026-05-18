import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLdScript } from "@/components/layout/JsonLdScript";
import { ThemeColorSync } from "@/components/layout/ThemeColorSync";
import { siteConfig } from "@/content/site";
import { buildViewport, getSiteUrl } from "@/lib/seo";
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

export const viewport = buildViewport(siteConfig.metadata.defaultThemeColor);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      className="h-full bg-paper antialiased"
      // suppressHydrationWarning
    >
      <head>
        <TrackingHeadScripts tracking={siteConfig.tracking} />
      </head>
      <body className="min-h-full bg-paper text-foreground flex flex-col">
        <ThemeColorSync />
        <TrackingNoScript tracking={siteConfig.tracking} />
        <Header {...siteConfig.header} />
        <div className="app-shell-content flex-1 bg-paper">{children}</div>
        <Footer {...siteConfig.footer} />
        <JsonLdScript data={organizationJsonLd} />
        <JsonLdScript data={localBusinessJsonLd} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
