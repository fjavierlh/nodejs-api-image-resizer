import httpStatus from 'http-status';
import express, { Request, Response, Router } from 'express';
import CreateTaskPostController, {
  CreateTaskPostControllerRequest
} from '../../controllers/CreateTaskPostController';
import ListTasksGetController from '../../controllers/ListTasksGetController';
import Container from 'typedi';
import multer from 'multer';
import fs from 'fs-extra';
import cleanFileName from '../../utils/cleanFileName';
import { v4 as uuidv4 } from 'uuid';
import CheckStatusTaskGetController, {
  CheckStatusGetControllerRequest
} from '../../controllers/CheckStatusTaskGetController';

let pathOutput: string;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const originalFilename = cleanFileName(file.originalname);
    pathOutput = `output/${originalFilename}/src`;
    fs.mkdirsSync(pathOutput);
    cb(null, pathOutput);
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/').pop();
    const tempUuid = uuidv4();
    const temporalFilename = `${tempUuid}.${extension}`;
    cb(null, `${temporalFilename}`);
  }
});

const upload = multer({ storage: storage });

const router: Router = express.Router();

router.post('/task', upload.single('image'), (req: Request, res: Response) => {
  const createTaskPostController = Container.get(CreateTaskPostController);
  createTaskPostController.run(req as CreateTaskPostControllerRequest, res);
});

router.get('/task', (req: Request, res: Response) => {
  const listTasksGetController = Container.get(ListTasksGetController);
  listTasksGetController.run(req, res);
});

router.get('/task/:id', (req: Request, res: Response) => {
  const checkStatusTaskGetController = Container.get(
    CheckStatusTaskGetController
  );
  checkStatusTaskGetController.run(req as CheckStatusGetControllerRequest, res);
});

export { router as tasksRouter };
