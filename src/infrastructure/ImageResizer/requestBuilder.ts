import FormData from 'form-data';
import fs from 'fs-extra';

const buildResizeImageRequestFormData = (file: string) => {
  const formData = new FormData();
  formData.append('image', fs.createReadStream(file));
  return {
    body: formData
  };
};

export { buildResizeImageRequestFormData };
