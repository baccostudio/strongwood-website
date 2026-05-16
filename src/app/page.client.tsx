"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { getHomeCtaSectionHeightVh } from "@/components/home/home-cta-layout";
import { homeContent } from "@/content/home";
import { HOME_MOBILE_BREAKPOINT } from "@/lib/preloader";
import { resolveViewportHeight, resolveViewportWidth } from "@/lib/viewport";
const VIEWPORT_RECOVERY_DELAY_MS = 250;
const HOME_CTA_FALLBACK_SECTION_HEIGHT_VH = getHomeCtaSectionHeightVh(false);

function HomeCtaFallback() {
  return (
    <section
      className="relative w-full bg-black"
      style={{ height: `calc(var(--vh, 1vh) * ${HOME_CTA_FALLBACK_SECTION_HEIGHT_VH})` }}
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

export default function HomeClient() {
  const lastWidth = useRef(0);
  const stableViewportHeightRef = useRef(0);
  const viewportResolvedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="relative z-10">
      <DynamicHomeCta
        content={homeContent.cta}
        isMobile={isMobile}
      />
    </div>
  );
}
