"use client";

import { useState } from "react";
import Link from "next/link";
import { FILLED_DATES, ENTRIES, getMoodEmoji } from "@/lib/mock-data";

const DAYS_OF_WEEK = ["日", "月", "火", "水", "木", "金", "土"];

function buildCalendar(year: number, month: number) {
  // month is 1-based
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

export default function CalendarPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5);

  const cells = buildCalendar(year, month);
  const today = isoDate(2026, 5, 13);
  const filledCount = cells.filter((d) => d !== null && FILLED_DATES.has(isoDate(year, month, d!))).length;
  const totalDays = cells.filter((d) => d !== null && isoDate(year, month, d!) <= today).length;

  // Most recent filled day for preview
  const previewDate = isoDate(year, month, 10);
  const previewEntry = ENTRIES[previewDate];

  function prev() {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  }
  function next() {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 28, fontWeight: 700 }}>
        カレンダー
      </div>

      {/* Month nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <button
          onClick={prev}
          style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 24, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
        >
          ‹ {year} {month}月 ›
        </button>
        <button onClick={next} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>›</button>
        <div style={{ fontSize: 12, color: "var(--ink-3)" }}>記録 {filledCount} / {totalDays}</div>
      </div>

      {/* Calendar grid */}
      <div
        style={{
          border: "2px solid var(--ink)",
          borderRadius: 14,
          padding: "12px",
          background: "var(--paper)",
          marginTop: 8,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, fontSize: 11, color: "var(--ink-3)", textAlign: "center", marginBottom: 4 }}>
          {DAYS_OF_WEEK.map((d) => <div key={d}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const iso = isoDate(year, month, d);
            const filled = FILLED_DATES.has(iso);
            const isToday = iso === today;
            const entry = ENTRIES[iso];
            return (
              <Link
                key={i}
                href={filled ? `/entry/${iso}` : "#"}
                style={{
                  aspectRatio: "1/1",
                  border: "1.5px solid var(--ink)",
                  borderRadius: 8,
                  background: isToday ? "var(--accent)" : filled ? "var(--paper)" : "var(--paper-2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "var(--ink)",
                  fontFamily: "var(--font-caveat), cursive",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: filled ? "pointer" : "default",
                }}
              >
                <div>{d}</div>
                {filled && (
                  <div style={{ fontSize: 10 }}>
                    {entry ? getMoodEmoji(entry.mood) : "·"}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Monthly summary */}
      <div
        style={{
          border: "2px solid var(--ink)",
          borderRadius: 14,
          padding: "10px 14px",
          background: "var(--paper)",
          marginTop: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 18, fontWeight: 600 }}>月のふりかえり</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>→</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>
          {filledCount}日記録 · よく出た言葉「コーヒー」「家族」「本」
        </div>
      </div>

      {/* On this day memory */}
      <div
        style={{
          border: "2px dashed var(--ink)",
          borderRadius: 14,
          padding: "10px 14px",
          background: "transparent",
          marginTop: 8,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 16, fontWeight: 600 }}>あの日のひとつ</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>2025年5月13日</div>
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>⟳</div>
        </div>
        <div style={{ fontSize: 13, marginTop: 6 }}>&#8220; 雨上がりの匂いがした。 &#8221;</div>
      </div>

      {/* Selected day preview (desktop: show inline, mobile: navigate) */}
      {previewEntry && (
        <div
          style={{
            border: "2.5px solid var(--accent-2)",
            borderRadius: 14,
            padding: "12px 14px",
            background: "var(--paper)",
            marginTop: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 20, fontWeight: 700 }}>5月10日 (土)</div>
            <Link href={`/entry/${previewDate}`} style={{ fontSize: 12, color: "var(--ink-3)", textDecoration: "none" }}>
              {getMoodEmoji(previewEntry.mood)} とても良い日 · 開く →
            </Link>
          </div>
          <ol style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.6, color: "var(--ink-2)", margin: "8px 0 0" }}>
            {previewEntry.items.map((item, i) => item && <li key={i}>{item}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}
