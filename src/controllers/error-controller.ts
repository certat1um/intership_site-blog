import { Request, Response } from "express";

const createPath = require('../helpers/createPath');

const getErrorPage = ((req: Request, res: Response) => {
  const title = 'Error page';

  res
    .status(404)
    .render(createPath('error'), { title });
});

module.exports = {
  getErrorPage,
};
