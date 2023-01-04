import { Response } from "express";
const createPath = require('./createPath');

const handleError = (res: Response, err: Error) => {
  console.log(err);
  res.render(createPath('error'), { title: 'Error' });
};

module.exports = handleError;
