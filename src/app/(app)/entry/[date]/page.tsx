import Link from "next/link";
import SketchButton from "@/components/SketchButton";
import { ENTRIES, getMoodEmoji, MOODS, formatDate } from "@/lib/mock-data";

interface Props {
  params: Promise<{ date: string }>;
}

export default async function EntryDetailPage({ params }: Props) {
  const { date } = await params;
  const entry = ENTRIES[date];

  if (!entry) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px" }}>
        <Link href="/calendar" style={{ fontSize: 13, color: "var(--ink-3)", textDecoration: "none" }}>
          ‹ カレンダー
        </Link>
        <div style={{ marginTop: 20, fontSize: 15 }}>この日の記録はありません。</div>
      </div>
    );
  }

  const moodLabel = MOODS.find((m) => m.value === entry.mood)?.label ?? "";

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px" }}>
      {/* Back */}
      <Link href="/calendar" style={{ fontSize: 13, color: "var(--ink-3)", textDecoration: "none" }}>
        ‹ カレンダーに戻る
      </Link>

      {/* Date & mood */}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 28, fontWeight: 700 }}>
          {formatDate(date)}
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>
          {getMoodEmoji(entry.mood)} {moodLabel}な日
        </div>
      </div>

      {/* Entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
        {entry.items.map((item, i) => (
          item ? (
            <div
              key={i}
              style={{
                border: "2px solid var(--ink)",
                borderRadius: 14,
                padding: "10px 14px",
                background: "var(--paper)",
                display: "flex",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: "2px solid var(--ink)",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-caveat), cursive",
                  fontWeight: 700,
                  fontSize: 15,
                  background: "var(--accent)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1, fontSize: 14, lineHeight: 1.5, paddingTop: 4 }}>{item}</div>
            </div>
          ) : null
        ))}
      </div>


      {/* Actions */}
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <SketchButton style={{ flex: 1, justifyContent: "center" }}>編集</SketchButton>
        <SketchButton style={{ flex: 1, justifyContent: "center" }}>↗ 共有</SketchButton>
      </div>
    </div>
  );
}
