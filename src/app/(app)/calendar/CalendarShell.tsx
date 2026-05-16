"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MonthEntry } from "@/lib/db/queries";
import { formatDate, getMoodEmoji, type Mood } from "@/lib/mock-data";

const DAYS_OF_WEEK = ["日", "月", "火", "水", "木", "金", "土"];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function prevHref(year: number, month: number) {
  const [py, pm] = month === 1 ? [year - 1, 12] : [year, month - 1];
  return `?year=${py}&month=${pm}`;
}

function nextHref(year: number, month: number) {
  const [ny, nm] = month === 12 ? [year + 1, 1] : [year, month + 1];
  return `?year=${ny}&month=${nm}`;
}

interface CalendarShellProps {
  entries: MonthEntry[];
  year: number;
  month: number;
  today: string;
  onThisDayEntry: {
    date: string;
    items: [string, string, string];
    mood: Mood;
  } | null;
  onThisDayDate: string;
}

export function CalendarShell({
  entries,
  year,
  month,
  today,
  onThisDayEntry,
  onThisDayDate,
}: CalendarShellProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const entryMap = new Map(entries.map((e) => [e.date, e]));
  const cells = buildCalendar(year, month);

  const filledCount = entries.length;
  const totalDays = cells.filter(
    (d) => d !== null && isoDate(year, month, d as number) <= today,
  ).length;

  const selectedEntry = selectedDate ? entryMap.get(selectedDate) : null;

  return (
    <div className="max-w-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">カレンダー</h1>
        <Badge variant="outline">
          {filledCount} / {totalDays} 日
        </Badge>
      </div>

      {/* Calendar card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Link
              href={prevHref(year, month)}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <CardTitle className="text-base">
              {year}年 {month}月
            </CardTitle>
            <Link
              href={nextHref(year, month)}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day-of-week header */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_OF_WEEK.map((d) => (
              <div
                key={d}
                className="text-center text-xs text-muted-foreground py-1"
              >
                {d}
              </div>
            ))}
          </div>
          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              // biome-ignore lint/suspicious/noArrayIndexKey: null cells are positional placeholders with no stable id
              if (d === null) return <div key={`empty-${i}`} />;
              const iso = isoDate(year, month, d);
              const entry = entryMap.get(iso);
              const filled = !!entry;
              const isToday = iso === today;

              if (filled) {
                return (
                  <button
                    type="button"
                    key={iso}
                    onClick={() => setSelectedDate(iso)}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-md text-xs font-medium transition-colors cursor-pointer
                      ${isToday ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"}
                    `}
                  >
                    <span>{d}</span>
                    <span className="text-[10px] leading-none mt-0.5">
                      {getMoodEmoji(entry.mood)}
                    </span>
                  </button>
                );
              }

              return (
                <div
                  key={iso}
                  className={`
                    aspect-square flex flex-col items-center justify-center rounded-md text-xs font-medium
                    ${isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
                  `}
                >
                  <span>{d}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly summary */}
      <Card className="bg-muted/30">
        <CardContent className="py-3 px-4">
          <p className="text-sm font-medium">月のふりかえり</p>
          <p className="text-xs text-muted-foreground mt-1">
            {filledCount}日記録
          </p>
        </CardContent>
      </Card>

      {/* On this day */}
      {onThisDayEntry && (
        <Card className="border-dashed">
          <CardContent className="py-3 px-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">あの日のひとつ</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(onThisDayDate)}
                </p>
              </div>
              <Link
                href={`/entry/${onThisDayDate}`}
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 -mt-1 -mr-1",
                })}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="text-sm mt-2 italic">
              &#8220;{" "}
              {onThisDayEntry.items.find((item) => item.trim() !== "") ?? ""}{" "}
              &#8221;
            </p>
          </CardContent>
        </Card>
      )}

      {/* Selected day preview */}
      {selectedEntry && selectedDate && (
        <Card className="border-primary/30">
          <CardContent className="py-3 px-4">
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-semibold text-sm">
                {formatDate(selectedDate)}
              </p>
              <Link
                href={`/entry/${selectedDate}`}
                className="text-xs text-muted-foreground hover:underline"
              >
                {getMoodEmoji(selectedEntry.mood)} 開く →
              </Link>
            </div>
            <ol className="text-xs text-muted-foreground space-y-0.5 list-decimal list-inside">
              {selectedEntry.items.map(
                (item) => item && <li key={item}>{item}</li>,
              )}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
