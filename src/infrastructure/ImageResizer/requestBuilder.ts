import FormData from 'form-data';
import fs from 'fs-extra';

// const buildResizeImageRequestFormData = (file: string) => {
//   const stats = fs.statSync(file);
//   const fileSizeInBytes = stats.size;

//   const bufferContent = fs.readFileSync(file);

//   return {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       'Content-Length': fileSizeInBytes
//     },
//     body: bufferContent
//   };
// };

const buildResizeImageRequestFormData = (file: string) => {
  const formData = new FormData();
  formData.append('image', fs.createReadStream(file));
  return {
    body: formData
  };
};

export { buildResizeImageRequestFormData };
