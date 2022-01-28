import Administrator from "../models/Administrator";
import { getRepository } from "typeorm";
import { Request, Response } from "express";

type ResponseData = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export default class AdministratorController {
  public async retrive(request: Request, response: Response) {
    const { id } = request.params;
    const administratorRepo = getRepository(Administrator);

    const administrator = await administratorRepo.findOne({ id });

    if(!administrator) {
      return response.status(404).json("Administrator not found!");
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
