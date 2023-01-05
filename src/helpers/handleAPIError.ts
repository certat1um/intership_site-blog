import { Response } from "express";

export const handleAPIError = (res: Response, err: any) => {
  console.log(err);
  res.status(500).send(err);
};
