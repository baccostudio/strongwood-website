"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HomeCta } from "@/components/home/HomeCta";
import { HomeHeroStack } from "@/components/home/HomeHeroStack";
import { HomeProjects } from "@/components/home/HomeProjects";
import { homeContent } from "@/content/home";
import {
  HOME_PRELOADER_START_EVENT,
  HOME_READY_DATASET_KEY,
  HOME_READY_EVENT,
  PRELOADER_COOKIE_MAX_AGE_SECONDS,
  getPreloaderCookieDomain,
  getPreloaderCookieName,
  getPreloaderDevice,
  getHomeReadyAssetSources,
  getPreloaderSignature,
  setDocumentPreloaderState,
} from "@/lib/preloader";
import type { HomeProjectStats, HomeProjectsContent } from "@/types/home";

const HOME_MOBILE_BREAKPOINT = 1024;
const HOME_CTA_ANIMATION_SPAN_VH = 250;
const HOME_CTA_EXTRA_SCROLL_VH = 65;
const HOME_CTA_SECTION_HEIGHT_VH = HOME_CTA_ANIMATION_SPAN_VH + HOME_CTA_EXTRA_SCROLL_VH;

interface HomeClientProps {
  initialIsMobile: boolean;
  projectsContent: HomeProjectsContent;
  projectStats: HomeProjectStats;
  shouldShowPreloader: boolean;
}

function resolveViewportWidth(target: Window): number {
  const widthCandidates = [
    target.visualViewport?.width,
    target.document.documentElement.clientWidth,
    target.innerWidth,
  ];

  const resolvedWidth = widthCandidates.find(
    (value): value is number => typeof value === "number" && Number.isFinite(value) && value > 0,
  );

  return Math.floor(resolvedWidth ?? HOME_MOBILE_BREAKPOINT);
}

function preloadImageAsset(source: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();

    image.decoding = "async";

    const finalize = () => {
      if (typeof image.decode === "function") {
        image.decode().catch(() => undefined).finally(resolve);
        return;
      }

      resolve();
    };

    image.onload = finalize;
    image.onerror = () => resolve();
    image.src = source;

    if (image.complete) {
      finalize();
    }
  });
}

export default function HomeClient({
  initialIsMobile,
  projectsContent,
  projectStats,
  shouldShowPreloader,
}: HomeClientProps) {
  const lastWidth = useRef(0);
  const viewportResolvedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(initialIsMobile);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    viewportResolvedRef.current = false;

    const syncViewport = () => {
      const currentWidth = resolveViewportWidth(window);
      const nextIsMobile = currentWidth < HOME_MOBILE_BREAKPOINT;

      if (currentWidth !== lastWidth.current) {
        const innerH = window.innerHeight;
        const vh = innerH * 0.01;

        document.documentElement.style.setProperty("--vh", `${vh}px`);
        lastWidth.current = currentWidth;
        setIsMobile(nextIsMobile);
        setViewportHeight(innerH);
        viewportResolvedRef.current = true;
      } else if (!viewportResolvedRef.current) {
        setIsMobile(nextIsMobile);
        setViewportHeight(window.innerHeight);
        viewportResolvedRef.current = true;
      }
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => {
      window.removeEventListener("resize", syncViewport);
    };
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (!shouldShowPreloader) {
      delete root.dataset[HOME_READY_DATASET_KEY];
      setDocumentPreloaderState(root, "skip");
      return;
    }

    let isCancelled = false;
    const device = getPreloaderDevice(initialIsMobile);
    const cookieName = getPreloaderCookieName(device);
    const cookieValue = encodeURIComponent(getPreloaderSignature(device));
    const cookieDomain = getPreloaderCookieDomain(window.location.hostname);
    const domainAttribute = cookieDomain ? `; Domain=${cookieDomain}` : "";
    const secureAttribute = window.location.protocol === "https:" ? "; Secure" : "";
    const assetSources = getHomeReadyAssetSources(homeContent.hero, initialIsMobile);

    document.cookie = `${cookieName}=${cookieValue}; Max-Age=${PRELOADER_COOKIE_MAX_AGE_SECONDS}; Path=/${domainAttribute}; SameSite=Lax${secureAttribute}`;
    root.dataset[HOME_READY_DATASET_KEY] = "false";
    setDocumentPreloaderState(root, "pending");
    window.dispatchEvent(new Event(HOME_PRELOADER_START_EVENT));

    const markReady = () => {
      if (isCancelled) {
        return;
      }

      root.dataset[HOME_READY_DATASET_KEY] = "true";
      window.dispatchEvent(new Event(HOME_READY_EVENT));
    };

    void Promise.all(assetSources.map((source) => preloadImageAsset(source))).then(markReady);

    return () => {
      isCancelled = true;
      delete root.dataset[HOME_READY_DATASET_KEY];
    };
  }, [initialIsMobile, shouldShowPreloader]);

  return (
    <main className="relative">
      <HomeHeroStack
        content={homeContent.hero}
        isMobile={isMobile}
        shouldPreload={shouldShowPreloader}
      />

      <HomeProjects
        content={projectsContent}
        projectStats={projectStats}
        isMobile={isMobile}
        viewportHeight={viewportHeight}
      />

      <HomeCta
        content={homeContent.cta}
        isMobile={isMobile}
        sectionHeightVh={HOME_CTA_SECTION_HEIGHT_VH}
        animationSpanVh={HOME_CTA_ANIMATION_SPAN_VH}
      />
    </main>
  );
}
