import TaskStatus from './TaskStatuses';

type Task = {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string[];
  readonly originalName: string;
  readonly md5Source: string;
  readonly pathToSource: string;
  readonly status: TaskStatus;
};

export default Task;
