import { CitySearchRepository } from "../citySearchRepository/CitySearchRepository";
import { CitySearchService } from "../citySearchService/citySearchService";
import { CitySearchControllers } from "../citySearchControllers/citySearchControllers";
import { CitySearch } from "../citySearchEntities/CitySearchEntities";

class CitySearchModule {
  static instance() {
    const repository = new CitySearchRepository(CitySearch);
    const service = new CitySearchService(repository);
    const controller = new CitySearchControllers(service);
    return { repository, service, controller };
  }
}

export { CitySearchModule };
