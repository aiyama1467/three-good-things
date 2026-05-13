"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENTRIES, FILLED_DATES, getMoodEmoji } from "@/lib/mock-data";

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

const TODAY = "2026-05-13";
const PREVIEW_DATE = "2026-05-10";

export default function CalendarPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5);

  const cells = buildCalendar(year, month);
  const filledCount = cells.filter(
    (d) => d !== null && FILLED_DATES.has(isoDate(year, month, d as number)),
  ).length;
  const totalDays = cells.filter(
    (d) => d !== null && isoDate(year, month, d as number) <= TODAY,
  ).length;

  const previewEntry = ENTRIES[PREVIEW_DATE];

  function prev() {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else setMonth((m) => m - 1);
  }
  function next() {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else setMonth((m) => m + 1);
  }

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
            <Button variant="ghost" size="icon" onClick={prev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-base">
              {year}年 {month}月
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </Button>
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
              const filled = FILLED_DATES.has(iso);
              const isToday = iso === TODAY;
              const entry = ENTRIES[iso];

              return (
                <Link
                  key={iso}
                  href={filled ? `/entry/${iso}` : "#"}
                  className={`
                    aspect-square flex flex-col items-center justify-center rounded-md text-xs font-medium transition-colors
                    ${isToday ? "bg-primary text-primary-foreground" : ""}
                    ${filled && !isToday ? "bg-secondary hover:bg-secondary/80 cursor-pointer" : ""}
                    ${!filled && !isToday ? "text-muted-foreground" : ""}
                  `}
                >
                  <span>{d}</span>
                  {filled && (
                    <span className="text-[10px] leading-none mt-0.5">
                      {entry ? getMoodEmoji(entry.mood) : "·"}
                    </span>
                  )}
                </Link>
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
            {filledCount}日記録 · よく出た言葉「コーヒー」「家族」「本」
          </p>
        </CardContent>
      </Card>

      {/* On this day */}
      <Card className="border-dashed">
        <CardContent className="py-3 px-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium">あの日のひとつ</p>
              <p className="text-xs text-muted-foreground">2025年5月13日</p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 -mt-1 -mr-1">
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-sm mt-2 italic">
            &#8220; 雨上がりの匂いがした。 &#8221;
          </p>
        </CardContent>
      </Card>

      {/* Selected day preview */}
      {previewEntry && (
        <Card className="border-primary/30">
          <CardContent className="py-3 px-4">
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-semibold text-sm">5月10日（土）</p>
              <Link
                href={`/entry/${PREVIEW_DATE}`}
                className="text-xs text-muted-foreground hover:underline"
              >
                {getMoodEmoji(previewEntry.mood)} 開く →
              </Link>
            </div>
            <ol className="text-xs text-muted-foreground space-y-0.5 list-decimal list-inside">
              {previewEntry.items.map(
                (item) => item && <li key={item}>{item}</li>,
              )}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
