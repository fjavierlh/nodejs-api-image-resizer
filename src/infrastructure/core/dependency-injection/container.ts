import Container from 'typedi';
import FilesRepository from '../../File/FilesRepository';
import ImagesRepository from '../../Image/ImagesRepository';
import ImageResizerHttp from '../../ImageResizer/ImageResizerHttp';
import FecthHttpClient from '../../Shared/HttpClient/FetchHttpClient';
import TasksRepository from '../../Task/TasksRepository';

const bootstrapContainerDI = () => {
  Container.set('TasksRepository', new TasksRepository());
  Container.set('ImagesRepository', new ImagesRepository());
  Container.set('FilesRepository', new FilesRepository());
  Container.set(
    'ImageResizerHttp',
    new ImageResizerHttp(
      new FecthHttpClient(
        process.env.GOOGLE_CLOUD_FUNCTION_URL || 'http://localhost:8080'
      )
    )
  );
};

export default bootstrapContainerDI;
