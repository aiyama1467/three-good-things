"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MOODS, type Mood } from "@/lib/mock-data";
import { entrySchema } from "@/lib/validations";
import { saveEntry } from "../../actions";

interface Props {
  date: string;
  items: [string, string, string];
  mood: Mood;
}

export function EntryDetailClient({ date, items, mood }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editItems, setEditItems] = useState(items);
  const [editMood, setEditMood] = useState(mood);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    const result = entrySchema.safeParse({
      date,
      items: editItems,
      mood: editMood,
    });
    if (!result.success) return;
    startTransition(async () => {
      await saveEntry({ date, items: editItems, mood: editMood });
      router.refresh();
      setIsEditing(false);
    });
  };

  const handleCancel = () => {
    setEditItems(items);
    setEditMood(mood);
    setIsEditing(false);
  };

  const updateItem = (i: number, val: string) => {
    const next = [...editItems] as [string, string, string];
    next[i] = val;
    setEditItems(next);
  };

  if (isEditing) {
    return (
      <>
        <div className="space-y-2">
          {([0, 1, 2] as const).map((i) => (
            <Card
              key={i}
              className={editItems[i] ? "ring-1 ring-primary/20" : ""}
            >
              <CardContent className="py-3 px-4 flex gap-3 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <Textarea
                  value={editItems[i]}
                  onChange={(e) => updateItem(i, e.target.value)}
                  placeholder="ここに書く…"
                  className="min-h-[60px] resize-none rounded-none border-0 p-0 shadow-none focus-visible:ring-0 text-sm leading-relaxed"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/30">
          <CardContent className="py-3 px-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">気分</span>
            <div className="flex gap-2">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  onClick={() => setEditMood(m.value)}
                  title={m.label}
                  className={`text-xl rounded-full p-0.5 transition-all ${
                    editMood === m.value
                      ? "ring-2 ring-primary ring-offset-1 scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2 justify-end pt-2">
          <Button variant="ghost" onClick={handleCancel} disabled={isPending}>
            キャンセル
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "保存中…" : "保存する"}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {items.map((item, i) =>
          item ? (
            <Card key={item}>
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

      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
          <Pencil className="h-3.5 w-3.5 mr-1.5" />
          編集
        </Button>
      </div>
    </>
  );
}
