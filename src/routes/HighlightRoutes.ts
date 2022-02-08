import { Router } from "express";
import HighlightController from "@controllers/HighlightController";

const highlightRoutes = Router();
const highlightController = new HighlightController();

highlightRoutes.get("/highlights", highlightController.index);

highlightRoutes.get("/highlights/:id", highlightController.retrieve);

highlightRoutes.post("/highlights", highlightController.create);

highlightRoutes.delete("/highlights/:id", highlightController.delete);

export default highlightRoutes;
