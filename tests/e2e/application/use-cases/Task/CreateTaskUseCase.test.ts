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

let _request: request.Test;
let _response: request.Response;
let application: ImageResizerApp;

describe('CreateTaskUseCase', () => {
  let imagesRepository: ImagesRepository;
  let tasksRespository: TasksRepository;
  let filesRepository: FilesRepository;
  const filePathToUpload = path.resolve(
    __dirname,
    './../../../../mock/test_image.png'
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
  });

  beforeEach(async () => {
    _request = request(application.httpServer).post('/task');
  });

  it('return 202 accepted status code if form data request has image', async () => {
    _response = await _request.attach('image', filePathToUpload);

    expect(_response.statusCode).toEqual(202);
  });

  it('return 409 conflict status code if form data request has image and already exists', async () => {
    await _request.attach('image', filePathToUpload);

    _response = await _request.attach('image', filePathToUpload);

    expect(_response.statusCode).toEqual(409);
  });

  it("return 400 bad request status code if form data request hasn't image", async () => {
    _response = await _request;

    expect(_response.statusCode).toEqual(400);
    expect(_response.body.error).toEqual('No file sent in request');
  });

  afterAll(async () => {
    await imagesRepository.deleteAll();
    await tasksRespository.deleteAll();
    filesRepository.removeDir(process.cwd() + '/output/test_image');

    await application.stop();
  });
});
