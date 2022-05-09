import { Response } from 'node-fetch';

interface ImageResizer {
  resize(file: string, width: number): Promise<Response>;
}

export default ImageResizer;
