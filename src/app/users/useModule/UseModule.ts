import { UserRespository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";
import { UserControllers } from "../controllers/UserControllers";
import { User } from "../entities/User";
import { JobsRepository } from "../../jobs/repository/JobsRepository";
import { Jobs } from "../../jobs/entities/JobsSchema";
class UseModule {
  static instance() {
    const repository = new UserRespository(User);
    const repositoryJobs = new JobsRepository(Jobs);
    const service = new UserService(repository, repositoryJobs);
    const controller = new UserControllers(service);
    return { repository, service, controller };
  }
}

export { UseModule };
