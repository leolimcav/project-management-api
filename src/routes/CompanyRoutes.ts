import { Router } from "express";
import CompanyController from "../controllers/CompanyController";

const companyRoutes = Router();
const companyController = new CompanyController();

companyRoutes.get("/companies", companyController.index);

companyRoutes.get("/companies/:id", companyController.retrieve);

companyRoutes.post("/companies", companyController.create);

companyRoutes.put("/companies/:id", companyController.update);

companyRoutes.delete("/companies/:id", companyController.delete);

export default companyRoutes;
