import { Request, Response } from "express";
import * as yup from "yup";
import JWT from "jsonwebtoken";
import { CommoError } from "../../../utils/commoError/CommoError";
import { JobsService } from "../service/JobsService";

class JobsControllers {
  constructor(private service: JobsService) {}

  async jobsCreate(req: Request, res: Response) {
    try {
      const { body } = req;

      const jobsSchema = yup.object({
        position: yup.string().required("A posição é obrigatória"),
        city: yup.string().required("A cidade é obrigatória"),
        technology: yup.string().required("A tecnologia é obrigatória"),
        company: yup.string().required("A empresa é obrigatória"),
        jobType: yup.string().required("O tipo de trabalho é obrigatório"),
        workRegime: yup.string().required("O regime de trabalho é obrigatório"),
        companySize: yup
          .string()
          .required("O tamanho da empresa é obrigatório"),
        description: yup.string().required("A descrição é obrigatória"),
        experienceLevel: yup
          .string()
          .required("O nível de experiência é obrigatório"),
        salary: yup.string().required("O salário é obrigatório"),
        link: yup.string().required("O link é obrigatório"),
      });
      await jobsSchema.validate(body);

      const result = await this.service.create(body);

      return res.status(201).json(result);
    } catch (errors: any) {
      return res
        .status(400)
        .json(CommoError.ErroBuild(`Erro de validação ${errors.errors}`, 400));
    }
  }

  async jobsSearch(req: Request, res: Response) {
    try {
      const { query, baseUrl } = req;
      const { page, limit } = query;
      const currenteUrl = baseUrl;

      const searchParams = { ...query };
      delete searchParams.limit;
      delete searchParams.page;

      const results = await this.service.search(
        searchParams as { [key: string]: string },
        parseInt(page as string),
        parseInt(limit as string),
        currenteUrl
      );

      return res.status(200).json(results);
    } catch (error) {
      return res.status(401).json(CommoError.ErroBuild("Erro ao buscar", 400));
    }
  }
}

export { JobsControllers };
