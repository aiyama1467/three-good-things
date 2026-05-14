import { defineConfig } from "drizzle-kit";

// drizzle-kit 0.31+ では Turso 用に dialect: "turso" が用意されており、
// dbCredentials が { url, authToken } を受け付ける。
// ローカル開発（file: スキーム）は dialect: "sqlite" のままで OK。
export default process.env.TURSO_DATABASE_URL
  ? defineConfig({
      schema: "./src/lib/db/schema.ts",
      out: "./drizzle",
      dialect: "turso",
      dbCredentials: {
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      },
    })
  : defineConfig({
      schema: "./src/lib/db/schema.ts",
      out: "./drizzle",
      dialect: "sqlite",
      dbCredentials: {
        url: "file:./local.db",
      },
    });
