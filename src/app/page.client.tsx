'use client'

import { useEffect, useRef, useState } from "react";
import { HomeCta } from "@/components/home/HomeCta";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeProjects } from "@/components/home/HomeProjects";
import { homeContent } from "@/content/home";
import { getHomeHeroViewport, getHomeHeroViewportWidth } from "@/lib/home-hero";
import { cn } from "@/lib/utils";
import {
  HOME_READY_DATASET_KEY,
  HOME_READY_EVENT,
} from "@/lib/preloader";
import type { HomeHeroViewportMode, HomeProjectsContent } from "@/types/home";

const DESKTOP_PROJECT_TRACK_GAP = 150;

interface HomeClientProps {
  projectsContent?: HomeProjectsContent;
}

export default function HomeClient({ projectsContent }: HomeClientProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lastWidth = useRef(0);
  const lockedHeight = useRef(0);
  const homeReadyDispatched = useRef(false);
  const viewportResolvedRef = useRef(false);

  const [height, setHeight] = useState(0);
  const [heroViewport, setHeroViewport] = useState<HomeHeroViewportMode>("desktop");
  const [viewportResolved, setViewportResolved] = useState(false);
  const [isHomeReadyAssetLoaded, setIsHomeReadyAssetLoaded] = useState(false);
  const isMobile = heroViewport === "mobile";
  const resolvedProjectsContent = projectsContent ?? homeContent.projects;

  useEffect(() => {
    delete document.documentElement.dataset[HOME_READY_DATASET_KEY];
    homeReadyDispatched.current = false;
    viewportResolvedRef.current = false;

    const calculateHeight = () => {
      if (!trackRef.current) {
        return;
      }

      const currentWidth = getHomeHeroViewportWidth(window);
      const nextHeroViewport = getHomeHeroViewport(currentWidth);
      const trackHeight = trackRef.current.offsetHeight;
      const projectTrackGap = nextHeroViewport === "mobile" ? 0 : DESKTOP_PROJECT_TRACK_GAP;

      if (currentWidth !== lastWidth.current) {
        const innerH = window.innerHeight;
        lockedHeight.current = innerH;

        const vh = innerH * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        lastWidth.current = currentWidth;
        setHeroViewport(nextHeroViewport);
        setViewportResolved(true);
        viewportResolvedRef.current = true;
      } else if (!viewportResolvedRef.current) {
        setHeroViewport(nextHeroViewport);
        setViewportResolved(true);
        viewportResolvedRef.current = true;
      }

      const nextHeight = trackHeight + lockedHeight.current + projectTrackGap;
      setHeight((currentHeight) => (currentHeight === nextHeight ? currentHeight : nextHeight));
    };

    calculateHeight();

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(() => calculateHeight());

    if (trackRef.current) {
      resizeObserver?.observe(trackRef.current);
    }

    window.addEventListener("resize", calculateHeight);

    return () => {
      delete document.documentElement.dataset[HOME_READY_DATASET_KEY];
      resizeObserver?.disconnect();
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  useEffect(() => {
    if (!viewportResolved || !isHomeReadyAssetLoaded || homeReadyDispatched.current) {
      return;
    }

    let isCancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    const fontsReady = "fonts" in document
      ? document.fonts.ready.catch(() => undefined)
      : Promise.resolve();

    homeReadyDispatched.current = true;

    void fontsReady.then(() => {
      if (isCancelled) {
        return;
      }

      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          document.documentElement.dataset[HOME_READY_DATASET_KEY] = "true";
          window.dispatchEvent(new Event(HOME_READY_EVENT));
        });
      });
    });

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [isHomeReadyAssetLoaded, viewportResolved]);

  const handleCriticalHeroAssetLoad = () => {
    setIsHomeReadyAssetLoaded((current) => (current ? current : true));
  };

  return (
    <main className="relative">
      <div className="z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <HomeHero
            content={homeContent.hero}
            heroViewport={heroViewport}
            onCriticalAssetLoad={handleCriticalHeroAssetLoad}
          />
        </div>
      </div>

      <div
        className="relative z-0 bg-(--color-muted)"
        style={{
          height: height ? `${height}px` : "300vh",
          marginTop: "calc(var(--vh, 1vh) * -100)",
        }}
      >
        <div
          className="sticky top-0 overflow-hidden"
          style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
        >
          <div
            className={cn(
              "absolute left-0 w-full bg-inherit pointer-events-none",
              isMobile ? "-bottom-[20vh] h-[22vh]" : "-bottom-[10vh] h-[10.5vh]",
            )}
          />
          <div ref={trackRef} className="flex flex-col">
            <HomeProjects content={resolvedProjectsContent} />
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-2">
        <HomeCta content={homeContent.cta} isMobile={isMobile} />
      </div>
    </main>
  );
}
