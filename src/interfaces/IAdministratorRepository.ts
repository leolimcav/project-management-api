import Administrator from "@models/Administrator";
import { FindConditions, FindManyOptions, FindOneOptions, RemoveOptions, SaveOptions } from "typeorm";

export default interface IAdministratorRepository {
  findOne(conditions?: FindConditions<Administrator | undefined>, options?: FindOneOptions<Administrator | undefined>): Promise<Administrator | undefined>;
  // findAndCount(options?: FindManyOptions<Administrator | undefined>): Promise<[Administrator[], number]>;
  // save(entity: Administrator, options?: SaveOptions | undefined): Promise<Administrator>;
  // remove(entity: Administrator, options?: RemoveOptions | undefined): Promise<Administrator>;
}
