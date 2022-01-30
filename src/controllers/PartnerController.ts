import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Administrator from "../models/Administrator";
import Company from "../models/Company";
import Partner from "../models/Partner";

export default class PartnerController {
  private readonly administratorRepo: Repository<Administrator>;
  private readonly companyRepo: Repository<Company>;
  private readonly partnerRepo: Repository<Partner>;

  constructor() {
    this.administratorRepo = getRepository(Administrator);
    this.companyRepo = getRepository(Company);
    this.partnerRepo = getRepository(Partner);
  }

  async index(request: Request, response: Response) {
    const [partners, count] = await this.partnerRepo.findAndCount({
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

    const partner = await this.partnerRepo.findOne({ id }, {
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

    if(!name || !email || !administrator_id || !company_id) {
      const fieldName = !name ? "name" : !email ? "email": !administrator_id ? "administrator_id" : "company_id";
      console.info("[PARTNER-CONTROLLER] -> ", `The field ${fieldName} is empty!`);
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const emailAlreadyExists = await this.partnerRepo.findOne({ email });

    if(emailAlreadyExists) {
      console.info("[PARTNER-CONTROLLER] -> ", "Email already in use!");
      return response.status(400).json("Email already in use!");
    }

    const administrator = await this.administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      console.info("[PARTNER-CONTROLLER] -> ", "Administrator not found!");
      return response.status(404).json("Administrator not found!");
    }

    const company = await this.companyRepo.findOne({ id: company_id });

    if(!company) {
      console.info("[PARTNER-CONTROLLER] -> ", "Company not found!");
      return response.status(404).json("Company not found!");
    }

    const partner = await this.partnerRepo.save({
      name,
      email,
      administrator,
      company
    });

    return response.status(200).json(partner);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, company_id } = request.body;

    if(!name || !email || !company_id) {
      const fieldName = !name ? "name" :  !email ? "email": "company_id";
      console.info("[PARTNER-CONTROLLER] -> ", `The field ${fieldName} is empty!`);
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const partner = await this.partnerRepo.findOne({ id });

    if(!partner) {
      console.info("[PARTNER-CONTROLLER] -> ", "Partner not found!");
      return response.status(404).json("Partner not found!");
    }

    const company = await this.companyRepo.findOne({ id: company_id });

    if(!company) {
      console.info("[PARTNER-CONTROLLER] -> ", "Company not found!");
      return response.status(404).json("Company not found!");
    }

    partner.name = name ? name : partner.name;
    partner.email = email ? email : partner.email;
    partner.company = company ? company : partner.company;

    await this.partnerRepo.save(partner);

    return response.status(200).json("Partner updated successfully!");
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const partner = await this.partnerRepo.findOne({ id });

    if(!partner) {
      console.info("[PARTNER-CONTROLLER] -> ", "Partner not found!");
      return response.status(404).json("Partner not found!");
    }

    await this.partnerRepo.remove([partner]);

    return response.status(204).end();
  }
}
