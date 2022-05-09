import 'reflect-metadata';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { connectDB } from './infrastructure/core/config/postgres.config';
import bootstrapContainerDI from './infrastructure/core/dependency-injection/container';
import { tasksRouter } from './infrastructure/Task/Task.route';

dotenv.config();

(async () => await connectDB())();

bootstrapContainerDI();

const app: Express = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + '/output'));
app.use(tasksRouter);

export default app;
