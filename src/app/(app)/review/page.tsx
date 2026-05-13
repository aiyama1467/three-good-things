import Heatmap from "@/components/Heatmap";
import SketchButton from "@/components/SketchButton";
import { generateHeatmap, STREAK, TOTAL_GOOD_THINGS, TOP_WORDS } from "@/lib/mock-data";
import Link from "next/link";

const heatmapData = generateHeatmap(36);

export default function ReviewPage() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 28, fontWeight: 700 }}>
        ふりかえり
      </div>

      {/* Segment control */}
      <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
        {["年", "月", "週"].map((t, i) => (
          <div
            key={t}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 13,
              padding: "4px 0",
              border: "1.5px solid var(--ink)",
              borderRadius: 99,
              background: i === 0 ? "var(--accent)" : "var(--paper)",
              cursor: "pointer",
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div
        style={{
          border: "2px solid var(--ink)",
          borderRadius: 14,
          padding: "12px 14px",
          background: "var(--paper)",
          marginTop: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 20, fontWeight: 700 }}>2026</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>112 / 133日</div>
        </div>
        <Heatmap data={heatmapData} weeks={36} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--ink-3)", marginTop: 6 }}>
          <span>少ない</span>
          <span style={{ display: "flex", gap: 3, alignItems: "center" }}>
            <span style={{ width: 8, height: 8, display: "inline-block", background: "#e9e3d0", borderRadius: 2 }} />
            <span style={{ width: 8, height: 8, display: "inline-block", background: "var(--accent)", borderRadius: 2 }} />
            <span style={{ width: 8, height: 8, display: "inline-block", background: "var(--accent-2)", borderRadius: 2 }} />
          </span>
          <span>多い</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
        <div
          style={{
            border: "2px solid var(--ink)",
            borderRadius: 14,
            padding: "12px",
            background: "var(--paper)",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 32, fontWeight: 700, color: "var(--accent-2)" }}>
            🔥 {STREAK}
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>連続日数</div>
        </div>
        <div
          style={{
            border: "2px solid var(--ink)",
            borderRadius: 14,
            padding: "12px",
            background: "var(--paper)",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 32, fontWeight: 700 }}>
            {TOTAL_GOOD_THINGS}
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>いいこと累計</div>
        </div>
      </div>

      {/* Word cloud */}
      <div
        style={{
          border: "2px dashed var(--ink)",
          borderRadius: 14,
          padding: "12px 14px",
          background: "transparent",
          marginTop: 10,
        }}
      >
        <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 18, fontWeight: 700 }}>
          よく書いた言葉
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          {TOP_WORDS.map(([word, count], i) => {
            const size = 22 - i * 2;
            return (
              <span
                key={word}
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  fontWeight: 700,
                  fontSize: size,
                  lineHeight: 1.3,
                }}
              >
                {word}{" "}
                <span style={{ color: "var(--ink-3)", fontSize: 11, fontWeight: 400 }}>·{count}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Calendar link */}
      <div style={{ marginTop: 12 }}>
        <Link href="/calendar" style={{ textDecoration: "none" }}>
          <SketchButton>📅 月カレンダーを開く</SketchButton>
        </Link>
      </div>
    </div>
  );
}
