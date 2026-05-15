import { Suspense } from "react";
import { requireSession } from "@/lib/dal";
import { formatDate, MEMORY_ITEM, STREAK } from "@/lib/mock-data";
import { EntryFormSkeleton } from "./EntryFormSkeleton";
import { EntryLoader } from "./EntryLoader";
import { TodayShell } from "./TodayShell";

export default async function TodayPage() {
  const session = await requireSession();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <TodayShell
      dateLabel={formatDate(today)}
      streak={STREAK}
      memory={MEMORY_ITEM}
    >
      <Suspense fallback={<EntryFormSkeleton />}>
        <EntryLoader userId={session.user.id} date={today} />
      </Suspense>
    </TodayShell>
  );
}
