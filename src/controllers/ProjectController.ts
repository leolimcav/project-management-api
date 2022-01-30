import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Administrator from "../models/Administrator";
import Partner from "../models/Partner";
import Project from "../models/Projects";
import Student from "../models/Student";

export default class ProjectController {
  private readonly administratorRepo: Repository<Administrator>;
  private readonly studentRepo: Repository<Student>;
  private readonly partnerRepo: Repository<Partner>;
  private readonly projectRepo: Repository<Project>;

  constructor() {
    this.administratorRepo = getRepository(Administrator);
    this.studentRepo = getRepository(Student);
    this.partnerRepo = getRepository(Partner);
    this.projectRepo = getRepository(Project);
  }
  async index(request: Request, response: Response) {
    const [projects, count] = await this.projectRepo.findAndCount({
      order: {
        created_at: "DESC"
      },
      relations: ["administrator", "student", "partner"]
    });

    return response.status(200).json({projects, count});
  }

  async retrieve(request: Request, response: Response) {
    const { id } = request.params;

    const project = await this.projectRepo.findOne({ id }, {
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

    if(!name || !start_date || !field || !administrator_id || !student_id) {
      const fieldName = !name ? "name" : !start_date ? "start_date" : !field ? "field" : !administrator_id ? "administrator_id" : "student_id";
      console.info("[PROJECT-CONTROLLER] -> ", `The field ${fieldName} is empty`);
      return response.status(404).json(`The field ${fieldName} is empty`);
    }

    const administrator = await this.administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      console.info("[PROJECT-CONTROLLER] -> ", "Administrator not found!");
      return response.status(404).json("Administrator not found!");
    }

    const student = await this.studentRepo.findOne({ id: student_id });

    if(!student) {
      console.info("[PROJECT-CONTROLLER] -> ", "Student not found!");
      return response.status(404).json("Student not found!");
    }

    const partner = await this.partnerRepo.findOne({ id: partner_id });

    const project = await this.projectRepo.save({
      name,
      description,
      start_date,
      end_date,
      field,
      administrator,
      student,
      partner
    });

    return response.status(201).json(project);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description, start_date, end_date, field, student_id, partner_id } = request.body;

    if(!name || !start_date || !field || !student_id) {
      const fieldName = !name ? "name" : !start_date ? "start_date" : !field ? "field" : "student_id";
      console.info("[PROJECT-CONTROLLER] -> ", `The field ${fieldName} is empty`);
      return response.status(404).json(`The field ${fieldName} is empty`);
    }

    const project = await this.projectRepo.findOne({ id });

    if(!project) {
      console.info("[PROJECT-CONTROLLER] -> ", "Project not found!");
      return response.status(404).json("Project not found!");
    }

    const student = await this.studentRepo.findOne({ id: student_id });

    if(!student) {
      console.info("[PROJECT-CONTROLLER] -> ", "Student not found!");
      return response.status(404).json("Student not found!");
    }

    const partner = await this.partnerRepo.findOne({ id: partner_id });

    project.name = name ? name : project.name;
    project.description = description ? description : project.description;
    project.start_date = start_date ? start_date : project.start_date;
    project.end_date = end_date ? end_date : project.end_date;
    project.field = field ? field : project.field;
    project.student = student ? student : project.student;
    project.partner = partner ? partner : project.partner;

    await this.projectRepo.save(project);

    return response.status(200).json("Project updated successfully!");
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const project = await this.projectRepo.findOne({ id });

    if(!project) {
      console.info("[PROJECT-CONTROLLER] -> ", "Project not found!");
      return response.status(404).json("Project not found!");
    }

    await this.projectRepo.remove(project);

    return response.status(204).end();
  }
}
