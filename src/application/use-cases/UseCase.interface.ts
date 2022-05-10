import { Request, Response } from 'express';

interface UseCase {
  run(req: Request, res: Response): Promise<void>;
}

export default UseCase;
