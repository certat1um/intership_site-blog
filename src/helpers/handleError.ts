import { Response } from "express";
import { createPath } from './createPath';

export const handleError = (res: Response, err: Error) => {
  console.log(err);
  res.render(createPath('error'), { title: 'Error' });
};
