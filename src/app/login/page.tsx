import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Desktop: left brand panel */}
      <div className="hidden md:flex flex-col justify-between w-[420px] shrink-0 bg-muted p-12 border-r">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            3
          </div>
          <span className="font-semibold text-lg">Three Good Things</span>
        </div>

        <div className="flex-1 flex items-center pb-24">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight">
              今日の
              <br />
              いいこと、
              <br />
              3つ。
            </h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              1日の終わりに、ちいさな良いことを 3つだけ書き留める。
              ポジティブ心理学が勧める、続けやすい習慣。
            </p>
          </div>
        </div>
      </div>

      {/* Right: login form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <Card className="w-full max-w-sm">
          <CardHeader>
            {/* Mobile logo */}
            <div className="flex justify-center mb-4 md:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-3xl">
                3
              </div>
            </div>
            <CardTitle className="text-2xl">
              {process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true"
                ? "ログイン / 登録"
                : "ログイン"}
            </CardTitle>
            <CardDescription>
              {process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true"
                ? "メールアドレスとパスワードで始められます。"
                : "メールアドレスとパスワードでログインしてください。"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* useSearchParams を使うため Suspense が必要（Next.js 15+） */}
            <Suspense
              fallback={
                <div className="space-y-4">
                  <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
                  <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
                  <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
