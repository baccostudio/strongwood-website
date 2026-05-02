import type { Metadata } from "next";
import { proyectosContent, projects } from "@/content/proyectos";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { PageIntro } from "@/components/shared/PageIntro";
import { WorkSteps } from "@/components/shared/WorkSteps";
import { FeaturedProjectGrid } from "@/components/projects/FeaturedProjectGrid";
import { MobileFeaturedProjects } from "@/components/projects/MobileFeaturedProjects";

export const metadata: Metadata = buildMetadata({
  title: proyectosContent.metadata.title,
  description: proyectosContent.metadata.description,
  canonicalPath: "/proyectos",
  siteName: siteConfig.metadata.siteName,
  ogImage: proyectosContent.metadata.ogImage,
});

export default function ProyectosPage() {
  const featuredItems = proyectosContent.featured.items
    .map((item) => {
      const project = projects.find((entry) => entry.id === item.id);
      if (!project) return null;
      return {
        href: `/proyectos/${project.slug}`,
        image: project.heroImage,
        carouselImages: project.carouselImages,
        ariaLabel: item.ariaLabel,
        title: project.title,
      };
    })
    .filter(
      (item): item is {
        href: string;
        image: typeof projects[number]["heroImage"];
        carouselImages: typeof projects[number]["carouselImages"];
        ariaLabel: string;
        title: string;
      } => Boolean(item)
    );

  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        title={proyectosContent.hero.title}
        subtitleLines={proyectosContent.hero.subtitleLines}
        imageSrc={proyectosContent.hero.imageSrc}
        imageAlt={proyectosContent.hero.imageAlt}
        badgeText={proyectosContent.hero.badgeText}
        badgeAriaLabel={proyectosContent.hero.badgeAriaLabel}
        subtitleClassName="text-[clamp(16px,2.8vw,28px)] leading-[clamp(24px,4.2vw,38px)] sm:text-[clamp(18px,3.1vw,31px)] sm:leading-[clamp(26.7px,4.5vw,43px)]"
      />
      <PageIntro
        label={proyectosContent.intro.label}
        location={proyectosContent.intro.location}
        paragraphs={proyectosContent.intro.paragraphs}
        cta={proyectosContent.intro.cta}
        className="bg-(--color-secondary)"
        highlightClassName="font-semibold"
        ctaClassName="border-[var(--color-black)] text-[var(--color-secondary)]"
      />
      <WorkSteps title={proyectosContent.steps.title} steps={proyectosContent.steps.items}>
        <FeaturedProjectGrid
          title={proyectosContent.featured.title}
          items={featuredItems.slice(0, 3)}
          scrollHint={proyectosContent.featured.scrollHint}
          ctaLabel={proyectosContent.featured.ctaLabel}
          layout="embedded"
          className="hidden lg:block"
        />
        <MobileFeaturedProjects
          items={featuredItems}
          className="lg:hidden"
        />
      </WorkSteps>
    </main>
  );
}
