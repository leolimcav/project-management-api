import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Administrator from "@models/Administrator";
import Highlight from "@models/Highlight";
import Project from "@models/Projects";

export default class HighlightController {
  private readonly administratorRepo: Repository<Administrator>;
  private readonly highlightRepo: Repository<Highlight>;
  private readonly projectRepo: Repository<Project>;

  constructor() {
    this.administratorRepo = getRepository(Administrator);
    this.highlightRepo = getRepository(Highlight);
    this.projectRepo = getRepository(Project);
  }
  async index(request: Request, response: Response) {
    const [highlights, count] = await this.highlightRepo.findAndCount({
      order: {
        created_at: "DESC"
      },
      relations: ["project", "project.student"]
    });

    return response.status(200).json({highlights, count});
  }

  async retrieve(request: Request, response: Response) {
    const { id } = request.params;

    const highlight = await this.highlightRepo.findOne({ id }, {
      relations: ["project", "project.student"]
    });

    if(!highlight) {
      console.info("[HIGHLIGHT-CONTROLLER] -> ", "Highlight not found!");
      return response.status(404).json("Highlight not found!");
    }

    return response.status(200).json(highlight);
  }

  async create(request: Request, response: Response) {
    const { end_date, administrator_id, project_id } = request.body;

    if(!end_date || !administrator_id || !project_id) {
      const fieldName = !end_date ? "end_date" : !administrator_id ? "administrator_id" : "project_id";
      console.info("[HIGHLIGHT-CONTROLLER] -> ", `The field ${fieldName} is empty!`);
      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const administrator = await this.administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      console.info("[HIGHLIGHT-CONTROLLER] -> ", "Administrator not found!");
      return response.status(404).json("Administrator not found!");
    }

    const project = await this.projectRepo.findOne({ id: project_id });

    if(!project) {
      console.info("[HIGHLIGHT-CONTROLLER] -> ", "Project not found!");
      return response.status(404).json("Project not found!");
    }

    const highlight = await this.highlightRepo.save({
      end_date,
      administrator,
      project
    });

    return response.status(200).json(highlight);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const highlight = await this.highlightRepo.findOne({ id });

    if(!highlight) {
      console.info("[HIGHLIGHT-CONTROLLER] -> ", "Highlight not found!");
      return response.status(404).json("Highlight not found!");
    }

    await this.highlightRepo.remove(highlight);

    return response.status(204).end();
  }
}
