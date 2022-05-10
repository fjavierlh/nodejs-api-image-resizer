/* eslint-disable @typescript-eslint/no-explicit-any */
import Task from '../../domain/Task/model/Task';

const taskToSchema = ({
  id,
  createdAt,
  updatedAt,
  originalName,
  md5Source,
  pathToSource,
  status
}: Task): any => ({
  id,
  created_at: createdAt,
  updated_at: updatedAt,
  original_name: originalName,
  md5_source: md5Source,
  path_to_source: pathToSource,
  status
});

const schemaToTask = ({
  id,
  created_at,
  updated_at,
  original_name,
  md5_source,
  path_to_source,
  status
}: any): Task => ({
  id,
  createdAt: created_at,
  updatedAt: updated_at,
  originalName: original_name,
  md5Source: md5_source,
  pathToSource: path_to_source,
  status
});

export { taskToSchema, schemaToTask };
