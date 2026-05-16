"use server";

import { and, eq } from "drizzle-orm";
import { requireSession } from "@/lib/dal";
import { db } from "@/lib/db";
import { entry } from "@/lib/db/schema";
import type { Mood } from "@/lib/mock-data";
import { entrySchema } from "@/lib/validations";

export async function saveEntry(data: {
  date: string;
  items: [string, string, string];
  mood: Mood;
}) {
  const session = await requireSession();
  const userId = session.user.id;
  const now = new Date();

  const parsed = entrySchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
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
      createdAt: now,
      updatedAt: now,
    });
  }
}
