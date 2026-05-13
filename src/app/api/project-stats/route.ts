import { NextResponse } from "next/server";
import {
  buildFallbackHomeProjectStats,
  resolveHomeProjectStats,
} from "@/lib/home-project-stats";

export async function GET() {
  try {
    const projectStats = await resolveHomeProjectStats();

    return NextResponse.json(projectStats, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(buildFallbackHomeProjectStats(), {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}
