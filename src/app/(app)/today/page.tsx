import EntryCard from "@/components/EntryCard";
import MoodPicker from "@/components/MoodPicker";
import SketchButton from "@/components/SketchButton";
import { ENTRIES, STREAK, MEMORY_ITEM } from "@/lib/mock-data";

const TODAY = "2026-05-13";
const todayEntry = ENTRIES[TODAY];

function formatTodayHeader() {
  return "5月13日（火）";
}

export default function TodayPage() {
  const initialItems = todayEntry?.items ?? ["", "", ""];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <div>
          <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 28, fontWeight: 700 }}>
            今日のいいこと
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{formatTodayHeader()}</div>
        </div>
        <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 20, color: "var(--accent-2)" }}>
          🔥 {STREAK}日
        </div>
      </div>

      {/* Memory pill */}
      <div
        style={{
          border: "2px dashed var(--ink)",
          borderRadius: 14,
          padding: "8px 12px",
          background: "var(--paper-2)",
          marginBottom: 4,
        }}
      >
        <div style={{ fontSize: 11, color: "var(--ink-3)" }}>
          1年前の今日 · {MEMORY_ITEM.date.replace(/-/g, "/")}
        </div>
        <div style={{ fontSize: 13, marginTop: 2 }}>&#8220;{MEMORY_ITEM.text}&#8221;</div>
      </div>

      {/* Entry cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        {[0, 1, 2].map((i) => (
          <EntryCard key={i} index={i} initialValue={initialItems[i]} />
        ))}
      </div>

      {/* Mood picker */}
      <div style={{ marginTop: 8 }}>
        <MoodPicker defaultMood={todayEntry?.mood ?? "neutral"} />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
        <SketchButton primary style={{ fontSize: 13 }}>記録する</SketchButton>
      </div>
    </div>
  );
}
