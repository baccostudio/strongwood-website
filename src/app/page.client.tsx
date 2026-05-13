"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HomeHeroStack } from "@/components/home/HomeHeroStack";
import { HomeProjects } from "@/components/home/HomeProjects";
import { homeContent } from "@/content/home";
import type { HomeProjectStats, HomeProjectsContent } from "@/types/home";

const HOME_MOBILE_BREAKPOINT = 1024;
const HOME_CTA_ANIMATION_SPAN_VH = 250;
const HOME_CTA_EXTRA_SCROLL_VH = 65;
const HOME_CTA_SECTION_HEIGHT_VH = HOME_CTA_ANIMATION_SPAN_VH + HOME_CTA_EXTRA_SCROLL_VH;

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
  initialIsMobile: boolean;
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

function scrollHomeToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function HomeClient({
  initialIsMobile,
  projectsContent,
  projectStats,
}: HomeClientProps) {
  const lastWidth = useRef(0);
  const viewportResolvedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(initialIsMobile);
  const [viewportHeight, setViewportHeight] = useState(0);

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

  return (
    <main className="relative">
      <HomeHeroStack content={homeContent.hero} isMobile={isMobile} />

      <HomeProjects
        content={projectsContent}
        projectStats={projectStats}
        isMobile={isMobile}
        viewportHeight={viewportHeight}
      />

      <DynamicHomeCta
        content={homeContent.cta}
        isMobile={isMobile}
        sectionHeightVh={HOME_CTA_SECTION_HEIGHT_VH}
        animationSpanVh={HOME_CTA_ANIMATION_SPAN_VH}
      />
    </main>
  );
}
