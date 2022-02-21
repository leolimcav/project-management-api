import { Router } from "express";

import AdministratorController from "@controllers/AdministratorController";

const administratorRoutes = Router();
const administratorController = new AdministratorController();

administratorRoutes.get(
  "/administrators/:id",
  administratorController.retrieve
);

administratorRoutes.post(
  "/administrators",
  administratorController.create
);

administratorRoutes.put(
  "/administrators/:id",
  administratorController.update
)

export default administratorRoutes;
