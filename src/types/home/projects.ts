import type { HomeHeroImage } from "./media";

export interface HomeProjectsImage extends HomeHeroImage {
  loading?: "eager";
}

export interface HomeProjectsContent {
  title: string;
  titleHref: string;
  titleAriaLabel: string;
  subtitleLines: string[];
  badgeText: string;
  badgeAriaLabel: string;
  workCount: string;
  workCountAriaLabel: string;
  workCountAriaPrefix: string;
  workCountLabelSuffix: string;
  tableImage: HomeProjectsImage;
  descriptionLines: string[];
}

export interface HomeProjectStats {
  workCount: string;
  workCountAriaLabel: string;
}
