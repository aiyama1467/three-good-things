import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

// 中央定義。Server 側からのみ import する想定（"server-only" は付けないが、
// 実行時には DB クライアントが Node ランタイム要求のため自然に Server に閉じる）。
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});

export type Auth = typeof auth;
export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
