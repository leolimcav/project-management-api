import {response, Router} from 'express';
import AdministratorRoutes from './AdministratorRoutes';
import AuthRoutes from './AuthRoutes';
import StudentRoutes from './StudentRoutes';
import CompanyRoutes from './CompanyRoutes';
import PartnerRoutes from './PartnerRoutes';
import AppointmentRoutes from './AppointmentRoutes';
import ProjectRoutes from './ProjectRoutes';
import MeetingRoutes from './MeetingRoutes';
import HighlightRoutes from './HighlightRoutes';

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({
    status: "OK",
    endpoints: [
      "[GET] /administrators/:id",
      "[POST] /auth",
      "[GET] /students",
      "[GET] /students/:id",
      "[POST] /students",
      "[PUT] /students/:id",
      "[DELETE] /students/:id",
      "[GET] /companies",
      "[GET] /companies/:id",
      "[POST] /companies",
      "[PUT] /companies/:id",
      "[DELETE] /companies/:id ",
      "[GET] /partners",
      "[GET] /partners/:id",
      "[POST] /partners",
      "[PUT] /partners/:id",
      "[DELETE] /partners/:id",
      "[GET] /meetings",
      "[GET] /meetings/:id",
      "[POST] /meetings",
      "[PUT] /meetings/:id",
      "[DELETE] /meetings/:id",
      "[GET] /appointments",
      "[GET] /appointments/:id",
      "[POST] /appointments",
      "[PUT] /appointments/:id",
      "[DELETE] /appointments/:id ",
      "[GET] /projects",
      "[GET] /projects/:id",
      "[POST] /projects",
      "[PUT] /projects/:id",
      "[DELETE] /projects/:id",
      "[GET] /highlights",
      "[GET] /highlights/:id",
      "[POST] /highlights",
      "[DELETE] /highlights/:id"
    ]
  });
});

routes.use(AdministratorRoutes);
routes.use(AuthRoutes);
routes.use(StudentRoutes);
routes.use(CompanyRoutes);
routes.use(PartnerRoutes);
routes.use(AppointmentRoutes);
routes.use(ProjectRoutes);
routes.use(MeetingRoutes);
routes.use(HighlightRoutes);


export default routes;
