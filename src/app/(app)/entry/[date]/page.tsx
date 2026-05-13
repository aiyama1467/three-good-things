import Link from "next/link";
import { ChevronLeft, Pencil, Share2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ENTRIES, getMoodEmoji, MOODS, formatDate } from "@/lib/mock-data";

interface Props {
  params: Promise<{ date: string }>;
}

export default async function EntryDetailPage({ params }: Props) {
  const { date } = await params;
  const entry = ENTRIES[date];

  if (!entry) {
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
        <p className="text-muted-foreground">この日の記録はありません。</p>
      </div>
    );
  }

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

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{formatDate(date)}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {getMoodEmoji(entry.mood)} {moodLabel}な日
        </p>
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {entry.items.map((item, i) =>
          item ? (
            <Card key={i}>
              <CardContent className="py-3 px-4 flex gap-3 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed pt-0.5">{item}</p>
              </CardContent>
            </Card>
          ) : null,
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="sm">
          <Pencil className="h-3.5 w-3.5 mr-1.5" />
          編集
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-3.5 w-3.5 mr-1.5" />
          共有
        </Button>
      </div>
    </div>
  );
}
