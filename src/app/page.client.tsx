'use client'

import { useEffect, useRef, useState } from "react";
import { HomeCta } from "@/components/home/HomeCta";
import { HomeHeroStack } from "@/components/home/HomeHeroStack";
import { HomeProjects } from "@/components/home/HomeProjects";
import { homeContent } from "@/content/home";
import type { HomeProjectsContent } from "@/types/home";

const HOME_MOBILE_BREAKPOINT = 1024;
const HOME_CTA_ANIMATION_SPAN_VH = 250;
const HOME_CTA_EXTRA_SCROLL_VH = 65;
const HOME_CTA_SECTION_HEIGHT_VH = HOME_CTA_ANIMATION_SPAN_VH + HOME_CTA_EXTRA_SCROLL_VH;

interface HomeClientProps {
  projectsContent?: HomeProjectsContent;
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

export default function HomeClient({ projectsContent }: HomeClientProps) {
  const lastWidth = useRef(0);
  const viewportResolvedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const resolvedProjectsContent = projectsContent ?? homeContent.projects;

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
      <HomeHeroStack content={homeContent.hero} />

      <HomeProjects
        content={resolvedProjectsContent}
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
