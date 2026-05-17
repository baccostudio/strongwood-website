import type { HomeHeroImage } from "./media";

export interface HomeProjectsImage extends HomeHeroImage {
  loading?: "eager";
}

export interface HomeProjectsContent {
  title: string;
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
