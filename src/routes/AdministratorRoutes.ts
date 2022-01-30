import {Router} from 'express';
import { container } from 'tsyringe';

import AdministratorController from '../controllers/AdministratorController';

const administratorRoutes = Router();
const administratorController = new AdministratorController();

administratorRoutes.get("/administrators/:id", administratorController.retrieve);

export default administratorRoutes;
