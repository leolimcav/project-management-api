import bcrypt from "bcrypt";

import AdministratorService from "@services/AdministratorService";
import { buildAdministratorMock } from "@tests/utils/ObjectBuilders";
import Administrator from "@models/Administrator";
import AppError from "@errors/AppError";
import ICreateAdministratorDTO from "@interfaces/dto/ICreateAdministratorDTO";
import { AdministratorRepositorySpy } from "@tests/spies/AdministratorRepositoryMock";
import IUpdateAdministratorDTO from "@interfaces/dto/IUpdateAdministratorDTO";

describe("AdministratorService", () => {
  it("should get an administrator with the provided id", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const id = "valid_uuid";
    jest
      .spyOn(administratorRepositorySpy, "findOneById")
      .mockResolvedValue(buildAdministratorMock());
    const sut = new AdministratorService(administratorRepositorySpy);

    const result = await sut.getOneById(id);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Administrator);
    expect(result !== undefined ? result.id : "").toStrictEqual(id);
  });

  it("should throw error when not find an administrator with provided id", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const id = "invalid_uuid";

    jest
      .spyOn(administratorRepositorySpy, "findOneById")
      .mockResolvedValue(undefined);

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

    jest
      .spyOn(administratorRepositorySpy, "save")
      .mockResolvedValue(createdAdministrator);

    const sut = new AdministratorService(administratorRepositorySpy);

    const result = await sut.create(payload);

    expect(result).toHaveProperty("id");
    expect(result.id).toBe("valid_uuid");
    expect(result).toBeInstanceOf(Administrator);
  });

  it("Should encrypt password before the creation of the administrator", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const payload: ICreateAdministratorDTO = {
      name: "John Doe",
      email: "jDoe@email.com",
      password: "randompassword",
      role: "Administrator",
    };
    const spy = jest.spyOn(bcrypt, "hash");
    const sut = new AdministratorService(administratorRepositorySpy);

    await sut.create(payload);
    expect(spy).toBeCalled();
  });

  it("Should not create an Administrator with an email that already exists", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const payload: ICreateAdministratorDTO = {
      name: "John Doe",
      email: "validemail@email.com",
      password: "randompassword",
      role: "Administrator",
    };

    const sut = new AdministratorService(administratorRepositorySpy);

    await expect(sut.create(payload)).rejects.toBeInstanceOf(AppError);
    await expect(sut.create(payload)).rejects.toHaveProperty(
      "message",
      "Email already exists!"
    );
  });

  it("Should throw an error if the any of the payload fields are empty in create", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const payload: ICreateAdministratorDTO = {
      name: "",
      email: "",
      password: "",
      role: "",
    };

    const sut = new AdministratorService(administratorRepositorySpy);

    await expect(sut.create(payload)).rejects.toBeInstanceOf(AppError);
    await expect(sut.create(payload)).rejects.toHaveProperty(
      "message",
      "Field(s) are empty!"
    );
  });

  it("Should update administrator with provided id and payload", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const id = "valid_uuid";
    const payload: IUpdateAdministratorDTO = {
      name: "newname",
      email: "newemail@email.com",
      password: "1233212"
    };

    const sut = new AdministratorService(administratorRepositorySpy);

    const result = await sut.update(id, payload);

    expect(result.id).toBe(id);
  });

  it("should not update when provided administrator not exists", async () => {
    const administratorRepositorySpy = new AdministratorRepositorySpy();
    const id = "invalid_uuid";
    const payload: IUpdateAdministratorDTO = {
      name: "newname",
      email: "newemail@email.com",
      password: "1233212"
    };

    jest.spyOn(administratorRepositorySpy, "findOneById").mockResolvedValue(undefined);

    const sut = new AdministratorService(administratorRepositorySpy);

    await expect(sut.update(id, payload)).rejects.toBeInstanceOf(AppError);
    await expect(sut.update(id, payload)).rejects.toHaveProperty(
      "message",
      "Administrator not found!"
    );
  });
});
