import { Router } from "express";
import { getJobs } from "./job-handlers.js";

const jobsRouter = Router();
jobsRouter.get("/", getJobs);

export default jobsRouter;
