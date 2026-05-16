"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HomeProjects } from "@/components/home/HomeProjects";
import { homeContent } from "@/content/home";
import { HOME_MOBILE_BREAKPOINT } from "@/lib/preloader";
import { resolveViewportHeight, resolveViewportWidth } from "@/lib/viewport";
import type { HomeProjectStats, HomeProjectsContent } from "@/types/home";

const HOME_CTA_ANIMATION_SPAN_VH = 250;
const HOME_CTA_EXTRA_SCROLL_VH = 65;
const HOME_CTA_MOBILE_EXTRA_SCROLL_VH = 16;
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

export default function HomeClient({
  projectsContent,
  projectStats,
}: HomeClientProps) {
  const lastWidth = useRef(0);
  const stableViewportHeightRef = useRef(0);
  const viewportResolvedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const [resolvedProjectStats, setResolvedProjectStats] = useState(projectStats);
  const homeCtaExtraScrollVh = isMobile ? HOME_CTA_MOBILE_EXTRA_SCROLL_VH : HOME_CTA_EXTRA_SCROLL_VH;
  const homeCtaSectionHeightVh = HOME_CTA_ANIMATION_SPAN_VH + homeCtaExtraScrollVh;

  useEffect(() => {
    viewportResolvedRef.current = false;

    let recoveryFrameId: number | null = null;
    let recoveryTimeoutId: number | null = null;

    const applyViewportState = (forceHeightSync = false) => {
      const currentWidth = resolveViewportWidth(window, HOME_MOBILE_BREAKPOINT);
      const currentHeight = resolveViewportHeight(window);
      const nextIsMobile = currentWidth < HOME_MOBILE_BREAKPOINT;
      const widthChanged = currentWidth !== lastWidth.current;
      const nextStableViewportHeight = widthChanged
        ? currentHeight
        : Math.max(stableViewportHeightRef.current, currentHeight);
      const stableHeightChanged = nextStableViewportHeight !== stableViewportHeightRef.current;

      stableViewportHeightRef.current = nextStableViewportHeight;

      if (forceHeightSync || widthChanged || stableHeightChanged) {
        const stableVh = nextStableViewportHeight * 0.01;

        document.documentElement.style.setProperty("--vh", `${stableVh}px`);
        lastWidth.current = currentWidth;
      }

      if (forceHeightSync || widthChanged || !viewportResolvedRef.current) {
        setIsMobile(nextIsMobile);
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
    <div className="relative z-10">
      <HomeProjects
        content={projectsContent}
        projectStats={resolvedProjectStats}
        isMobile={isMobile}
      />

      <DynamicHomeCta
        content={homeContent.cta}
        isMobile={isMobile}
        sectionHeightVh={homeCtaSectionHeightVh}
        animationSpanVh={HOME_CTA_ANIMATION_SPAN_VH}
      />
    </div>
  );
}
