@AGENTS.md

# Three Good Things

毎日3つの良いことを記録するポジティブ心理学ジャーナリングアプリ。日本語 UI。

## Tech Stack

- Next.js 16 / React 19 / TypeScript 5
- Drizzle ORM + libSQL（ローカル SQLite `file:./local.db`、本番 Turso）
- Better Auth 1.6（email/password、サインアップは env で制御）
- shadcn/ui + Base UI + Tailwind CSS 4
- Biome 2.2（lint + format）、lefthook（pre-commit）
- pnpm 10.17（npm は使わないこと）

## Commands

```
pnpm dev          # 開発サーバー (localhost:3000)
pnpm build        # プロダクションビルド
pnpm lint         # biome check
pnpm format       # biome format --write
pnpm db:generate  # Drizzle スキーマ変更後に SQL 生成
pnpm db:migrate   # マイグレーション実行（.env.local を読む）
pnpm db:push      # スキーマを DB に直接反映
pnpm db:studio    # DB ブラウザ
```

## Architecture

```
src/
├── app/
│   ├── (app)/              # 認証必須ルート（today, calendar, entry, review, settings）
│   │   └── layout.tsx      # getSession() で認証検証、AppSidebar 配置
│   ├── api/auth/[...all]/  # Better Auth API ハンドラ
│   ├── login/              # ログインページ
│   └── layout.tsx          # ルートレイアウト（lang="ja"）
├── components/
│   ├── ui/                 # shadcn/ui プリミティブ（手動編集しない、pnpm dlx shadcn 経由）
│   └── *.tsx               # アプリ固有コンポーネント
├── lib/
│   ├── auth.ts             # Better Auth サーバー設定（Server 側のみ import）
│   ├── auth-client.ts      # クライアント側 auth hooks（signIn, signOut, useSession）
│   ├── dal.ts              # Data Access Layer: getSession / requireSession（react cache）
│   ├── db/index.ts         # Drizzle client
│   └── db/schema.ts        # Drizzle スキーマ定義
└── proxy.ts                # Next.js 16 proxy（旧 middleware）Cookie 存在チェックのみ
```

### Auth フロー（責務分担）

1. **proxy.ts** — Cookie 存在の optimistic check のみ。DB アクセス禁止
2. **(app)/layout.tsx** — `getSession()` で真のセッション検証
3. **dal.ts** — `getSession` / `requireSession`。react cache でリクエスト内メモ化
4. **auth.ts** — サーバー専用。DB アダプタ・nextCookies plugin 設定
5. **auth-client.ts** — クライアント専用。`"use client"` コンポーネントから import

### DB

- テーブル: user, session, account, verification（Better Auth）+ entry（アプリ固有）
- スキーマ変更手順: schema.ts 編集 → `pnpm db:generate` → `pnpm db:migrate`

## Conventions

- コメントは日本語、識別子は英語
- DB カラム: snake_case（Drizzle の camelCase マッピングを使用）
- インポート: `@/*` → `./src/*`。Biome の organizeImports で自動整理
- フォーマット: Biome、2 スペースインデント。コミット時 lefthook → `biome check`
- `components/ui/` は shadcn/ui 生成物 — 変更は `pnpm dlx shadcn` 経由で行う
- Server / Client 境界: `auth.ts` `dal.ts` は Server 専用、Client は `auth-client.ts` を使う

## Next.js 16 注意点

- `middleware.ts` → `proxy.ts` に改名済み。named export `proxy` を使う
- `headers()` / `cookies()` は **await が必要**
- 不明な API は `node_modules/next/dist/docs/` を確認すること

## Env Vars

`.env.local` に設定（`.env.example` 参照）:

| 変数 | 説明 |
|---|---|
| `BETTER_AUTH_SECRET` | 32 文字以上のランダム文字列 |
| `BETTER_AUTH_URL` | アプリ URL（dev: `http://localhost:3000`） |
| `TURSO_DATABASE_URL` | Turso URL（未設定でローカル SQLite） |
| `TURSO_AUTH_TOKEN` | Turso 認証トークン |
| `NEXT_PUBLIC_SIGNUP_ENABLED` | `"true"` で新規登録許可 |
