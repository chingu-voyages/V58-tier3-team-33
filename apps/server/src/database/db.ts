import { Pool } from "pg";
import { Kysely, PostgresDialect, sql } from "kysely";
import { ENV } from "../config/env.js";

const database = ENV.database.DB_NAME;
const host = ENV.database.DB_HOST;
const user = ENV.database.DB_USER;
const password = ENV.database.DB_PASSWORD;

let db: Kysely<object>;

/*
opted for T extends Record<string, object> even if it allows
schemas of empty tables since a compile time enforcement of
1+ column tables is not worth having an overly complex generic
*/
export function makeDb<
  T extends Record<string, object> = Record<string, never>,
>() {
  if (!db) {
    try {
      console.info("> establishing db connection...");
      const pool = new Pool({
        database,
        host,
        user,
        password,
        port: 5432,
        max: 10,
      });
      console.info("> db connection successful");

      const dialect = new PostgresDialect({ pool });
      db = new Kysely<object>({ dialect });
    } catch (err) {
      console.error("> database connection failed");
      throw err;
    }
  }

  return db.withTables<T>();
}

export async function pingDb() {
  try {
    await sql`SELECT 1`.execute(makeDb());
    return true;
  } catch (err) {
    console.error("> DB ping failed", err);
    return false;
  }
}
