import type { HomeHeroImage } from "./media";

export interface HomeProjectsContent {
  title: string;
  subtitleLines: string[];
  badgeText: string;
  badgeAriaLabel: string;
  workCount: string;
  workCountAriaLabel: string;
  workCountLabelSuffix: string;
  tableImage: HomeHeroImage;
  descriptionLines: string[];
}

export interface HomeProjectStats {
  workCount: string;
  workCountAriaLabel: string;
}
