import { Request } from "express";

export interface changeableRequest extends Request {
  [key: string]: unknown;
}
