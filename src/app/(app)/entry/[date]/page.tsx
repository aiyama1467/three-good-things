import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { requireSession } from "@/lib/dal";
import { getEntryForDate } from "@/lib/db/queries";
import { formatDate, getMoodEmoji, MOODS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { EntryDetailClient } from "./EntryDetailClient";

interface Props {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  return { title: formatDate(date) };
}

export default async function EntryDetailPage({ params }: Props) {
  const { date } = await params;
  const session = await requireSession();
  const entry = await getEntryForDate(session.user.id, date);

  if (!entry) notFound();

  const moodLabel = MOODS.find((m) => m.value === entry.mood)?.label ?? "";

  return (
    <div className="max-w-xl space-y-4">
      <Link
        href="/calendar"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-2",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        カレンダー
      </Link>

      <div>
        <h1 className="text-2xl font-bold">{formatDate(date)}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {getMoodEmoji(entry.mood)} {moodLabel}な日
        </p>
      </div>

      <EntryDetailClient date={date} items={entry.items} mood={entry.mood} />
    </div>
  );
}
