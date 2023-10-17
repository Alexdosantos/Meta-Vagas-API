import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import * as yup from "yup";
import { CommoError } from "../../../utils/commoError/CommoError";
import { IUser } from "../entities/User";

class UserControllers {
  constructor(private service: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const { body } = req;

      const userSckema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
        email: yup
          .string()
          .min(3, "deve ser maior que 3 letras")
          .email("O email é obrigatório")
          .required(),
        password: yup
          .string()
          .required("O password é obrigatário")
          .min(4, "senha maoir que 4"),
      });
      await userSckema.validate(body);

      const user = await this.service.create(body);

      if ("error" in user) {
        return res.status(400).json(user);
      }
      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(400)
        .json(CommoError.ErroBuild("Erro ao criar o usuário", 400));
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userLogin = yup.object({
        email: yup.string().email("E-mail inválido").required(),
        password: yup.string().required("O Passaword é obrigado"),
      });
      await userLogin.validate({ email, password });

      const user = await this.service.findLog({ email, password } as IUser);

      if (!user) {
        return res.status(404).json({
          erro: true,
          message: "Usuario não encontrado ou email errado",
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ error: true, message: "Erro ao fazer o login ", status: 400 });
    }
  }

  async getUserAll(req: Request, res: Response) {
    try {
      const result = await this.service.findAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(CommoError.ErroBuild("Erro ao listar os usuários", 400));
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const { body } = req;

      const result = await this.service.userUpdate(_id, body);

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json(CommoError.ErroBuild("Erro ao Editar o usuários", 400));
    }
  }

  async jobsFavorite(req: Request, res: Response) {
    try {
      const { _userId, _jobsId } = req.params;
      const result = await this.service.favorite(_userId, _jobsId);
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json(CommoError.ErroBuild("Erro ao marcar vaga como favorita", 400));
    }
  }

  async removeJobsFavorite(req: Request, res: Response) {
    try {
      const { _userId, _jobsId } = req.params;
      const result = await this.service.removeFavorite(_userId, _jobsId);
      console.log(result);

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json(CommoError.ErroBuild("Erro ao marcar vaga como favorita", 400));
    }
  }
}

export { UserControllers };
