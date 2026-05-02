import type { ProjectCard, ProjectTheme } from "./cards";
import type { ProjectImage } from "./media";
import type { ProjectSection } from "./text";

export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  listVariant?: "default" | "comingSoon";
  listBadgeLabel?: string;
  listCtaLabel?: string;
  locationLabel: string;
  locationValue: string;
  yearLabel: string;
  yearValue: string;
  typeLabel: string;
  typeValue: string;
  heroImage: ProjectImage;
  carouselImages: ProjectImage[];
  materialsCard: ProjectCard;
  processCard: ProjectCard;
  sections: ProjectSection[];
  themeClass: ProjectTheme["themeClass"];
  nextCardLabel: string;
};
