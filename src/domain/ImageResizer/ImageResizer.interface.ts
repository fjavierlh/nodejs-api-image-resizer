import { Response } from 'node-fetch';

interface ImageResizer {
  resize(file: string, width: number): Promise<Response | Error>;
}

export default ImageResizer;
