"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  HOME_PRELOADER_START_EVENT,
  HOME_READY_DATASET_KEY,
  HOME_READY_EVENT,
  PRELOADER_HOME_PATH,
  getDocumentPreloaderState,
  setDocumentPreloaderState,
} from "@/lib/preloader";

interface PreloaderProps {
  minDuration?: number;
  homeFallbackDuration?: number;
}

export function Preloader({
  minDuration = 350,
  homeFallbackDuration = 1200,
}: PreloaderProps) {
  const pathname = usePathname();

  useEffect(() => {
    const barFill = document.getElementById("initial-bar-fill");
    const root = document.documentElement;
    let cleanupCurrentRun: (() => void) | null = null;

    const stopCurrentRun = () => {
      cleanupCurrentRun?.();
      cleanupCurrentRun = null;
    };

    const skipLoading = () => {
      stopCurrentRun();
      setDocumentPreloaderState(root, "skip");
      document.body.style.overflow = "";
    };

    const resetProgressBar = () => {
      if (!barFill) {
        return;
      }

      barFill.style.transition = "none";
      barFill.style.width = "0%";
      void barFill.offsetHeight;
      barFill.style.transition = "width 0.1s ease-out";
    };

    const finishLoading = () => {
      if (barFill) {
        barFill.style.width = "100%";
      }

      setDocumentPreloaderState(root, "finished");
      document.body.style.overflow = "";
    };

    const startLoading = () => {
      if (
        pathname !== PRELOADER_HOME_PATH ||
        cleanupCurrentRun ||
        getDocumentPreloaderState(root) !== "pending"
      ) {
        return;
      }

      resetProgressBar();
      document.body.style.overflow = "hidden";

      let progress = 0;
      let minElapsed = false;
      let canFinish = root.dataset[HOME_READY_DATASET_KEY] === "true";
      let isFinished = false;
      let isCleanedUp = false;

      const cleanupRun = () => {
        if (isCleanedUp) {
          return;
        }

        isCleanedUp = true;
        window.clearInterval(progressInterval);
        window.clearTimeout(minTimer);
        window.clearTimeout(fallbackTimer);
        window.removeEventListener(HOME_READY_EVENT, handleHomeReady);
        document.body.style.overflow = "";
      };

      const tryFinish = () => {
        if (!minElapsed || !canFinish || isFinished) {
          return;
        }

        isFinished = true;
        finishLoading();
        cleanupRun();
        cleanupCurrentRun = null;
      };

      const handleHomeReady = () => {
        canFinish = true;
        tryFinish();
      };

      if (!canFinish) {
        window.addEventListener(HOME_READY_EVENT, handleHomeReady);
      }

      const progressInterval = window.setInterval(() => {
        const maxProgress = canFinish ? 96 : 88;
        const remaining = Math.max(maxProgress - progress, 0);
        progress += Math.max(remaining * 0.18, 1.6);
        progress = Math.min(progress, maxProgress);

        if (barFill) {
          barFill.style.width = `${progress}%`;
        }
      }, 50);

      const minTimer = window.setTimeout(() => {
        minElapsed = true;
        tryFinish();
      }, minDuration);

      const fallbackTimer = window.setTimeout(() => {
        canFinish = true;
        tryFinish();
      }, homeFallbackDuration);

      cleanupCurrentRun = cleanupRun;
    };

    const handleStart = () => {
      startLoading();
    };

    window.addEventListener(HOME_PRELOADER_START_EVENT, handleStart);

    if (pathname !== PRELOADER_HOME_PATH) {
      skipLoading();
    } else if (getDocumentPreloaderState(root) === "pending") {
      startLoading();
    } else {
      skipLoading();
    }

    return () => {
      window.removeEventListener(HOME_PRELOADER_START_EVENT, handleStart);
      stopCurrentRun();
      document.body.style.overflow = "";
    };
  }, [pathname, minDuration, homeFallbackDuration]);

  return null;
}
