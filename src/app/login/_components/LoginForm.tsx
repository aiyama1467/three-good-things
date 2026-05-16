"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {
  extractFieldErrors,
  type FieldErrors,
  loginSchema,
  signupSchema,
} from "@/lib/validations";

const signupEnabled = process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/today";

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<{ email: string; password: string }>
  >({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    const schema = isSignUp ? signupSchema : loginSchema;
    const result = schema.safeParse({
      email,
      password,
      ...(isSignUp && { name }),
    });
    if (!result.success) {
      setFieldErrors(extractFieldErrors(result.error));
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        if (!signupEnabled) {
          setError("新規登録は現在無効です");
          setLoading(false);
          return;
        }
        const { error: err } = await authClient.signUp.email({
          name: name.trim() || email.split("@")[0],
          email,
          password,
        });
        if (err) {
          setError(err.message ?? "登録に失敗しました");
          setLoading(false);
          return;
        }
      } else {
        const { error: err } = await authClient.signIn.email({
          email,
          password,
        });
        if (err) {
          setError(err.message ?? "ログインに失敗しました");
          setLoading(false);
          return;
        }
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("予期しないエラーが発生しました");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <Input
          type="text"
          placeholder="表示名（任意）"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      )}
      <div>
        <Input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          aria-invalid={!!fieldErrors.email}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-destructive">{fieldErrors.email}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete={isSignUp ? "new-password" : "current-password"}
          aria-invalid={!!fieldErrors.password}
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-destructive">
            {fieldErrors.password}
          </p>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "処理中…" : isSignUp ? "アカウントを作成" : "ログイン"}
      </Button>

      {signupEnabled && (
        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? "アカウントをお持ちの方は" : "アカウントがない方は"}
          <button
            type="button"
            className="ml-1 underline underline-offset-4 hover:text-primary"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
          >
            {isSignUp ? "ログイン" : "新規登録"}
          </button>
        </p>
      )}
    </form>
  );
}
