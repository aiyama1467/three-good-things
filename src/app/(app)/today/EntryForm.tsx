"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MOODS, type Mood } from "@/lib/mock-data";
import { saveEntry } from "./actions";

interface Props {
  date: string;
  initialItems: [string, string, string];
  defaultMood: Mood;
}

export function EntryForm({ date, initialItems, defaultMood }: Props) {
  const [items, setItems] = useState<[string, string, string]>(initialItems);
  const [mood, setMood] = useState<Mood>(defaultMood);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      await saveEntry({ date, items, mood, tags: [] });
    });
  };

  const updateItem = (i: number, val: string) => {
    const next = [...items] as [string, string, string];
    next[i] = val;
    setItems(next);
  };

  return (
    <>
      <div className="space-y-3">
        {([0, 1, 2] as const).map((i) => (
          <Card key={i} className={items[i] ? "ring-1 ring-primary/20" : ""}>
            <CardContent className="py-3 px-4 flex gap-3 items-start">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              <Textarea
                value={items[i]}
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
          <span className="text-sm text-muted-foreground">今日の気分</span>
          <div className="flex gap-2">
            {MOODS.map((m) => (
              <button
                type="button"
                key={m.value}
                onClick={() => setMood(m.value)}
                title={m.label}
                className={`text-xl rounded-full p-0.5 transition-all ${
                  mood === m.value
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

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? "保存中…" : "記録する"}
        </Button>
      </div>
    </>
  );
}
