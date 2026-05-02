import type { HomeHeroViewportMode } from "@/types/home";

export const HOME_HERO_BREAKPOINTS = {
  desktopMin: 1024,
  desktopMax: 1919,
  monitor27Min: 1920,
} as const;

export function getHomeHeroViewportWidth(target: Window): number {
  const widthCandidates = [
    target.visualViewport?.width,
    target.document.documentElement.clientWidth,
    target.innerWidth,
  ];

  const resolvedWidth = widthCandidates.find(
    (value): value is number => typeof value === "number" && Number.isFinite(value) && value > 0,
  );

  return Math.floor(resolvedWidth ?? HOME_HERO_BREAKPOINTS.desktopMin);
}

export function getHomeHeroViewport(currentWidth: number): HomeHeroViewportMode {
  const width = Math.floor(currentWidth);

  if (width >= HOME_HERO_BREAKPOINTS.monitor27Min) {
    return "monitor27";
  }

  if (
    width >= HOME_HERO_BREAKPOINTS.desktopMin &&
    width <= HOME_HERO_BREAKPOINTS.desktopMax
  ) {
    return "desktop";
  }

  return "mobile";
}
