import "server-only";

import { and, eq, gte, lte } from "drizzle-orm";
import type { Mood } from "@/lib/mock-data";
import { db } from ".";
import { entry } from "./schema";

export type MonthEntry = {
  date: string;
  items: [string, string, string];
  mood: Mood;
};

export async function getEntriesForMonth(
  userId: string,
  year: number,
  month: number,
): Promise<MonthEntry[]> {
  const mm = String(month).padStart(2, "0");
  const startDate = `${year}-${mm}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${mm}-${String(lastDay).padStart(2, "0")}`;

  const rows = await db
    .select({
      date: entry.date,
      item1: entry.item1,
      item2: entry.item2,
      item3: entry.item3,
      mood: entry.mood,
    })
    .from(entry)
    .where(
      and(
        eq(entry.userId, userId),
        gte(entry.date, startDate),
        lte(entry.date, endDate),
      ),
    )
    .all();

  return rows.map((row) => ({
    date: row.date,
    items: [row.item1, row.item2, row.item3] as [string, string, string],
    mood: row.mood as Mood,
  }));
}

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
  };
}
