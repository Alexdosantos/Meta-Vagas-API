import { describe, test, vi, expect } from "vitest";
import { CitySearchService } from "./citySearchService";
import { CitySearchRepository } from "../citySearchRepository/CitySearchRepository";
import { CommoError } from "../../../utils/commoError/CommoError";

const repositoryMoock = {
  create: vi.fn(),
  findAll: vi.fn(),
  findOne: vi.fn(),
  findFive: vi.fn(),
  findByCityAndTechology: vi.fn(),
} as any as CitySearchRepository;

const sut = new CitySearchService(repositoryMoock);

describe("CitySearchService", () => {
  test("Should search for all cities in the database", async () => {
    const resultMock = {
      _id: "1",
      technology: "Java",
      city: "Itaquera",
      count: "4",
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
    };

    vi.spyOn(repositoryMoock, "findAll").mockResolvedValue(resultMock as any);
    const result = await sut.findAll();
    expect(result).toStrictEqual(resultMock);
  });

  test("Should throw an error when city e technolgy not found", async () => {
    const erro = new Error("Something went wrong");

    vi.spyOn(repositoryMoock, "findAll").mockRejectedValue(erro as any);
    const result = await sut.findAll();
    expect(result).toStrictEqual(
      CommoError.ErroBuild("erro ao buscar a lista", 401)
    );
  });

  test("Should search for 5 cities in the system", async () => {
    const resultMock = {
      _id: "Bauru",
      count: 1,
    };
    vi.spyOn(repositoryMoock, "findFive").mockResolvedValue(resultMock as any);

    const result = await sut.findFive();
    expect(result).toStrictEqual(resultMock);
  });

  test("Should must be an error in the list of the 5 most searched cities", async () => {
    const erro = new Error("Something went wrong");

    vi.spyOn(repositoryMoock, "findFive").mockRejectedValue(erro as any);
    const result = await sut.findFive();
    expect(result).toStrictEqual(
      CommoError.ErroBuild("Filtro não encontrado", 404)
    );
  });

  test("Should return to the 5 cities that most search for the most sought after technologies", async () => {
    const resultMock = {
      _id: "React",
      city: "Guaianases",
      totalCount: 2,
    };
    vi.spyOn(repositoryMoock, "findByCityAndTechology").mockResolvedValue(
      resultMock as any
    );
    const result = await sut.findByCityAndTechology();
    expect(result).toStrictEqual(resultMock);
  });

  test("Should throw an error when city e technolgy not found", async () => {
    const erro = new Error("Something went wrong");

    vi.spyOn(repositoryMoock, "findByCityAndTechology").mockRejectedValue(
      erro as any
    );
    const result = await sut.findByCityAndTechology();
    expect(result).toStrictEqual(
      CommoError.ErroBuild("Filtro não encontrado", 404)
    );
  });
});
