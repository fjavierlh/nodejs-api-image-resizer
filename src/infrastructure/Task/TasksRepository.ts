import Task from '../../domain/Task/model/Task';
import TaskStatus from '../../domain/Task/model/TaskStatuses';
import Tasks from '../../domain/Task/Tasks.interface';
import { schemaToTask, taskToSchema } from './mapper';
import TaskSchema from './TaskSchema';

class TasksRepository implements Tasks {
  public async persist(task: Task): Promise<void> {
    const taskSchema = taskToSchema(task);
    const newTask = TaskSchema.build(taskSchema);
    await newTask.save();
  }

  public async list(): Promise<Task[]> {
    const tasks = await TaskSchema.findAll();
    return tasks.map((task) => schemaToTask(task));
  }

  public async byId(id: string): Promise<Task | undefined> {
    const task = await TaskSchema.findByPk(id);
    if (!task) return;
    return schemaToTask(task);
  }

  public async updateStatus(id: string, newStatus: TaskStatus): Promise<void> {
    await TaskSchema.update({ status: newStatus }, { where: { id } });
  }

  public async lastCreatedByOriginalName(
    originalName: string
  ): Promise<Task | undefined> {
    const task = await TaskSchema.findOne({
      where: { original_name: originalName },
      order: [['created_at', 'DESC']]
    });
    if (!task) return;
    return schemaToTask(task);
  }
}

export default TasksRepository;
