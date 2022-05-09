import { Inject, Service } from 'typedi';
import ImagesRepository from '../../../infrastructure/Image/ImagesRepository';
import Image from '../model/Image';

@Service()
class ImagesService {
  constructor(@Inject('ImagesRepository') private images: ImagesRepository) {}

  public async create(image: Image): Promise<void> {
    await this.images.persist(image);
  }
}

export default ImagesService;
