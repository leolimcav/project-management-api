import {Router} from 'express';
import AdministratorController from '../controllers/AdministratorController';

const administratorRoutes = Router();
const administratorController = new AdministratorController();

administratorRoutes.get("/administrators/:id", administratorController.retrive);

export default administratorRoutes;
