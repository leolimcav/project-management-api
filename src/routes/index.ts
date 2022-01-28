import {Router} from 'express';
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
