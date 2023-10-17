import { Router } from "express";
import { CitySearchModule } from "../../app/citySearch/citySearchModule/citySearchModule";
import { Authentication } from "../../utils/Authentication/Authentication";

const citySearchRouters = Router();
const { controller } = CitySearchModule.instance();

citySearchRouters.use(Authentication.authentic);
citySearchRouters.get("/", controller.findAll.bind(controller));
citySearchRouters.get("/filterFiverCity", controller.findFive.bind(controller));
citySearchRouters.get("/filterFiverCityAndTechnology", controller.findByCityAndTechology.bind(controller));


export { citySearchRouters };
