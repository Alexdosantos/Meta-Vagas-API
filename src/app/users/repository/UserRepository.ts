import { Model } from "mongoose";
import { IUser } from "../entities/User";
import { CommoError } from "../../../utils/commoError/CommoError";
class UserRespository {
  constructor(private model: Model<IUser>) {}

  async create(data: IUser) {
    return await this.model.create(data);
  }

  async findByEmail(email: IUser) {
    return await this.model.findOne({ email });
  }

  async findById(_id: string) {
    return await this.model.findById(_id);
  }
  async userUpdate(_id: string, user: IUser) {
    return await this.model.findByIdAndUpdate(_id, user, { new: true });
  }

  async jobsFavorite(userId: string, jobsId: string) {
    try {
      const updatedUser = await this.model
        .findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { favoriteJobs: jobsId } },
          { new: true }
        )
        .populate("favoriteJobs"); // Popule o campo 'favoriteJobs' (que agora é uma matriz de referências)

      return updatedUser;
    } catch (error) {
      return CommoError.ErroBuild("Erro ao marcar vaga como favorita", 401);
    }
  }

  async removeFavorites(userId: string, jobsId: string) {
    return await this.model.updateOne(
      { _id: userId },
      { $pull: { favoriteJobs: jobsId } },
      { new: true }
    );
  }


  async find() {
    try {
      const users = await this.model
        .find()
        .populate({
          path: "favoriteJobs",
          model: "Jobs",
          select: "-createdAt -updatedAt",
        });
      return users;
    } catch (error) {
      throw new Error("Erro ao buscar usuários");
    }
  }
}
export { UserRespository };
