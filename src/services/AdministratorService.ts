import bcrypt from "bcrypt";
import { injectable, inject } from "tsyringe";

import Administrator from "@models/Administrator";
import IAdministratorRepository from "@interfaces/repository/IAdministratorRepository";
import AppError from "@errors/AppError";
import ICreateAdministratorDTO from "@interfaces/dto/ICreateAdministratorDTO";
import IUpdateAdministratorDTO from "@interfaces/dto/IUpdateAdministratorDTO";

@injectable()
export default class AdministratorService {
  constructor(
    @inject("AdministratorRepository")
    private readonly administratorRepo: IAdministratorRepository
  ) { }

  async getOneById(id: string): Promise<Administrator | undefined> {
    const administrator = await this.administratorRepo.findOneById(id);

    if (!administrator) {
      throw new AppError(
        "Administrator not found!",
        404,
        "ADMINISTRATOR-CONTROLLER"
      );
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

  async update(id: string, { name, email, password }: IUpdateAdministratorDTO) {
    const administrator = await this.administratorRepo.findOneById(id);

    if (!administrator) {
      throw new AppError("Administrator not found!", 404, "ADMINISTRATOR-CONTROLLER");
    }

    const isPasswordEquals = await bcrypt.compare(password, administrator.password);
    administrator.name = name ? name : administrator.name;
    administrator.email = email ? email : administrator.email;
    administrator.password = !isPasswordEquals ? await bcrypt.hash(password, 8) : administrator.password;

    const updatedAdministrator = await this.administratorRepo.save(administrator);

    return updatedAdministrator;
  }
}
