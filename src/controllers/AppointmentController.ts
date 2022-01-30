import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Administrator from "../models/Administrator";
import Appointment from "../models/Appointment";
import Meeting from "../models/Meeting";

export default class AppointmentController {
  private readonly appointmentRepo: Repository<Appointment>;
  private readonly administratorRepo: Repository<Administrator>;
  private readonly meetingRepo: Repository<Meeting>;
  constructor() {
    this.appointmentRepo = getRepository(Appointment);
    this.administratorRepo = getRepository(Administrator);
    this.meetingRepo = getRepository(Meeting);
  }
  async index(request: Request, response: Response) {

    const [appointments, count] = await this.appointmentRepo.findAndCount({
      order: {
        created_at: "DESC"
      },
      relations: ["administrator", "meeting", "meeting.student", "meeting.partner", "meeting.partner.company"],
    });

    return response.status(200).json({appointments, count});
  }

  async retrieve(request: Request, response: Response) {
    const { id } = request.params;

    const appointment = await this.appointmentRepo.findOne({ id }, {
      relations: ["administrator", "meeting", "meeting.student", "meeting.partner"]
    });

    if(!appointment) {
      console.info("[APPOINTMENT-CONTROLLER] -> ", "Appointment not found!");
      return response.status(404).json("Appointment not found!");
    }

    return response.status(200).json(appointment);
  }

  async create(request: Request, response: Response) {
    const { date, administrator_id, meeting_id } = request.body;

    if(!date || !administrator_id || !meeting_id) {
      const fieldName = !date ? "date" : !administrator_id ? "administrator_id" : "meeting_id";
      console.info("[APPOINTMENT-CONTROLLER] -> ", `The field ${fieldName} is empty!`);
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const administrator = await this.administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      console.info("[APPOINTMENT-CONTROLLER] -> ", "Administrator not found!");
      return response.status(404).json("Administrator not found!");
    }

    const meeting = await this.meetingRepo.findOne({ id: meeting_id });

    if(!meeting) {
      console.info("[APPOINTMENT-CONTROLLER] -> ", "Meeting not found!");
      return response.status(404).json("Meeting not found!");
    }

    const appointment = await this.appointmentRepo.save({
      date,
      administrator,
      meeting
    });

    return response.status(200).json(appointment);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { date, meeting_id } = request.body;

    if(!date || !meeting_id) {
      const fieldName = !date ? "date" : "meeting_id";
      console.info("[APPOINTMENT-CONTROLLER] -> ",`The field ${fieldName} is empty!`);
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const appointment = await this.appointmentRepo.findOne({ id });

    if(!appointment) {
      console.info("[APPOINTMENT-CONTROLLER] -> ","Appointment not found!");
      return response.status(404).json("Appointment not found!");
    }

    const meeting = await this.meetingRepo.findOne({ id: meeting_id });

    if(!meeting) {
      console.info("[APPOINTMENT-CONTROLLER] -> ", "Meeting not found!");
      return response.status(404).json("Meeting not found!");
    }

    appointment.date = date ? date : appointment.date;
    appointment.meeting = meeting ? meeting : appointment.meeting;

    await this.appointmentRepo.save(appointment);

    return response.status(200).json("Appointment updated successfully!");
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const appointment = await this.appointmentRepo.findOne({ id });

    if(!appointment) {
      console.info("[APPOINTMENT-CONTROLLER] -> ", "Appointment not found!");
      return response.status(404).json("Appointment not found!");
    }

    await this.appointmentRepo.remove(appointment);

    return response.status(204).end();
  }
}
