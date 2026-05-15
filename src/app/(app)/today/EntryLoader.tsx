import { getEntryForDate } from "@/lib/db/queries";
import { EntryForm } from "./EntryForm";

interface Props {
  userId: string;
  date: string;
}

export async function EntryLoader({ userId, date }: Props) {
  const entry = await getEntryForDate(userId, date);

  return (
    <EntryForm
      date={date}
      initialItems={entry?.items ?? ["", "", ""]}
      defaultMood={entry?.mood ?? "neutral"}
    />
  );
}
