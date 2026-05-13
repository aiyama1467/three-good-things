import type { ReactNode, CSSProperties } from "react";

interface SketchBoxProps {
  children: ReactNode;
  dashed?: boolean;
  accent?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function SketchBox({
  children,
  dashed,
  accent,
  className = "",
  style,
}: SketchBoxProps) {
  return (
    <div
      className={className}
      style={{
        border: `2px ${dashed ? "dashed" : "solid"} var(--ink)`,
        borderRadius: 14,
        padding: "10px 12px",
        background: accent ? "var(--paper-2)" : "var(--paper)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
