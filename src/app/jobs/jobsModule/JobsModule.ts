import { JobsRepository } from "../repository/JobsRepository";
import { JobsService } from "../service/JobsService";
import { JobsControllers } from "../controllers/JobsControllers";
import { Jobs } from "../entities/JobsSchema";
import { CitySearchRepository } from "../../citySearch/citySearchRepository/CitySearchRepository";
import { CitySearch } from "../../citySearch/citySearchEntities/CitySearchEntities";

class JobsModule {
  static instance() {
    const repository = new JobsRepository(Jobs);
    const citySearch = new CitySearchRepository(CitySearch);
    const service = new JobsService(repository, citySearch);
    const controller = new JobsControllers(service);
    return { repository, service, controller };
  }
}

export { JobsModule };
