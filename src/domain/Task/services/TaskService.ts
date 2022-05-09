import { Inject, Service } from 'typedi';
import TasksRepository from '../../../infrastructure/Task/TasksRepository';
import Task from '../model/Task';

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
}

export default TasksService;
