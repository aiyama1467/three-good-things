export type Mood = "great" | "good" | "neutral" | "bad" | "awful";

export const MOODS: { value: Mood; emoji: string; label: string }[] = [
  { value: "great", emoji: "😀", label: "とても良い" },
  { value: "good", emoji: "🙂", label: "良い" },
  { value: "neutral", emoji: "😐", label: "普通" },
  { value: "bad", emoji: "😕", label: "悪い" },
  { value: "awful", emoji: "😣", label: "とても悪い" },
];

export interface Entry {
  date: string; // ISO date e.g. "2026-05-10"
  items: [string, string, string];
  mood: Mood;
}

export const STREAK = 7;
export const TOTAL_GOOD_THINGS = 336;

export const TOP_WORDS: [string, number][] = [
  ["コーヒー", 24],
  ["散歩", 18],
  ["家族", 16],
  ["本", 12],
  ["空", 9],
  ["ありがとう", 7],
];

// Half-year heatmap data (26 weeks × 7 days)
export function generateHeatmap(weeks = 26): boolean[] {
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const v = (Math.sin(i * 1.3) + 1) / 2;
    return v > 0.35;
  });
}

export const MEMORY_ITEM = {
  date: "2025-05-13",
  text: "雨上がりの匂いがした。",
};

export function formatDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const dow = days[d.getDay()];
  return `${month}月${day}日（${dow}）`;
}

export function getMoodEmoji(mood: Mood): string {
  return MOODS.find((m) => m.value === mood)?.emoji ?? "😐";
}
