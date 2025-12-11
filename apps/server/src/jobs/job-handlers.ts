import type { Request, Response } from "express";
import type { ColumnType } from "kysely";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth/index.js";
import { makeDb } from "../database/db.js";

interface JobsTable {
  id: ColumnType<string, string, never>;
  name: string;
  slug: string;
}

export async function getJobs(req: Request, res: Response) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({ message: "log in to continue" });
    return;
  }

  try {
    const db = makeDb<{ jobs: JobsTable }>();
    const jobs = await db.selectFrom("jobs").selectAll().execute();

    res.json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}
