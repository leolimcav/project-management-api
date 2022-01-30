import IAdministratorRepository from "../interfaces/IAdministratorRepository";
import Administrator from "../models/Administrator";
import { FindOneOptions, FindManyOptions, SaveOptions, RemoveOptions, FindConditions, getRepository } from "typeorm";

export default class AdministratorRepository implements IAdministratorRepository {
  async findOne(conditions?: FindConditions<Administrator | undefined>, options?: FindOneOptions<Administrator | undefined>): Promise<Administrator | undefined> {
    return await getRepository(Administrator).findOne(conditions, options);
  }

  async findAndCount(options?: FindManyOptions<Administrator | undefined>): Promise<[Administrator[], number]> {
    return await getRepository(Administrator).findAndCount(options);
  }
  async save(entity: Administrator, options?: SaveOptions): Promise<Administrator> {
    return await getRepository(Administrator).save(entity, options);
  }

  async remove(entity: Administrator, options?: RemoveOptions | undefined): Promise<Administrator> {
    return await getRepository(Administrator).remove(entity, options);
  }

}
