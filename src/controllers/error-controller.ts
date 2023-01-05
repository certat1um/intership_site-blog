import { Request, Response } from 'express';
import { createPath } from '../helpers/createPath';

export const getErrorPage = ((req: Request, res: Response) => {
  const title = 'Error page';

  res
    .status(404)
    .render(createPath('error'), { title });
});
