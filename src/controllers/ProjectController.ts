import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Administrator from "../models/Administrator";
import Partner from "../models/Partner";
import Project from "../models/Projects";
import Student from "../models/Student";

export default class ProjectController {
  async index(request: Request, response: Response) {
    const projectRepo = getRepository(Project);

    const [projects, count] = await projectRepo.findAndCount({
      order: {
        created_at: "DESC"
      },
      relations: ["administrator", "student", "partner"]
    });

    return response.status(200).json({projects, count});
  }

  async retrieve(request: Request, response: Response) {
    const { id } = request.params;
    const projectRepo = getRepository(Project);

    const project = await projectRepo.findOne({ id }, {
      relations: ["administrator", "student", "partner"]
    });

    if(!project) {
      console.info("[PROJECT-CONTROLLER] -> ", "Project not found!");
      return response.status(404).json("Project not found!");
    }

    return response.status(200).json(project);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      description,
      start_date,
      end_date,
      field,
      administrator_id,
      student_id,
      partner_id
    } = request.body;

    const projectRepo = getRepository(Project);
    const administratorRepo = getRepository(Administrator);
    const studentRepo = getRepository(Student);
    const partnerRepo = getRepository(Partner);

    if(!name || !start_date || !field || !administrator_id || !student_id) {
      const fieldName = !name ? "name" : !start_date ? "start_date" : !field ? "field" : !administrator_id ? "administrator_id" : "student_id";
      console.info("[PROJECT-CONTROLLER] -> ", `The field ${fieldName} is empty`);
      return response.status(404).json(`The field ${fieldName} is empty`);
    }

    const administrator = await administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      console.info("[PROJECT-CONTROLLER] -> ", "Administrator not found!");
      return response.status(404).json("Administrator not found!");
    }

    const student = await studentRepo.findOne({ id: student_id });

    if(!student) {
      console.info("[PROJECT-CONTROLLER] -> ", "Student not found!");
      return response.status(404).json("Student not found!");
    }

    const partner = await partnerRepo.findOne({ id: partner_id });

    const project = await projectRepo.save({
      name,
      description,
      start_date,
      end_date,
      field,
      administrator,
      student,
      partner
    });

    delete project.administrator.password;

    return response.status(201).json(project);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description, start_date, end_date, field, student_id, partner_id } = request.body;

    const projectRepo = getRepository(Project);
    const studentRepo = getRepository(Student);
    const partnerRepo = getRepository(Partner);

    if(!name || !start_date || !field || !student_id) {
      const fieldName = !name ? "name" : !start_date ? "start_date" : !field ? "field" : "student_id";
      console.info("[PROJECT-CONTROLLER] -> ", `The field ${fieldName} is empty`);
      return response.status(404).json(`The field ${fieldName} is empty`);
    }

    const project = await projectRepo.findOne({ id });

    if(!project) {
      console.info("[PROJECT-CONTROLLER] -> ", "Project not found!");
      return response.status(404).json("Project not found!");
    }

    const student = await studentRepo.findOne({ id: student_id });

    if(!student) {
      console.info("[PROJECT-CONTROLLER] -> ", "Student not found!");
      return response.status(404).json("Student not found!");
    }

    const partner = await partnerRepo.findOne({ id: partner_id });

    project.name = name ? name : project.name;
    project.description = description ? description : project.description;
    project.start_date = start_date ? start_date : project.start_date;
    project.end_date = end_date ? end_date : project.end_date;
    project.field = field ? field : project.field;
    project.student = student ? student : project.student;
    project.partner = partner ? partner : project.partner;

    await projectRepo.save(project);

    return response.status(200).json("Project updated successfully!");
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const projectRepo = getRepository(Project);

    const project = await projectRepo.findOne({ id });

    if(!project) {
      console.info("[PROJECT-CONTROLLER] -> ", "Project not found!");
      return response.status(404).json("Project not found!");
    }

    await projectRepo.remove(project);

    return response.status(204).end();
  }
}
