import Administrator from "../models/Administrator";
import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";

type ResponseData = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export default class AuthController {
  private readonly administratorRepo: Repository<Administrator>;
  constructor() {
    this.administratorRepo = getRepository(Administrator);
  }
  public async send(request: Request, response: Response) {
    const { email, password } = request.body;
    const administrator = await this.administratorRepo.findOne({ email });

    if(!email || !password) {
      console.info("[AUTH-CONTROLLER] -> ", "Email/Password is empty!");
      return response.status(400).json("Email/Password is empty!");
    }

    if(!administrator) {
      console.info("[AUTH-CONTROLLER] -> ", "Administrator not found!");
      return response.status(404).json("Administrator not found!");
    }

    if(administrator.email !== email || administrator.password !== password) {
      console.info("[AUTH-CONTROLLER] -> ", "Email/Password are incorrect!");
      return response.status(400).json("Email/Password are incorrect!");
    }

    const result: ResponseData = {
      id: administrator.id,
      name: administrator.name,
      email: administrator.email,
      role: administrator.role,
      created_at: administrator.created_at,
      updated_at: administrator.updated_at
    };

    return response.status(200).json(result);
  }
}
