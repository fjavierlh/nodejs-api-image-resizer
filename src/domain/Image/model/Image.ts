import Resolution from './ImageResolution';

type Image = {
  readonly id: string;
  readonly createdAt: string;
  readonly taskId: string;
  readonly md5: string;
  readonly resolution: Resolution;
  readonly pathToSource: string;
};

export default Image;
