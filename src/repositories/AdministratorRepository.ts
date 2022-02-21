import { getRepository } from "typeorm";

import IAdministratorRepository from "@interfaces/repository/IAdministratorRepository";
import Administrator from "@models/Administrator";
import ICreateAdministratorDTO from "@interfaces/dto/ICreateAdministratorDTO";

export default class AdministratorRepository
  implements IAdministratorRepository {
  async findOneById(id: string): Promise<Administrator | undefined> {
    return getRepository(Administrator).findOne({ id });
  }

  async findOneByEmail(email: string): Promise<Administrator | undefined> {
    return getRepository(Administrator).findOne({ email });
  }

  // async findAndCount(options?: FindManyOptions<Administrator | undefined>): Promise<[Administrator[], number]> {
  //   return await getRepository(Administrator).findAndCount(options);
  // }

  async save({
    name,
    email,
    password,
    role,
  }: ICreateAdministratorDTO): Promise<Administrator> {
    return getRepository(Administrator).save({ name, email, password, role });
  }

  async update(entity: Administrator): Promise<Administrator> {
    return getRepository(Administrator).save(entity);
  }

  // async remove(entity: Administrator, options?: RemoveOptions | undefined): Promise<Administrator> {
  //   return await getRepository(Administrator).remove(entity, options);
  // }
}
