import Image from './model/Image';

interface Images {
  persist(image: Image): Promise<void>;
}

export default Images;
