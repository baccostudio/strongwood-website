"use server";

import { homeContent } from "@/content/home";
import { getHomeProjectWorkCount } from "@/lib/home-projects";
import type { HomeProjectStats } from "@/types/home";

const WORK_COUNT_TIMEOUT_MS = 2500;

function buildFallbackHomeProjectStats(): HomeProjectStats {
  return {
    workCount: homeContent.projects.workCount,
    workCountAriaLabel: homeContent.projects.workCountAriaLabel,
  };
}

function buildHomeProjectStats(workCount: string): HomeProjectStats {
  return {
    workCount,
    workCountAriaLabel: `${workCount} ${homeContent.projects.workCountLabelSuffix}`,
  };
}

async function resolveHomeProjectStats(): Promise<HomeProjectStats> {
  const dynamicWorkCount = await getHomeProjectWorkCount();

  if (!dynamicWorkCount) {
    return buildFallbackHomeProjectStats();
  }

  return buildHomeProjectStats(dynamicWorkCount);
}

export async function getHomeProjectStatsAction(): Promise<HomeProjectStats> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  try {
    return await Promise.race([
      resolveHomeProjectStats(),
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
