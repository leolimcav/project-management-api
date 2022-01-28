import { Router } from "express";
import AppointmentController from "../controllers/AppointmentController";

const appointmentRoutes = Router();
const appointmentController = new AppointmentController();

appointmentRoutes.get("/appointments", appointmentController.index);

appointmentRoutes.get("/appointments/:id", appointmentController.retrieve);

appointmentRoutes.post("/appointments", appointmentController.create);

appointmentRoutes.put("/appointments/:id", appointmentController.update);

appointmentRoutes.delete("/appointments/:id", appointmentController.delete);

export default appointmentRoutes;
