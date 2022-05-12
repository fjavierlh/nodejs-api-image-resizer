import 'reflect-metadata';
import { Container } from 'typedi';
import ImageResizerApp from '../../../../../src/ImageResizerApp';
import { connectDB } from '../../../../../src/infrastructure/core/config/postgres.config';
import bootstrapContainerDI from '../../../../../src/infrastructure/core/dependency-injection/container';
import request from 'supertest';
import path from 'path';
import ImagesRepository from '../../../../../src/infrastructure/Image/ImagesRepository';
import TasksRepository from '../../../../../src/infrastructure/Task/TasksRepository';
import FilesRepository from '../../../../../src/infrastructure/File/FilesRepository';
import Task from '../../../../../src/domain/Task/model/Task';
import { v4 as uuidV4 } from 'uuid';

let _request: request.SuperTest<request.Test>;
let _response: request.Response;
let application: ImageResizerApp;

describe('ImageByUuid', () => {
  let imagesRepository: ImagesRepository;
  let tasksRespository: TasksRepository;
  let filesRepository: FilesRepository;
  const filePathToUpload = path.resolve(
    __dirname,
    './../../../../mock/test_image.png'
  );
  let lastImage: Task;

  beforeAll(async () => {
    await connectDB();

    bootstrapContainerDI();
    imagesRepository = Container.get('ImagesRepository');
    tasksRespository = Container.get('TasksRepository');
    filesRepository = Container.get('FilesRepository');

    await imagesRepository.deleteAll();
    await tasksRespository.deleteAll();

    application = new ImageResizerApp();
    await application.start();

    await request(application.httpServer)
      .post('/task')
      .attach('image', filePathToUpload);

    const { body } = await request(application.httpServer).get('/image');
    lastImage = body.result[0];
  });

  beforeEach(async () => {
    _request = request(application.httpServer);
  });

  it('return 200 ok status code with searched image by id', async () => {
    _response = await _request.get(`/image/${lastImage.id}`);

    expect(_response.statusCode).toEqual(200);
    expect(_response.body).toEqual({
      result: expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
        taskId: expect.any(String),
        md5: expect.any(String),
        pathToSource: expect.any(String),
        resolution: expect.objectContaining({
          width: expect.any(Number),
          height: expect.any(Number)
        })
      })
    });
  });

  it('return 404 not found status code if image id not exists', async () => {
    _response = await _request.get(`/image/${uuidV4()}`);
    expect(_response.statusCode).toEqual(404);
  });

  afterAll(async () => {
    await imagesRepository.deleteAll();
    await tasksRespository.deleteAll();
    filesRepository.removeDir(process.cwd() + '/output/test_image');

    await application.stop();
  });
});
