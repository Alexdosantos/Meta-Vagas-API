import { Router } from "express";
import { JobsModule } from "../../app/jobs/jobsModule/JobsModule";
import { Authentication } from "../../utils/Authentication/Authentication";

const jobsRoutes = Router();
const { controller } = JobsModule.instance();

jobsRoutes.use(Authentication.authentic);
jobsRoutes.post("/create", controller.jobsCreate.bind(controller));
jobsRoutes.get("/search", controller.jobsSearch.bind(controller));

export { jobsRoutes };
