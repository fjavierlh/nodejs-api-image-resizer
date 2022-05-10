import { WriteStream } from 'fs-extra';
import { Inject, Service } from 'typedi';
import FilesRepository from '../../../infrastructure/File/FilesRepository';
import Resolution from '../../Image/model/ImageResolution';

@Service()
class FilesService {
  constructor(@Inject('FilesRepository') private files: FilesRepository) {}

  public write(path: string): WriteStream {
    return this.files.write(path);
  }

  public read(path: string): Buffer {
    return this.files.read(path);
  }

  public rename(oldPath: string, newPath: string): void {
    this.files.rename(oldPath, newPath);
  }

  public delete(path: string): void {
    this.files.delete(path);
  }

  public createPath(path: string): void {
    return this.files.makeDir(path);
  }

  public hashFile(path: string, algorithm: string): string {
    return this.files.hashFile(path, algorithm);
  }

  public getDimesions(path: string): Resolution {
    return this.files.getResolution(path);
  }
}

export default FilesService;
