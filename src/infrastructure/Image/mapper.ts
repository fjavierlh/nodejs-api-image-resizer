/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from '../../domain/Image/model/Image';

const imageToSchema = ({
  id,
  createdAt,
  md5,
  pathToSource,
  resolution: { width, height }
}: Image): any => ({
  id,
  created_at: createdAt,
  path_to_source: pathToSource,
  md5,
  width,
  height
});

const schemaToImage = ({
  id,
  createdAt,
  md5,
  width,
  height,
  pathSource
}: any): Image => ({
  id,
  createdAt,
  md5,
  pathToSource: pathSource,
  resolution: {
    width,
    height
  }
});

export { imageToSchema, schemaToImage };
