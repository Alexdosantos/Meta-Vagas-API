import { Crypto } from "../../../utils/crypto/Crypto";
import { UserRespository } from "../repository/UserRepository";

import { IUser } from "../entities/User";
import JWT from "jsonwebtoken";
import { CommoError } from "../../../utils/commoError/CommoError";
import { JobsRepository } from "../../jobs/repository/JobsRepository";

class UserService {
  constructor(
    private repository: UserRespository,
    private repositoryJobs: JobsRepository
  ) {}

  async create(data: IUser) {
    try {
      const userExist = await this.repository.findByEmail(data.email as any);
      if (userExist) {
        return { error: true, message: "Usuário ja existente", status: 400 };
      }
      const user = {
        ...data,
        password: Crypto.cryptography(data.password),
      };

      const result = await this.repository.create(user);
      return result;
    } catch (error) {
      return CommoError.ErroBuild("Erro ao criar usuário", 400);
    }
  }

  async findAll() {
    try {
      const listUser = await this.repository.find();
      return listUser;
    } catch (error) {
      return CommoError.ErroBuild("Erro ao listar os usuários", 400);
    }
  }

  async findLog(data: IUser) {
    try {
      const user = await this.repository.findByEmail(data.email as any);

      if (!user) {
        return CommoError.ErroBuild("email ou senha Inválidas", 401);
      }
      const isPasswordCompare = Crypto.compare(data.password, user.password);

      if (!isPasswordCompare) {
        return CommoError.ErroBuild("email ou senha Inválidas", 401);
      }

      const secretKey = process.env.SECRET_KEY;
      const expiration = { expiresIn: "60m" };
      const token = JWT.sign(
        { userId: user._id },
        secretKey as any,
        expiration
      );

      return { user, token };
    } catch (error) {
      return CommoError.ErroBuild("Usuario não encontrado no sistema", 404);
    }
  }

  async userUpdate(_id: string, user: IUser) {
    try {
      const userIdExists = await this.repository.findById(_id);
      if (!userIdExists) {
        return CommoError.ErroBuild("Usuario nao encontrado", 404);
      }

      const userUpdate = {
        name: user.name,
        email: user.email,
        password: Crypto.cryptography(user.password as string),
      };
      const result = await this.repository.userUpdate(_id, userUpdate as any);
      return result;
    } catch (error) {
      return CommoError.ErroBuild("Usuario não existe", 400);
    }
  }

  async favorite(userId: string, jobsId: string) {
    try {
      const userExists = await this.repository.findById(userId);

      if (!userExists) {
        return CommoError.ErroBuild("Usuário não existe", 400);
      }

      const jobsExists = await this.repositoryJobs.jobsFindId(jobsId);

      if (!jobsExists) {
        return CommoError.ErroBuild("Vaga não existe", 400);
      }

      // Verifique se 'favoriteJobs' é uma matriz, mesmo que inicialmente seja nulo
      if (!userExists.favoriteJobs) {
        userExists.favoriteJobs = [];
      }

      if (!userExists.favoriteJobs.includes(jobsId as any)) {
        userExists.favoriteJobs.push(jobsId as any);
      }

      // Salve as alterações no banco de dados
      await this.repository.jobsFavorite(userId, jobsId);

      return userExists;
    } catch (error) {
      return CommoError.ErroBuild("Erro ao marcar vaga como favorita", 401);
    }
  }

  async removeFavorite(userId: string, jobsId: string) {
    try {
      const userExists = await this.repository.findById(userId);
      if (!userExists) {
        return CommoError.ErroBuild("Usuario não existente", 404);
      }

      const jobsExists = await this.repositoryJobs.jobsFindId(jobsId);
      if (!jobsExists) {
        return CommoError.ErroBuild("Vaga não encontrada", 404);
      }

      if (!userExists.favoriteJobs || userExists.favoriteJobs.length === 0) {
        return CommoError.ErroBuild("Usuário não tem vagas favoritas", 400);
      }

      const jobIndex = userExists.favoriteJobs.findIndex(
        (id) => id.toString() === jobsId
      );

      if (jobIndex === -1) {
        return CommoError.ErroBuild(
          "A vaga não está mais nos favoritos do usuário",
          404
        );
      }

      userExists.favoriteJobs.splice(jobIndex, 1);

      const result = await this.repository.removeFavorites(userId, jobsId);

      const userUpdate = await this.repository.findById(userId);
      return { result, userUpdate };
    } catch (error) {
      return CommoError.ErroBuild("Erro ao remover os favorita", 400);
    }
  }
}

export { UserService };
