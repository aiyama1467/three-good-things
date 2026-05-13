import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            今日の<br />いいこと、<br />3つ。
          </h1>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
            1日の終わりに、ちいさな良いことを 3つだけ書き留める。
            ポジティブ心理学が勧める、続けやすい習慣。
          </p>
        </div>

        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>· Google認証</span>
          <span>· 端末間同期</span>
          <span>· エクスポート可</span>
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
            <CardTitle className="text-2xl">ログイン / 登録</CardTitle>
            <CardDescription>
              Googleアカウントで、サインアップなしで始められます。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg" variant="outline">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google で続ける
            </Button>

            <Separator />

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              続けることで{" "}
              <span className="underline cursor-pointer">利用規約</span>
              {" "}と{" "}
              <span className="underline cursor-pointer">プライバシーポリシー</span>
              {" "}に同意したとみなします。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
