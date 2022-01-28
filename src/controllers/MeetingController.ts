import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuid } from 'uuid';
import Administrator from "../models/Administrator";
import Student from "../models/Student";
import Partner from "../models/Partner";
import Meeting from "../models/Meeting";

export default class MeetingController {
  async index(request: Request, response: Response) {
    const meetingRepo = getRepository(Meeting);
    const [meetings, count] = await meetingRepo.findAndCount({
      order: {
        created_at: "DESC"
      },
      relations: ["administrator", "student", "partner"],
    });

    return response.status(200).json({meetings, count});
  }

  async retrieve(request: Request, response: Response) {
    const { id } = request.params;
    const meetingRepo = getRepository(Meeting);

    const meeting = await meetingRepo.findOne({ id }, {
      relations: ["administrator", "student", "partner"]
    });

    if(!meeting) {
      return response.status(404).json("Meeting not found!");
    }

    return response.status(200).json(Meeting);
  }

  async create(request: Request, response: Response) {
    const { title, link, status, administrator_id, student_id, partner_id } = request.body;
    const meetingRepo = getRepository(Meeting);
    const administratorRepo = getRepository(Administrator);
    const studentRepo = getRepository(Student);
    const partnerRepo = getRepository(Partner);

    if(!title || !status || !administrator_id || !partner_id) {
      const fieldName = !title ? "title" : !status ? "status": !administrator_id ? "administrator_id" : "partner_id";
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const partner = await partnerRepo.findOne({ id: partner_id });

    if(!partner) {
      return response.status(400).json("Partner not found!");
    }

    const administrator = await administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      return response.status(404).json("Administrator not found!");
    }

    const student = await studentRepo.findOne({ id: student_id });

    const meeting = meetingRepo.create({
      id: uuid(),
      title,
      link,
      status,
      administrator,
      student,
      partner
    });


    await meetingRepo.save(meeting);

    delete meeting.administrator.password;

    return response.status(200).json(meeting);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, link, status, student_id, partner_id } = request.body;
    const meetingRepo = getRepository(Meeting);
    const studentRepo = getRepository(Student);
    const partnerRepo = getRepository(Partner);

    if(!title || !link || !partner_id) {
      const fieldName = !title ? "title" : !status ? "status": "partner_id";
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const partner = await partnerRepo.findOne({ id: partner_id });

    if(!partner) {
      return response.status(400).json("Partner not found!");
    }

    const meeting = await meetingRepo.findOne({ id });

    if(!meeting) {
      return response.status(400).json("Meeting not found!");
    }

    const student = await studentRepo.findOne({ id: student_id });

    meeting.title = title ? title : meeting.title;
    meeting.link = link ? link : meeting.link;
    meeting.status = status ? status : meeting.status;
    meeting.student = student ? student : meeting.student;
    meeting.partner = partner ? partner : meeting.partner;

    await meetingRepo.save(meeting);

    return response.status(200).json("Meeting updated successfully!");
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const meetingRepo = getRepository(Meeting);

    const meeting = await meetingRepo.findOne({ id });

    if(!meeting) {
      return response.status(404).json("Meeting not found!");
    }

    await meetingRepo.remove([meeting]);

    return response.status(204).end();
  }
}
