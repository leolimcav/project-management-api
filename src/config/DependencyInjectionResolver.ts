import IAdministratorRepository from 'src/interfaces/IAdministratorRepository';
import AdministratorRepository from "../repositories/AdministratorRepository"
import { container } from 'tsyringe';

container.registerSingleton<IAdministratorRepository>("AdministratorRepository", AdministratorRepository);
