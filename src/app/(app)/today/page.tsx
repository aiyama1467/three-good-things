import { requireSession } from "@/lib/dal";
import { getEntryForDate } from "@/lib/db/queries";
import { formatDate, MEMORY_ITEM, STREAK } from "@/lib/mock-data";
import { TodayClient } from "./TodayClient";

export default async function TodayPage() {
  const session = await requireSession();
  const today = new Date().toISOString().slice(0, 10);
  const entry = await getEntryForDate(session.user.id, today);

  return (
    <TodayClient
      date={today}
      dateLabel={formatDate(today)}
      streak={STREAK}
      memory={MEMORY_ITEM}
      initialItems={entry?.items ?? ["", "", ""]}
      defaultMood={entry?.mood ?? "neutral"}
    />
  );
}
