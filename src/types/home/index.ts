import type { HomeCtaContent } from "./cta";
import type { HomeHeroContent } from "./hero";
import type { HomeMetadata } from "./metadata";
import type { HomeProjectsContent } from "./projects";

export interface HomeContent {
  metadata: HomeMetadata;
  hero: HomeHeroContent;
  projects: HomeProjectsContent;
  cta: HomeCtaContent;
}

export type { HomeCtaContent } from "./cta";
export type { HomeCtaGalleryImage } from "./cta";
export type {
  HomeHeroContent,
  HomeHeroViewportMode,
  FloatingImageConfig,
  FloatingImageLayoutConfig,
  FloatingImageMotionConfig,
  FloatingImageMotionValues,
  FloatingImageZIndexConfig,
} from "./hero";
export type { HomeHeroImage, HomeHeroMarqueeItem } from "./media";
export type { HomeMetadata } from "./metadata";
export type { HomeProjectStatsResponse, HomeProjectsContent } from "./projects";
