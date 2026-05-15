"use server";

import { and, eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { requireSession } from "@/lib/dal";
import { db } from "@/lib/db";
import { entry } from "@/lib/db/schema";
import type { Mood } from "@/lib/mock-data";

const VALID_MOODS: Mood[] = ["great", "good", "neutral", "bad", "awful"];

export async function saveEntry(data: {
  date: string;
  items: [string, string, string];
  mood: Mood;
  tags: string[];
}) {
  const session = await requireSession();
  const userId = session.user.id;
  const now = new Date();

  if (!VALID_MOODS.includes(data.mood)) {
    throw new Error("Invalid mood");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    throw new Error("Invalid date format");
  }

  const existing = await db
    .select({ id: entry.id })
    .from(entry)
    .where(and(eq(entry.userId, userId), eq(entry.date, data.date)))
    .get();

  if (existing) {
    await db
      .update(entry)
      .set({
        item1: data.items[0],
        item2: data.items[1],
        item3: data.items[2],
        mood: data.mood,
        tags: JSON.stringify(data.tags),
        updatedAt: now,
      })
      .where(eq(entry.id, existing.id));
  } else {
    await db.insert(entry).values({
      id: crypto.randomUUID(),
      userId,
      date: data.date,
      item1: data.items[0],
      item2: data.items[1],
      item3: data.items[2],
      mood: data.mood,
      tags: JSON.stringify(data.tags),
      createdAt: now,
      updatedAt: now,
    });
  }

  updateTag(`entry:${userId}:${data.date}`);
}
