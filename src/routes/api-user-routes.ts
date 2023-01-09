import { Router } from "express";
import {
  registerUser,
  loginUser,
  welcomeUser,
} from "../controllers/api-user-controller";
import { verifyToken } from "../middleware/auth";

export const router = Router();

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.get("/api/welcome", verifyToken, welcomeUser);
