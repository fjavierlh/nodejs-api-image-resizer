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

  public async read(path: string): Promise<Buffer> {
    return this.files.read(path);
  }

  public rename(oldPath: string, newPath: string): void {
    this.files.rename(oldPath, newPath);
  }

  public createPath(path: string): void {
    return this.files.makeDir(path);
  }

  public async hashFile(path: string, algorithm: string): Promise<string> {
    return this.files.hashFile(path, algorithm);
  }

  public remove(path: string): void {
    this.files.remove(path);
  }

  public removeDir(path: string): void {
    this.files.removeDir(path);
  }

  public getDimesions(path: string): Resolution {
    return this.files.getResolution(path);
  }
}

export default FilesService;
