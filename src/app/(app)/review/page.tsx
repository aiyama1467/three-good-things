import Link from "next/link";
import { Flame, CalendarDays } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  generateHeatmap,
  STREAK,
  TOTAL_GOOD_THINGS,
  TOP_WORDS,
} from "@/lib/mock-data";

const heatmapData = generateHeatmap(36);
const WEEKS = 36;

export default function ReviewPage() {
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">ふりかえり</h1>

      {/* Heatmap */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-baseline justify-between">
            <CardTitle className="text-base">2026 年間ヒートマップ</CardTitle>
            <span className="text-xs text-muted-foreground">112 / 133日</span>
          </div>
        </CardHeader>
        <CardContent>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${WEEKS}, 1fr)`,
              gap: 2,
            }}
          >
            {heatmapData.map((filled, i) => {
              const v = (Math.sin(i * 1.3) + 1) / 2;
              const strong = v > 0.7;
              return (
                <div
                  key={i}
                  className="aspect-square rounded-[2px]"
                  style={{
                    background: filled
                      ? strong
                        ? "oklch(0.577 0.245 27.325)"
                        : "oklch(0.646 0.222 41.116)"
                      : "oklch(0.922 0 0)",
                  }}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>少ない</span>
            <div className="flex items-center gap-1">
              <span className="inline-block w-2.5 h-2.5 rounded-[2px] bg-border" />
              <span
                className="inline-block w-2.5 h-2.5 rounded-[2px]"
                style={{ background: "oklch(0.646 0.222 41.116)" }}
              />
              <span
                className="inline-block w-2.5 h-2.5 rounded-[2px]"
                style={{ background: "oklch(0.577 0.245 27.325)" }}
              />
            </div>
            <span>多い</span>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="py-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-bold">
              <Flame className="h-6 w-6 text-orange-500" />
              {STREAK}
            </div>
            <p className="text-xs text-muted-foreground mt-1">連続日数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold">{TOTAL_GOOD_THINGS}</p>
            <p className="text-xs text-muted-foreground mt-1">いいこと累計</p>
          </CardContent>
        </Card>
      </div>

      {/* Word cloud */}
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">よく書いた言葉</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 items-baseline">
            {TOP_WORDS.map(([word, count], i) => (
              <span
                key={word}
                className="font-semibold"
                style={{ fontSize: `${22 - i * 2}px` }}
              >
                {word}
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  ·{count}
                </span>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar link */}
      <Link
        href="/calendar"
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        <CalendarDays className="h-4 w-4" />
        月カレンダーを開く
      </Link>
    </div>
  );
}
