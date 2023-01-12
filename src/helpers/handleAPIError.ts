import { Response } from "express";

export const handleAPIError = (res: Response, err: unknown) => {
  res.status(500).send(err);
};
