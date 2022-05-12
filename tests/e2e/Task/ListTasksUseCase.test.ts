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

let _request: request.Test;
let _response: request.Response;
let application: ImageResizerApp;

describe('ListTasksUseCase', () => {
  let imagesRepository: ImagesRepository;
  let tasksRespository: TasksRepository;
  let filesRepository: FilesRepository;
  const filePathToUpload = path.resolve(
    __dirname,
    './../../mock/test_image.png'
  );

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
  });

  beforeEach(async () => {
    _request = request(application.httpServer).get('/task');
  });

  it('return 200 ok status code with all tasks listed', async () => {
    _response = await _request;

    expect(_response.statusCode).toEqual(200);
    expect(_response.body).toEqual({
      result: [
        expect.objectContaining({
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: [],
          originalName: expect.any(String),
          md5Source: expect.any(String),
          pathToSource: expect.any(String),
          status: expect.any(String)
        })
      ]
    });
  });

  afterAll(async () => {
    await imagesRepository.deleteAll();
    await tasksRespository.deleteAll();
    filesRepository.removeDir(process.cwd() + '/output/test_image');

    await application.stop();
  });
});
