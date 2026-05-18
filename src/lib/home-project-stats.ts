import "server-only";

import { homeContent } from "@/content/home";
import { getHomeProjectWorkCount } from "@/lib/home-projects";
import type { HomeProjectStats } from "@/types/home";

const WORK_COUNT_TIMEOUT_MS = 2500;

function getWorkCountDigits(workCount: string) {
  return workCount.replace(/\D+/g, "");
}

function formatDisplayWorkCount(workCount: string) {
  const digits = getWorkCountDigits(workCount);

  if (!digits) {
    return homeContent.projects.workCount;
  }

  return `+${digits}`;
}

function buildFallbackHomeProjectWorkCountAriaLabel() {
  return homeContent.projects.workCountAriaLabel;
}

function buildLiveHomeProjectWorkCountAriaLabel(workCount: string) {
  const digits = getWorkCountDigits(workCount);

  if (!digits) {
    return buildFallbackHomeProjectWorkCountAriaLabel();
  }

  return `${digits} ${homeContent.projects.workCountLabelSuffix}`;
}

function buildFallbackHomeProjectStats(): HomeProjectStats {
  return {
    workCount: formatDisplayWorkCount(homeContent.projects.workCount),
    workCountAriaLabel: buildFallbackHomeProjectWorkCountAriaLabel(),
  };
}

function buildLiveHomeProjectStats(workCount: string): HomeProjectStats {
  const digits = getWorkCountDigits(workCount);

  if (!digits) {
    return buildFallbackHomeProjectStats();
  }

  return {
    workCount: formatDisplayWorkCount(digits),
    workCountAriaLabel: buildLiveHomeProjectWorkCountAriaLabel(digits),
  };
}

async function resolveLiveHomeProjectStats(): Promise<HomeProjectStats> {
  const dynamicWorkCount = await getHomeProjectWorkCount();

  if (!dynamicWorkCount) {
    return buildFallbackHomeProjectStats();
  }

  return buildLiveHomeProjectStats(dynamicWorkCount);
}

export async function resolveHomeProjectStats(): Promise<HomeProjectStats> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  try {
    return await Promise.race([
      resolveLiveHomeProjectStats(),
      new Promise<HomeProjectStats>((resolve) => {
        timeoutId = setTimeout(() => {
          resolve(buildFallbackHomeProjectStats());
        }, WORK_COUNT_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
