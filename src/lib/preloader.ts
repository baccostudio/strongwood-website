import { homeHero } from "@/content/home/hero";
import type { HomeHeroContent } from "@/types/home";

export const HOME_READY_EVENT = "strongwood:home-ready";
export const HOME_PRELOADER_START_EVENT = "strongwood:home-preloader-start";
export const HOME_READY_DATASET_KEY = "homeReady";
export const PRELOADER_HOME_PATH = "/";
export const PRELOADER_STATE_ATTRIBUTE = "data-preloader-state";
export const PRELOADER_DECISION_HEADER = "x-strongwood-preloader";
export const PRELOADER_DEVICE_HEADER = "x-strongwood-device";
export const PRELOADER_DESKTOP_COOKIE = "st-pre-desk";
export const PRELOADER_MOBILE_COOKIE = "st-pre-mob";
export const PRELOADER_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
export const PRELOADER_COOKIE_DOMAIN = "strongwood.com.ar";
export const HOME_HERO_PRELOADER_VERSION = "2026-05-13-home-hero-v1";
export const PRELOADER_FONT_URLS = [
  "/fonts/switzer/Switzer-Variable.woff2",
  "/fonts/switzer/Switzer-Medium.woff2",
  "/fonts/switzer/Switzer-Semibold.woff2",
] as const;

export type PreloaderState = "pending" | "skip" | "finished";
export type PreloaderDecision = "show" | "skip";
export type PreloaderDevice = "desktop" | "mobile";

export function getPreloaderDevice(isMobile: boolean): PreloaderDevice {
  return isMobile ? "mobile" : "desktop";
}

export function getPreloaderCookieName(device: PreloaderDevice) {
  return device === "mobile" ? PRELOADER_MOBILE_COOKIE : PRELOADER_DESKTOP_COOKIE;
}

export function getPreloaderCookieDomain(hostname: string) {
  if (
    hostname === PRELOADER_COOKIE_DOMAIN ||
    hostname.endsWith(`.${PRELOADER_COOKIE_DOMAIN}`)
  ) {
    return PRELOADER_COOKIE_DOMAIN;
  }

  return null;
}

export function getHomeReadyAssetSources(hero: HomeHeroContent, isMobile: boolean) {
  return hero.images.map((image) => (isMobile ? image.mobile.src : image.desktop.src));
}

function getPreloaderSignatureParts(device: PreloaderDevice) {
  const isMobile = device === "mobile";

  return Array.from(
    new Set([
      HOME_HERO_PRELOADER_VERSION,
      device,
      ...getHomeReadyAssetSources(homeHero, isMobile),
    ]),
  );
}

export function getPreloaderSignature(device: PreloaderDevice) {
  return getPreloaderSignatureParts(device).join("|");
}

export function getPreloaderDecision(value: string | null): PreloaderDecision {
  return value === "show" ? "show" : "skip";
}

export function isValidPreloaderCookie(
  value: string | undefined,
  device: PreloaderDevice,
) {
  return value === getPreloaderSignature(device);
}

export function getDocumentPreloaderState(root: HTMLElement): PreloaderState | null {
  const state = root.getAttribute(PRELOADER_STATE_ATTRIBUTE);

  if (state === "pending" || state === "skip" || state === "finished") {
    return state;
  }

  return null;
}

export function setDocumentPreloaderState(root: HTMLElement, state: PreloaderState) {
  root.setAttribute(PRELOADER_STATE_ATTRIBUTE, state);
}
