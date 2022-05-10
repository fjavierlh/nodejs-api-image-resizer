import Task from './model/Task';
import TaskStatus from './model/TaskStatuses';

interface Tasks {
  list(): Promise<Task[]>;
  persist(task: Task): Promise<void>;
  byId(id: string): Promise<Task | undefined>;
  updateStatus(id: string, status: TaskStatus): Promise<void>;
  lastCreatedByOriginalName(originalName: string): Promise<Task | undefined>;
}

export default Tasks;
