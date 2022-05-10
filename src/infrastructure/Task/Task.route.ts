import { Request, Response, Router } from 'express';
import fs from 'fs-extra';
import multer from 'multer';
import Container from 'typedi';
import { v4 as uuidv4 } from 'uuid';

import CheckStatusTaskGetController, {
  CheckStatusGetControllerRequest
} from '../../controllers/Task/CheckStatusTaskGetController';
import CreateTaskPostController, {
  CreateTaskPostControllerRequest
} from '../../controllers/Task/CreateTaskPostController';
import ListTasksGetController from '../../controllers/Task/ListTasksGetController';
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
  const createTaskPostController = Container.get(CreateTaskPostController);
  router.post('/task', upload.single('image'), (req: Request, res: Response) =>
    createTaskPostController.run(req as CreateTaskPostControllerRequest, res)
  );

  const listTasksGetController = Container.get(ListTasksGetController);
  router.get('/task', (req: Request, res: Response) => {
    listTasksGetController.run(req, res);
  });

  const checkStatusTaskGetController = Container.get(
    CheckStatusTaskGetController
  );
  router.get('/task/:id', (req: Request, res: Response) => {
    checkStatusTaskGetController.run(
      req as CheckStatusGetControllerRequest,
      res
    );
  });
};
