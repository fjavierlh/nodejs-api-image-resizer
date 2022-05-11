/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from '../../domain/Image/model/Image';

const imageToSchema = ({
  id,
  createdAt,
  taskId,
  md5,
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
  created_at,
  task_id,
  md5,
  path_to_source,
  width,
  height
}: any): Image => ({
  id,
  createdAt: created_at,
  taskId: task_id,
  md5,
  pathToSource: path_to_source,
  resolution: {
    width,
    height
  }
});

export { imageToSchema, schemaToImage };
