"use client";

import { Flame } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  dateLabel: string;
  streak: number;
  memory: { date: string; text: string };
  children: ReactNode;
}

export function TodayShell({ dateLabel, streak, memory, children }: Props) {
  return (
    <div className="max-w-xl space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-bold">今日のいいこと</h1>
          <p className="text-sm text-muted-foreground">{dateLabel}</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Flame className="h-3.5 w-3.5 text-orange-500" />
          {streak}日連続
        </Badge>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="py-3 px-4">
          <p className="text-xs text-muted-foreground mb-0.5">
            1年前の今日 · {memory.date.replace(/-/g, "/")}
          </p>
          <p className="text-sm">&#8220;{memory.text}&#8221;</p>
        </CardContent>
      </Card>

      {children}
    </div>
  );
}
