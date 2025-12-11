import type { Request, Response } from "express";
import type { ApplicationsTable } from "../applications/application-handlers.js";
import type { JobsTable } from "../jobs/job-handlers.js";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth/index.js";
import { isValidId, makeDb } from "../database/db.js";

export async function getFreelancerProfile(req: Request, res: Response) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({ message: "log in to continue" });
    return;
  }

  const { path } = req.params;

  if (!path) {
    res.status(422).json({ message: "invalid id" });
    return;
  }

  // assumes id does not contain "-".
  // should always be the case if we're using cuid2
  const splitIdx = path.indexOf("-");
  const userId = path.slice(0, splitIdx);
  const jobSlug = path.slice(splitIdx + 1);

  if (
    typeof userId != "string" ||
    !isValidId(userId) ||
    typeof jobSlug != "string" ||
    jobSlug.trim().length === 0
  ) {
    res.status(422).json({ message: "invalid id" });
    return;
  }

  const normalized = {
    userId: userId.trim(),
    jobSlug: jobSlug.trim().toLowerCase(),
  };

  try {
    const db = makeDb<{ applications: ApplicationsTable; jobs: JobsTable }>();

    const job = await db
      .selectFrom("jobs")
      .selectAll()
      .where("jobs.slug", "=", normalized.jobSlug)
      .executeTakeFirst();

    if (!job) {
      res.status(422).json({ message: "invalid job" });
      return;
    }

    const freelancerProfile = await db
      .selectFrom("applications")
      .innerJoin("jobs", "jobs.id", "applications.job_id")
      .selectAll("applications")
      .select(["jobs.name as job_name", "jobs.slug as job_slug"])
      .where("status", "=", "approved")
      .where("user_id", "=", normalized.userId)
      .where("job_id", "=", job.id)
      .orderBy("applications.updated_at", "desc")
      .executeTakeFirst();

    if (!freelancerProfile) {
      res
        .status(404)
        .json({ message: "freelancer approved profile not found" });
      return;
    }

    res.json({ freelancerProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}
