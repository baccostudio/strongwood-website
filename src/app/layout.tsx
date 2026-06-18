import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLdScript } from "@/components/layout/JsonLdScript";
import { ThemeColorSync } from "@/components/layout/ThemeColorSync";
import { ViewportHeightScript } from "@/components/layout/ViewportHeightScript";
import { WhatsappFloatingButton } from "@/components/layout/WhatsappFloatingButton";
import { homeMetadata } from "@/content/home/metadata";
import { siteConfig } from "@/content/site";
import { buildMetadata, buildViewport, getSiteUrl } from "@/lib/seo";
import { TrackingHeadScripts } from "@/components/layout/TrackingHeadScripts";
import { TrackingNoScript } from "@/components/layout/TrackingNoScript";

const siteUrl = getSiteUrl();
const defaultOgUrl = new URL(
  homeMetadata.ogImage.src.replace(/^\//, ""),
  siteUrl
);
const enableVercelInsights = Boolean(process.env.VERCEL);

export const metadata: Metadata = buildMetadata({
  title: homeMetadata.title,
  description: homeMetadata.description,
  canonicalPath: "/",
  siteName: siteConfig.metadata.siteName,
  ogImage: homeMetadata.ogImage,
});

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
        <ViewportHeightScript />
        <TrackingHeadScripts tracking={siteConfig.tracking} />
      </head>
      <body className="min-h-full bg-paper text-foreground flex flex-col">
        <ThemeColorSync />
        <TrackingNoScript tracking={siteConfig.tracking} />
        <Header {...siteConfig.header} />
        <div className="app-shell-content flex-1 bg-paper">{children}</div>
        <Footer {...siteConfig.footer} />
        <WhatsappFloatingButton {...siteConfig.whatsappFloatingButton} />
        <JsonLdScript data={organizationJsonLd} />
        <JsonLdScript data={localBusinessJsonLd} />
        {enableVercelInsights ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
