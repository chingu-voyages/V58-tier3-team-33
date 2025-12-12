import { Router } from "express";
import {
  createApplication,
  getPendingApplication,
} from "./application-handlers.js";

const applicationsRouter = Router();
applicationsRouter.post("/", createApplication);
applicationsRouter.get("/current", getPendingApplication);

export default applicationsRouter;
