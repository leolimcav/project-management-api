import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Administrator from "../models/Administrator";
import Company from "../models/Company";

export default class CompanyController {
  async index(request: Request, response: Response) {
    const companyRepo = getRepository(Company);
    const [companies, count] = await companyRepo.findAndCount({
      order: {
        created_at: "DESC"
      }
    });

    return response.status(200).json({companies, count});
  }

  async retrieve(request: Request, response: Response) {
    const { id } = request.params;
    const companyRepo = getRepository(Company);

    const company = await companyRepo.findOne({ id });

    if(!company) {
      return response.status(404).json("Company not found!");
    }

    return response.status(200).json(company);
  }

  async create(request: Request, response: Response) {
    const { name, email, phone_number, address, administrator_id } = request.body;
    const companyRepo = getRepository(Company);
    const administratorRepo = getRepository(Administrator);

    if(!name || !email || !phone_number || !address || !administrator_id) {
      const fieldName = !name ? "name" : !email ? "email": !address ? "address" : !phone_number? "phone_number" : "administrator_id";
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const emailAlreadyExists = await companyRepo.findOne({ email });

    if(emailAlreadyExists) {
      return response.status(400).json("Email already in use!");
    }

    const administrator = await administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      return response.status(404).json("Administrator not found!");
    }

    const company = await companyRepo.save({
      name,
      email,
      phone_number,
      address,
      administrator
    });

    delete company.administrator.password;

    return response.status(200).json(company);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, phone_number, address } = request.body;
    const companyRepo = getRepository(Company);

    if(!name || !email || !phone_number || !address) {
      const fieldName = !name ? "name" : !email ? "email": !address ? "address" : "phone_number";
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const company = await companyRepo.findOne({ id });

    if(!company) {
      return response.status(404).json("Company not found!");
    }

    company.name = name ? name : company.name;
    company.email = email ? email : company.email;
    company.phone_number = phone_number ? phone_number : company.phone_number;
    company.address = address ? address : company.address;

    await companyRepo.save(company);

    return response.status(200).json("Company updated successfully!");
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const companyRepo = getRepository(Company);

    const company = await companyRepo.findOne({ id });

    if(!company) {
      return response.status(404).json("Company not found!");
    }

    await companyRepo.remove([company]);

    return response.status(204).end();
  }
}
