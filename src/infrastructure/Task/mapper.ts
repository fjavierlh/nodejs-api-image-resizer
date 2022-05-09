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

const schemaToTask = (taskSchema: any): Task => ({
  id: taskSchema.id,
  createdAt: taskSchema.created_at,
  updatedAt: taskSchema.updated_at,
  pathToSource: taskSchema.path_to_source,
  status: taskSchema.status
});

export { taskToSchema, schemaToTask };
