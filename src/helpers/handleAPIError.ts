import { Response } from "express";

export const handleAPIError = (res: Response, err: unknown): void => {
  res.status(500).send(err);
  return;
};
