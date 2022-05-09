import { WriteStream } from 'node:fs';
import Resolution from '../Image/model/ImageResolution';

interface Files {
  write(path: string): WriteStream;
  read(path: string): Buffer;
  rename(oldPath: string, newFilename: string): void;
  delete(path: string): void;
  cleanFilename(originalname: string): string;
  getExtension(mymetype: string): string | undefined;
  makeDir(path: string): void;
  hashFile(path: string, algorithm: string): string;
  getResolution(path: string): Resolution;
}

export default Files;
