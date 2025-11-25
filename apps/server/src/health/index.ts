import { Router } from "express";
import { checkHealth } from "./health-handlers.js";

const healthRouter = Router();
healthRouter.get("/health", checkHealth);

export default healthRouter;
