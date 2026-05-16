import "server-only";

import { homeContent } from "@/content/home";
import { getHomeProjectWorkCount } from "@/lib/home-projects";
import type { HomeProjectStats } from "@/types/home";

const WORK_COUNT_TIMEOUT_MS = 2500;

function getWorkCountDigits(workCount: string) {
  return workCount.replace(/\D+/g, "");
}

function normalizeHomeProjectWorkCount(workCount: string) {
  const digits = getWorkCountDigits(workCount);

  return digits ? `+${digits}` : homeContent.projects.workCount;
}

function buildHomeProjectWorkCountAriaLabel(workCount: string) {
  const digits = getWorkCountDigits(workCount);

  if (!digits) {
    return homeContent.projects.workCountAriaLabel;
  }

  return `${homeContent.projects.workCountAriaPrefix} ${digits} ${homeContent.projects.workCountLabelSuffix}`;
}

function buildHomeProjectStats(workCount: string): HomeProjectStats {
  const normalizedWorkCount = normalizeHomeProjectWorkCount(workCount);

  return {
    workCount: normalizedWorkCount,
    workCountAriaLabel: buildHomeProjectWorkCountAriaLabel(normalizedWorkCount),
  };
}

export function buildFallbackHomeProjectStats(): HomeProjectStats {
  return buildHomeProjectStats(homeContent.projects.workCount);
}

async function resolveLiveHomeProjectStats(): Promise<HomeProjectStats> {
  const dynamicWorkCount = await getHomeProjectWorkCount();

  if (!dynamicWorkCount) {
    return buildFallbackHomeProjectStats();
  }

  return buildHomeProjectStats(dynamicWorkCount);
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
