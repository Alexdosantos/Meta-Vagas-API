import { Router } from "express";
import { UseModule } from "../../app/users/useModule/UseModule";
import { Authentication } from "../../utils/Authentication/Authentication";

const useRoutes = Router();
const { controller } = UseModule.instance();

useRoutes.post("/create", controller.createUser.bind(controller));
useRoutes.post("/login", controller.loginUser.bind(controller));

useRoutes.use(Authentication.authentic); // Authenticação , o que estiver abaixo precisa estar authenticado
useRoutes.get("/list", controller.getUserAll.bind(controller));
useRoutes.put("/update/:_id", controller.editUser.bind(controller))
useRoutes.post("/:_userId/jobs/:_jobsId/favorites", controller.jobsFavorite.bind(controller))
useRoutes.delete("/:_userId/jobs/:_jobsId/favorites", controller.removeJobsFavorite.bind(controller))

export { useRoutes };
