/* eslint-disable @typescript-eslint/no-explicit-any */
import Task from '../../domain/Task/model/Task';

const taskToSchema = ({
  id,
  createdAt,
  updatedAt,
  pathToSource,
  status
}: Task): any => ({
  id,
  created_at: createdAt,
  updated_at: updatedAt,
  path_to_source: pathToSource,
  status
});

const schemaToTask = ({
  id,
  created_at,
  updated_at,
  path_to_source,
  status
}: any): Task => ({
  id,
  createdAt: created_at,
  updatedAt: updated_at,
  pathToSource: path_to_source,
  status
});

export { taskToSchema, schemaToTask };
