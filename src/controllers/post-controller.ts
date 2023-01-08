import { Request, Response } from "express";
import { handleError } from "../helpers/handleError";
import { createPath } from "../helpers/createPath";
import { IPost } from "../interfaces/IPost";
import { Post } from "../models/Post";

// Get Pages
const getAddPost = (req: Request, res: Response) => {
  const title = "Add Post";

  res.render(createPath("new-post"), { title });
};
const getEditPost = async (req: Request, res: Response) => {
  try {
    const title = "Edit Post";
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new Error("No post has been found");
    }
    res.status(200).render(createPath("edit-post"), { title, post });
  } catch (err) {
    handleError(res, err);
  }
};

// Get Post Actions
const getPosts = async (req: Request, res: Response) => {
  try {
    const title = "Posts";
    const posts = await Post.findAll();

    if (!posts) {
      throw new Error("No posts have been found");
    }
    res.status(200).render(createPath("posts"), { title, posts });
  } catch (err) {
    handleError(res, err);
  }
};
const getPost = async (req: Request, res: Response) => {
  try {
    const title = "Post";
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new Error("Post has not been found");
    }
    res.status(200).render(createPath("post"), { title, post });
  } catch (err) {
    handleError(res, err);
  }
};

// Other Post Actions
const createPost = async (req: Request, res: Response) => {
  try {
    await new Post(req.body).create();
    res.redirect("/posts");
  } catch (err) {
    handleError(res, err);
  }
};
const deletePost = async (req: Request, res: Response) => {
  try {
    const post_ID = { post_ID: req.params.id };

    await new Post(post_ID).deleteById();
    res.redirect("/posts");
  } catch (err) {
    handleError(res, err);
  }
};
const updatePost = async (req: Request, res: Response) => {
  try {
    const post_ID = { post_ID: req.params.id };
    const postData: IPost = {
      ...post_ID,
      ...req.body,
    };

    await new Post(postData).updateById();
    res.redirect("/posts");
  } catch (err) {
    handleError(res, err);
  }
};

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAddPost,
  getEditPost,
};
