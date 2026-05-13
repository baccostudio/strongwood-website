"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HomeProjects } from "@/components/home/HomeProjects";
import { homeContent } from "@/content/home";
import { HOME_MOBILE_BREAKPOINT } from "@/lib/preloader";
import type { HomeProjectStats, HomeProjectsContent } from "@/types/home";

const HOME_CTA_ANIMATION_SPAN_VH = 250;
const HOME_CTA_EXTRA_SCROLL_VH = 65;
const HOME_CTA_SECTION_HEIGHT_VH = HOME_CTA_ANIMATION_SPAN_VH + HOME_CTA_EXTRA_SCROLL_VH;
const VIEWPORT_RECOVERY_DELAY_MS = 250;

function HomeCtaFallback() {
  return (
    <section
      className="relative w-full bg-black"
      style={{ height: `calc(var(--vh, 1vh) * ${HOME_CTA_SECTION_HEIGHT_VH})` }}
      aria-hidden="true"
    >
      <div className="sticky top-0 flex h-[calc(var(--vh,1vh)*100)] w-full items-center justify-center overflow-hidden bg-black">
        <div className="absolute -bottom-[10vh] left-0 h-[10.5vh] w-full bg-inherit pointer-events-none" />
      </div>
    </section>
  );
}

const DynamicHomeCta = dynamic(
  () => import("@/components/home/HomeCta").then((module) => module.HomeCta),
  {
    loading: () => <HomeCtaFallback />,
    ssr: false,
  },
);

interface HomeClientProps {
  projectsContent: HomeProjectsContent;
  projectStats: HomeProjectStats;
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

function resolveViewportHeight(target: Window): number {
  const heightCandidates = [
    target.visualViewport?.height,
    target.document.documentElement.clientHeight,
    target.innerHeight,
  ];

  const resolvedHeight = heightCandidates.find(
    (value): value is number => typeof value === "number" && Number.isFinite(value) && value > 0,
  );

  return Math.floor(resolvedHeight ?? target.innerHeight);
}

function scrollHomeToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function HomeClient({
  projectsContent,
  projectStats,
}: HomeClientProps) {
  const lastWidth = useRef(0);
  const viewportResolvedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [resolvedProjectStats, setResolvedProjectStats] = useState(projectStats);

  useLayoutEffect(() => {
    scrollHomeToTop();
  }, []);

  useEffect(() => {
    const canControlScrollRestoration =
      typeof window.history.scrollRestoration === "string";

    const previousScrollRestoration = canControlScrollRestoration
      ? window.history.scrollRestoration
      : null;

    if (canControlScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    scrollHomeToTop();

    const firstFrameId = window.requestAnimationFrame(() => {
      scrollHomeToTop();

      window.requestAnimationFrame(() => {
        scrollHomeToTop();
      });
    });

    const handlePageShow = () => {
      scrollHomeToTop();
    };

    window.addEventListener("load", handlePageShow);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.removeEventListener("load", handlePageShow);
      window.removeEventListener("pageshow", handlePageShow);

      if (canControlScrollRestoration && previousScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  useEffect(() => {
    viewportResolvedRef.current = false;

    let recoveryFrameId: number | null = null;
    let recoveryTimeoutId: number | null = null;

    const applyViewportState = (forceHeightSync = false) => {
      const currentWidth = resolveViewportWidth(window);
      const currentHeight = resolveViewportHeight(window);
      const nextIsMobile = currentWidth < HOME_MOBILE_BREAKPOINT;
      const widthChanged = currentWidth !== lastWidth.current;

      if (forceHeightSync || widthChanged) {
        const vh = currentHeight * 0.01;

        document.documentElement.style.setProperty("--vh", `${vh}px`);
        lastWidth.current = currentWidth;
      }

      if (forceHeightSync || widthChanged || !viewportResolvedRef.current) {
        setIsMobile(nextIsMobile);
        setViewportHeight(currentHeight);
        viewportResolvedRef.current = true;
      }
    };

    const syncViewport = () => {
      applyViewportState(false);
    };

    const recoverViewportAfterRefresh = () => {
      if (recoveryFrameId !== null) {
        window.cancelAnimationFrame(recoveryFrameId);
      }

      if (recoveryTimeoutId !== null) {
        window.clearTimeout(recoveryTimeoutId);
      }

      // Pull-to-refresh can settle the mobile viewport after initial mount.
      applyViewportState(true);

      recoveryFrameId = window.requestAnimationFrame(() => {
        applyViewportState(true);
        recoveryFrameId = null;
      });

      recoveryTimeoutId = window.setTimeout(() => {
        applyViewportState(true);
        recoveryTimeoutId = null;
      }, VIEWPORT_RECOVERY_DELAY_MS);
    };

    recoverViewportAfterRefresh();
    window.addEventListener("resize", syncViewport);
    window.addEventListener("load", recoverViewportAfterRefresh);
    window.addEventListener("pageshow", recoverViewportAfterRefresh);
    window.visualViewport?.addEventListener("resize", syncViewport);

    return () => {
      if (recoveryFrameId !== null) {
        window.cancelAnimationFrame(recoveryFrameId);
      }

      if (recoveryTimeoutId !== null) {
        window.clearTimeout(recoveryTimeoutId);
      }

      window.removeEventListener("resize", syncViewport);
      window.removeEventListener("load", recoverViewportAfterRefresh);
      window.removeEventListener("pageshow", recoverViewportAfterRefresh);
      window.visualViewport?.removeEventListener("resize", syncViewport);
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    void fetch("/api/project-stats", {
      cache: "no-store",
      signal: abortController.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }

        const data = (await response.json()) as Partial<HomeProjectStats>;

        if (
          typeof data.workCount !== "string" ||
          typeof data.workCountAriaLabel !== "string"
        ) {
          return null;
        }

        return {
          workCount: data.workCount,
          workCountAriaLabel: data.workCountAriaLabel,
        } satisfies HomeProjectStats;
      })
      .then((nextProjectStats) => {
        if (!nextProjectStats) {
          return;
        }

        setResolvedProjectStats((currentProjectStats) => {
          if (
            currentProjectStats.workCount === nextProjectStats.workCount &&
            currentProjectStats.workCountAriaLabel === nextProjectStats.workCountAriaLabel
          ) {
            return currentProjectStats;
          }

          return nextProjectStats;
        });
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <HomeProjects
        content={projectsContent}
        projectStats={resolvedProjectStats}
        isMobile={isMobile}
        viewportHeight={viewportHeight}
      />

      <DynamicHomeCta
        content={homeContent.cta}
        isMobile={isMobile}
        sectionHeightVh={HOME_CTA_SECTION_HEIGHT_VH}
        animationSpanVh={HOME_CTA_ANIMATION_SPAN_VH}
      />
    </>
  );
}
