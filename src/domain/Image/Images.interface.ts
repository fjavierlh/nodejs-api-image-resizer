import Image from './model/Image';

interface Images {
  persist(image: Image): Promise<void>;
  deleteByTaskId(taskId: string): Promise<void>;
}

export default Images;
