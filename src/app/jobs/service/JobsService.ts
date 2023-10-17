import { CommoError } from "../../../utils/commoError/CommoError";
import { CitySearchRepository } from "../../citySearch/citySearchRepository/CitySearchRepository";
import { JobsRepository } from "../repository/JobsRepository";
import { IJobs } from "../entities/JobsSchema";
import { ICitySearch } from "../../citySearch/citySearchEntities/CitySearchEntities";

class JobsService {
  constructor(
    private repository: JobsRepository,
    private citySearchRepository: CitySearchRepository
  ) {}

  async create(data: IJobs) {
    try {
      const result = await this.repository.create(data);
      return result;
    } catch (error) {
      return CommoError.ErroBuild("Erro ao criar o cadastro das vagas", 401);
    }
  }

  async search(
    searchParams: { [key: string]: string | number },
    page: number,
    limit: number,
    currenteUrl: string
  ) {
    try {
      limit = Number(limit) || 5;
      page = Number(page) || 0;

      const totalPages = await this.repository.totalPages();

      const next = page + limit;
      const nextUrl =
        next < totalPages ? `${currenteUrl}?limit=${limit}&page=${next}` : null;

      const previous = page - limit < 0 ? null : page - limit;
      const previousUrl =
        previous != null
          ? ` ${currenteUrl}?limit=${limit}&page=${previous}`
          : null;

      const jobsSearchParams = Object.keys(searchParams).reduce((acc, key) => {
        acc[key] = {
          $regex: searchParams[key],
          $options: "i",
        };
        return acc;
      }, {} as any);

      const searchEntry = {
        city: searchParams.city,
        technology: searchParams.technology,
      };

      const existingEntry = await this.citySearchRepository.findOne(
        searchEntry as IJobs
      );

      if (existingEntry) {
        existingEntry.count = String(
          (parseInt(existingEntry.count ?? "0") || 0) + 1
        );

        await existingEntry.save();
      } else {
        const newEntry = {
          ...searchEntry,
          count: "1",
        };
        await this.citySearchRepository.create(newEntry as ICitySearch);
      }
     
      const result = await this.repository.search(
        jobsSearchParams,
        page,
        limit
      );

      if (result.length === 0) {
        return CommoError.ErroBuild(
          "Vaga não encontrada em nosso sistema",
          404
        );
      }

      return { previousUrl, nextUrl, totalPages, page, result };
    } catch (error) {
      return CommoError.ErroBuild("vaga não emcontrada ", 404);
    }
  }
}

export { JobsService };
