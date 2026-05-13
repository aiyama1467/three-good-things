"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/today", label: "今日", shape: "square" },
  { href: "/calendar", label: "カレンダー", shape: "square" },
  { href: "/review", label: "ふりかえる", shape: "square" },
  { href: "/settings", label: "設定", shape: "circle" },
];

const MOBILE_TABS = [
  { href: "/today", label: "今日", shape: "square" },
  { href: "/review", label: "ふりかえる", shape: "square" },
  { href: "/settings", label: "設定", shape: "circle" },
];

export default function Navigation({ streak = 7 }: { streak?: number }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="desktop-nav"
        style={{
          width: 200,
          background: "var(--paper-2)",
          borderRight: "2px solid var(--ink)",
          padding: "16px 12px",
          flexDirection: "column",
          gap: 6,
          flexShrink: 0,
          minHeight: "100vh",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 8px 12px",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: "2px solid var(--ink)",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-caveat), cursive",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            3
          </div>
          <div
            style={{
              fontFamily: "var(--font-caveat), cursive",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            3 Good Things
          </div>
        </div>

        {/* Nav items */}
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                background: active ? "var(--accent)" : "transparent",
                border: active
                  ? "2px solid var(--ink)"
                  : "2px solid transparent",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  border: "1.5px solid var(--ink)",
                  borderRadius: item.shape === "circle" ? "50%" : 4,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {item.label}
            </Link>
          );
        })}

        <div style={{ flex: 1 }} />

        {/* User avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 8px",
            fontSize: 12,
            color: "var(--ink-2)",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "1.5px solid var(--ink)",
              background: "var(--paper)",
              flexShrink: 0,
            }}
          />
          <div>
            <div>あなた</div>
            <div style={{ fontSize: 10, color: "var(--ink-3)" }}>
              🔥 {streak}日連続
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile tab bar */}
      <nav
        className="mobile-nav"
        style={{
          position: "fixed",
          left: 12,
          right: 12,
          bottom: 10,
          height: 52,
          background: "var(--paper)",
          border: "2px solid var(--ink)",
          borderRadius: 18,
          alignItems: "center",
          justifyContent: "space-around",
          boxShadow: "2px 2px 0 var(--ink)",
          fontSize: 11,
          color: "var(--ink-2)",
          zIndex: 50,
        }}
      >
        {MOBILE_TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                color: active ? "var(--ink)" : "var(--ink-2)",
                fontWeight: active ? 700 : 400,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  border: `2px solid currentColor`,
                  borderRadius: tab.shape === "circle" ? "50%" : 6,
                  display: "inline-block",
                }}
              />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
