import { WriteStream } from 'fs-extra';
import fs from 'fs-extra';
import Files from '../../domain/File/Files.interface';
import * as crypto from 'crypto';
import Resolution from '../../domain/Image/model/ImageResolution';
import sizeOf from 'image-size';

class FilesRepository implements Files {
  public makeDir(path: string): void {
    fs.mkdirs(path);
  }

  public write(path: string): WriteStream {
    return fs.createWriteStream(path);
  }

  public async read(path: string): Promise<Buffer> {
    return fs.readFile(path);
  }

  public rename(oldPath: string, newPath: string): void {
    fs.rename(oldPath, newPath);
  }

  public remove(path: string): void {
    fs.unlink(path);
  }

  public removeDir(path: string): void {
    fs.remove(path);
  }

  public async hashFile(path: string, algorithm: string): Promise<string> {
    const buffer = await this.read(path);
    const hash = crypto.createHash(algorithm);
    hash.update(buffer);

    return hash.digest('hex');
  }

  getResolution(path: string): Resolution {
    return sizeOf(path);
  }
}

export default FilesRepository;
