import { injectable, inject } from "tsyringe";

import Administrator from "src/models/Administrator";
import IAdministratorRepository from "../interfaces/IAdministratorRepository";
import AppError from "../errors/AppError";


@injectable()
export default class AdministratorService {
  constructor(
    @inject("AdministratorRepository")
    private readonly administratorRepo: IAdministratorRepository
  ){}

  async getOneById(id: string): Promise<Administrator | undefined> {
    const administrator = await this.administratorRepo.findOne({ id });

    if(!administrator) {
      console.info("[ADMINISTRATOR-CONTROLLER] -> ", "Administrator not found!");
      throw new AppError("Administrator not found!", 404);
    }

    return administrator;
  }
}
