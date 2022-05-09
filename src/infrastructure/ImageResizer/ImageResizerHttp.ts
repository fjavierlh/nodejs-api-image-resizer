import { Response } from 'node-fetch';
import ImageResizer from '../../domain/ImageResizer/ImageResizer.interface';
import FecthHttpClient from '../Shared/HttpClient/FetchHttpClient';
import { buildResizeImageRequestFormData } from './requestBuilder';
import { Inject } from 'typedi';

class ImageResizerHttp implements ImageResizer {
  constructor(@Inject('FecthHttpClient') private httpClient: FecthHttpClient) {}

  public async resize(file: string, width: number): Promise<Response> {
    const request = buildResizeImageRequestFormData(file);
    return this.httpClient.post(`?width=${width}`, request);
  }
}

export default ImageResizerHttp;
