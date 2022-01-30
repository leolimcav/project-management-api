import { Request, Response } from "express";
import Administrator from "src/models/Administrator";
import { container} from "tsyringe";

import AdministratorService from "../services/AdministratorService";

type ResponseData = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}


export default class AdministratorController {
  public async retrieve(request: Request, response: Response) {
    const { id } = request.params;

    const administratorService = container.resolve(AdministratorService);

    const administrator = await administratorService.getOneById({ id });

    const result: ResponseData = Object.assign(administrator || {});

    return response.status(200).json(result);
  }
}
