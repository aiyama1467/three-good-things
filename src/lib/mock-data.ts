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
  tags: string[];
}

export const ENTRIES: Record<string, Entry> = {
  "2026-05-13": {
    date: "2026-05-13",
    items: [
      "朝のコーヒーがいつもより美味しかった。豆を変えたから。",
      "プレゼンで上司に「分かりやすかった」と言われた。",
      "",
    ],
    mood: "neutral",
    tags: ["仕事", "コーヒー"],
  },
  "2026-05-12": {
    date: "2026-05-12",
    items: ["夕焼けがきれいだった", "新しい曲を見つけた", "歩いて帰った"],
    mood: "good",
    tags: ["音楽", "散歩"],
  },
  "2026-05-11": {
    date: "2026-05-11",
    items: [
      "友達とランチをした",
      "読んでいた本の続きが面白かった",
      "天気が良かった",
    ],
    mood: "good",
    tags: ["友達", "読書"],
  },
  "2026-05-10": {
    date: "2026-05-10",
    items: [
      "公園で桜の最後の花びらが残っていた",
      "新しい本を読み終えた",
      "妹から電話があった",
    ],
    mood: "great",
    tags: ["家族", "読書", "自然"],
  },
  "2026-05-09": {
    date: "2026-05-09",
    items: [
      "犬の散歩中に虹が見えた",
      "お気に入りのカフェでゆっくりできた",
      "良く眠れた",
    ],
    mood: "great",
    tags: ["散歩", "カフェ"],
  },
  "2026-05-08": {
    date: "2026-05-08",
    items: ["犬と散歩した", "上司に褒められた", "—"],
    mood: "good",
    tags: ["散歩", "仕事"],
  },
  "2026-05-06": {
    date: "2026-05-06",
    items: [
      "新しいレシピに挑戦した",
      "友達から面白い記事が届いた",
      "空が綺麗だった",
    ],
    mood: "good",
    tags: ["料理", "友達"],
  },
  "2026-05-05": {
    date: "2026-05-05",
    items: ["家族で食事をした", "映画を観た", "よく笑えた"],
    mood: "great",
    tags: ["家族"],
  },
  "2026-05-03": {
    date: "2026-05-03",
    items: ["ゆっくり起きた", "読書が進んだ", "散歩が気持ちよかった"],
    mood: "great",
    tags: ["読書", "散歩"],
  },
  "2026-05-02": {
    date: "2026-05-02",
    items: [
      "仕事がうまく進んだ",
      "おいしいランチを食べた",
      "帰り道が気持ちよかった",
    ],
    mood: "good",
    tags: ["仕事"],
  },
  "2026-05-01": {
    date: "2026-05-01",
    items: [
      "新しい月が始まった",
      "コーヒーが美味しかった",
      "音楽を聴きながら仕事できた",
    ],
    mood: "good",
    tags: ["コーヒー", "音楽"],
  },
};

export const FILLED_DATES = new Set(Object.keys(ENTRIES));

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
  const d = new Date(isoDate + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const dow = days[d.getDay()];
  return `${month}月${day}日（${dow}）`;
}

export function getMoodEmoji(mood: Mood): string {
  return MOODS.find((m) => m.value === mood)?.emoji ?? "😐";
}
