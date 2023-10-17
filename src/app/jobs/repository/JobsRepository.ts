import { IJobs } from "../entities/JobsSchema";
import { Model } from "mongoose";

class JobsRepository {
  constructor(private model: Model<IJobs>) {}

  async create(data: IJobs) {
    const result = await this.model.create(data);
    return result;
  }

  async jobsFindId(_id: string) {
    return await this.model.findById(_id);
  }

  async totalPages() {
    return this.model.countDocuments();
  }

  async search(
    jobsFilter: {
      [key: string]: { $regex: string; $options: string };
    },
    skip: number,
    limit: number
  ) {
    return await this.model
      .find(jobsFilter)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 });
  }
}
export { JobsRepository };
