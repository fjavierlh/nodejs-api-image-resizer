import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Service } from 'typedi';
import ImagesService from '../../../domain/Image/services/ImagesService';
import { isUuid } from '../../../domain/Shared/utils/isUuid';
import UseCase from '../UseCase.interface';

export type ImageByIdUseCaseRequest = Request & {
  params: { id: string };
};

@Service()
class ImageByIdUseCase implements UseCase {
  constructor(private imageService: ImagesService) {}

  public async run(req: ImageByIdUseCaseRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ error: 'No id sent in params' });
        return;
      }

      if (!isUuid(id)) {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ error: 'Invalid id, must be an uuid' });
        return;
      }

      const image = await this.imageService.byId(req.params.id);

      if (!image) {
        res.status(httpStatus.NOT_FOUND).send();
        return;
      }
      res.status(200).send({ result: image });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send({ error });
    }
  }
}

export default ImageByIdUseCase;
