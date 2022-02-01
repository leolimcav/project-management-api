import AdministratorService from "@services/AdministratorService";
import { buildAdministratorMock } from "@tests/utils/ModelBuilders";
import { AdministratorRepositorySpy } from "@tests/spies/AdministratorRepositoryMock";
import Administrator from "@models/Administrator";
import AppError from "@errors/AppError";

describe("AdministratorService", () => {
  it("should get an administrator with the provided id", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const id = "valid_uuid";
    jest.spyOn(administratorRepositorySpy, "findOne").mockReturnValue(
      new Promise((resolve, reject) => {
        resolve(buildAdministratorMock());
      })
    );
    const sut = new AdministratorService(administratorRepositorySpy);

    const result = await sut.getOneById(id);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Administrator)
    expect(result !== undefined ? result.id : "").toStrictEqual(id)
  });

  it("should throw error when not find an administrator with provided id", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const id = "invalid_uuid";

    jest.spyOn(administratorRepositorySpy, "findOne").mockReturnValue(
      new Promise((resolve, reject) => {
        resolve(undefined);
      })
    );

    const sut = new AdministratorService(administratorRepositorySpy);

    await expect(sut.getOneById(id)).rejects.toBeInstanceOf(AppError);
    await expect(sut.getOneById(id)).rejects.toHaveProperty("message", "Administrator not found!");
  });
});
