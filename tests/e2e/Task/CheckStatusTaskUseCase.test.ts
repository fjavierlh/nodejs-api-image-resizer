import 'reflect-metadata';
import { Container } from 'typedi';
import ImageResizerApp from '../../../src/ImageResizerApp';
import { connectDB } from '../../../src/infrastructure/core/config/postgres.config';
import bootstrapContainerDI from '../../../src/infrastructure/core/dependency-injection/container';
import request from 'supertest';
import path from 'path';
import ImagesRepository from '../../../src/infrastructure/Image/ImagesRepository';
import TasksRepository from '../../../src/infrastructure/Task/TasksRepository';
import FilesRepository from '../../../src/infrastructure/File/FilesRepository';
import Task from '../../../src/domain/Task/model/Task';
import { v4 as uuidV4 } from 'uuid';

let _request: request.SuperTest<request.Test>;
let _response: request.Response;
let application: ImageResizerApp;

describe('CheckStatusTaskUseCase', () => {
  let imagesRepository: ImagesRepository;
  let tasksRespository: TasksRepository;
  let filesRepository: FilesRepository;
  const filePathToUpload = path.resolve(
    __dirname,
    './../../mock/test_image.png'
  );
  let lastTask: Task;

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
    const { body } = await request(application.httpServer).get('/task');
    lastTask = body.result[0];
  });

  beforeEach(async () => {
    _request = request(application.httpServer);
  });

  it('return 200 ok status code with searched task by id', async () => {
    _response = await _request.get(`/task/${lastTask.id}`);

    expect(_response.statusCode).toEqual(200);
    expect(_response.body).toEqual({
      result: expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: [],
        originalName: expect.any(String),
        md5Source: expect.any(String),
        pathToSource: expect.any(String),
        status: expect.any(String)
      })
    });
  });

  it('return 404 not found status code if task id not exists', async () => {
    _response = await _request.get(`/task/${uuidV4()}`);

    expect(_response.statusCode).toEqual(404);
  });

  afterAll(async () => {
    await imagesRepository.deleteAll();
    await tasksRespository.deleteAll();
    filesRepository.removeDir(process.cwd() + '/output/test_image');

    await application.stop();
  });
});
