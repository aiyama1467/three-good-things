import "server-only";

import { and, eq } from "drizzle-orm";
import type { Mood } from "@/lib/mock-data";
import { db } from ".";
import { entry } from "./schema";

export async function getEntryForDate(userId: string, date: string) {
  const row = await db
    .select()
    .from(entry)
    .where(and(eq(entry.userId, userId), eq(entry.date, date)))
    .get();

  if (!row) return null;

  return {
    date: row.date,
    items: [row.item1, row.item2, row.item3] as [string, string, string],
    mood: row.mood as Mood,
    tags: JSON.parse(row.tags) as string[],
  };
}
