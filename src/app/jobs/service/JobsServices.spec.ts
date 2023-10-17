import { describe, test, vi, expect, beforeEach } from "vitest";
import { JobsService } from "./JobsService";
import { JobsRepository } from "../repository/JobsRepository";
import { CitySearchRepository } from "../../citySearch/citySearchRepository/CitySearchRepository";
import { CommoError } from "../../../utils/commoError/CommoError";

const repositoryJobsMock = {
  create: vi.fn(),
  search: vi.fn(),
} as any as JobsRepository;
const repositoryCitySearchMock1 = {
  findOne: vi.fn(),
  search: vi.fn(),
} as any as CitySearchRepository;

const sut = new JobsService(repositoryJobsMock, repositoryCitySearchMock1);

describe("JobsService", () => {
  test("Should return the vacancy registered by the user", async () => {
    const resultMok = {
      position: "Desenvolvedor Full Stack",
      city: "Brasilia",
      technology: "Nodejs",
      company: " Arnia ",
      jobType: "Remoto",
      workRegime: "PJ ou Clt",
      companySize: "acima de 1000 funcionários",
      description: "Precisamos com urgência",
      experienceLevel: "Junior ou Pleno",
      salary: "5000",
      link: "https://www.google.com/",
      _id: "652",
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
    };

    vi.spyOn(repositoryJobsMock, "create").mockResolvedValue(resultMok as any);
    const result = await sut.create(resultMok as any);
    expect(result).toStrictEqual(resultMok);
  });

  test("Should throw an error when create jobs", async () => {
    const erro = new Error("Something went wrong");

    vi.spyOn(repositoryJobsMock, "create").mockRejectedValue(erro as any);
    const result = await sut.create(erro as any);
    expect(result).toStrictEqual(
      CommoError.ErroBuild("Erro ao criar o cadastro das vagas", 401)
    );
  });

  test("Should check if there is already a record with the same city and technology value", async () => {
    const filter = {
      city: "São Paulo",
      technology: "JavaScript",
    };
    const page = 0
    const  limit = 5
    const currentUrl = "/jobs?limit=5&page=5"
  

    vi.spyOn(repositoryJobsMock, "search").mockRejectedValue(filter);
    const result = await sut.search(filter, page, limit , currentUrl);
    const errors = CommoError.ErroBuild("vaga não emcontrada ", 404);
    expect(result).toStrictEqual(errors);
  });
});
