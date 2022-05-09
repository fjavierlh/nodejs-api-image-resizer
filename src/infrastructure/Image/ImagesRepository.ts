import Images from '../../domain/Image/Images.interface';
import Image from '../../domain/Image/model/Image';
import ImageSchema from './ImageSchema';
import { imageToSchema } from './mapper';

class ImagesRepository implements Images {
  public async persist(image: Image): Promise<void> {
    const imageSchema = imageToSchema(image);
    const newImage = ImageSchema.build(imageSchema);
    await newImage.save();
  }
}

export default ImagesRepository;
