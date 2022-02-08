import bcrypt from "bcrypt";
import { injectable, inject } from "tsyringe";

import Administrator from "@models/Administrator";
import IAdministratorRepository from "@interfaces/repository/IAdministratorRepository";
import AppError from "@errors/AppError";
import ICreateAdministratorDTO from "@interfaces/dto/ICreateAdministratorDTO";

@injectable()
export default class AdministratorService {
  constructor(
    @inject("AdministratorRepository")
    private readonly administratorRepo: IAdministratorRepository
  ) {}

  async getOneById(id: string): Promise<Administrator | undefined> {
    const administrator = await this.administratorRepo.findOneById(id);

    if (!administrator) {
      console.info(
        "[ADMINISTRATOR-CONTROLLER] -> ",
        "Administrator not found!"
      );
      throw new AppError("Administrator not found!", 404);
    }

    return administrator;
  }

  async create({ name, email, password, role }: ICreateAdministratorDTO) {
    if (!name || !email || !password || !role) {
      throw new AppError("Field(s) are empty!", 400);
    }

    const emailAlreadyExists = await this.administratorRepo.findOneByEmail(
      email
    );

    if (emailAlreadyExists) {
      throw new AppError("Email already exists!", 400);
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const administrator = this.administratorRepo.save({
      name,
      email,
      password: passwordHash,
      role,
    });

    return administrator;
  }
}
