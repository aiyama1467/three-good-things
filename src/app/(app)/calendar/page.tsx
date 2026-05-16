import type { Metadata } from "next";
import { Suspense } from "react";
import { requireSession } from "@/lib/dal";
import { getEntriesForMonth, getEntryForDate } from "@/lib/db/queries";
import { CalendarShell } from "./CalendarShell";
import { CalendarSkeleton } from "./CalendarSkeleton";

export const metadata: Metadata = { title: "カレンダー" };

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const params = await searchParams;
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const year = params.year ? Number(params.year) : now.getFullYear();
  const month = params.month ? Number(params.month) : now.getMonth() + 1;

  return (
    <Suspense key={`${year}-${month}`} fallback={<CalendarSkeleton />}>
      <CalendarLoader year={year} month={month} today={today} />
    </Suspense>
  );
}

async function CalendarLoader({
  year,
  month,
  today,
}: {
  year: number;
  month: number;
  today: string;
}) {
  const session = await requireSession();
  const userId = session.user.id;

  const lastYearDate = `${year - 1}-${today.slice(5)}`;
  const [entries, onThisDayEntry] = await Promise.all([
    getEntriesForMonth(userId, year, month),
    getEntryForDate(userId, lastYearDate),
  ]);

  return (
    <CalendarShell
      entries={entries}
      year={year}
      month={month}
      today={today}
      onThisDayEntry={onThisDayEntry}
      onThisDayDate={lastYearDate}
    />
  );
}
