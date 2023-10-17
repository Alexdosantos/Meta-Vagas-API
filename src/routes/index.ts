import { Router } from "express";
import { useRoutes } from "./userRoutes/UserRoutes";
import { jobsRoutes } from "./jobsRoutes/JobsRoutes";
import { citySearchRouters } from "./citySearchRoutes/citySearchRoutes";

const routers = Router();

routers.use("/users", useRoutes);
routers.use("/jobs", jobsRoutes);
routers.use("/citySearch", citySearchRouters);

export { routers };
