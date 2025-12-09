import { Router } from "express";
import { createApplication } from "./application-handlers.js";

const applicationsRouter = Router();
applicationsRouter.post("/", createApplication);

export default applicationsRouter;
