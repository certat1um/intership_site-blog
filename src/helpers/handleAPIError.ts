import { Response } from "express";

const handleAPIError = (res: Response, err: Error) => {
  console.log(err);
  res.status(500).send(err.message);
};

module.exports = handleAPIError;
