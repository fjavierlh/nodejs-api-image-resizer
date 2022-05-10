import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Service } from 'typedi';
import ImagesService from '../../../domain/Image/services/ImagesService';
import UseCase from '../UseCase.interface';

@Service()
class ListImagesUseCase implements UseCase {
  constructor(private imageService: ImagesService) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.imageService.list();
      res.status(httpStatus.OK).send({ result: tasks });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send({ error });
    }
  }
}

export default ListImagesUseCase;
