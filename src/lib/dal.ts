import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";

// Server Component / Server Action から呼ぶ「真」のセッション検証。
// react.cache でリクエスト内メモ化、Next.js 16 仕様に従い headers() は await。
// proxy.ts は Cookie の存在を見るだけの optimistic check に留め、
// 認可の判断はここで行う。
export const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

// 認証必須なルート / Server Action の頭で 1 行呼ぶための糖衣。
// redirect は try/catch の外で呼ばれるよう、戻り値経由ではなくこの関数内で実行する。
export const requireSession = cache(async () => {
  const s = await getSession();
  if (!s) redirect("/login");
  return s;
});
