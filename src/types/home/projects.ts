import type { HomeHeroImage } from "./media";

export interface HomeProjectsContent {
  title: string;
  subtitleLines: string[];
  badgeText: string;
  badgeAriaLabel: string;
  workCount: string;
  workCountAriaLabel: string;
  workCountLoadingAriaLabel: string;
  workCountLabelSuffix: string;
  tableImage: HomeHeroImage;
  descriptionLines: string[];
}

export interface HomeProjectStatsResponse {
  workCount: string;
  workCountAriaLabel: string;
  isFallback: boolean;
}
