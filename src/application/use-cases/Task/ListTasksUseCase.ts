import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Service } from 'typedi';
import TasksService from '../../../domain/Task/services/TaskService';
import UseCase from '../UseCase.interface';

@Service()
class ListTasksUseCase implements UseCase {
  constructor(private tasksService: TasksService) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.tasksService.list();
      res.status(httpStatus.OK).send({ result: tasks });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send({ error });
    }
  }
}

export default ListTasksUseCase;
