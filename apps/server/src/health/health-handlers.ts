import type { Request, Response } from "express";
import { pingDb } from "../database/db.js";

export async function checkHealth(_: Request, res: Response) {
  // done this way to extend it if we need to check other systems
  const healthCheck: HealthCheck = { status: "UP", db: "UP" };
  let status = 200;

  const isDatabaseAlive = await pingDb();
  if (!isDatabaseAlive) {
    status = 503;
    healthCheck.status = "DOWN";
    healthCheck.db = "DOWN";
  }

  res.status(status).json(healthCheck);
}

type Status = "UP" | "DOWN";
interface HealthCheck {
  status: Status;
  db: Status;
}
