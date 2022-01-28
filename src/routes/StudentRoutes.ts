import { Router } from "express";
import StudentController from "../controllers/StudentController";

const studentRoutes = Router();
const studentController = new StudentController();

studentRoutes.get("/students", studentController.index);

studentRoutes.get("/students/:id", studentController.retrieve);

studentRoutes.post("/students", studentController.create);

studentRoutes.put("/students/:id", studentController.update);

studentRoutes.delete("/students/:id", studentController.delete);

export default studentRoutes;
