interface HeatmapProps {
  data: boolean[];
  weeks?: number;
}

export default function Heatmap({ data, weeks = 26 }: HeatmapProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${weeks}, 1fr)`,
        gap: 2,
        marginTop: 8,
      }}
    >
      {data.map((filled, i) => {
        const v = (Math.sin(i * 1.3) + 1) / 2;
        const strong = v > 0.7;
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: heatmap cells are purely positional
            key={`cell-${i}`}
            style={{
              aspectRatio: "1/1",
              background: filled
                ? strong
                  ? "var(--heatmap-strong)"
                  : "var(--heatmap-weak)"
                : "var(--heatmap-empty)",
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
}
