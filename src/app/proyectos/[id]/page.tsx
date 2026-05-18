import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, buildViewport } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { projectDetailUi, projects } from "@/content/proyectos";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectSections } from "@/components/projects/ProjectSections";
import { ProjectCarousel } from "@/components/projects/ProjectCarousel";
import { ProjectCards } from "@/components/projects/ProjectCards";
import { NextProjectCard } from "@/components/projects/NextProjectCard";
import { ProjectMetaBar } from "@/components/projects/ProjectMetaBar";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export const viewport = buildViewport(projectDetailUi.metadata.themeColor);

function getProjectById(id: string) {
  return projects.find(
    (project) => (project.id === id || project.slug === id) && project.listVariant !== "comingSoon"
  );
}

function getNextProject(id: string) {
  const index = projects.findIndex((project) => project.id === id || project.slug === id);
  if (index === -1) return null;

  for (let offset = 1; offset <= projects.length; offset += 1) {
    const candidate = projects[(index + offset) % projects.length];
    if (candidate.listVariant !== "comingSoon") {
      return candidate;
    }
  }

  return null;
}

export function generateStaticParams() {
  return projects
    .filter((project) => project.listVariant !== "comingSoon")
    .map((project) => ({ id: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return buildMetadata({
      title: siteConfig.metadata.defaultTitle,
      description: siteConfig.metadata.defaultDescription,
      canonicalPath: "/proyectos",
      siteName: siteConfig.metadata.siteName,
      ogImage: siteConfig.metadata.defaultOgImage,
    });
  }

  const description = projectDetailUi.metadata.descriptionTemplate
    .replace("{location}", project.locationValue)
    .replace("{year}", project.yearValue);

  return buildMetadata({
    title: `${project.subtitle} ${project.title} | ${siteConfig.metadata.siteName}`,
    description,
    canonicalPath: `/proyectos/${project.slug}`,
    siteName: siteConfig.metadata.siteName,
    ogImage: project.heroImage,
    ogType: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.id);
  const compactSectionClass = "py-[clamp(36px,6vw,64px)]";

  return (
    <main className="min-h-screen bg-(--project-bg) project-theme-default">
      <ProjectHero
        title={project.title}
        subtitle={project.subtitle}
        image={project.heroImage}
        mobileImage={project.heroMobileImage}
      />
      <ProjectMetaBar
        locationLabel={project.locationLabel}
        locationValue={project.locationValue}
        yearLabel={project.yearLabel}
        yearValue={project.yearValue}
        typeLabel={project.typeLabel}
        typeValue={project.typeValue}
        headerTheme="paper"
        headerThemeMediaQuery="(max-width: 1330px)"
        className={project.metabarMarginTop}
      />
      <ProjectSections
        sections={project.sections}
        headerTheme="paper"
        className={compactSectionClass}
      />
      <ProjectCarousel
        images={project.carouselImages}
        prevAriaLabel={projectDetailUi.carouselControls.prevAriaLabel}
        nextAriaLabel={projectDetailUi.carouselControls.nextAriaLabel}
        imageLoadingAriaLabel={projectDetailUi.carouselControls.imageLoadingAriaLabel}
        icon={projectDetailUi.carouselControls.icon}
        headerTheme="paper"
        contentHeaderTheme="black"
        className={compactSectionClass}
      />
      <ProjectCards
        materials={project.materialsCard}
        process={project.processCard}
        headerTheme="black"
        headerThemeMediaQuery="(max-width: 1290px)"
        contentHeaderTheme="paper"
        className={compactSectionClass}
      />
      {nextProject ? (
        <NextProjectCard
          label={project.nextCardLabel}
          title={nextProject.title}
          href={`/proyectos/${nextProject.slug}`}
          image={nextProject.heroImage}
          ariaLabel={`${projectDetailUi.nextProject.ariaLabelPrefix} ${nextProject.title}`}
          icon={projectDetailUi.nextProject.icon}
          headerTheme="paper"
          headerThemeOverride="black"
          headerThemeOverrideMediaQuery="(max-width: 1290px)"
          className={`pt-[clamp(36px,6vw,64px)] pb-[clamp(72px,12vw,128px)]`}
        />
      ) : null}
    </main>
  );
}
