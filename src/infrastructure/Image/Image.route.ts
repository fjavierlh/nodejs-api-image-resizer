import ImageByIdGetController, {
  ImageByIdGetControllerRequest
} from './../../controllers/Image/ImageByIdGetController';
import { Request, Response, Router } from 'express';
import Container from 'typedi';
import ListImagesGetController from '../../controllers/Image/ListImagesGetController';
import { CheckStatusGetControllerRequest } from '../../controllers/Task/CheckStatusTaskGetController';

export const register = (router: Router) => {
  const checkStatusTaskGetController = Container.get(ListImagesGetController);
  router.get('/image', (req: Request, res: Response) => {
    checkStatusTaskGetController.run(
      req as CheckStatusGetControllerRequest,
      res
    );
  });

  const createTaskPostController = Container.get(ImageByIdGetController);
  router.get('/image/:id', (req: Request, res: Response) =>
    createTaskPostController.run(req as ImageByIdGetControllerRequest, res)
  );
};
