import { createAuthClient } from "better-auth/react";

// 同一オリジンで動かす想定。別オリジンに置く場合のみ
// NEXT_PUBLIC_BETTER_AUTH_URL を baseURL として渡す。
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signOut, useSession } = authClient;
