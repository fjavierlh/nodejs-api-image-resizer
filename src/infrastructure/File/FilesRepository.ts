import { WriteStream } from 'fs-extra';
import fs from 'fs-extra';
import Files from '../../domain/FileManager/Files.interface';
import * as crypto from 'crypto';
import Resolution from '../../domain/Image/model/ImageResolution';
import sizeOf from 'image-size';

class FilesRepository implements Files {
  public makeDir(path: string): void {
    fs.mkdirsSync(path);
  }

  public write(path: string): WriteStream {
    return fs.createWriteStream(path);
  }

  public read(path: string): Buffer {
    return fs.readFileSync(path);
  }

  public rename(oldPath: string, newPath: string): void {
    fs.rename(oldPath, newPath);
  }

  public delete(path: string): void {
    fs.emptyDirSync(path);
  }

  public cleanFilename(originalname: string): string {
    return originalname.split('.').slice(0, -1).join('.').replace(/\s/g, '_');
  }

  public getExtension(mimetype: string): string | undefined {
    return mimetype.split('/').pop();
  }

  public hashFile(path: string, algorithm: string): string {
    const buffer = this.read(path);
    const hash = crypto.createHash(algorithm);
    hash.update(buffer);

    return hash.digest('hex');
  }

  getResolution(path: string): Resolution {
    return sizeOf(path);
  }
}

export default FilesRepository;
