import { TodayClient } from "./TodayClient";
import { ENTRIES, STREAK, MEMORY_ITEM } from "@/lib/mock-data";

const TODAY = "2026-05-13";

export default function TodayPage() {
  const entry = ENTRIES[TODAY];
  const initialItems: [string, string, string] = entry?.items ?? ["", "", ""];
  const defaultMood = entry?.mood ?? "neutral";

  return (
    <TodayClient
      dateLabel="5月13日（火）"
      streak={STREAK}
      memory={MEMORY_ITEM}
      initialItems={initialItems}
      defaultMood={defaultMood}
    />
  );
}
