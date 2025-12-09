import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>) {
  await db.schema
    .createType("application_status")
    .asEnum(["pending", "approved", "rejected"])
    .execute();

  await db.schema
    .createTable("jobs")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .addColumn("slug", "text", (col) => col.notNull().unique())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.schema
    .createTable("applications")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("user_id", "text", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .addColumn("job_id", "text", (col) =>
      col.notNull().references("jobs.id").onDelete("restrict"),
    )
    .addColumn("experience", "text", (col) => col.notNull())
    .addColumn("skills", "text", (col) => col.notNull())
    .addColumn("portfolio_url", "text", (col) => col.notNull())
    .addColumn("services_description", "text", (col) => col.notNull())
    .addColumn("is_public", "boolean", (col) => col.notNull())
    .addColumn("status", sql`application_status`, (col) =>
      col.defaultTo("pending").notNull(),
    )
    .addColumn("rejection_reason", "text")
    .addCheckConstraint(
      "rejection_reason_required_if_rejected",
      sql`status <> 'rejected' OR rejection_reason IS NOT NULL`,
    )
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.schema
    .createIndex("jobs_job_slug_idx")
    .on("jobs")
    .column("slug")
    .execute();

  await db.schema
    .createIndex("applications_user_id_idx")
    .on("applications")
    .column("user_id")
    .execute();

  await db.schema
    .createIndex("applications_job_id_idx")
    .on("applications")
    .column("job_id")
    .execute();

  await db.schema
    .createIndex("applications_user_id_job_id_idx")
    .on("applications")
    .columns(["user_id", "job_id"])
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropIndex("applications_user_id_job_id_idx").execute();
  await db.schema.dropIndex("applications_job_id_idx").execute();
  await db.schema.dropIndex("applications_user_id_idx").execute();
  await db.schema.dropIndex("jobs_job_slug_idx").execute();

  await db.schema.dropTable("applications").ifExists().execute();
  await db.schema.dropTable("jobs").ifExists().execute();
  await db.schema.dropType("application_status").ifExists().execute();
}
