import { sql, type Kysely } from "kysely";

export async function up({ schema }: Kysely<unknown>) {
  await schema
    .createTable("users")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull().unique())
    .addColumn("email_verified", "boolean", (col) => col.notNull())
    .addColumn("image", "text")
    .addColumn("created_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await schema
    .createTable("sessions")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("user_id", "text", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires_at", "timestamptz", (col) => col.notNull())
    .addColumn("ip_address", "text")
    .addColumn("user_agent", "text")
    .addColumn("created_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await schema
    .createTable("accounts")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("user_id", "text", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .addColumn("account_id", "text", (col) => col.notNull())
    .addColumn("provider_id", "text", (col) => col.notNull())
    .addColumn("access_token", "text")
    .addColumn("access_token_expires_at", "timestamptz")
    .addColumn("refresh_token", "text")
    .addColumn("refresh_token_expires_at", "timestamptz")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("password", "text")
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await schema
    .createTable("verifications")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("value", "text", (col) => col.notNull())
    .addColumn("expires_at", "timestamptz", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await schema
    .createIndex("sessions_user_id_idx")
    .on("sessions")
    .column("user_id")
    .execute();
  await schema
    .createIndex("accounts_user_id_idx")
    .on("accounts")
    .column("user_id")
    .execute();
  await schema
    .createIndex("verifications_identifier_idx")
    .on("verifications")
    .column("identifier")
    .execute();
}

export async function down({ schema }: Kysely<unknown>) {
  await schema.dropIndex("verifications_identifier_idx").ifExists().execute();
  await schema.dropIndex("accounts_user_id_idx").ifExists().execute();
  await schema.dropIndex("sessions_user_id_idx").ifExists().execute();

  await schema.dropTable("verifications").ifExists().execute();
  await schema.dropTable("accounts").ifExists().execute();
  await schema.dropTable("sessions").ifExists().execute();
  await schema.dropTable("users").ifExists().execute();
}
