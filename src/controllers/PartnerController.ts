import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Administrator from "../models/Administrator";
import Company from "../models/Company";
import Partner from "../models/Partner";

export default class PartnerController {
  async index(request: Request, response: Response) {
    const partnerRepo = getRepository(Partner);
    const [partners, count] = await partnerRepo.findAndCount({
      order: {
        created_at: "DESC"
      },
      relations: ["company"],
      select: ["id", "name", "email", "company"],
    });

    return response.status(200).json({partners, count});
  }

  async retrieve(request: Request, response: Response) {
    const { id } = request.params;
    const partnerRepo = getRepository(Partner);

    const partner = await partnerRepo.findOne({ id }, {
      relations: ["company"]
    });

    if(!partner) {
      console.info("[PARTNER-CONTROLLER] -> ", "Partner not found!");
      return response.status(404).json("Partner not found!");
    }

    return response.status(200).json(partner);
  }

  async create(request: Request, response: Response) {
    const { name, email, administrator_id, company_id } = request.body;
    const partnerRepo = getRepository(Partner);
    const administratorRepo = getRepository(Administrator);
    const companyRepo = getRepository(Company);

    if(!name || !email || !administrator_id || !company_id) {
      const fieldName = !name ? "name" : !email ? "email": !administrator_id ? "administrator_id" : "company_id";
      console.info("[PARTNER-CONTROLLER] -> ", `The field ${fieldName} is empty!`);
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const emailAlreadyExists = await partnerRepo.findOne({ email });

    if(emailAlreadyExists) {
      console.info("[PARTNER-CONTROLLER] -> ", "Email already in use!");
      return response.status(400).json("Email already in use!");
    }

    const administrator = await administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      console.info("[PARTNER-CONTROLLER] -> ", "Administrator not found!");
      return response.status(404).json("Administrator not found!");
    }

    const company = await companyRepo.findOne({ id: company_id });

    if(!company) {
      console.info("[PARTNER-CONTROLLER] -> ", "Company not found!");
      return response.status(404).json("Company not found!");
    }

    const partner = await partnerRepo.save({
      name,
      email,
      administrator,
      company
    });

    delete partner.administrator.password;

    return response.status(200).json(partner);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, company_id } = request.body;
    const partnerRepo = getRepository(Partner);
    const companyRepo = getRepository(Company);

    if(!name || !email || !company_id) {
      const fieldName = !name ? "name" :  !email ? "email": "company_id";
      console.info("[PARTNER-CONTROLLER] -> ", `The field ${fieldName} is empty!`);
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const partner = await partnerRepo.findOne({ id });

    if(!partner) {
      console.info("[PARTNER-CONTROLLER] -> ", "Partner not found!");
      return response.status(404).json("Partner not found!");
    }

    const company = await companyRepo.findOne({ id: company_id });

    if(!company) {
      console.info("[PARTNER-CONTROLLER] -> ", "Company not found!");
      return response.status(404).json("Company not found!");
    }

    partner.name = name ? name : partner.name;
    partner.email = email ? email : partner.email;
    partner.company = company ? company : partner.company;

    await partnerRepo.save(partner);

    return response.status(200).json("Partner updated successfully!");
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const partnerRepo = getRepository(Partner);

    const partner = await partnerRepo.findOne({ id });

    if(!partner) {
      console.info("[PARTNER-CONTROLLER] -> ", "Partner not found!");
      return response.status(404).json("Partner not found!");
    }

    await partnerRepo.remove([partner]);

    return response.status(204).end();
  }
}
