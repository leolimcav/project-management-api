import AdministratorService from "@services/AdministratorService";
import { buildAdministratorMock } from "@tests/utils/ObjectBuilders";
import { AdministratorRepositorySpy } from "@tests/spies/AdministratorRepositoryMock";
import Administrator from "@models/Administrator";
import AppError from "@errors/AppError";
import ICreateAdministratorDTO from "@interfaces/dto/ICreateAdministratorDTO";

describe("AdministratorService", () => {
  it("should get an administrator with the provided id", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const id = "valid_uuid";
    jest.spyOn(administratorRepositorySpy, "findOneById").mockReturnValue(
      new Promise((resolve, _) => {
        resolve(buildAdministratorMock());
      })
    );
    const sut = new AdministratorService(administratorRepositorySpy);

    const result = await sut.getOneById(id);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Administrator);
    expect(result !== undefined ? result.id : "").toStrictEqual(id);
  });

  it("should throw error when not find an administrator with provided id", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const id = "invalid_uuid";

    jest.spyOn(administratorRepositorySpy, "findOneById").mockReturnValue(
      new Promise((resolve, _) => {
        resolve(undefined);
      })
    );

    const sut = new AdministratorService(administratorRepositorySpy);

    await expect(sut.getOneById(id)).rejects.toBeInstanceOf(AppError);
    await expect(sut.getOneById(id)).rejects.toHaveProperty(
      "message",
      "Administrator not found!"
    );
  });

  it("should create an administrator with payload data", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const payload: ICreateAdministratorDTO = {
      name: "John Doe",
      email: "jDoe@email.com",
      password: "randompassword",
      role: "Administrator",
    };
    const createdAdministrator = buildAdministratorMock();

    Object.assign(createdAdministrator, payload);

    jest.spyOn(administratorRepositorySpy, "save").mockReturnValue(
      new Promise<Administrator>((resolve, _) => {
        resolve(createdAdministrator);
      })
    );

    const sut = new AdministratorService(administratorRepositorySpy);

    const result = await sut.create(payload);

    expect(result).toHaveProperty("id");
    expect(result.id).toBe("valid_uuid");
    expect(result).toBeInstanceOf(Administrator);
  });
});