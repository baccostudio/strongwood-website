import { homeContent } from "@/content/home";
import type { HomeProjectStats } from "@/types/home";

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

export function buildFallbackHomeProjectStats(): HomeProjectStats {
  return {
    workCount: formatDisplayWorkCount(homeContent.projects.workCount),
    workCountAriaLabel: buildFallbackHomeProjectWorkCountAriaLabel(),
  };
}

export function buildLiveHomeProjectStats(workCount: string): HomeProjectStats {
  const digits = getWorkCountDigits(workCount);

  if (!digits) {
    return buildFallbackHomeProjectStats();
  }

  return {
    workCount: formatDisplayWorkCount(digits),
    workCountAriaLabel: buildLiveHomeProjectWorkCountAriaLabel(digits),
  };
}
