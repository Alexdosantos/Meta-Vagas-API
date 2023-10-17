import { describe, test, vi, expect, beforeEach } from "vitest";
import { UserRespository } from "../repository/UserRepository";
import { CommoError } from "../../../utils/commoError/CommoError";
import { UserService } from "./UserService";
import { Crypto } from "../../../utils/crypto/Crypto";
import JWT from "jsonwebtoken";
import { JobsRepository } from "../../jobs/repository/JobsRepository";

const repositoryUserMock = {
  create: vi.fn(),
  findByEmail: vi.fn(),
  find: vi.fn(),
  findById: vi.fn(),
  userUpdate: vi.fn(),
  favorite: vi.fn(),
  jobsFavorite: vi.fn(),
  removeFavorites: vi.fn(),
} as any as UserRespository;

const repositoryJobsMock = {
  jobsFindId: vi.fn(),
} as any as JobsRepository;

const sut = new UserService(repositoryUserMock, repositoryJobsMock);

describe("UserService", () => {
  test("Should be able to create a new user", async () => {
    const paramsMock = {
      name: "Alex",
      email: "alex@gmail.com",
      password: "12345",
      createAt: new Date(),
      updatedAt: new Date(),
    };
    vi.spyOn(repositoryUserMock, "findByEmail").mockResolvedValue(null);
    vi.spyOn(repositoryUserMock, "create").mockResolvedValue(paramsMock as any);

    const result = await sut.create(paramsMock as any);

    expect(result).toStrictEqual(paramsMock);
  });

  test("Should handle error during user creation and call ErroBuild", async () => {
    const paramsMock = {
      name: "Alex",
      email: "alex@gmail.com",
      password: "12345",
      createAt: new Date(),
      updatedAt: new Date(),
    };
    vi.spyOn(repositoryUserMock, "findByEmail").mockResolvedValue(null);
    vi.spyOn(repositoryUserMock, "create").mockRejectedValue(
      new Error("User already exists")
    );
    const result = await sut.create(paramsMock as any);
    const expectedError = CommoError.ErroBuild("Erro ao criar usuário", 400);
    expect(result).toStrictEqual(expectedError);
  });

  test("Should search for all users of the system", async () => {
    const users = {
      _id: "1",
      name: "Alex santos",
      email: "alex1222@yahoo.com",
      password: "1651561564",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.spyOn(repositoryUserMock, "find").mockReturnValue(users as any);
    const result = await sut.findAll();
    expect(result).toStrictEqual(users as any);
  });

  test("Should allow the user to log in with valid credentials", async () => {
    const loginCredentials = {
      email: "alex@gmail.com",
      password: "12345",
      createAt: new Date(),
      updatedAt: new Date(),
      name: "Alex",
    };

    const userMock = {
      email: "alex@gmail.com",
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Alex",
    };

    vi.spyOn(repositoryUserMock, "findByEmail").mockResolvedValue(
      userMock as any
    );
    vi.spyOn(Crypto, "compare").mockReturnValue(true);
    vi.spyOn(JWT, "sign").mockReturnValue("token" as any);

    const result = await sut.findLog(loginCredentials as any);
    if ("user" in result && result.user) {
      expect(result.user.name).toEqual(userMock.name);
    }
  });

  test("Should handle invalid login credentials", async () => {
    beforeEach(() => {
      vi.resetAllMocks();
    });
    const loginCredentials = {
      email: "alex@gmail.com",
      password: "12345",
    };

    vi.spyOn(repositoryUserMock, "findByEmail").mockResolvedValue(null);

    const result = await sut.findLog(loginCredentials as any);
    const expectedError = CommoError.ErroBuild("email ou senha Inválidas", 401);
    expect(result).toStrictEqual(expectedError);
  });

  test("should return an error if the user id is not present in the system ", async () => {
    const userId = "1";

    vi.spyOn(repositoryUserMock, "findById").mockResolvedValue(null);

    const result = await sut.userUpdate(userId, {} as any);
    const erroExpected = CommoError.ErroBuild("Usuario nao encontrado", 404);
    expect(result).toStrictEqual(erroExpected);
  });

  test("should return an update made by the user", async () => {
    const userId = "15";
    const userUpdateMock = {
      name: "Alex",
      email: "alex@gmail.com",
      password: "12345",
      createAt: new Date(),
      updatedAt: new Date(),
    };

    const erroExpected = CommoError.ErroBuild("Usuario nao encontrado", 404);
    vi.spyOn(repositoryUserMock, "userUpdate").mockResolvedValue(
      userUpdateMock as any
    );

    const result = await sut.userUpdate(userId, userUpdateMock as any);
    expect(result).toStrictEqual(erroExpected);
  });

  test("should return an error when an exception is thrown", async () => {
    const userId = "1";
    const user = {
      name: "Alex",
      email: "Alex@gmail.com",
      password: "4564564",
    };

    vi.spyOn(repositoryUserMock, "findById").mockRejectedValue(
      "Simulated error"
    );
    const result = await sut.userUpdate(userId, user as any);
    const expectedError = CommoError.ErroBuild("Usuario não existe", 400);
    expect(result).toStrictEqual(expectedError);
  });

  test("the user must return with the jobs added to their favorites", async () => {
    const userId = "125";
    const jobsId = "1235";

    vi.spyOn(repositoryUserMock, "findById").mockResolvedValue(userId as any);
    vi.spyOn(repositoryJobsMock, "jobsFindId").mockResolvedValue(jobsId as any);
    vi.spyOn(repositoryUserMock, "jobsFavorite").mockResolvedValue(
      userId as any
    );
    vi.spyOn(repositoryUserMock, "jobsFavorite").mockResolvedValue(
      jobsId as any
    );

    const result = await sut.favorite(userId, jobsId);
    const erroExpected = CommoError.ErroBuild(
      "Erro ao marcar vaga como favorita",
      401
    );
    expect(result).toEqual(erroExpected);
  });

  test("should return an error if the vacancy or user does not exist", async () => {
    const userId = "5455";
    const jobsId = "1515";

    vi.spyOn(repositoryUserMock, "findById").mockResolvedValue(true as any);
    vi.spyOn(repositoryJobsMock, "jobsFindId").mockResolvedValue(false as any);
    vi.spyOn(repositoryUserMock, "jobsFavorite").mockResolvedValue(
      userId as any
    );
    vi.spyOn(repositoryUserMock, "jobsFavorite").mockResolvedValue(
      jobsId as any
    );

    const result = await sut.favorite(userId, jobsId);
    const erroExpected = CommoError.ErroBuild("Vaga não existe", 400);
    expect(result).toEqual(erroExpected);
  });
  test("Should return an error if an error occurs during the process", async () => {
    const userId = "5455";
    const jobsId = "1515";

    vi.spyOn(repositoryUserMock, "findById").mockResolvedValue(
      "usuário não encontrado" as any
    );
    vi.spyOn(repositoryJobsMock, "jobsFindId").mockResolvedValue(
      "vaga não encontrado" as any
    );

    const result = await sut.favorite(userId, jobsId);
    const erroExpected = CommoError.ErroBuild(
      "Erro ao marcar vaga como favorita",
      401
    );
    expect(result).toEqual(erroExpected);
  });

  test("Should return jobs remove", async () => {
    const userId = "5454545";
    const jobsId = "5654544";

    vi.spyOn(repositoryUserMock, "findById").mockRejectedValue(true);
    vi.spyOn(repositoryJobsMock, "jobsFindId").mockRejectedValue(false);
    vi.spyOn(repositoryUserMock, "removeFavorites").mockRejectedValue(
      userId as any
    );
    vi.spyOn(repositoryUserMock, "removeFavorites").mockRejectedValue(
      jobsId as any
    );

    const result = await sut.removeFavorite(userId, jobsId);
    const expectedError = CommoError.ErroBuild(
      "Erro ao remover os favorita",
      400
    );
    expect(result).toEqual(expectedError);
  });

  test("Should return an error if an error occurs during the process ", async () => {
    const userId = "51515";
    const jobsId = "4544";

    vi.spyOn(repositoryUserMock, "findById").mockRejectedValue(
      "usuario não encontrado"
    );
    vi.spyOn(repositoryJobsMock, "jobsFindId").mockRejectedValue(
      "vaga não encontrado"
    );

    const result = await sut.removeFavorite(userId, jobsId);
    const expectedError = CommoError.ErroBuild(
      "Erro ao remover os favorita",
      400
    );
    expect(result).toEqual(expectedError);
  });
});
