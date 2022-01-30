import { Router } from "express";
import ProjectController from "@controllers/ProjectController";

const projectRoutes = Router();
const projectController = new ProjectController();

projectRoutes.get("/projects", projectController.index);

projectRoutes.get("/projects/:id", projectController.retrieve);

projectRoutes.post("/projects", projectController.create);

projectRoutes.put("/projects/:id", projectController.update);

projectRoutes.delete("/projects/:id", projectController.delete);

export default projectRoutes;
