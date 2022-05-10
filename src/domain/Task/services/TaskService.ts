import { Inject, Service } from 'typedi';
import TasksRepository from '../../../infrastructure/Task/TasksRepository';
import Task from '../model/Task';
import TaskStatus from '../model/TaskStatuses';

@Service()
class TasksService {
  constructor(@Inject('TasksRepository') private tasks: TasksRepository) {}

  public async create(task: Task): Promise<void> {
    await this.tasks.persist(task);
  }

  public async list(): Promise<Task[]> {
    return this.tasks.list();
  }

  public async byId(id: string): Promise<Task | undefined> {
    return this.tasks.byId(id);
  }

  public async lastCreatedByOriginalName(
    originalName: string
  ): Promise<Task | undefined> {
    return this.tasks.lastCreatedByOriginalName(originalName);
  }

  public async updateStatus(id: string, status: TaskStatus): Promise<void> {
    return this.tasks.updateStatus(id, status);
  }
}

export default TasksService;
