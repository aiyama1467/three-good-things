import { requireSession } from "@/lib/dal";
import { getEntryForDate } from "@/lib/db/queries";
import { EntryForm } from "./EntryForm";

interface Props {
  date: string;
}

export async function EntryLoader({ date }: Props) {
  const session = await requireSession();
  const entry = await getEntryForDate(session.user.id, date);

  return (
    <EntryForm
      date={date}
      initialItems={entry?.items ?? ["", "", ""]}
      defaultMood={entry?.mood ?? "neutral"}
    />
  );
}
