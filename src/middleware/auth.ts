import { Request, Response, NextFunction } from "express";
import { changeableRequest } from "../interfaces/changeableRequest";
import jwt from "jsonwebtoken";

const verifyToken = (
  req: Request & changeableRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export { verifyToken };
