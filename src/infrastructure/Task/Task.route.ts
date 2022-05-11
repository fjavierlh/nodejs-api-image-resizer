import { CheckStatusUseCaseRequest } from '../../application/use-cases/Task/CheckStatusTaskUseCase';
import { CreateTaskUseCaseRequest } from './../../application/use-cases/Task/CreateTaskUseCase';
import { Request, Response, Router } from 'express';
import fs from 'fs-extra';
import multer from 'multer';
import Container from 'typedi';
import { v4 as uuidv4 } from 'uuid';
import CheckStatusUseCase from '../../application/use-cases/Task/CheckStatusTaskUseCase';
import CreateTaskUseCase from '../../application/use-cases/Task/CreateTaskUseCase';
import ListTasksUseCase from '../../application/use-cases/Task/ListTasksUseCase';

import { cleanFilename } from '../../domain/Task/utils/cleanFileName';
import { getExtension } from '../../domain/Task/utils/getExtension';

let pathOutput: string;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const originalFilename = cleanFilename(file.originalname);
    pathOutput = `output/${originalFilename}/src`;
    fs.mkdirsSync(pathOutput);
    cb(null, pathOutput);
  },
  filename: (req, file, cb) => {
    const extension = getExtension(file.mimetype);
    const tempUuid = uuidv4();
    const temporalFilename = `${tempUuid}.${extension}`;
    cb(null, `${temporalFilename}`);
  }
});

const upload = multer({ storage: storage });

export const register = (router: Router) => {
  const createTaskPostController = Container.get(CreateTaskUseCase);
  router.post('/task', upload.single('image'), (req: Request, res: Response) =>
    createTaskPostController.run(req as CreateTaskUseCaseRequest, res)
  );

  const listTasksGetController = Container.get(ListTasksUseCase);
  router.get('/task', (req: Request, res: Response) => {
    listTasksGetController.run(req, res);
  });

  const checkStatusTaskGetController = Container.get(CheckStatusUseCase);
  router.get('/task/:id', (req: Request, res: Response) => {
    checkStatusTaskGetController.run(req as CheckStatusUseCaseRequest, res);
  });
};
