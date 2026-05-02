import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";
import { homeContent } from "@/content/home";
import { getHomeProjectWorkCount } from "@/lib/home-projects";
import type { HomeProjectStatsResponse } from "@/types/home";

export const dynamic = "force-dynamic";

function buildFallbackProjectStatsResponse(): HomeProjectStatsResponse {
  return {
    workCount: homeContent.projects.workCount,
    workCountAriaLabel: homeContent.projects.workCountAriaLabel,
    isFallback: true,
  };
}

function buildProjectStatsResponse(workCount: string): HomeProjectStatsResponse {
  return {
    workCount,
    workCountAriaLabel: `${workCount} ${homeContent.projects.workCountLabelSuffix}`,
    isFallback: false,
  };
}

export async function GET() {
  noStore();

  const dynamicWorkCount = await getHomeProjectWorkCount();
  const response = dynamicWorkCount
    ? buildProjectStatsResponse(dynamicWorkCount)
    : buildFallbackProjectStatsResponse();

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
