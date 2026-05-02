"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  HOME_READY_DATASET_KEY,
  HOME_READY_EVENT,
  PRELOADER_HOME_PATH,
  getDocumentPreloaderState,
  hasResolvedPreloaderSignature,
  persistResolvedPreloaderSignature,
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
    const isHome = pathname === PRELOADER_HOME_PATH;
    const initialPreloaderState = getDocumentPreloaderState(root);

    const hasResolvedSignature = () => {
      try {
        return hasResolvedPreloaderSignature(window.localStorage);
      } catch {
        return false;
      }
    };

    const markSignatureResolved = () => {
      try {
        persistResolvedPreloaderSignature(window.localStorage);
      } catch {}
    };

    const skipLoading = () => {
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
      markSignatureResolved();
    };

    if (!isHome) {
      skipLoading();
      return;
    }

    if (initialPreloaderState !== "pending" && hasResolvedSignature()) {
      skipLoading();
      return;
    }

    if (getDocumentPreloaderState(root) !== "pending") {
      setDocumentPreloaderState(root, "pending");
    }

    resetProgressBar();
    document.body.style.overflow = "hidden";

    let progress = 0;
    let minElapsed = false;
    let canFinish = root.dataset[HOME_READY_DATASET_KEY] === "true";
    let isFinished = false;

    const tryFinish = () => {
      if (!minElapsed || !canFinish || isFinished) {
        return;
      }

      isFinished = true;
      window.clearInterval(progressInterval);
      window.clearTimeout(minTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener(HOME_READY_EVENT, handleHomeReady);
      finishLoading();
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

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(minTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener(HOME_READY_EVENT, handleHomeReady);
      document.body.style.overflow = "";
    };
  }, [pathname, minDuration, homeFallbackDuration]);

  return null;
}
