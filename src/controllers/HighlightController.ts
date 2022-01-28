import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Administrator from "../models/Administrator";
import Highlight from "../models/Highlight";
import Project from "../models/Projects";

export default class HighlightController {
  async index(request: Request, response: Response) {
    const highlightRepo = getRepository(Highlight);

    const [highlights, count] = await highlightRepo.findAndCount({
      order: {
        created_at: "DESC"
      },
      relations: ["project", "project.student"]
    });

    return response.status(200).json({highlights, count});
  }

  async retrieve(request: Request, response: Response) {
    const { id } = request.params;
    const highlightRepo = getRepository(Highlight);

    const highlight = await highlightRepo.findOne({ id }, {
      relations: ["project", "project.student"]
    });

    if(!highlight) {
      return response.status(404).json("Highlight not found!");
    }

    return response.status(200).json(highlight);
  }

  async create(request: Request, response: Response) {
    const { end_date, administrator_id, project_id } = request.body;
    const highlightRepo = getRepository(Highlight);
    const administratorRepo = getRepository(Administrator);
    const projectRepo = getRepository(Project);

    if(!end_date || !administrator_id || !project_id) {
      const fieldName = !end_date ? "end_date" : !administrator_id ? "administrator_id" : "project_id";

      return response.status(400).json(`The field ${fieldName} is empty!`);
    }

    const administrator = await administratorRepo.findOne({ id: administrator_id });

    if(!administrator) {
      return response.status(404).json("Administrator not found!");
    }

    const project = await projectRepo.findOne({ id: project_id });

    if(!project) {
      return response.status(404).json("Project not found!");
    }

    const highlight = await highlightRepo.save({
      end_date,
      administrator,
      project
    });

    return response.status(200).json(highlight);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const highlightRepo = getRepository(Highlight);

    const highlight = await highlightRepo.findOne({ id });

    if(!highlight) {
      return response.status(404).json("Highlight not found!");
    }

    await highlightRepo.remove(highlight);

    return response.status(204).end();
  }
}
