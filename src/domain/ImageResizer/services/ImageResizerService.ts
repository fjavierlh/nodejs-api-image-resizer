import { Inject, Service } from 'typedi';
import { Response } from 'node-fetch';
import ImageResizerHttp from '../../../infrastructure/ImageResizer/ImageResizerHttp';

@Service()
class ImageResizerService {
  constructor(
    @Inject('ImageResizerHttp') private imageResizerHttp: ImageResizerHttp
  ) {}

  public async resize(file: string, width: number): Promise<Response> {
    return this.imageResizerHttp.resize(file, width);
  }
}

export default ImageResizerService;
