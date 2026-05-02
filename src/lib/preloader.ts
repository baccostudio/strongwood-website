import { homeHero } from "@/content/home/hero";
import type { FloatingImageConfig, HomeHeroContent } from "@/types/home";

export const HOME_READY_EVENT = "strongwood:home-ready";
export const HOME_READY_DATASET_KEY = "homeReady";
export const PRELOADER_HOME_PATH = "/";
export const PRELOADER_STATE_ATTRIBUTE = "data-preloader-state";
export const PRELOADER_STORAGE_KEY = "strongwood:home-preloader-signature";
export const PRELOADER_VERSION = "2026-05-02-home-ready-v4";
export const PRELOADER_FONT_URLS = [
  "/fonts/switzer/Switzer-Variable.woff2",
  "/fonts/switzer/Switzer-Medium.woff2",
  "/fonts/switzer/Switzer-Semibold.woff2",
] as const;

export type PreloaderState = "pending" | "skip" | "finished";

export function isCriticalHeroImage(img: FloatingImageConfig) {
  return img.critical === true;
}

export function getCriticalHeroSources(hero: HomeHeroContent) {
  return hero.floatingImages
    .filter((img) => isCriticalHeroImage(img))
    .map((img) => img.src);
}

export function getHomeReadyAssetSources(hero: HomeHeroContent) {
  return [hero.wordImage.src];
}

function getPreloaderSignatureParts() {
  return Array.from(
    new Set([
      PRELOADER_VERSION,
      ...PRELOADER_FONT_URLS,
      ...getHomeReadyAssetSources(homeHero),
    ]),
  );
}

export const PRELOADER_SIGNATURE = getPreloaderSignatureParts().join("|");

export function getPersistedPreloaderSignature(storage: Pick<Storage, "getItem">) {
  return storage.getItem(PRELOADER_STORAGE_KEY);
}

export function hasResolvedPreloaderSignature(
  storage: Pick<Storage, "getItem">,
  signature = PRELOADER_SIGNATURE,
) {
  return getPersistedPreloaderSignature(storage) === signature;
}

export function persistResolvedPreloaderSignature(
  storage: Pick<Storage, "setItem">,
  signature = PRELOADER_SIGNATURE,
) {
  storage.setItem(PRELOADER_STORAGE_KEY, signature);
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
