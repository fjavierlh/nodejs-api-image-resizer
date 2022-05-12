import Image from './model/Image';

interface Images {
  persist(image: Image): Promise<void>;
  deleteByTaskId(taskId: string): Promise<void>;
  list(): Promise<Image[]>;
  byId(id: string): Promise<Image | undefined>;
  deleteAll(): Promise<void>;
}

export default Images;
