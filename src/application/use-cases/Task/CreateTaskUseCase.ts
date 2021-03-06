import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid';

import File from '../../../domain/File/model/File';
import FilesService from '../../../domain/File/Services/FilesService';
import Image from '../../../domain/Image/model/Image';
import ImagesService from '../../../domain/Image/services/ImagesService';
import ImageSizeVariant, {
  imageSizeVariants
} from '../../../domain/ImageResizer/model/ImageSizeVariants';
import ImageResizerService from '../../../domain/ImageResizer/services/ImageResizerService';
import { timestamp } from '../../../domain/Shared/utils/timestamp';
import Task from '../../../domain/Task/model/Task';
import TaskStatus from '../../../domain/Task/model/TaskStatuses';
import TasksService from '../../../domain/Task/services/TaskService';
import { cleanFilename } from '../../../domain/Task/utils/cleanFileName';
import { getExtension } from '../../../domain/Task/utils/getExtension';
import UseCase from '../UseCase.interface';

export type CreateTaskUseCaseRequest = Request & File;

@Service()
class CreateTaskUseCase implements UseCase {
  constructor(
    private taskService: TasksService,
    private imageService: ImagesService,
    private imageResizerService: ImageResizerService,
    private fileService: FilesService
  ) {}

  public async run(
    req: CreateTaskUseCaseRequest,
    res: Response
  ): Promise<void> {
    try {
      const file = req.file;

      if (!file) {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ error: 'No file sent in request' });
        return;
      }

      const [cleanedOriginalName, newPathFile, md5NewSource] =
        await this.renameOriginalFile(file);

      const existentTask: Task | undefined =
        await this.taskService.lastCreatedByOriginalName(cleanedOriginalName);
      const updates: string[] = [];

      if (existentTask) {
        const { updatedAt, pathToSource, md5Source } = existentTask;
        updates.push(...updatedAt);
        if (md5Source === md5NewSource) {
          res
            .status(httpStatus.CONFLICT)
            .send({ error: 'Task with this image already exists' });
          return;
        }

        this.fileService.remove(pathToSource);
        await this.imageService.deleteByTaskId(existentTask.id);

        updates.push(timestamp());

        imageSizeVariants.forEach((sizeVariant) => {
          this.fileService.removeDir(
            `output/${cleanedOriginalName}/${sizeVariant}`
          );
        });
      }

      file.path = newPathFile;

      const task: Task = {
        id: uuidv4(),
        createdAt: timestamp(),
        updatedAt: updates,
        originalName: cleanedOriginalName,
        md5Source: md5NewSource,
        pathToSource: file.path,
        status: TaskStatus.READY
      };

      this.taskService.create(task);

      await this.taskService.updateStatus(task.id, TaskStatus.PROCCESSING);

      const resizedImages: Image[] = await this.generateResizedImages(
        file,
        imageSizeVariants,
        task.id
      );

      await Promise.all(
        resizedImages.map(async (image) => {
          await this.imageService.create(image);
        })
      );

      await this.taskService.updateStatus(task.id, TaskStatus.DONE);

      res.status(httpStatus.ACCEPTED).send();
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error });
    }
  }

  private async renameOriginalFile({
    originalname,
    path,
    mimetype
  }: File): Promise<string[]> {
    const cleanedOriginalName = cleanFilename(originalname);
    const md5Source = await this.fileService.hashFile(path, 'md5');
    const extension = getExtension(mimetype);
    const newPathFile = `output/${cleanedOriginalName}/src/${md5Source}.${extension}`;

    this.fileService.rename(path, newPathFile);

    return [cleanedOriginalName, newPathFile, md5Source];
  }

  private async generateResizedImages(
    file: File,
    imageSizeVariants: ImageSizeVariant[],
    taskId: string
  ) {
    const { originalname, mimetype } = file;
    const cleanedOriginalName = cleanFilename(originalname);

    return Promise.all(
      imageSizeVariants.map(async (sizeVariant) => {
        const response = await this.imageResizerService.resize(
          file.path,
          sizeVariant
        );

        const extension = getExtension(mimetype);
        const outputPath = `output/${cleanedOriginalName}/${sizeVariant}`;
        this.fileService.createPath(outputPath);

        const temporalFilename = `${uuidv4()}.${extension}`;
        const temporalPath = `${outputPath}/${temporalFilename}`;
        const writeStream = this.fileService.write(temporalPath);

        const result = response.body.pipe(writeStream);

        const { newPathToSource, resolution, md5 } = await new Promise(
          (resolve, reject) => {
            result
              .on('finish', async () => {
                const resolution = this.fileService.getDimesions(temporalPath);
                const md5 = await this.fileService.hashFile(
                  temporalPath,
                  'md5'
                );
                const newFilename = `${md5}.${extension}`;
                const newPathToSource = `${outputPath}/${newFilename}`;
                this.fileService.rename(temporalPath, newPathToSource);

                resolve({ newPathToSource, resolution, md5 });
              })
              .on('error', (error: Error) => {
                reject(error);
              });
          }
        );

        return {
          id: uuidv4(),
          createdAt: timestamp(),
          taskId,
          md5,
          resolution,
          pathToSource: newPathToSource
        };
      })
    );
  }
}

export default CreateTaskUseCase;
