import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { AboutUsHero } from "@/components/about-us/AboutUsHero";
import { AboutUsIntro } from "@/components/about-us/AboutUsIntro";
import { AboutUsMosaic } from "@/components/about-us/AboutUsMosaic";

const pageContent = siteConfig.pages.nosotros;

export const metadata: Metadata = buildMetadata({
  title: pageContent.title,
  description: pageContent.description,
  canonicalPath: "/nosotros",
  siteName: siteConfig.metadata.siteName,
  ogImage: pageContent.ogImage,
});

export default function NosotrosPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <AboutUsHero
        title={pageContent.hero.title}
        subtitleLines={pageContent.hero.subtitleLines}
        imageSrc={pageContent.hero.imageSrc}
        imageAlt={pageContent.hero.imageAlt}
        imageWidth={pageContent.hero.imageWidth}
        imageHeight={pageContent.hero.imageHeight}
        mobileImageSrc={pageContent.hero.mobileImageSrc}
        mobileImageWidth={pageContent.hero.mobileImageWidth}
        mobileImageHeight={pageContent.hero.mobileImageHeight}
        subtitleClassName="text-[clamp(16px,2.8vw,28px)] leading-[clamp(24px,4.2vw,38px)] sm:text-[clamp(18px,3.1vw,31px)] sm:leading-[clamp(26.7px,4.5vw,43px)]"
      />
      <AboutUsIntro
        label={pageContent.intro.label}
        location={pageContent.intro.location}
        paragraphs={pageContent.intro.paragraphs}
      />
      <AboutUsMosaic images={pageContent.mosaic.images} />
    </main>
  );
}
