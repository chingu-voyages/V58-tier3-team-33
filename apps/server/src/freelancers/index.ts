import { Router } from "express";
import { getFreelancerProfile, getFreelancers } from "./freelancer-handlers.js";

const freelancersRouter = Router();
freelancersRouter.get("/", getFreelancers);
freelancersRouter.get("/:path", getFreelancerProfile);

export default freelancersRouter;
