import { Router } from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAddPost,
  getEditPost,
} from "../controllers/post-controller";

export const router = Router();

router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.get("/new-post", getAddPost);
router.get("/edit-post/:id", getEditPost);
router.post("/new-post", createPost);
router.delete("/delete-post/:id", deletePost);
router.put("/edit-post/:id", updatePost);
