import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Better Auth の全エンドポイント（/api/auth/sign-in/social, /api/auth/callback/google,
// /api/auth/session, /api/auth/sign-out など）をこのキャッチオールでまとめて公開する。
export const { GET, POST } = toNextJsHandler(auth.handler);
