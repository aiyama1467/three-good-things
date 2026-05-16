"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ja">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "1rem",
          fontFamily: "sans-serif",
        }}
      >
        <h2>エラーが発生しました</h2>
        <button type="button" onClick={reset}>
          もう一度試す
        </button>
      </body>
    </html>
  );
}
