import { CommoError } from "../../../utils/commoError/CommoError";
import { CitySearchRepository } from "../citySearchRepository/CitySearchRepository";

class CitySearchService {
  constructor(private repository: CitySearchRepository) {}

  async findAll() {
    try {
      const result = await this.repository.findAll();
      return result;
    } catch (error) {
      return CommoError.ErroBuild("erro ao buscar a lista", 401);
    }
  }

  async findFive (){
    try {
      const result = await this.repository.findFive();
      return result
    }catch (error) {
      return CommoError.ErroBuild("Filtro não encontrado", 404);
    }
  }
 async findByCityAndTechology(){
    try {
      const result = await this.repository.findByCityAndTechology();
      return result
    }catch (error) {
      return CommoError.ErroBuild("Filtro não encontrado", 404);
    }
  }
}

export { CitySearchService };
