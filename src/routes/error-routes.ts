import { Router } from "express";
import { getErrorPage } from "../controllers/error-controller";

export const router = Router();

router.use(getErrorPage);
