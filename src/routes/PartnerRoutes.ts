import { Router } from "express";
import PartnerController from "@controllers/PartnerController";

const partnerRoutes = Router();
const partnerController = new PartnerController();

partnerRoutes.get("/partners", partnerController.index);

partnerRoutes.get("/partners/:id", partnerController.retrieve);

partnerRoutes.post("/partners", partnerController.create);

partnerRoutes.put("/partners/:id", partnerController.update);

partnerRoutes.delete("/partners/:id", partnerController.delete);

export default partnerRoutes;
