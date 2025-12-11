import { Router } from "express";
import { getFreelancerProfile } from "./freelancer-handlers.js";

const freelancersRouter = Router();
freelancersRouter.get("/:path", getFreelancerProfile);

export default freelancersRouter;
