import AdministratorService from "@services/AdministratorService";

import { buildAdministratorMock } from "@tests/utils/ModelBuilders";
import { AdministratorRepositorySpy } from "@tests/spies/AdministratorRepositoryMock";
import Administrator from "@models/Administrator";

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
});
