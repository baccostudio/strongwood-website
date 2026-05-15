import type { Metadata } from "next";
import { proyectosContent, projects } from "@/content/proyectos";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { PageIntro } from "@/components/shared/PageIntro";
import { WorkSteps } from "@/components/shared/WorkSteps";
// import { FeaturedProjectGrid } from "@/components/projects/FeaturedProjectGrid";
import { MobileFeaturedProjects } from "@/components/projects/MobileFeaturedProjects";

export const metadata: Metadata = buildMetadata({
  title: proyectosContent.metadata.title,
  description: proyectosContent.metadata.description,
  canonicalPath: "/proyectos",
  siteName: siteConfig.metadata.siteName,
  ogImage: proyectosContent.metadata.ogImage,
});

export default function ProyectosPage() {
  const projectItems = projects
    .filter((project) => project.listVariant !== "comingSoon")
    .map((project) => ({
      href: `/proyectos/${project.slug}`,
      image: project.listingImage,
      ariaLabel: `${proyectosContent.projectList.ariaLabelPrefix} proyecto ${project.title}`,
      title: project.title,
    }));

  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        title={proyectosContent.hero.title}
        subtitleLines={proyectosContent.hero.subtitleLines}
        imageSrc={proyectosContent.hero.imageSrc}
        imageAlt={proyectosContent.hero.imageAlt}
        imageWidth={proyectosContent.hero.imageWidth}
        imageHeight={proyectosContent.hero.imageHeight}
        mobileImageSrc={proyectosContent.hero.mobileImageSrc}
        mobileImageWidth={proyectosContent.hero.mobileImageWidth}
        mobileImageHeight={proyectosContent.hero.mobileImageHeight}
        badgeText={proyectosContent.hero.badgeText}
        badgeAriaLabel={proyectosContent.hero.badgeAriaLabel}
        subtitleClassName="text-[clamp(16px,2.8vw,28px)] leading-[clamp(24px,4.2vw,38px)] sm:text-[clamp(18px,3.1vw,31px)] sm:leading-[clamp(26.7px,4.5vw,43px)]"
      />
      <PageIntro
        label={proyectosContent.intro.label}
        location={proyectosContent.intro.location}
        paragraphs={proyectosContent.intro.paragraphs}
        cta={proyectosContent.intro.cta}
        className="bg-secondary"
        highlightClassName="font-semibold"
        ctaClassName="border-[var(--color-black)] text-[var(--color-secondary)]"
      />
      <WorkSteps title={proyectosContent.steps.title} steps={proyectosContent.steps.items}>
        {/* <FeaturedProjectGrid
          title={proyectosContent.featured.title}
          items={projectItems}
          scrollHint={proyectosContent.featured.scrollHint}
          ctaLabel={proyectosContent.featured.ctaLabel}
          layout="embedded"
          className="hidden lg:block"
        /> */}
        <MobileFeaturedProjects
          items={projectItems}
          ctaLabel={proyectosContent.projectList.ctaLabel}
          className="my-12 lg:my-14"
        />
      </WorkSteps>
    </main>
  );
}
