"use client";

import { useState } from "react";
import { MOODS, type Mood } from "@/lib/mock-data";

interface MoodPickerProps {
  defaultMood?: Mood;
}

export default function MoodPicker({
  defaultMood = "neutral",
}: MoodPickerProps) {
  const [selected, setSelected] = useState<Mood>(defaultMood);

  return (
    <div
      style={{
        border: "2px solid var(--ink)",
        borderRadius: 14,
        padding: "10px 12px",
        background: "var(--paper-2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: 13, color: "var(--ink-2)" }}>今日の気分</div>
      <div style={{ display: "flex", gap: 8, fontSize: 20 }}>
        {MOODS.map((m) => (
          <button
            key={m.value}
            onClick={() => setSelected(m.value)}
            title={m.label}
            style={{
              background: "none",
              border: "none",
              padding: 2,
              cursor: "pointer",
              outline: selected === m.value ? "2px solid var(--ink)" : "none",
              borderRadius: "50%",
              lineHeight: 1,
            }}
          >
            {m.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
