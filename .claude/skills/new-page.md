---
description: "認証付きページの雛形を生成する。例: /new-page stats"
---

# new-page

引数で受け取った名前をもとに `src/app/(app)/<name>/page.tsx` を生成する。

## 手順

1. 引数からページ名を取得する（例: `stats`）。引数がなければユーザーに聞く
2. `src/app/(app)/<name>/` ディレクトリを作成
3. 以下のパターンで `page.tsx` を生成:

```tsx
import { requireSession } from "@/lib/dal";

export default async function <Name>Page() {
  const session = await requireSession();

  return (
    <div>
      <h1 className="text-2xl font-bold"><Name></h1>
    </div>
  );
}
```

## ルール

- `requireSession()` を必ず呼ぶ（認証必須ルート）
- Server Component として作成（`"use client"` は付けない）
- `@/lib/dal` から import する（`@/lib/auth` を直接使わない）
- 関数名は `<Name>Page`（PascalCase + Page サフィックス）
- 既存の `src/app/(app)/today/page.tsx` のパターンに従う
- 同名のディレクトリが既にあれば上書きせずユーザーに確認する
