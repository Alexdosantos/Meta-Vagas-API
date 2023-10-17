import { Model } from "mongoose";
import { CommoError } from "../../../utils/commoError/CommoError";
import { ICitySearch } from "../citySearchEntities/CitySearchEntities";

class CitySearchRepository {
  constructor(private model: Model<ICitySearch>) {}

  async create(data: ICitySearch) {
    const result = await this.model.create(data);
    return result;
  }
  async findAll() {
    const result = await this.model.find();
    return result;
  }

  async findOne(query: ICitySearch) {
    return await this.model.findOne(query);
  }

  async findFive() {
    try {
      const resultado = await this.model.aggregate([
        {
          $group: {
            _id: "$city",
            count: { $sum: { $toInt: "$count" } }, // Converter count para número
          },
        },
        {
          $sort: { count: -1 }, // Classificar em ordem decrescente pela contagem
        },
        {
          $limit: 5, // Limitar a 5 resultados
        },
      ]);
      return resultado;
    } catch (erro) {
      throw erro;
    }
  }

  async findByCityAndTechology() {
    try {
      const resultado = await this.model.aggregate([
        {
          $group: {
            _id: "$technology", // Agrupa pelos valores de tecnologia
            cities: {
              $push: {
                city: "$city",
                count: { $toInt: "$count" }, // Converte count para número
              },
            },
          },
        },
        {
          $unwind: "$cities", // Desfaz o agrupamento de cidades
        },
        {
          $sort: { "cities.count": -1 }, // Ordena por count decrescente
        },
        {
          $group: {
            _id: "$_id", // Agrupa pelo nome de tecnologia novamente
            city: { $first: "$cities.city" }, // Pega a primeira cidade do array
            totalCount: { $sum: "$cities.count" }, // Calcula a soma total de count para a tecnologia
          },
        },
        {
          $sort: { totalCount: -1 }, // Ordena por totalCount decrescente
        },
        {
          $limit: 5, // Limita a 5 resultados (as 5 tecnologias com a primeira cidade mais buscada)
        },
      ]);

      if (resultado.length > 0) {
        return resultado;
      } else {
        return CommoError.ErroBuild("Filtro não encontrado ", 404);
      }
    } catch (erro) {
      return CommoError.ErroBuild("No resultado", 404);
    }
  }
}

export { CitySearchRepository };
