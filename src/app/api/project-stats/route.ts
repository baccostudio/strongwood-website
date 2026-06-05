import { NextResponse } from "next/server";
import { resolveHomeProjectStats } from "@/lib/home-project-stats";

export const dynamic = "force-dynamic";

export async function GET() {
  const projectStats = await resolveHomeProjectStats();

  return NextResponse.json(projectStats, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}
