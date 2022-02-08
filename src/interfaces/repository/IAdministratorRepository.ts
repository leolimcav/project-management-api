import ICreateAdministratorDTO from "@interfaces/dto/ICreateAdministratorDTO";
import Administrator from "@models/Administrator";

export default interface IAdministratorRepository {
  findOneById(id: string): Promise<Administrator | undefined>;
  findOneByEmail(email: string): Promise<Administrator | undefined>;
  // findAndCount(options?: FindManyOptions<Administrator | undefined>): Promise<[Administrator[], number]>;
  save(entity: ICreateAdministratorDTO): Promise<Administrator>;
  // remove(entity: Administrator, options?: RemoveOptions | undefined): Promise<Administrator>;
}
