import type { Request, Response } from "express";
import type { ColumnType } from "kysely";
import type { JobsTable } from "../jobs/job-handlers.js";
import { fromNodeHeaders } from "better-auth/node";
import z from "zod";
import { auth } from "../auth/index.js";
import { makeDb, makeId } from "../database/db.js";

/*
opted for simpler interface instead of discriminated union
for status+rejection_reason as a workaround for kysely
not supporting them, resulting in typing errors when used
see https://github.com/kysely-org/kysely/issues/577
*/
type Status = "pending" | "approved" | "rejected";
interface ApplicationsTable {
  id: ColumnType<string, string, never>;
  user_id: ColumnType<string, string, never>;
  job_id: JobsTable["id"];
  experience: string;
  skills: string;
  portfolio_url: URL["href"];
  services_description: string;
  is_public: boolean;
  status: ColumnType<
    Status,
    Extract<Status, "pending">,
    Exclude<Status, "pending">
  >;
  rejection_reason?: string;
  created_at: ColumnType<ReturnType<Date["toISOString"]>, never, never>;
  updated_at: ColumnType<
    ReturnType<Date["toISOString"]>,
    never,
    ReturnType<Date["toISOString"]>
  >;
}

export async function createApplication(req: Request, res: Response) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({ message: "log in to continue" });
    return;
  }

  const { success, data: validated, error } = validateApplicationData(req.body);

  if (!success) {
    res.status(422).json({ message: "invalid input", errors: error });
    return;
  }

  const normalized = normalizeApplicationData(validated);

  try {
    const db = makeDb<{ applications: ApplicationsTable; jobs: JobsTable }>();

    const job = await db
      .selectFrom("jobs")
      .selectAll()
      .where("jobs.id", "=", normalized.jobId)
      .executeTakeFirst();

    if (!job) {
      res.status(422).json({ message: "invalid job" });
      return;
    }

    const hasPendingApplications = await db
      .selectFrom("applications")
      .innerJoin("jobs", "jobs.id", "applications.job_id")
      .select("applications.id as id")
      .where("status", "=", "pending")
      .where("user_id", "=", session.user.id)
      .where("job_id", "=", job.id)
      .executeTakeFirst();

    if (hasPendingApplications) {
      res
        .status(403)
        .json({ message: "a previous application is pending review" });
      return;
    }

    const application = await db
      .insertInto("applications")
      .values({
        id: makeId(),
        user_id: session.user.id,
        job_id: job.id,
        experience: normalized.experience,
        skills: normalized.skills,
        portfolio_url: normalized.portfolioUrl,
        services_description: normalized.servicesDescription,
        is_public: normalized.isPublic,
        status: "pending",
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    res.status(201).json({ application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}

function validateApplicationData(body: unknown) {
  const applicationSchema = z.object({
    // TODO: change relevant properties to enums after seeing frontend
    jobId: z.string().trim().nonempty(),
    experience: z.string(),
    skills: z.string().nonempty(),
    portfolioUrl: z.url(),
    servicesDescription: z.string().trim().nonempty(),
    isPublic: z.boolean().optional(),
  });

  const { success, data, error } = applicationSchema.safeParse(body);
  if (success) {
    return { success, data };
  }

  return { success, error: z.flattenError(error) };
}

function normalizeApplicationData(
  validated: NonNullable<ReturnType<typeof validateApplicationData>["data"]>,
) {
  return {
    jobId: validated.jobId.trim(),
    experience: validated.experience.trim().toLowerCase(),
    skills: validated.skills.trim().toLowerCase(),
    portfolioUrl: new URL(validated.portfolioUrl).href,
    servicesDescription: validated.servicesDescription.trim(),
    isPublic: validated.isPublic ?? true,
  };
}
