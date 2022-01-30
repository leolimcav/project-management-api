import IAdministratorRepository from "@interfaces/IAdministratorRepository";
import Administrator from "@models/Administrator";
import { FindCondition, FindOneOptions } from "typeorm";

export class AdministratorRepositorySpy implements IAdministratorRepository {
  findOne(conditions?: Administrator | { id?: FindCondition<string> | undefined; name?: FindCondition<string> | undefined; email?: FindCondition<string> | undefined; role?: FindCondition<string> | undefined; password?: FindCondition<string> | undefined; created_at?: FindCondition<Date> | undefined; updated_at?: FindCondition<Date> | undefined; }, options?: FindOneOptions<Administrator | undefined>): Promise<Administrator | undefined> {
    throw new Error("Method not implemented.");
  }

}
