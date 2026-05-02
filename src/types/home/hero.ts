import type { HomeHeroImage, HomeHeroMarqueeItem } from "./media";

export type HomeHeroViewportMode = "mobile" | "desktop" | "monitor27";

export interface FloatingImageMotionValues {
  range: [number, number];
  range2: [number, number];
  x: [number, number];
  y: [number, number];
  r: number;
}

export interface FloatingImageMotionConfig {
  default: FloatingImageMotionValues;
  mobile?: Partial<FloatingImageMotionValues>;
  monitor27?: Partial<FloatingImageMotionValues>;
}

export interface FloatingImageLayoutConfig {
  base: string;
  mobile?: string;
  desktop?: string;
  monitor27?: string;
}

export interface FloatingImageZIndexConfig {
  base: number;
  mobile?: number;
  desktop?: number;
  monitor27?: number;
}

export interface FloatingImageConfig {
  src: string;
  critical?: boolean;
  eager?: boolean;
  layout: FloatingImageLayoutConfig;
  zIndex: FloatingImageZIndexConfig;
  motion: FloatingImageMotionConfig;
}

export interface HomeHeroContent {
  label: string;
  tagline: string;
  wordImage: HomeHeroImage;
  badgeText: string;
  badgeAriaLabel: string;
  marqueeItems: HomeHeroMarqueeItem[];
  floatingImages: FloatingImageConfig[];
}
