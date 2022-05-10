/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from '../../domain/Image/model/Image';

const imageToSchema = ({
  id,
  createdAt,
  md5,
  taskId,
  pathToSource,
  resolution: { width, height }
}: Image): any => ({
  id,
  created_at: createdAt,
  md5,
  task_id: taskId,
  path_to_source: pathToSource,
  width,
  height
});

const schemaToImage = ({
  id,
  createdAt,
  task_id,
  md5,
  width,
  height,
  pathSource
}: any): Image => ({
  id,
  createdAt,
  md5,
  taskId: task_id,
  pathToSource: pathSource,
  resolution: {
    width,
    height
  }
});

export { imageToSchema, schemaToImage };
