import { Router } from "express";
import MeetingController from "../controllers/MeetingController";

const meetingRoutes = Router();
const meetingController = new MeetingController();

meetingRoutes.get("/meetings", meetingController.index);

meetingRoutes.get("/meetings/:id", meetingController.retrieve);

meetingRoutes.post("/meetings", meetingController.create);

meetingRoutes.put("/meetings/:id", meetingController.update);

meetingRoutes.delete("/meetings/:id", meetingController.delete);

export default meetingRoutes;
