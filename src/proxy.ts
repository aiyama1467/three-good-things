import { type NextRequest, NextResponse } from "next/server";

// Next.js 16: middleware.ts は proxy.ts に改名された。
// named export `proxy` を使うこと。詳細は
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
//
// ここでは Cookie の存在チェックだけを行う optimistic check に徹し、
// DB 問合せや署名検証はしない（公式 doc: "avoid database checks to
// prevent performance issues"）。真の認可は src/lib/dal.ts で行う。

const PROTECTED_PREFIXES = [
  "/today",
  "/calendar",
  "/entry",
  "/review",
  "/settings",
];

// Better Auth は HTTPS 環境で Cookie 名に "__Secure-" を付けるため、
// 開発（HTTP）／本番（HTTPS）両対応で 2 つ見る。
// 参照: node_modules/better-auth/dist/cookies/index.mjs
const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = SESSION_COOKIES.some((n) => req.cookies.has(n));

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isProtected && !hasSession) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/today", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // /api/auth/*、_next 内部、静的アセットは除外
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|woff2?)$).*)",
  ],
};
