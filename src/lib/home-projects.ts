import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import type { RowDataPacket } from "mysql2/promise";
import { getDb } from "@/lib/db";

const HOME_PROJECT_SEQUENCE_KEY = "st_code";

interface ProjectCodeSequenceRow extends RowDataPacket {
  sequence_key: string;
  current_value: number;
}

export async function getHomeProjectWorkCount() {
  noStore();

  const db = getDb();

  if (!db) {
    return null;
  }

  try {
    const [rows] = await db.query<ProjectCodeSequenceRow[]>(
      `
        SELECT sequence_key, current_value
        FROM project_code_sequence
        WHERE sequence_key = ?
        LIMIT 1
      `,
      [HOME_PROJECT_SEQUENCE_KEY],
    );

    const currentValue = rows[0]?.current_value;

    return typeof currentValue === "number" ? String(currentValue) : null;
  } catch (error) {
    const detail =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Unknown database error.";

    console.warn(`[home-projects] Falling back to static work count. ${detail}`);
    return null;
  }
}
