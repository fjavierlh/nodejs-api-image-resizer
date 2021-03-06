import { WriteStream } from 'node:fs';
import Resolution from '../Image/model/ImageResolution';

interface Files {
  write(path: string): WriteStream;
  read(path: string): Promise<Buffer>;
  rename(oldPath: string, newFilename: string): void;
  remove(path: string): void;
  removeDir(path: string): void;
  makeDir(path: string): void;
  hashFile(path: string, algorithm: string): Promise<string>;
  getResolution(path: string): Resolution;
}

export default Files;
