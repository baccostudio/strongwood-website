import "server-only";

import { homeContent } from "@/content/home";
import { getHomeProjectWorkCount } from "@/lib/home-projects";
import type { HomeProjectStats } from "@/types/home";

const WORK_COUNT_TIMEOUT_MS = 2500;

function normalizeWorkCount(value: string) {
  return value.startsWith("+") ? value : `+${value}`;
}

export function buildFallbackHomeProjectStats(): HomeProjectStats {
  return {
    workCount: homeContent.projects.workCount,
    workCountAriaLabel: homeContent.projects.workCountAriaLabel,
  };
}

function buildLiveHomeProjectStats(workCount: string): HomeProjectStats {
  const normalizedWorkCount = normalizeWorkCount(workCount);
  const countWithoutPrefix = normalizedWorkCount.replace(/^\+/, "");

  return {
    workCount: normalizedWorkCount,
    workCountAriaLabel: `Más de ${countWithoutPrefix} ${homeContent.projects.workCountLabelSuffix}`,
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
