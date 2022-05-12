import Images from '../../domain/Image/Images.interface';
import Image from '../../domain/Image/model/Image';
import ImageSchema from './ImageSchema';
import { imageToSchema, schemaToImage } from './mapper';

class ImagesRepository implements Images {
  public async persist(image: Image): Promise<void> {
    const imageSchema = imageToSchema(image);
    const newImage = ImageSchema.build(imageSchema);
    await newImage.save();
  }

  public async deleteByTaskId(taskId: string): Promise<void> {
    await ImageSchema.destroy({ where: { task_id: taskId } });
  }

  public async list(): Promise<Image[]> {
    const images = await ImageSchema.findAll();
    return images.map((task) => schemaToImage(task));
  }

  public async byId(id: string): Promise<Image | undefined> {
    const image = await ImageSchema.findByPk(id);
    if (!image) return;
    return schemaToImage(image);
  }

  public async deleteAll(): Promise<void> {
    await ImageSchema.destroy({
      where: {},
      truncate: true
    });
  }
}

export default ImagesRepository;
