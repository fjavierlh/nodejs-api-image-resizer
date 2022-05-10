import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Service } from 'typedi';
import { isUuid } from '../../domain/Shared/utils/isUuid';
import TasksService from '../../domain/Task/services/TaskService';
import Controller from '../Controller.interface';

export type CheckStatusGetControllerRequest = Request & {
  params: { id: string };
};

@Service()
class CheckStatusGetController implements Controller {
  constructor(private tasksService: TasksService) {}

  public async run(
    req: CheckStatusGetControllerRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ error: 'No id sent in params' });
        return;
      }

      if (!isUuid(id)) {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ error: 'Invalid id, must be an uuid' });
        return;
      }

      const task = await this.tasksService.byId(req.params.id);

      if (!task) {
        res.status(httpStatus.NOT_FOUND).send();
        return;
      }
      res.status(200).send({ result: task });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send({ error });
    }
  }
}

export default CheckStatusGetController;
