import ICreateAdministratorDTO from "@interfaces/dto/ICreateAdministratorDTO";
import IAdministratorRepository from "@interfaces/repository/IAdministratorRepository";
import Administrator from "@models/Administrator";
import { buildAdministratorMock } from "@tests/utils/ObjectBuilders";

export class AdministratorRepositorySpy implements IAdministratorRepository {
  async findOneById(id: string): Promise<Administrator | undefined> {
    if (id) {
      return buildAdministratorMock();
    }
    return undefined;
  }

  async save(entity: ICreateAdministratorDTO): Promise<Administrator> {
    const createdAdmin = buildAdministratorMock();
    Object.assign(createdAdmin, entity);

    return createdAdmin;
  }
}
