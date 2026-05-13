export default function LoginPage() {
  return (
    <div className="min-h-screen flex" style={{ background: "var(--paper)" }}>
      {/* Desktop: split layout */}
      <div className="hidden md:grid w-full" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
        {/* Left brand panel */}
        <div
          style={{
            background: "var(--paper-2)",
            padding: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "2px dashed var(--ink)",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                border: "2.5px solid var(--ink)",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 28,
                fontWeight: 700,
                boxShadow: "2px 2px 0 var(--ink)",
              }}
            >
              3
            </div>
            <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 26, fontWeight: 700 }}>
              Three Good Things
            </div>
          </div>

          {/* Tagline */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 0.95,
              }}
            >
              今日の<br />いいこと、<br />3つ。
            </div>
            <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 16, lineHeight: 1.6, maxWidth: 360 }}>
              1日の終わりに、ちいさな良いことを 3つだけ書き留める。<br />
              ポジティブ心理学が勧める、続けやすい習慣。
            </div>
          </div>

          {/* Features */}
          <div style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--ink-3)" }}>
            <span>· Google認証</span>
            <span>· 端末間同期</span>
            <span>· エクスポート可</span>
          </div>
        </div>

        {/* Right login panel */}
        <div
          style={{
            padding: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 32, fontWeight: 700 }}>
              ログイン／登録
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>
              Googleアカウントで、サインアップなしで始められます。
            </div>
          </div>

          <GoogleButton />

          <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.6 }}>
            続けることで、<u>利用規約</u> と <u>プライバシーポリシー</u> に同意したとみなします。<br />
            記録はあなたのGoogleアカウントに紐づいて保存されます。
          </div>

          <hr style={{ border: 0, borderTop: "1.5px dashed var(--ink-3)", margin: "8px 0" }} />

          <div style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.6 }}>
            <strong>よくある質問</strong><br />
            · 他の認証は？ → 当面は Google のみ。<br />
            · 退会したい → 設定 → アカウント削除（全データ削除）。
          </div>
        </div>
      </div>

      {/* Mobile: centered layout */}
      <div
        className="md:hidden flex flex-col w-full"
        style={{ justifyContent: "space-between", padding: "40px 24px 48px" }}
      >
        {/* Logo + tagline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              border: "2.5px solid var(--ink)",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-caveat), cursive",
              fontSize: 56,
              fontWeight: 700,
              boxShadow: "3px 3px 0 var(--ink)",
            }}
          >
            3
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-caveat), cursive", fontSize: 38, fontWeight: 700, lineHeight: 0.95 }}>
              3 Good Things
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: "var(--ink-3)" }}>今日あった、いいこと3つ。</div>
          </div>
        </div>

        {/* Login section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <GoogleButton big />
          <div style={{ textAlign: "center", fontSize: 11, color: "var(--ink-3)", lineHeight: 1.5 }}>
            サインアップ不要 · Googleアカウントで自動作成
          </div>
          <div style={{ textAlign: "center", fontSize: 10, color: "#aaa", lineHeight: 1.4, marginTop: 4 }}>
            続けることで <u>利用規約</u> と <u>プライバシー</u> に同意したとみなします。
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleButton({ big }: { big?: boolean }) {
  return (
    <button
      style={{
        border: "2px solid var(--ink)",
        background: "var(--paper)",
        borderRadius: 999,
        padding: big ? "12px 16px" : "10px 16px",
        fontFamily: "inherit",
        fontSize: big ? 15 : 14,
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        boxShadow: "2px 2px 0 var(--ink)",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "2px solid var(--ink)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-caveat), cursive",
          fontWeight: 700,
          fontSize: 12,
          background: "var(--paper-2)",
          flexShrink: 0,
        }}
      >
        G
      </span>
      <span>Google で続ける</span>
    </button>
  );
}
