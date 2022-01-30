import 'reflect-metadata';
import express, {json, NextFunction, Request, Response} from 'express';
import 'express-async-errors';
import cors from 'cors';
import {config as envConfig} from 'dotenv';

import './database';
import './configs/DependencyInjectionResolver';
import routes from './routes';
import AppError from '@errors/AppError';

envConfig();

const server = express();

server.use(json());
server.use(cors());
server.use(routes);

server.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json(error.message);
  }

  return response.status(500).json(`Internal Server Error: ${error.message}`);
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
