import ImageByIdUseCase, {
  ImageByIdUseCaseRequest
} from '../../application/use-cases/Image/ImageByIdUseCase';
import { Request, Response, Router } from 'express';
import Container from 'typedi';
import ListImagesUseCase from '../../application/use-cases/Image/ListImagesUseCase';

export const register = (router: Router) => {
  const listImagesUseCase = Container.get(ListImagesUseCase);
  router.get('/image', (req: Request, res: Response) => {
    listImagesUseCase.run(req, res);
  });

  const imageByIdUseCase = Container.get(ImageByIdUseCase);
  router.get('/image/:id', (req: Request, res: Response) =>
    imageByIdUseCase.run(req as ImageByIdUseCaseRequest, res)
  );
};
