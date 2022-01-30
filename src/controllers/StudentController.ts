import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Administrator from "../models/Administrator";
import Student from "../models/Student";

type ResponseData = {
  students: Student[],
  count: Number
}

export default class StudentController {
  private readonly administratorRepo: Repository<Administrator>;
  private readonly studentRepo: Repository<Student>;

  constructor() {
    this.administratorRepo = getRepository(Administrator);
    this.studentRepo = getRepository(Student);
  }
  async index(request: Request, response: Response) {
    const [students, count] = await this.studentRepo.findAndCount({
      order: {
        created_at: "DESC"
      }
    });

    const result: ResponseData = {students, count};

    return response.status(200).json(result);
  }

  async retrieve(request: Request, response: Response) {
    const { id } = request.params;

    const student = await this.studentRepo.findOne({ id });

    if(!student) {
      console.info("[STUDENT-CONTROLLER] -> ", "Student not found!");
      return response.status(404).json("Student not found!");
    }

    return response.status(200).json(student);
  }

  async create(request: Request, response: Response) {
    const { name, email, phone_number, administrator_id } = request.body;

    if(!name || !email || !phone_number || !administrator_id) {
      const fieldName = !name ? "name" : !email ? "email": !phone_number ? "phone_number" : "administrator_id";
      console.info("[STUDENT-CONTROLLER] -> ", `The field ${fieldName} is empty!`);
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const emailAlreadyInUse = await this.studentRepo.findOne({ email });

    if(emailAlreadyInUse) {
      console.info("[STUDENT-CONTROLLER] -> ", "Email already in use!");
      return response.status(400).json("Email already in use!");
    }

    const administrator = await this.administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      console.info("[STUDENT-CONTROLLER] -> ", "Administrator not found!");
      return response.status(400).json("Administrator not found!");
    }

    const createdStudent = await this.studentRepo.save({
      administrator,
      email,
      name,
      phone_number
    });

    return response.status(201).json(createdStudent);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, phone_number } = request.body;

    if(!name || !email || !phone_number) {
      const fieldName = !name ? "name" : !email ? "email": "phone_number";
      console.info("[STUDENT-CONTROLLER] -> ", `The field ${fieldName} is empty!`);
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const student = await this.studentRepo.findOne({ id });

    if(!student) {
      console.info("[STUDENT-CONTROLLER] -> ", "Student not found!");
      return response.status(404).json("Student not found!");
    }

    student.name = name ? name : student.name;
    student.email = email ? email : student.email;
    student.phone_number = phone_number ? phone_number : student.phone_number;

    await this.studentRepo.save(student);

    return response.status(200).json("Student updated successfully!");
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const student = await this.studentRepo.findOne({ id });

    if(!student) {
      console.info("[STUDENT-CONTROLLER] -> ", "Student not found!");
      return response.status(404).json("Student not found!");
    }

    await this.studentRepo.remove([student]);

    return response.status(204).end();
  }
}
