import 'reflect-metadata';
import dotenv from 'dotenv';
import { connectDB } from './infrastructure/core/config/postgres.config';
import bootstrapContainerDI from './infrastructure/core/dependency-injection/container';
import ImageResizerApp from './ImageResizerApp';

dotenv.config();

try {
  connectDB();
  bootstrapContainerDI();
  new ImageResizerApp().start();
} catch (error) {
  console.error(error);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  process.exit(1);
});
