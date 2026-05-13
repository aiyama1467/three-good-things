"use client";

import { useState } from "react";

interface EntryCardProps {
  index: number;
  initialValue?: string;
}

export default function EntryCard({
  index,
  initialValue = "",
}: EntryCardProps) {
  const [value, setValue] = useState(initialValue);
  const filled = value.trim().length > 0;

  return (
    <div
      style={{
        border: "2px solid var(--ink)",
        borderRadius: 14,
        padding: "10px 14px",
        background: "var(--paper)",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      {/* Number badge */}
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
          flexShrink: 0,
          marginTop: 2,
          background: filled ? "var(--accent)" : "var(--paper)",
        }}
      >
        {index + 1}
      </div>

      <div style={{ flex: 1 }}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ここに書く…"
          rows={2}
          style={{
            border: "none",
            background: "transparent",
            width: "100%",
            fontFamily: "inherit",
            fontSize: 14,
            lineHeight: 1.5,
            color: "var(--ink)",
            resize: "none",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}
