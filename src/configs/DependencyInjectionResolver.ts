import { container } from 'tsyringe';

import IAdministratorRepository from '@interfaces/IAdministratorRepository';
import AdministratorRepository from "@repositories/AdministratorRepository";

container.registerSingleton<IAdministratorRepository>("AdministratorRepository", AdministratorRepository);
