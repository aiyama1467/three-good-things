import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// TURSO_DATABASE_URL があれば Turso、無ければローカル SQLite に落とす。
// authToken はローカル file: 接続には渡せないので、URL がある時だけ付ける。
const url = process.env.TURSO_DATABASE_URL ?? "file:./local.db";
const authToken = process.env.TURSO_DATABASE_URL
  ? process.env.TURSO_AUTH_TOKEN
  : undefined;

export const client = createClient({ url, authToken });
export const db = drizzle(client, { schema });
