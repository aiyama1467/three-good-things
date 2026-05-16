import type { Metadata } from "next";
import { Suspense } from "react";
import { formatDate, MEMORY_ITEM, STREAK } from "@/lib/mock-data";
import { EntryFormSkeleton } from "./EntryFormSkeleton";
import { EntryLoader } from "./EntryLoader";
import { TodayShell } from "./TodayShell";

export const metadata: Metadata = { title: "今日" };

export default async function TodayPage() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <TodayShell
      dateLabel={formatDate(today)}
      streak={STREAK}
      memory={MEMORY_ITEM}
    >
      <Suspense fallback={<EntryFormSkeleton />}>
        <EntryLoader date={today} />
      </Suspense>
    </TodayShell>
  );
}
