import { Request, Response } from "express";
import { CommoError } from "../../../utils/commoError/CommoError";
import { CitySearchService } from "../citySearchService/citySearchService";

class CitySearchControllers {
  constructor(private service: CitySearchService) {}

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.service.findAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json(CommoError.ErroBuild("erro no teste", 401));
    }
  }

  async findFive(req: Request, res: Response) {
    try {
      const result = await this.service.findFive();
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(401)
        .json(CommoError.ErroBuild("Filtro não encontrado", 404));
    }
  }

  async findByCityAndTechology(req: Request, res: Response) {
    try {
      const result = await this.service.findByCityAndTechology();
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(401)
        .json(
          CommoError.ErroBuild("Filtro Cty e Technology não encontrado", 404)
        );
    }
  }
}

export { CitySearchControllers };
