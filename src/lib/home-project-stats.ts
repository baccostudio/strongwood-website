import "server-only";

import { getHomeProjectWorkCount } from "@/lib/home-projects";
import {
  buildFallbackHomeProjectStats,
  buildLiveHomeProjectStats,
} from "@/lib/home-project-stats-format";
import type { HomeProjectStats } from "@/types/home";

const WORK_COUNT_TIMEOUT_MS = 2500;

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
