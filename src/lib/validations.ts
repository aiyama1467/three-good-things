import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

export const signupSchema = loginSchema.extend({
  name: z.string().optional(),
});

const moodValues = ["great", "good", "neutral", "bad", "awful"] as const;
export const moodSchema = z.enum(moodValues);

export const entrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "日付の形式が不正です"),
  items: z.tuple([z.string(), z.string(), z.string()]),
  mood: moodSchema,
  tags: z.array(z.string()),
});

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function extractFieldErrors<T>(error: z.ZodError): FieldErrors<T> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors as FieldErrors<T>;
}
