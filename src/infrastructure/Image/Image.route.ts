import { CheckStatusGetUseCaseRequest } from './../../application/use-cases/Task/CheckStatusTaskGetUseCase';
import ImageByIdUseCase, {
  ImageByIdGetUseCaseRequest
} from '../../application/use-cases/Image/ImageByIdUseCase';
import { Request, Response, Router } from 'express';
import Container from 'typedi';
import ListImagesUseCase from '../../application/use-cases/Image/ListImagesUseCase';

export const register = (router: Router) => {
  const checkStatusTaskGetController = Container.get(ListImagesUseCase);
  router.get('/image', (req: Request, res: Response) => {
    checkStatusTaskGetController.run(req as CheckStatusGetUseCaseRequest, res);
  });

  const createTaskPostController = Container.get(ImageByIdUseCase);
  router.get('/image/:id', (req: Request, res: Response) =>
    createTaskPostController.run(req as ImageByIdGetUseCaseRequest, res)
  );
};
