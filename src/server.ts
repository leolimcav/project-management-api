import 'reflect-metadata';
import './database';
import express, {json} from 'express';
import cors from 'cors';
import {config as envConfig} from 'dotenv';
import routes from './routes';

envConfig();

const server = express();

server.use(json());
server.use(cors());
server.use(routes);

server.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
