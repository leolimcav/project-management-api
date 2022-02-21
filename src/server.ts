import "reflect-metadata";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { config as envConfig } from "dotenv";

import "./database";
import "./configs/DependencyInjectionResolver";
import AppError from "@errors/AppError";
import routes from "./routes";

envConfig();

const server = express();

server.use(json());
server.use(cors());
server.use(routes);

server.use(
  (error: Error, __: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      const key = error.key ? error.key : "ERROR MESSAGE";
      console.info(`[${key}] -> ${error.message}`);
      console.error(error.stack);
      return response.status(error.statusCode).json(error.message);
    }

    console.error(error.stack);
    return response.status(500).json(`Internal Server Error: ${error.message}`);
  }
);

server.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
